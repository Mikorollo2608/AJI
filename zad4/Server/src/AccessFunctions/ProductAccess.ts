import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import {RestError} from "../errors";
import {Category} from "../entity/Category";

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

export async function getAllProducts(req: Request, res: Response): Promise<void> {
    const products: Product[] = await productRepository.find()
    res.json(products);
}

export async function createNewProduct(req: Request, res: Response): Promise<void> {
    let errors = await RestError.collectValidatorErrors(req, createNewProductSchema);
    if (errors.length != 0) {
        res.status(StatusCodes.BAD_REQUEST).json(errors);
        return
    }

    let newProduct= productRepository.create(req.body);
    try {
        await productRepository.save(newProduct)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(RestError.getErrorMessage(error));
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
}

const createNewProductSchema = {
    name: {
        isString: true,
        errorMessage: "Name must be a non empty string."
    },
    description: {
        isString: true,
        errorMessage: "Description must be a non empty string."
    },
    unit_price: {
        isFloat: {
            options: {gt: 0},
            errorMessage: "Unit price must be a float greater than 0."
        }
    },
    unit_weight: {
        isFloat: {
            options: {gt: 0},
            errorMessage: "Unit weight must be a float greater than 0."
        }
    },
    category: {
        categoryExists: true
    },
    'category.id': {
        isInt: {
            options: {gt: 0},
            errorMessage: "Category id must be an integer greater than 0."
        }
    },
    'category.name': {
        isString: true,
        errorMessage: "Category name must be a non empty string."
    }
}

export async function categoryExists (value:any) {
    const categoryId = value.id;
    const categoryName = value.name;
    let result;
    try {
        result = await categoryRepository.findOneBy({
            id: categoryId,
            name: categoryName
        })
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no category with id:'${categoryId}' and name:'${categoryName}'`);
    }
    return result;
}


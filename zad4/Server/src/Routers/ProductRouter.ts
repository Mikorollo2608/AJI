import express, {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import {RestError} from "../errors";
import {checkExact, param, validationResult} from "express-validator";
import {checkSchema, createNewProductSchema} from "../Schemas/ProductSchemas";
import {Equal} from "typeorm";

const productRepository = AppDataSource.getRepository(Product);

async function getAllProducts(req: Request, res: Response): Promise<void> {
    const products: Product[] = await productRepository.find()
    res.json(products);
}

async function getProductById(req: Request, res: Response): Promise<void> {

    let id:number = parseInt(req.params.id);
    if(isNaN(id)){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return ;
    }

    const product: Product | null = await productRepository.findOneBy({id: id });
    if(product){
        res.json(product);
    } else {
        res.sendStatus(StatusCodes.NOT_FOUND)
    }
}

async function createNewProduct(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    let restErrors:RestError[];
    if (!errors.isEmpty()) {
        restErrors = RestError.getValidatorErrors(errors.array());
        res.status(StatusCodes.BAD_REQUEST).json(restErrors);
        return
    }

    let newProduct= productRepository.create(req.body);
    try {
        newProduct = await productRepository.save(newProduct)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(RestError.getErrorMessage(error));
        return;
    }
    res.status(StatusCodes.CREATED).json(newProduct);
}

export const router = express.Router();
router.use(express.json());

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/',checkExact(checkSchema(createNewProductSchema)), createNewProduct);

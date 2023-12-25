import express, {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import {RestError} from "../errors";
import {validationResult} from "express-validator";
import {checkSchema, createNewProductSchema} from "../Schemas/ProductSchemas";

const productRepository = AppDataSource.getRepository(Product);

async function getAllProducts(req: Request, res: Response): Promise<void> {
    const products: Product[] = await productRepository.find()
    res.json(products);
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
    console.log(newProduct);
    try {
        await productRepository.save(newProduct)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(RestError.getErrorMessage(error));
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
}

export const router = express.Router();
router.use(express.json());

router.get('/', getAllProducts);
router.post('/',checkSchema(createNewProductSchema), createNewProduct);

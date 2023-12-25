import express, {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import {RestError} from "../errors";
import {checkExact, validationResult} from "express-validator";
import {
    param,
    checkSchema,
    createNewProductSchema,
    productExists,
    modifyProductSchema
} from "../Schemas/ProductSchemas";

const productRepository = AppDataSource.getRepository(Product);

async function getAllProducts(req: Request, res: Response): Promise<void> {
    let product: Product[];
    try {
        product = await productRepository.find();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.json(product);
}

async function getProductById(req: Request, res: Response): Promise<void> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return ;
    }

    const id:number = parseInt(req.params.id);

    let product: Product | null;
    try {
        product = await productRepository.findOneBy({id: id });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.json(product);
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.status(StatusCodes.CREATED).json(newProduct);
}

async function modifyProductById(req: Request, res: Response): Promise<void> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // @ts-ignore
        if((errors.array())[0].location == "params"){
            res.status(StatusCodes.NOT_FOUND);
        }else{
            res.status(StatusCodes.BAD_REQUEST);
        }
        res.json(RestError.getValidatorErrors(errors.array()))
        return ;
    }

    const id:number = parseInt(req.params.id);

    let product: Product | null;
    try {
        product = await productRepository.findOneBy({id: id });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }

    let modifiedProduct = productRepository.create(req.body);
    modifiedProduct = {...product, ...modifiedProduct};
    try {
        await productRepository.save(modifiedProduct);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }

    res.json(modifiedProduct);
}

export const router = express.Router();
router.use(express.json());

router.get('/', getAllProducts);

router.post('/',checkExact(checkSchema(createNewProductSchema)), createNewProduct);

router.get('/:id', param('id').isInt().productExists(), getProductById);

//you change category by specifying only one of the category parameters
router.put('/:id', checkExact([checkSchema(modifyProductSchema),param('id').isInt().withMessage("Product id must be a positive integer").bail().productExists()]), modifyProductById);

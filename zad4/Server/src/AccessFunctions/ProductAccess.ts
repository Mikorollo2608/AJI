import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import {getMessage} from "../errors";

const productRepository = AppDataSource.getRepository(Product);

export async function getAllProducts(req: Request, res: Response): Promise<void> {
    const products: Product[] = await productRepository.find()
    res.json(products);
}

export async function createNewProduct(req: Request, res: Response): Promise<void> {
    let newProduct = productRepository.create(req.body);
    try{
        await productRepository.save(newProduct)
    } catch (error){
        res.status(StatusCodes.BAD_REQUEST).send(getMessage(error));
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
}
import {AppDataSource} from "../data-source";
import express, {Request, Response} from "express";
import {Category} from "../entity/Category";

const categoryRepository = AppDataSource.getRepository(Category);
export const router = express.Router();

router.get('/', getAllCategories);

async function getAllCategories(req: Request, res: Response): Promise<void> {
    const categories: Category[] = await categoryRepository.find()
    res.json(categories);
}
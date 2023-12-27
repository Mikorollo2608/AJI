import {AppDataSource} from "../data-source";
import express, {Request, Response} from "express";
import {Status} from "../entity/Status";

const orderStateRepository = AppDataSource.getRepository(Status);
export const router = express.Router();

router.get('/', getAllStatus);

async function getAllStatus(req: Request, res: Response): Promise<void> {
    const orderStates: Status[] = await orderStateRepository.find()
    res.json(orderStates);
}
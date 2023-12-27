import {AppDataSource} from "../data-source";
import express, {Request, Response} from "express";
import {Order} from "../entity/Order";
import {checkExact, validationResult} from "express-validator";
import {RestError} from "../errors";
import {StatusCodes} from "http-status-codes";
import {Product} from "../entity/Product";
import {OrderItem} from "../entity/OrderItem";
import {Status} from "../entity/Status";
import {checkSchema} from "../Schemas/Schema";
import {createNewOrderSchema} from "../Schemas/OrderSchemas";

const orderRepository = AppDataSource.getRepository(Order);
const productRepository = AppDataSource.getRepository(Product);
const statusRepository = AppDataSource.getRepository(Status);
export const router = express.Router();

router.get('/', getAllOrders);
router.post('/', checkExact(checkSchema(createNewOrderSchema)),  createNewOrder);

async function getAllOrders(req: Request, res: Response): Promise<void> {
    const orders: Order[] = await orderRepository.find()
    res.json(orders);
}

async function createNewOrder(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    let restErrors: RestError[];
    if (!errors.isEmpty()) {
        restErrors = RestError.getValidatorErrors(errors.array());
        res.status(StatusCodes.BAD_REQUEST).json(restErrors);
        return;
    }
    let result;
    let orderItems: OrderItem[] = [];
    for (const product of req.body.products) {
        try {
            result = await productRepository.findOneBy({
                id: product.id
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
            return;
        }
        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json(new RestError("field",`Product with id: ${product.id} doesn't exist.`))
        } else {
            orderItems.push(OrderItem.create(result, product.quantity));
        }
    }

    //if select fails this means status table is messed up
    const status: Status | null = await statusRepository.findOneBy({id:1, status:"UNAPPROVED"});
    if(!status){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new RestError("database","Couldn't get UNAPPROVED status of the order."));
        return;
    }

    let order = req.body;
    order.status = status;
    order.orderItems = orderItems;
    delete order.products;
    order = orderRepository.create(order);
    try {
        order = await orderRepository.save(order);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.status(StatusCodes.CREATED).json(order);
}
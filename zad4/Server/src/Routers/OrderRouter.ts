import {AppDataSource} from "../data-source";
import express, {Request, Response} from "express";
import {Order} from "../entity/Order";
import {checkExact, validationResult} from "express-validator";
import {RestError} from "../errors";
import {StatusCodes} from "http-status-codes";
import {Product} from "../entity/Product";
import {OrderItem} from "../entity/OrderItem";
import {Status} from "../entity/Status";
import {checkSchema, param} from "../Schemas/Schema";
import {
    createNewOrderSchema,
    jsonPatchReplaceSchema,
    updateOrderSchema
} from "../Schemas/OrderSchemas";

const orderRepository = AppDataSource.getRepository(Order);
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const productRepository = AppDataSource.getRepository(Product);
const statusRepository = AppDataSource.getRepository(Status);
export const router = express.Router();

router.get('/', getAllOrders);
router.get('/status/:id',checkExact(param("id").isInt({min: 1, max:4}).statusParamExists().withMessage("Id must be an integer bigger than 0 and lower than 5.")), getOrdersByStatus);
router.post('/', checkExact(checkSchema(createNewOrderSchema)),  createNewOrder);
router.patch('/:id', checkExact([checkSchema(jsonPatchReplaceSchema),param("id"),param("id").orderExists().bail()]), changeOrderStatus);
router.put('/:id', checkExact([param("id").orderExists().bail(), checkSchema(updateOrderSchema)]), modifyOrder);

async function getAllOrders(req: Request, res: Response): Promise<void> {
    if(req.query.username){
        const username= req.query.username.toString();
        const orders: Order[] = await orderRepository.findBy({username: username})
        res.json(orders);
        return
    }else{
        const orders: Order[] = await orderRepository.find();
        res.json(orders);
        return
    }

}

async function getOrdersByStatus(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    let restErrors: RestError[];
    if (!errors.isEmpty()) {
        restErrors = RestError.getValidatorErrors(errors.array());
        res.status(StatusCodes.BAD_REQUEST).json(restErrors);
        return;
    }
    const statusId = parseInt(req.params.id);
    const orders: Order[] = await orderRepository.find({
        relations: {
            status: true
        },
        where: {
            status: {
                id: statusId
            }
        }
    })
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

async function changeOrderStatus(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // @ts-ignore
        if ((errors.array())[0].location == "params") {
            res.status(StatusCodes.NOT_FOUND);
        } else {
            res.status(StatusCodes.BAD_REQUEST);
        }
        res.json(RestError.getValidatorErrors(errors.array()))
        return;
    }

    const id: number = parseInt(req.params.id);

    let order;
    try {
        order = await orderRepository.findOneBy({id: id});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    if (!order) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new RestError("database", "Couldn't find an order."));
        return;
    }

    if (order.status.id > req.body.value.id) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new RestError("field", "Can't change order status to a lower one."));
        return;
    }

    if (order.status.status == "CANCELED" && req.body.value.status == "COMPLETED") {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new RestError("field", "Can't complete a canceled order."));
        return;
    }

    order.status = req.body.value;
    try {
        order = await orderRepository.save(order);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.status(StatusCodes.CREATED).json(order);
}


async function modifyOrder(req: Request, res: Response): Promise<void> {
    //get errors
    const errors = validationResult(req);
    let restErrors: RestError[];
    if (!errors.isEmpty()) {
        restErrors = RestError.getValidatorErrors(errors.array());
        res.status(StatusCodes.BAD_REQUEST).json(restErrors);
        return;
    }
    //get order
    const id:number = parseInt(req.params.id);
    let dbOrder;
    try {
        dbOrder = await orderRepository.findOneBy({id:id});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    if(!dbOrder){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new RestError("database", "Couldn't find an order."));
        return;
    }

    if(dbOrder.status.status=="APPROVED"){
        res.status(StatusCodes.BAD_REQUEST).json(new RestError("field","Can't update an approved order."));
        return;
    }

    //delete old OrderItems
    let oldOrderItems: OrderItem[] = dbOrder.orderItems;
    try {
        await orderItemRepository.remove(oldOrderItems);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }

    //create new OrderItems from given products
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

    //create updated order
    let order = req.body;
    if(order.status.status=="APPROVED"){
        order.dateOfApproval = new Date(Date.now());
    }

    order.orderItems = orderItems;
    delete order.products;
    order = {...dbOrder,...order};
    try {
        order = await orderRepository.save(order);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RestError.getErrorMessage(error));
        return;
    }
    res.status(StatusCodes.CREATED).json(order);
}
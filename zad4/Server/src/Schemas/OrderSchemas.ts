import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {Status} from "../entity/Status";
import {Order} from "../entity/Order";

const statusRepository = AppDataSource.getRepository(Status);
const productRepository = AppDataSource.getRepository(Product);
const orderRepository = AppDataSource.getRepository(Order);

export const createNewOrderSchema = {
    username: {
        notEmpty: true,
        isString: true,
        errorMessage: "Username must be a non empty string."
    },
    email: {
        isEmail: true,
        errorMessage: "Incorrect mail"
    },
    phone: {
        isMobilePhone: true,
        errorMessage: "Incorrect phone number"
    },
    products: {
        arrayNotEmpty: true,
    },
    'products.*.id': {
        isInt: true,
        errorMessage: "Product id must be an integer greater than 0."
    },
    'products.*.quantity': {
        isInt: {
            options: {gt: 0},
            errorMessage: "Product quantity must be an integer greater than 0."
        }
    }
}

export const updateOrderSchema = {
    username: {
        notEmpty: true,
        isString: true,
        errorMessage: "Username must be a non empty string."
    },
    email: {
        isEmail: true,
        errorMessage: "Incorrect mail"
    },
    phone: {
        isMobilePhone: true,
        errorMessage: "Incorrect phone number"
    },
    products: {
        arrayNotEmpty: true,
    },
    'products.*.id': {
        isInt: true,
        errorMessage: "Product id must be an integer greater than 0."
    },
    'products.*.quantity': {
        isInt: {
            options: {gt: 0},
            errorMessage: "Product quantity must be an integer greater than 0."
        }
    },
    status:{
        statusExists: true
    },
    'status.id':{
        isInt: {
            options: {min:1, max:2},
            errorMessage: "Status id must be either a 1 or 2."
        }
    },
    'status.status':{
        isIn:{
            options: [['UNAPPROVED', 'APPROVED']],
            errorMessage: "Status must be one of the available values ['UNAPPROVED', 'APPROVED']."
        },
    }
}

export const jsonPatchReplaceSchema = {
    op: {
        isIn: {
            options: [["replace"]],
            errorMessage: "Only available operation is replacement"
        }
    },
    path: {
        isIn:{
            options: [["status"]],
            errorMessage: "Only modifiable field is status."
        }
    },
    value: {
        statusExists: true
    },
    'value.id': {
        isInt: {
            options: {gt: 0},
            errorMessage: "Status id must be an integer greater than 0"
        }
    },
    'value.status': {
        isIn:{
            options: [['CANCELED', 'COMPLETED']],
            errorMessage: "Status must be one of the available values ['CANCELED','COMPLETED']"
        },
    }
}

export function arrayNotEmpty(array: any[]) {
    if (array.length <= 0) {
        throw new Error("Order must contain an array of products");
    }
    return array;
}

export async function statusExists(value: any) {
    const statusId = value.id;
    const reqStatus = value.status;
    let result;
    try {
        result = await statusRepository.findOneBy({
            id: statusId,
            status: reqStatus
        })
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no status with id:'${statusId}' and status description:'${reqStatus}'.`);
    }
    return result;
}

export async function statusParamExists(value: any) {
    const statusId = value.id;
    let result;
    try {
        result = await statusRepository.findOneBy({id: statusId})
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no status with id:'${statusId}'.`);
    }
    return result;
}

export async function orderExists(value: any) {
    const orderId = value;
    let result;
    try {
        result = await orderRepository.findOneBy({
            id: orderId
        })
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no order with id:'${orderId}'.`);
    }
    return result;
}
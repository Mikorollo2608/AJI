import {AppDataSource} from "../data-source";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";
import {IsEmptyOptions} from "express-validator/src/options";

const categoryRepository = AppDataSource.getRepository(Category);
const productRepository = AppDataSource.getRepository(Product);

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
        isMobilePhone:true,
        errorMessage: "Incorrect phone number"
    },
    products: {
        arrayNotEmpty: true,
    },
    'products.*.id':{
        isInt: true,
        errorMessage: "Product id must be an integer greater than 0."
    },
    'products.*.quantity':{
        isInt: {
            options: {gt: 0},
            errorMessage: "Product quantity must be an integer greater than 0."
        }
    }
}

export function arrayNotEmpty(array:any[]) {
    if (array.length <= 0) {
        throw new Error("Order must contain an array of products");
    }
    return array;
}


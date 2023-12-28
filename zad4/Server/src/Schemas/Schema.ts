import {ExpressValidator} from "express-validator";
import {categoryExists, productExists} from "./ProductSchemas";
import {arrayNotEmpty, orderExists, statusExists, statusParamExists} from "./OrderSchemas";

export const { checkSchema, param } = new ExpressValidator({
    categoryExists: async (value:any) => {return categoryExists(value);},
    productExists: async (value:any) => {return productExists(value);},
    arrayNotEmpty: (value:any) => {return arrayNotEmpty(value);},
    statusExists: async (value:any) => {return statusExists(value);},
    orderExists: async (value:any) => {return orderExists(value);},
    statusParamExists: async (value:any) => {return statusParamExists(value);}
})
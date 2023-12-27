import {ExpressValidator} from "express-validator";
import {categoryExists, productExists} from "./ProductSchemas";
import {arrayNotEmpty} from "./OrderSchemas";

export const { checkSchema, param } = new ExpressValidator({
    categoryExists: async (value:any) => {return categoryExists(value);},
    productExists: async (value:any) => {return productExists(value);},
    arrayNotEmpty: (value:any) => {return arrayNotEmpty(value);}
})
import {categoryExists} from "./ProductAccess";
import {ExpressValidator} from "express-validator";

export const { checkSchema } = new ExpressValidator({
        categoryExists: async (value:any) => {return categoryExists(value);}
    }
);
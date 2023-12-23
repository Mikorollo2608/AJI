import {QueryFailedError} from "typeorm";
import {check, checkExact, ExpressValidator, Result} from "express-validator";
import {Request} from "express";
import {ResultWithContext} from "express-validator/src/chain";
import {checkSchema} from "./AccessFunctions/CustomValidators";

export class RestError{
    private cause:string;
    private msg: string;
    constructor(cause: string, msg: string) {
        this.cause = cause;
        this.msg = msg;
    }
    static getErrorMessage(error:any): RestError {
        if(error instanceof QueryFailedError) return new RestError("database",error.message);
        return new RestError("unknown","Unknown error has occured");
    }

    static async collectValidatorErrors(req: Request, schema: any): Promise<RestError[]> {
        const errorArray: RestError[] = [];
        const schemaFieldsErrors = await checkExact(checkSchema(schema)).run(req);
        if(!schemaFieldsErrors.isEmpty()){errorArray.push(new RestError("field", schemaFieldsErrors.context.errors[0].msg));}

        const validationFieldsErrors = (await checkSchema(schema).run(req)).flat();
        validationFieldsErrors.forEach((fieldContext) => {
            if(fieldContext.context.errors.length != 0) errorArray.push(new RestError(fieldContext.context.errors[0].type,fieldContext.context.errors[0].msg));
        })
        return errorArray;
    }
}
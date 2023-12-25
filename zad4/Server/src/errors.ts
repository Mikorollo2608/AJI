import {QueryFailedError} from "typeorm";
import {check, checkExact, ExpressValidator, Result, ValidationError} from "express-validator";
import {Request} from "express";
import {ResultWithContext} from "express-validator/src/chain";


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

    static getValidatorErrors(validatorErrors:ValidationError[]) {
        const errorArray: RestError[] = [];

        validatorErrors.forEach((error) => {
            errorArray.push(new RestError(error.type,error.msg));
        })
        return errorArray;
    }
}
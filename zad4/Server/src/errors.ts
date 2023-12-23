import {QueryFailedError} from "typeorm";

export function getMessage(error:any): string {
    if(error instanceof QueryFailedError) return error.message;
    return "Couldn't retrieve error message";
}
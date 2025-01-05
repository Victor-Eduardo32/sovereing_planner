import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../../../application/exceptions/base-error.exception";

export const errorHandler = (error: Error, request: Request, response: Response, nect: NextFunction) => {
    if(error instanceof BaseError) {
        response.status(error.statusCode).send(error.message)
        return;
    }

    console.log(error.stack)
    response.status(500).send('Internal Server Error.')
}
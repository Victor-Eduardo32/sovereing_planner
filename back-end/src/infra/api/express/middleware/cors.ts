import { NextFunction, Request, Response } from "express";

export const corsMiddleware = (request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
    response.header('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,DELETE')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.header('Access-Control-Allow-Credentials', 'true')
    next()
}
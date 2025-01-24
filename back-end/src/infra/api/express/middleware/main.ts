import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import { corsMiddleware } from "./cors";

export function getMiddlewares(): RequestHandler[] {
    return [
        express.json(),
        cookieParser(),
        corsMiddleware,
    ]
}
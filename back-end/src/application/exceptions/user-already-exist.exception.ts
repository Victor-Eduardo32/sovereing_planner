import { BaseError } from "./base-error.exception";

export class UserAlreadyExist extends BaseError {
    public statusCode = 409;

    constructor(message: string = "User already exists with this email") {
        super(message)
    }
}
import { BaseError } from "./base-error.exception"

export class UserNotFoundException extends BaseError {
    public statusCode = 404;

    constructor(message: string = "User not found.") {
        super(message)
    }
}
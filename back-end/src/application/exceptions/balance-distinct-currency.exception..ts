import { BaseError } from "./base-error.exception";

export class BalanceDistinctCurrency extends BaseError {
    public statusCode = 400;

    constructor(message: string = "Value inserted in a different currency than expected.") {
        super(message)
    }
}
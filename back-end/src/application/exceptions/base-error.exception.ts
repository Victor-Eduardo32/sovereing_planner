export abstract class BaseError extends Error {
    public abstract statusCode: number;

    protected constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}
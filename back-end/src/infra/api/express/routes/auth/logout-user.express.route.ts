import { Request, Response, NextFunction } from "express";
import { LogoutUserUseCase } from "../../../../../application/usecases/auth/logout-user/logout-user.usecase";
import { HttpMethod, Route } from "../route";

export class LogoutUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly logoutUserService: LogoutUserUseCase
    ){}

    public static create(logoutUserService: LogoutUserUseCase) {
        return new LogoutUserRoute(
            '/logout',
            HttpMethod.POST,
            logoutUserService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                await this.logoutUserService.execute(null)
                response.clearCookie('authToken')
                response.status(200).send('Logout successful')
            } catch (error) {
                next(error)
            }
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }
}
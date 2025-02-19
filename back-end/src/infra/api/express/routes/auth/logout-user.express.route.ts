import { Request, Response, NextFunction } from "express";
import { LogoutUserInputDto, LogoutUserUseCase } from "../../../../../application/usecases/auth/logout-user.usecase";
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
                const token = request.cookies.authToken

                const input: LogoutUserInputDto = {
                    token
                }

                await this.logoutUserService.execute(input)
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
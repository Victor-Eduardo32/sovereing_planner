import { Request, Response, NextFunction } from "express";
import { RefreshSessionTokenOutputDto, RefreshSessionTokenUseCase } from "../../../../../application/usecases/session/refresh-session-token.usecase";
import { HttpMethod, Route } from "../route";

export type RefreshSessionTokenResponseDto = {
    newToken: string
}

export class RefreshSessionTokenRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly refreshSessionTokenUseCase: RefreshSessionTokenUseCase
    ){}

    public static create(refreshSessionTokenUseCase: RefreshSessionTokenUseCase) {
        return new RefreshSessionTokenRoute(
            '/refresh-token',
            HttpMethod.POST,
            refreshSessionTokenUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const token = request.cookies.authToken

                const output = await this.refreshSessionTokenUseCase.execute({ token })

                const responseBody = this.present(output)

                response.cookie('authToken', responseBody.newToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                })

                response.status(200).send('Token refreshed')
            } catch (error) {
                next(error)
            }
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.httpMethod
    }

    private present(input: RefreshSessionTokenOutputDto): RefreshSessionTokenResponseDto {
        const response = { newToken: input.newToken }

        return response
    } 
}
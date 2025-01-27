import { NextFunction, Request, Response } from "express";
import { AuthUserOutputDto, AuthUserUseCase } from "../../../../../application/usecases/auth/auth-user.usescase";
import { HttpMethod, Route } from "../route";

export type AuthUserResponseDto = {
    user: {
        id: string,
        name: string,
        email: string,
        created_at: Date
    },
    token: string
}

export class AuthUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authUserService: AuthUserUseCase,
    ){}

    public static create(authUserService: AuthUserUseCase) {
        return new AuthUserRoute(
            "/oauth",
            HttpMethod.POST,
            authUserService,
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const { email, password } = request.body

                const output = await this.authUserService.execute({ email, password })

                const responseBody = this.present(output);

                response.cookie('authToken', responseBody.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                })

                response.status(201).json(responseBody).send()
            } catch (error) {   
                next(error)
            }
        }
    }

    public getPath() {
        return this.path
    }

    public getMethod() {
        return this.method
    }

    private present(input: AuthUserOutputDto): AuthUserResponseDto {
        const output =  {
            user: {
                id: input.user.id,
                name: input.user.name,
                email: input.user.email,
                created_at: input.user.created_at
            },
            token: input.token
        }

        return output
    }
}
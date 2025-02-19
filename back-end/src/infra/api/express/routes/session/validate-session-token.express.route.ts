import { Request, Response, NextFunction } from "express"
import { ValidateSessionTokenInputDto, ValidateSessionTokenOutputDto, ValidateSessionTokenUseCase } from "../../../../../application/usecases/session/validate-session-token.usecase"
import { HttpMethod, Route } from "../route"

export type ValidateTokenExpirationResponseDto = {
    valid: boolean
}

export class ValidateSessionTokenRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly validateSessionTokenUsecase: ValidateSessionTokenUseCase
    ){}

    public static create(validateSessionTokenUsecase: ValidateSessionTokenUseCase) {
        return new ValidateSessionTokenRoute(
            '/validate-token',
            HttpMethod.POST,
            validateSessionTokenUsecase        
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {         
            try {
                const token = request.cookies.authToken

                const input: ValidateSessionTokenInputDto = {
                    token
                }

                const output = await this.validateSessionTokenUsecase.execute(input)

                const responseBody = this.present(output)

                response.status(200).send(responseBody)
            } catch (error) {
                response.status(401).send({ valid: false })
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

    private present(input: ValidateSessionTokenOutputDto): ValidateTokenExpirationResponseDto {
        const response = { valid: input.valid }

        return response
    }
}
import { Request, Response, NextFunction } from "express"
import { ValidateSessionTokenOutputDto, ValidateSessionTokenUseCase } from "../../../../../application/usecases/session/validate-session-token/validate-session-token.usecase"
import { HttpMethod, Route } from "../route"

export type ValidateTokenExpirationResponseDto = {
    valid: boolean
}

export class ValidateTokenExpirationTimeRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly validateSessionTokenUsecase: ValidateSessionTokenUseCase
    ){}

    public static create(validateSessionTokenUsecase: ValidateSessionTokenUseCase) {
        return new ValidateTokenExpirationTimeRoute(
            '/validate-token',
            HttpMethod.POST,
            validateSessionTokenUsecase        
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {         
            try {
                const token = request.cookies.authToken

                const output = await this.validateSessionTokenUsecase.execute({ token })

                const responseBody = this.present(output)

                response.status(200).send(responseBody)
            } catch (error) {
                console.error('Erro na validação do token:', error);
                response.status(401).send({ valid: false })
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
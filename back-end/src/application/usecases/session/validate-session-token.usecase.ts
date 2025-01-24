import { SessionGateway } from "../../../domain/gateway/session.gateway"
import { JwtService } from "../../../domain/services/jwt.service"
import { UseCase } from "../usecase"

export type ValidateSessionTokenInputDto = {
    token: string
}

export type ValidateSessionTokenOutputDto = {
    valid: boolean
}

export class ValidateSessionTokenUseCase implements UseCase<ValidateSessionTokenInputDto, ValidateSessionTokenOutputDto> {
    private constructor(
        private readonly sessionGateway: SessionGateway, 
        private readonly jwtService: JwtService
    ){}

    public static create(sessionGateway: SessionGateway, jwtService: JwtService) {
        return new ValidateSessionTokenUseCase(sessionGateway, jwtService)
    }

    public async execute({ token }: ValidateSessionTokenInputDto): Promise<ValidateSessionTokenOutputDto> {
        try {
            const validToken = this.jwtService.getExpirationTime(token)
            const currentDate = new Date()

            if(validToken && validToken > currentDate) {
                return { valid: true }
            }

            return { valid: false }
        } catch (error) {
            console.error(error)
            throw Error('Error on processing ValidateSessionTokenUseCase')
        }
    }
}
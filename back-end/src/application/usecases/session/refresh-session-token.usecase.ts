import { JwtService } from "../../../domain/services/jwt.service";
import { UserDecoded } from "../../../domain/types/userDecoded";
import { UseCase } from "../usecase";
import { CreateSessionUseCase } from "./create-session.usecase";

export type RefreshSessionTokenInputDto = {
    token: string
}

export type RefreshSessionTokenOutputDto = {
    newToken: string
}

export class RefreshSessionTokenUseCase implements UseCase<RefreshSessionTokenInputDto, RefreshSessionTokenOutputDto> {
    private constructor(
        private readonly sessionService: CreateSessionUseCase,
        private readonly jwtService: JwtService
    ){}

    public static create(sessionService: CreateSessionUseCase, jwtService: JwtService) {
        return new RefreshSessionTokenUseCase(sessionService, jwtService);
    }

    public async execute({ token }: RefreshSessionTokenInputDto): Promise<RefreshSessionTokenOutputDto> {
        try {
            const newToken = this.jwtService.refreshToken(token)
            const { id } = this.jwtService.verifyToken(newToken) as UserDecoded
            const user_id = id
            const expirationTime = this.jwtService.getExpirationTime(newToken)

            await this.sessionService.execute({ user_id: user_id, token: newToken, ended_at: expirationTime })
            
            return { newToken }
        } catch (error) {
            console.error(error)
            throw Error('Error on processing RefreshSessionTokenUseCase')
        }
    }
}
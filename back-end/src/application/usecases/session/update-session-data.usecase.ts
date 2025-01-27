import { SessionGateway } from "../../../domain/gateway/session.gateway";
import { JwtService } from "../../../domain/services/jwt.service";
import { UserDecoded } from "../../../domain/types/userDecoded";
import { UseCase } from "../usecase";

export type UpdateSessionDataInputDto = {
    token: string
}

export type UpdateSessionDataOutputDto = null

export class UpdateSessionDataUseCase implements UseCase<UpdateSessionDataInputDto, UpdateSessionDataOutputDto>  {
    private constructor(
        private readonly sessionGateway: SessionGateway,
        private readonly jwtService: JwtService
    ){}

    public static create(sessionGateway: SessionGateway, jwtService: JwtService) {
        return new UpdateSessionDataUseCase(sessionGateway, jwtService)
    }

    public async execute({ token }: UpdateSessionDataInputDto): Promise<null> {
        try {
            const { id }  = this.jwtService.verifyToken(token) as UserDecoded
            const user_id = id
            const currentDate = new Date()

            const session = await this.sessionGateway.findSession(user_id, token)

            await this.sessionGateway.update(session.id!, currentDate)

            return null
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
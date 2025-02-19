import { Session } from "../../../domain/entities/session"
import { SessionGateway } from "../../../domain/gateway/session.gateway" 
import { UseCase } from "../usecase" 

export type CreateSessionInputDto = {
    user_id: string,
    token: string,
    ended_at?: Date
}

export type CreateSessionOutputDto = null

export class CreateSessionUseCase implements UseCase<CreateSessionInputDto, CreateSessionOutputDto> {
    private constructor(private readonly sessionGateway: SessionGateway){}

    public static create(sessionGateway: SessionGateway) {
        return new CreateSessionUseCase(sessionGateway)
    }

    public async execute({ user_id, token, ended_at }: CreateSessionInputDto): Promise<CreateSessionOutputDto> {
        try {
            const aSession = Session.create(user_id, token, ended_at)

            await this.sessionGateway.save(aSession)

            return null;
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateSessionUseCase')
        }
    }
 }
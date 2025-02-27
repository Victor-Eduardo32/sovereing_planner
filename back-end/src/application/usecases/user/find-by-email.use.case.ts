import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { UserNotFoundException } from "../../exceptions/user-not-found.exception";
import { UseCase } from "../usecase";

export type FindByEmailInputDto = {
    email: string
} 

export type FindByEmailOutputDto = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date
}

export class FindByEmailUseCase implements UseCase<FindByEmailInputDto, FindByEmailOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway
    ){}

    public static create(userGateway: UserGateway) {
        return new FindByEmailUseCase(userGateway)
    }

    public async execute(input: FindByEmailInputDto): Promise<FindByEmailOutputDto> {
        try {
            const { email } = input
            const aUser = await this.userGateway.findByEmail(email)
    
            const output = this.presentOutput(aUser)
    
            return output 
        } catch (error) {
            if (!(error instanceof UserNotFoundException)) { 
                error = new Error("Error on processing FindByEmailUseCase.")
            }

            console.error(error)
            throw error
        }
        
    }

    private presentOutput(user: User): FindByEmailOutputDto {
        const output = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            created_at: user.created_at
        }

        return output
    }
}
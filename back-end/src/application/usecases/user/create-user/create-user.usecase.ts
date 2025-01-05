import { User } from "../../../../domain/entities/user"
import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { HashService } from "../../../../domain/services/hash.service"
import { UserAlreadyExist } from "../../../exceptions/user-already-exist.exception"
import { UseCase } from "../../usecase"

export type CreateUserInputDto = {
    name: string,
    email: string,
    password: string
}

export type CreateUserOutputDto = {
    id: string
}

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly hashService: HashService
    ){}

    public static create(userGateway: UserGateway, hashService: HashService) {
        return new CreateUserUseCase(userGateway, hashService)
    }

    public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
        try {
            const aUser = User.create(name, email, password)
            await aUser.setPassword(aUser.password, this.hashService)
    
            await this.userGateway.save(aUser)
    
            const output = this.presentOutput(aUser)
    
            return output 
        } catch (error) {
            if (!(error instanceof UserAlreadyExist)) { 
                error = new Error("Error on processing CreateUserUseCase.")
            }

            console.error(error)
            throw error
        }
    }

    private presentOutput(user: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: user.id
        }

        return output
    }
}
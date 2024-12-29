import { User } from "../../../../domain/entities/user"
import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { HashService } from "../../../../domain/services/hash.service"
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
        const aUser = User.create(name, email, password)
        await aUser.setPassword(aUser.password, this.hashService)

        await this.userGateway.save(aUser)

        const output = this.presentOutput(aUser)

        return output
    }

    private presentOutput(user: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: user.id
        }

        return output
    }
}
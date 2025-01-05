import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { HashService } from "../../../../domain/services/hash.service"
import { JwtService } from "../../../../domain/services/jwt.service"
import { UserNotFoundException } from "../../../exceptions/user-not-found.exception"
import { UseCase } from "../../usecase"

export type AuthUserInputDto = {
    email: string,
    password: string
}

export type AuthUserOutputDto = {
    token: string
}

export class AuthUserUseCase implements UseCase<AuthUserInputDto, AuthUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ){}

    public static create(userGateway: UserGateway, hashService: HashService, jwtService: JwtService) {
        return new AuthUserUseCase(userGateway, hashService, jwtService)
    }

    public async execute({ email, password }: AuthUserInputDto): Promise<AuthUserOutputDto> {
        try {
            const aUser = await this.userGateway.findByEmail(email)
        
            if(!aUser || !aUser.comparePassword(password, this.hashService)) {
                throw new Error('Invalid credentials');
            }
    
            const token = this.jwtService.generateToken({ id: aUser.id, email: aUser.email })
    
            return { token } 
        } catch (error) {
            if (!(error instanceof UserNotFoundException)) { 
                error = new Error("Error on processing AuthUserUseCase.")
            }

            console.error(error)
            throw error
        }
    }
}
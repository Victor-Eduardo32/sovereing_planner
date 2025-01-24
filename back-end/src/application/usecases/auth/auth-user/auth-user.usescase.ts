import { User } from "../../../../domain/entities/user"
import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { HashService } from "../../../../domain/services/hash.service"
import { JwtService } from "../../../../domain/services/jwt.service"
import { UserNotFoundException } from "../../../exceptions/user-not-found.exception"
import { CreateSessionUseCase } from "../../session/create-session.usecase"
import { UseCase } from "../../usecase"

export type AuthUserInputDto = {
    email: string,
    password: string
}

export type AuthUserOutputDto = {
    user: {
        id: string,
        name: string,
        email: string,
        created_at: Date
    },
    token: string
}

export class AuthUserUseCase implements UseCase<AuthUserInputDto, AuthUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
        private readonly sessionService: CreateSessionUseCase
    ){}

    public static create(userGateway: UserGateway, hashService: HashService, jwtService: JwtService, sessionService: CreateSessionUseCase) {
        return new AuthUserUseCase(userGateway, hashService, jwtService, sessionService)
    }

    public async execute({ email, password }: AuthUserInputDto): Promise<AuthUserOutputDto> {
        try {
            const aUser = await this.userGateway.findByEmail(email)
            
            const verifyPassword = await aUser.comparePassword(password, this.hashService);
        
            if(!aUser || !verifyPassword) {
                throw new UserNotFoundException()
            }
    
            const token = this.jwtService.generateToken({ id: aUser.id, email: aUser.email })

            const expirationTime = this.jwtService.getExpirationTime(token)
            
            await this.sessionService.execute({ user_id: aUser.id, token: token, ended_at: expirationTime })

            const output = this.presentOutput(aUser, token)
    
            return output
        } catch (error) {
            if (!(error instanceof UserNotFoundException)) { 
                error = new Error("Error on processing AuthUserUseCase.")
            }

            console.error(error)
            throw error
        }
    }

    private presentOutput(user: User, token: string): AuthUserOutputDto {
        const output =  {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            },
            token: token
        }

        return output
    }
}
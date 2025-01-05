import { Prisma, PrismaClient } from "@prisma/client"
import { UserGateway } from "../../domain/gateway/user.gateway";
import { User } from "../../domain/entities/user";
import { UserNotFoundException } from "../../application/exceptions/user-not-found.exception";
import { UserAlreadyExist } from "../../application/exceptions/user-already-exist.exception";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async save(user: User): Promise<void> {
        try {
            const data = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                created_at: user.created_at
            }
    
            await this.prismaClient.user.create({
                data: data
            })
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
                const userAlreadyExistError = new UserAlreadyExist()
                console.error(userAlreadyExistError)
                throw userAlreadyExistError
            }

            console.error(error);
            throw new Error("Error on user repository prisma.")
        }
    }

    public async findByEmail(email: string): Promise<User> {
        try {
            const userRecord = await this.prismaClient.user.findUnique({
                where: {
                    email: email
                }
            })

            if(!userRecord) {
                throw new UserNotFoundException()
            }
    
            const user = User.with({
                id: userRecord.id,
                name: userRecord.name,
                email: userRecord.email,
                password: userRecord.password,
                created_at: userRecord.created_at
            })
    
            return user
        } catch (error) {
            if (!(error instanceof UserNotFoundException)) { 
                error = new Error("Error on user repository prisma.")
            }

            console.error(error);
            throw error;
        }
    }
}
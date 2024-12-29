import { PrismaClient, User } from "@prisma/client"
import { UserGateway } from "../../domain/gateway/user.gateway";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async save(user: User): Promise<void> {
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
    }
}
import { PrismaClient } from "@prisma/client";
import { SessionGateway } from "../../domain/gateway/session.gateway";
import { Session } from "../../domain/entities/session";

export type CreateSessionReponseDto = null

export class SessionRepositoryPrisma implements SessionGateway {
    private constructor(private readonly prisma: PrismaClient){}

    public static create(prisma: PrismaClient) {
        return new SessionRepositoryPrisma(prisma)
    }

    public async save(session: Session) {
        try {
            const data = {
                user_id: session.user_id,
                token: session.token,
                created_at: session.created_at,
                ended_at: session.ended_at
            }

            await this.prisma.session.create({
                data: data
            })
        } catch (error) {
            console.error(error);
            throw new Error("Error on session repository prisma.")
        }
    }
}
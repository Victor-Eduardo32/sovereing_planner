import { PrismaClient } from "@prisma/client";
import { SessionGateway } from "../../domain/gateway/session.gateway";
import { Session } from "../../domain/entities/session";

export type CreateSessionReponseDto = null

export class SessionRepositoryPrisma implements SessionGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prisma: PrismaClient) {
        return new SessionRepositoryPrisma(prisma)
    }

    public async save(session: Session) {
        try {
            await this.prismaClient.session.create({
                data: this.toPrismaData(session)
            })
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on session repository prisma.")
        }
    }

    public async update(id: number, ended_at: Date): Promise<void> {
        try {
            await this.prismaClient.session.update({
                where: {
                    id: id
                },
                data: {
                    ended_at: ended_at
                }
            })
        } catch (error) {
            console.error("Error in update:", error);
            throw new Error("Error on session repository prisma.")
        }
    }

    public async findSession(user_id: string, token: string): Promise<Session> {
        try {
            const prismaSession = await this.prismaClient.session.findFirst({
                where: {
                    user_id: user_id,
                    token: token
                }
            })

            if(!prismaSession){
                throw new Error("Error on session repository prisma.")
            }

            return this.toDomainEntity(prismaSession)
        } catch (error) {
            console.error("Error in findSession:", error);
            throw new Error("Error on session repository prisma.")
        }
    }

    private toDomainEntity(prismaSession: any): Session {
        return Session.with({
            id: prismaSession.id,
            user_id: prismaSession.user_id,
            token: prismaSession.token,
            created_at: prismaSession.created_at,
            ended_at: prismaSession.ended_at ?? undefined
        })
    }

    private toPrismaData(session: Session) {
        return {
            user_id: session.user_id,
            token: session.token,
            created_at: session.created_at,
            ended_at: session.ended_at
        }
    }
}
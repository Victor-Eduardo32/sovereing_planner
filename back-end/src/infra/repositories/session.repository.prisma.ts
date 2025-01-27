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
            const data = {
                user_id: session.user_id,
                token: session.token,
                created_at: session.created_at,
                ended_at: session.ended_at
            }

            await this.prismaClient.session.create({
                data: data
            })
        } catch (error) {
            console.error(error);
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
            console.error(error);
            throw new Error("Error on session repository prisma.")
        }
    }

    public async findSession(user_id: string, token: string): Promise<Session> {
        try {
            const sessionRecord = await this.prismaClient.session.findFirst({
                where: {
                    user_id: user_id,
                    token: token
                }
            })

            if(!sessionRecord){
                throw new Error("Error on session repository prisma.")
            }

            const session = Session.with({
                id: sessionRecord.id,
                user_id: sessionRecord.user_id,
                token: sessionRecord.token,
                created_at: sessionRecord.created_at,
                ended_at: sessionRecord.ended_at ?? undefined
            })

            return session
        } catch (error) {
            console.error(error);
            throw new Error("Error on session repository prisma.")
        }
    }
}
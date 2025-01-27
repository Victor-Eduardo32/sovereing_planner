import { Session } from "../entities/session";

export interface SessionGateway {
    save(session: Session): Promise<void>
    update(id: number, ended_at: Date): Promise<void>
    findSession(user_id: string, token: string): Promise<Session>
}
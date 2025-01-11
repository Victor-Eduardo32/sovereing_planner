import { Session } from "../entities/session";

export interface SessionGateway {
    save(session: Session): Promise<void>
}
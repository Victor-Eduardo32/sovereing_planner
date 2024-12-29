import { User } from "../entities/user";

export interface UserGateway {
    save(user: User): Promise<void>
}
import { User } from "../entities/user"

export type SessionProps = {
    id?: number,
    user_id: string,
    token: string,
    created_at: Date,
    ended_at?: Date
}

export type SessionWithUserProps = SessionProps & {
    user: User
}
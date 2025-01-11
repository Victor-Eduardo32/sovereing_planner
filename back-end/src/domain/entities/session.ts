import { SessionProps } from "../types/sessionProps";

export class Session {
    private constructor(private props: SessionProps){}

    public static create(user_id: string, token: string, ended_at?: Date) {
        return new Session({
            user_id,
            token,
            created_at: new Date(),
            ended_at
        })
    }

    public get id() {
        return this.props.id
    }

    public get user_id() {
        return this.props.user_id
    }

    public get token() {
        return this.props.token
    }

    public get created_at() {
        return this.props.created_at
    }

    public get ended_at() {
        return this.props.ended_at
    }

}
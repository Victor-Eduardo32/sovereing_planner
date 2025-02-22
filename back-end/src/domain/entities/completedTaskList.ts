import { CompletedTaskListProps } from "../types/completedTaskListProps";

export class CompletedTaskList {
    private constructor(private props: CompletedTaskListProps){}

    public static create(user_id: string, title: string, description: string) {
        return new CompletedTaskList({
            user_id,
            title,
            description,
            ended_at: new Date()
        })
    }

    public static with(props: CompletedTaskListProps) {
        return new CompletedTaskList(props)
    }

    public get id() {
        return this.props.id
    }

    public get user_id() {
        return this.props.user_id
    }

    public get title() {
        return this.props.title
    }

    public get description() {
        return this.props.description
    }

    public get ended_at() {
        return this.props.ended_at
    }
}
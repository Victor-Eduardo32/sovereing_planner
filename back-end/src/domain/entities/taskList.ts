import { TaskListProps } from "../types/taskListProps";

export class TaskList {
    private constructor(private props: TaskListProps){}

    public static create(user_id: string, title: string, description: string, priority_level: number, created_at: Date, updated_at: Date) {
        return new TaskList({
            user_id: user_id,
            title: title,
            description: description,
            priority_level: priority_level,
            created_at: created_at,
            updated_at: updated_at
        })
    }

    public static with(props: TaskListProps) {
        return new TaskList(props)
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

    public get priority_level() {
        return this.props.priority_level
    }

    public get created_at() {
        return this.props.created_at
    }

    public get updated_at() {
        return this.props.updated_at
    }
}
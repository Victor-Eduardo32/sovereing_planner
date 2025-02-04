import { TaskListProps } from "../types/taskListProps";

export class TaskList {
    private constructor(private props: TaskListProps){}

    public static create(title: string, description: string, created_at: Date, updated_at: Date) {
        return new TaskList({
            title: title,
            description: description,
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

    public get title() {
        return this.props.title
    }

    public get description() {
        return this.props.description
    }

    public get created_at() {
        return this.props.created_at
    }

    public get updated_at() {
        return this.props.updated_at
    }
}
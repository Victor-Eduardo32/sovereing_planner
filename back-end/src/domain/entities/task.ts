import { TaskProps } from "../types/taskProps"

export class Task {
    private constructor(private props: TaskProps){}
    
    public static create(user_id: string, task_list_id: number, name: string, state: number, created_at: Date, updated_at: Date) {
        return new Task({
            user_id: user_id,
            task_list_id: task_list_id,
            name: name,
            state: state,
            created_at: created_at,
            updated_at: updated_at
        })
    }

    public static with(props: TaskProps) {
        return new Task(props)
    }

    public get id() {
        return this.props.id
    }

    public get user_id() {
        return this.props.user_id
    }

    public get task_list_id() {
        return this.props.task_list_id
    }

    public get name() {
        return this.props.name
    }

    public get state() {
        return this.props.state
    }

    public get created_at() {
        return this.props.created_at
    }

    public get updated_at() {
        return this.props.updated_at
    }
}
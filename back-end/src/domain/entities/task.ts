import { TaskProps } from "../types/taskProps"

export class Task {
    private constructor(private props: TaskProps){}
    
    public static create(task_list_id: number, name: string, state: number) {
        return new Task({
            task_list_id: task_list_id,
            name: name,
            state: state,
            created_at: new Date(),
            updated_at: new Date()
        })
    }

    public static with(props: TaskProps) {
        return new Task(props)
    }

    public get id() {
        return this.props.id
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
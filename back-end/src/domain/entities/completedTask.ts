import { CompletedTaskProps } from "../types/completedTaskProps";

export class CompletedTask {
    private constructor(private props: CompletedTaskProps){}

    public static create(completed_task_list_id: number, name: string) {
        return new CompletedTask({
            name,
            completed_task_list_id
        })
    }

    public static with(props: CompletedTaskProps) {
        return new CompletedTask(props)
    }

    public get id() {
        return this.props.id
    }

    public get completed_task_list_id() {
        return this.props.completed_task_list_id
    }

    public get name() {
        return this.props.name
    }
}
import { TaskProps } from "./taskProps"

export type TaskListProps = {
    id?: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export type TaskListPropsWithTasks = TaskListProps & {
    tasks: TaskProps[]
}
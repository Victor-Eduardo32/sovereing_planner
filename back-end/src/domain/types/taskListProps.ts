import { TaskProps } from "./taskProps"

export type TaskListProps = {
    id?: number,
    user_id: string,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
}
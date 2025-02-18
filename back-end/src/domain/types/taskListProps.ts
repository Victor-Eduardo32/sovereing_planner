export type TaskListProps = {
    id?: number,
    user_id: string,
    title: string,
    description: string,
    priority_level: number,
    created_at: Date,
    updated_at: Date
}
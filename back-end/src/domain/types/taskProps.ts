export type TaskProps = {
    id?: number,
    user_id: string,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}
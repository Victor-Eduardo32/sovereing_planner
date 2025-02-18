export type TaskProps = {
    id?: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}
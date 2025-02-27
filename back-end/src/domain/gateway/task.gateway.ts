import { Task } from "../entities/task";

export interface TaskGateway {
    findAll(task_list_ids: number[]): Promise<Task[]>
    findTaskIdsByTaskListId(task_list_id: number): Promise<number[]>
    save(task: Task): Promise<Task>
    update(task: Task): Promise<Task>
    delete(id: number): Promise<void>
    updateState(id: number, state: number, updated_at: Date): Promise<Task>
}
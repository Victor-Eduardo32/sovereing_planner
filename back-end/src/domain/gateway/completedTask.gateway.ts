import { CompletedTask } from "../entities/completedTask";

export interface CompletedTaskGateway {
    findAll(completed_task_list_ids: number[]): Promise<CompletedTask[]>
    save(completedTask: CompletedTask): Promise<void>
}
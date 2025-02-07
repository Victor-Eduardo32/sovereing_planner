import { Task } from "../entities/task";

export interface TaskGateway {
    findAll(user_id: string): Promise<Task[]>
    save(task: Task): Promise<Task>
    update(task: Task): Promise<Task>
}
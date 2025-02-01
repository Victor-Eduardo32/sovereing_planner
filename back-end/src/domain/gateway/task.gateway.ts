import { Task } from "../entities/task";

export interface TaskGateway {
    save(task: Task): Promise<Task>
}
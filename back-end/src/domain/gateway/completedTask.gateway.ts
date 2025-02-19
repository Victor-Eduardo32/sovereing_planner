import { CompletedTask } from "../entities/completedTask";

export interface CompletedTaskGateway {
    save(completedTask: CompletedTask): Promise<void>
}
import { CompletedTaskList } from "../entities/completedTaskList";

export interface CompletedTaskListGateway {
    findAll(user_id: string): Promise<CompletedTaskList[]>
    save(completedTaskList: CompletedTaskList): Promise<CompletedTaskList>
}
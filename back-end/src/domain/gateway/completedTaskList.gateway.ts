import { CompletedTaskList } from "../entities/completedTaskList";

export interface CompletedTaskListGateway {
    save(completedTaskList: CompletedTaskList): Promise<CompletedTaskList>
}
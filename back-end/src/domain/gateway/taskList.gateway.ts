import { TaskList } from "../entities/taskList";

export interface TaskListGateway {
    findAll(user_id: string): Promise<TaskList[]>
    save(taskList: TaskList): Promise<TaskList>
    update(taskList: TaskList): Promise<TaskList>
    delete(id: number): Promise<void>
}
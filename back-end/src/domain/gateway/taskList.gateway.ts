import { TaskList } from "../entities/taskList";

export interface TaskListGateway {
    save(taskList: TaskList): Promise<TaskList>
    update(taskList: TaskList): Promise<TaskList>
}
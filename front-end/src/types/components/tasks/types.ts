export type Task = {
  id?: number,
  name_task: string,
  state_task: number
}

export type TaskList = {
  id?: number,
  title_task_list: string,
  description_task_list: string,
  tasks: Task[]
}

export type TaskStateUpdate = {
  id: number,
  actionState: boolean,
  state: number
}

export type TaskCheck = {
  toDo: number[],
  inProgress: number[],
  completed: number[],
}

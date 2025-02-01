export type Task = {
  id?: number,
  name: string,
  state: number
}

export type TaskList = {
  id?: number,
  title: string,
  description: string,
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

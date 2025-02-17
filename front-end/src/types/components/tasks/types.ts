export type Task = {
  id?: number,
  task_list_id?: number,
  name: string,
  state: number,
  created_at?: Date,
  updated_at?: Date
}

export type TaskList = {
  id?: number,
  title: string,
  description: string,
  priority_level: number,
  created_at?: Date,
  updated_at?: Date,
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

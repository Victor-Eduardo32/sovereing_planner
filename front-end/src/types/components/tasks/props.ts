import { CompletedTaskList, TaskList } from './types'

export type TaskFileProps = {
  titles: titlesData[],
  taskLists: TaskList[],
  gridLayout: boolean,
  listLayout: boolean
}

export type CompletedTaskFileProps = {
  completedTaskList: CompletedTaskList
  gridLayout: boolean,
  listLayout: boolean
}

export type titlesData = {
  name: string,
  isOpen: boolean
}

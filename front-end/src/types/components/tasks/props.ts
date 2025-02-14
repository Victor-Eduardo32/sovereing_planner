import { TaskList } from './types'

export type TaskFileProps = {
  titles: titlesData[],
  tasksList: TaskList[],
  gridLayout: boolean,
  listLayout: boolean
}

export type titlesData = {
  name: string,
  isOpen: boolean
}

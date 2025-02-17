import { UseTaskListType } from 'src/types/composables/useTaskList/types';
import { ref } from 'vue';

export function useTaskListComposable(): UseTaskListType {

  const verifyTaskListPriorityText = (taskListPriority: number): string => {
    const text = ref<string>('')

    if(taskListPriority == 1) text.value = 'Low'
    if(taskListPriority == 2) text.value = 'Medium'
    if(taskListPriority == 3) text.value = 'Hight'

    return text.value
  }

  const verifyTaskListPriorityColor = (taskListPriority: number): string => {
    const color = ref<string>('')

    if(taskListPriority == 1) color.value = 'green'
    if(taskListPriority == 2) color.value = 'yellow'
    if(taskListPriority == 3) color.value = 'red'

    return color.value
  }

  return { verifyTaskListPriorityText, verifyTaskListPriorityColor }
}

import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { TaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const taskLists = ref<TaskList[]>()
  const errorMessage = ref<string>('')

  const addTaskList = async (taskList: TaskList) => {
    try {
      const response = await axios.post('/task-list', taskList)
      console.log(response)
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { addTaskList, taskLists, errorMessage }
})

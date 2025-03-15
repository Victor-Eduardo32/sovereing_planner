import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { TaskList, TaskStateUpdate } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {

  const errorMessage = ref<string>('')

  const updateTaskState = async (taskStateUpdate: TaskStateUpdate, taskList: TaskList) => {
    try {
      const response = await axios.put('/update-task-state', taskStateUpdate)
      const index = taskList.tasks.findIndex(list => list.id === response.data.id);
      console.log(index)

      if(index !== -1) {
        taskList.tasks[index] = response.data
      }
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { updateTaskState }
})

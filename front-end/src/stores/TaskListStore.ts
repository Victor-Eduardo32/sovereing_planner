import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { TaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const taskLists = ref<TaskList[]>([])
  const errorMessage = ref<string>('')

  const getAllTaskLists = async () => {
    try {
      const response = await axios.get('/task-list')
      taskLists.value = response.data.taskLists
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addTaskList = async (taskList: TaskList) => {
    try {
      const response = await axios.post('/task-list', taskList)
      taskLists.value.push(response.data)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const updateTaskList = async (taskList: TaskList) => {
    try {
      const response = await axios.put('/task-list', taskList)
      const index = taskLists.value.findIndex(list => list.id === response.data.id);

      if(index !== 1) {
        taskLists.value[index] = response.data
      }

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { getAllTaskLists, addTaskList, updateTaskList, taskLists, errorMessage }
})

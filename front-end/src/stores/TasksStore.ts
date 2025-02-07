import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { TaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const taskLists = ref<TaskList[]>()
  const errorMessage = ref<string>('')

  const getAllTaskLists = async () => {
    try {
      const response = await axios.get('/task-list')
      console.log(response)
      taskLists.value = response.data.taskLists
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addTaskList = async (taskList: TaskList) => {
    try {
      const response = await axios.post('/task-list', taskList)
      console.log(response)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const updateTaskList = async (taskList: TaskList) => {
    try {
      const response = await axios.put('/task-list', taskList)
      console.log(response)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { getAllTaskLists, addTaskList, updateTaskList, taskLists, errorMessage }
})

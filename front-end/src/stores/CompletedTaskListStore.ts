import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { CompletedTaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useCompletedTaskListStore = defineStore('completedTaskLists', () => {
  const errorMessage = ref<string>('')

  const addCompletedTaskList = async (completedTaskList: CompletedTaskList) => {
    try {
      await axios.post('/completed-task-list', completedTaskList)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { addCompletedTaskList }
})

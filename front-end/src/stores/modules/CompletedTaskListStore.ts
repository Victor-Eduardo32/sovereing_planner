import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { CompletedTaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

export const useCompletedTaskListStore = defineStore('completedTaskLists', () => {
  const completedTaskLists = ref<CompletedTaskList[]>([])
  const completedTaskListsFiltred = ref<CompletedTaskList[]>([])
  const errorMessage = ref<string>('')

  const getAllCompletedTaskLists = async () => {
    try {
      const response = await axios.get('/completed-task-list')
      completedTaskLists.value = response.data.completedTaskLists
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addCompletedTaskList = async (completedTaskList: CompletedTaskList) => {
    try {
      await axios.post('/completed-task-list', completedTaskList)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const filterCompletedTaskLists = async (initialDate: Date, finalDate: Date) => {
    const filtred = completedTaskLists.value.filter(completedTaskList =>
      completedTaskList.ended_at! >= initialDate && completedTaskList.ended_at! <= finalDate
    );

   if(filtred.length == 0) {
      errorMessage.value = 'No results found for these dates.'
      return
   }

   errorMessage.value = ''
   completedTaskListsFiltred.value = filtred
  }

  return {
    addCompletedTaskList,
    getAllCompletedTaskLists,
    filterCompletedTaskLists,
    completedTaskLists,
    completedTaskListsFiltred,
    errorMessage
  }
})

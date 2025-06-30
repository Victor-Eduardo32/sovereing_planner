import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { Saving } from 'src/types/components/saving/types';
import { ref } from 'vue';

export const useSavingStore = defineStore('saving', () => {
  const errorMessage = ref<string>('')
  const savings = ref<Saving[]>([])

  const getSavingByBalanceId = async (balance_id: number) => {
    try {
      const response = await axios.get('/saving', {
        params: {
          balance_id: balance_id
        }
      })

      savings.value = response.data.savings
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addSaving = async (saving: Saving) => {
    try {
      const response = await axios.post('/saving', saving)
      savings.value.push(response.data.saving)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const deleteSaving = async (savingId: number) => {
    try {
      await axios.delete('/saving', {
        data: {
          id: savingId
        }
      })

      savings.value = savings.value.filter(saving => saving.id != savingId)

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { savings, getSavingByBalanceId, addSaving, deleteSaving, errorMessage }
})

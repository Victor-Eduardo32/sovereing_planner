import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { Balance } from 'src/types/components/balance/types';
import { ref } from 'vue';

export const useBalanceStore = defineStore('balance', () => {
  const balances = ref<Balance[]>([])
  const errorMessage = ref<string>('')

  const getAllBalances = async () => {
    try {
      const response = await axios.get('/balance');
      balances.value = response.data.balances
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addBalance = async (balance: Balance) => {
      try {
        const response = await axios.post('/balance', balance)
        balances.value.push(response.data)
        errorMessage.value = ''
      } catch (error) {
        errorMessage.value = 'Unexpected Error. Please, try again later.'
      }
  }

  const deleteBalance = async (balanceId: number) => {
    try {
      await axios.delete('/balance', {
        data: {
          id: balanceId
        }
      })

      balances.value = balances.value.filter(balance => balance.id != balanceId)

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { balances, getAllBalances, addBalance, deleteBalance, errorMessage }
})

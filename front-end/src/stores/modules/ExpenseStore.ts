import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { Expense } from 'src/types/components/expense/types';
import { ref } from 'vue';

export const useExpenseStore = defineStore('expense', () => {
  const errorMessage = ref<string>('')
  const expenses = ref<Expense[]>([])

  const getExpenseByBalanceId = async (balance_id: number) => {
    try {
      const response = await axios.get('/expense', {
        params: {
          balance_id: balance_id
        }
      })

      expenses.value = response.data.expenses
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const addExpense = async (expense: Expense) => {
    try {
      const response = await axios.post('/expense', expense)
      expenses.value.push(response.data.expense)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const deleteExpense = async (expenseId: number) => {
    try {
      await axios.delete('/expense', {
        data: {
          id: expenseId
        }
      })

      expenses.value = expenses.value.filter(expense => expense.id != expenseId)

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { expenses, getExpenseByBalanceId, addExpense, deleteExpense, errorMessage }
})

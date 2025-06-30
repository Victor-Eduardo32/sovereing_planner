<script setup lang="ts">
import ExpenseDataTable from 'src/components/dashboard/finance/expense/ExpenseDataTable.vue';
import TitlePage from 'src/components/dashboard/TitlePage.vue';
import FormExpense from 'src/components/dashboard/finance/expense/FormExpense.vue';
import SelectBalance from 'src/components/dashboard/finance/SelectBalance.vue';
import DeletePopup from 'src/components/dashboard/popups/DeletePopup.vue';
import ErrorPopup from 'src/components/dashboard/popups/ErrorPopup.vue';
import { computed, onMounted, onBeforeMount, ref } from 'vue';
import { useBalanceStore } from 'src/stores/modules/BalanceStore';
import { Balance } from 'src/types/components/balance/types';
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { Expense } from 'src/types/components/expense/types';
import { useExpenseStore } from 'src/stores/modules/ExpenseStore';
import { useNotifyComposable } from 'src/composables/useNotify/useNotifyComposable';

const useBalance = useBalanceStore()
const useExpense = useExpenseStore()

const { getCurrencyPrefix, getNumberFormat } = useBalanceComposable()
const { positiveNotify } = useNotifyComposable()

const balance = ref<Balance>({} as Balance)

const balances = computed(() => {
  return useBalance.balances ?? []
})

const expenses = computed(() => {
  return useExpense.expenses ?? []
})

const add = ref<boolean>(false)
const change = ref<boolean>(false)
const search = ref<string>('')
const winWidth = ref<number>(window.innerWidth)
const deleteTitle = ref<string>('')
const deleteMessage = ref<string>('')
const deletedExpense = ref<Expense>()

const errorMessage = computed(() => {
  return useExpense.errorMessage
});

const filterExpenses = computed(() => {
  const searchTerm = search.value.toLowerCase()
  return expenses.value.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm)
  )
})

const selectedBalance = async (id: number) => {
  balance.value = useBalance.balances.find(balance => balance.id === id) || {} as Balance
  await useExpense.getExpenseByBalanceId(balance.value.id!)
}

const createExpense = async (expense: Expense) => {
  expense.balance_id = balance.value.id!

  try {
    await useExpense.addExpense(expense)
  } finally {
    balance.value.amount = Number(balance.value.amount!) - Number(expense.value)
  }
}

const openDeletePopup = (expense: Expense) => {
  deleteTitle.value = 'Do you want to delete the expense?'
  deleteMessage.value = 'All data linked to it will also be deleted.'
  deletedExpense.value = expense
}

const closeDeletePopup = () => {
  cleanDeleteData()
}

const deleteExpense = async () => {
  try {
    await useExpense.deleteExpense(deletedExpense.value!.id!)
  } finally {
    await positiveNotify('The expense deleted successfuly.')
      balance.value.amount = Number(balance.value.amount!) + Number(deletedExpense.value?.value)
    cleanDeleteData()
  }
}

const cleanDeleteData = () => {
  deleteTitle.value = ''
  deleteMessage.value = ''
  deletedExpense.value = undefined
}

const onSearch = (filter: string) => {
  search.value = filter
}

const verifyWindowWidth = async (): Promise<void> => {
  winWidth.value = window.innerWidth
}

onMounted(async () => {
  if(!useBalance.balances.length) {
    await useBalance.getAllBalances()
  }

  balance.value = useBalance.balances[0]
  await useExpense.getExpenseByBalanceId(balance.value.id!)
  window.addEventListener('resize', verifyWindowWidth);
})

onBeforeMount(() => {
  window.removeEventListener('resize', verifyWindowWidth);
})
</script>

<template>
  <div class="flex justify-center" style="height: 100%">
    <q-scroll-area style="height: 100%; width: 100%">
      <div class="flex justify-center" style="height: 100%; width: 100%">
        <div style="height: 100%; width: 80%">
          <title-page
            :title="'Expenses'"
            :breadcrumbs="[
              {
                breadcrumb: 'Expenses',
              },
            ]"
          />
          <div
            class="bar-add flex justify-between items-center bg-white q-px-md q-mb-lg"
          >
            <div class="data flex items-center">
              <h6 class="title-bar q-my-none text-bold">Balance Amount:</h6>
              <span v-if="balance" class="q-ml-sm" style="font-size: 17px; margin-top: 4px;">
                {{ balance.name + ' - ' + getCurrencyPrefix(balance.currency) + getNumberFormat(balance.amount!, balance.currency)}}
              </span>
              <q-icon
                class="q-ml-sm cursor-pointer"
                name="swap_horiz"
                style="font-size: 25px;
                margin-top: 3px;"
                @click="change = true"
              />
            </div>

            <div class="action-btns flex items-center">
              <div class="expense-btns">
                <q-btn
                  class="bg-purple text-white"
                  icon="add"
                  label="Add Expense"
                  no-caps
                  @click="add = true"
                  :disable="!balance"
                />
              </div>
            </div>
          </div>
          <expense-data-table
            @search="onSearch"
            @delete="openDeletePopup"
            :win-width="winWidth"
            :expenses="search.length ? filterExpenses : expenses"
            :currency="balance.currency ? balance.currency : 'BRL'"
          />
          <form-expense
            @create="createExpense"
            @close="add = false"
            :currency="balance.currency ? balance.currency : 'BRL'"
            :visible="add"
          />
          <select-balance
            @selected="selectedBalance"
            @close="change = false"
            :visible="change"
            :balances="balances"
            :selected-balance="balance"
          />
          <delete-popup @delete-confirmation="deleteExpense" @close="closeDeletePopup" :message="deleteMessage" :title="deleteTitle" />
          <error-popup v-if="errorMessage.length > 0" :message="errorMessage" @close="useBalance.errorMessage = ''" />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped>
.bar-add {
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  height: 65px;

  :deep(.q-icon) {
    margin-right: 5px;
  }

  :deep(.q-btn) {
    i {
      margin-right: 1px;
    }
  }

  @media(max-width: 1024px) {
    justify-content: center;
    height: 130px;

    .data {
      justify-content: center;
    }
  }
}
</style>

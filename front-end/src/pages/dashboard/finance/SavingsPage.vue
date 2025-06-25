<script setup lang="ts">
import SavingDataTable from 'src/components/dashboard/finance/saving/SavingDataTable.vue';
import TitlePage from 'src/components/dashboard/TitlePage.vue';
import FormSaving from 'src/components/dashboard/finance/saving/FormSaving.vue';
import SelectBalance from 'src/components/dashboard/finance/SelectBalance.vue';
import { computed, onMounted, onBeforeMount, ref } from 'vue';
import { useBalanceStore } from 'src/stores/modules/BalanceStore';
import { Balance } from 'src/types/components/balance/types';
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { Saving } from 'src/types/components/saving/types';
import { useSavingStore } from 'src/stores/modules/SavingStore';

const useBalance = useBalanceStore()
const useSaving = useSavingStore()

const { getCurrencyPrefix, getNumberFormat } = useBalanceComposable()

const balance = ref<Balance>({} as Balance)

const balances = computed(() => {
  return useBalance.balances ?? []
})

const savings = computed(() => {
  return useSaving.savings ?? []
})

const add = ref<boolean>(false)
const change = ref<boolean>(false)
const search = ref<string>('')
const winWidth = ref<number>(window.innerWidth)

const filterSavings = computed(() => {
  const searchTerm = search.value.toLowerCase()
  return savings.value.filter(saving =>
    saving.description.toLowerCase().includes(searchTerm)
  )
})

const selectedBalance = async (id: number) => {
  balance.value = useBalance.balances.find(balance => balance.id === id) || {} as Balance
  await useSaving.getSavingByBalanceId(balance.value.id!)
}

const createSaving = async (saving: Saving) => {
  saving.balance_id = balance.value.id!

  try {
    await useSaving.addSaving(saving)
  } finally {
    balance.value.amount = Number(balance.value.amount!) + Number(saving.value)
  }
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
  await useSaving.getSavingByBalanceId(balance.value.id!)
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
            :title="'Savings'"
            :breadcrumbs="[
              {
                breadcrumb: 'Savings',
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
              <div class="saving-btns">
                <q-btn
                  class="bg-purple text-white"
                  icon="add"
                  label="Add Saving"
                  no-caps
                  @click="add = true"
                  :disable="!balance"
                />
              </div>
            </div>
          </div>
          <saving-data-table
            @search="onSearch"
            :win-width="winWidth"
            :savings="search.length ? filterSavings : savings"
            :currency="balance.currency ? balance.currency : 'BRL'"
          />
          <form-saving
            @create="createSaving"
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

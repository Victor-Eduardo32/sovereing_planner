<script setup lang="ts">
import BalanceDataTable from 'src/components/dashboard/finance/balance/BalanceDataTable.vue';
import TitlePage from 'src/components/dashboard/TitlePage.vue';
import FormBalance from 'src/components/dashboard/finance/balance/FormBalance.vue';
import DeletePopup from 'src/components/dashboard/popups/DeletePopup.vue';
import ErrorPopup from 'src/components/dashboard/popups/ErrorPopup.vue';
import { computed, onMounted, ref } from 'vue';
import { useBalanceStore } from 'src/stores/modules/BalanceStore';
import { useNotifyComposable } from 'src/composables/useNotify/useNotifyComposable';

const useBalance = useBalanceStore()

const { positiveNotify } = useNotifyComposable()

const balances = computed(() => {
  return useBalance.balances ? useBalance.balances : []
})

const add = ref<boolean>(false)
const deleteTitle = ref<string>('')
const deleteMessage = ref<string>('')
const deletedId = ref<number>()

const errorMessage = computed(() => {
  return useBalance.errorMessage
});

const openDeletePopup = (id: number) => {
    deleteTitle.value = 'Do you want to delete the balance?'
    deleteMessage.value = 'All data linked to it will also be deleted.'
    deletedId.value = id
}

const closeDeletePopup = () => {
  cleanDeleteData()
}

const deleteBalance = async () => {
  try {
    await useBalance.deleteBalance(deletedId.value!)
  } finally {
    await positiveNotify('The balance deleted successfuly.')
    cleanDeleteData()
  }
}

const cleanDeleteData = () => {
  deleteTitle.value = ''
  deleteMessage.value = ''
  deletedId.value = undefined
}

onMounted(async () => {
  await useBalance.getAllBalances()
})
</script>

<template>
  <div class="flex justify-center" style="height: 100%">
    <q-scroll-area style="height: 100%; width: 100%">
      <div class="flex justify-center" style="height: 100%; width: 100%">
        <div style="height: 100%; width: 80%">
          <title-page
            :title="'Balances'"
            :breadcrumbs="[
              {
                breadcrumb: 'Balances',
              },
            ]"
          />
          <div
            class="bar-add flex justify-between items-center bg-white q-px-md q-mb-lg"
            style="height: 65px"
          >
            <h6 class="title-bar q-my-none text-bold">Balance</h6>

            <div class="action-btns flex items-center">
              <div class="saving-btns">
                <q-btn
                  class="bg-purple text-white"
                  icon="add"
                  label="Add Balance"
                  no-caps
                  @click="add = true"
                />
              </div>
            </div>
          </div>
          <balance-data-table :balances="balances" @delete="openDeletePopup" />
          <form-balance :visible="add" @close="add = false" />
          <delete-popup @delete-confirmation="deleteBalance" @close="closeDeletePopup" :message="deleteMessage" :title="deleteTitle" />
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

  :deep(.q-icon) {
    margin-right: 5px;
  }

  :deep(.q-btn) {
    i {
      margin-right: 1px;
    }
  }
}
</style>

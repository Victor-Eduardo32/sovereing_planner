<script lang="ts" setup>
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { BalanceDataTableProps } from 'src/types/components/balance/props';
import { Balance } from 'src/types/components/balance/types';
import { ref, watch } from 'vue';

const props = defineProps<BalanceDataTableProps>()

const { getCurrencyPrefix } = useBalanceComposable()

const emit = defineEmits(['delete'])

const rows = ref<Balance[]>([]);

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'currency',
    label: 'Currency',
    field: 'currency',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center' as const,
    sortable: false,
    style: 'width: 100px;'
  },
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

const deleteBalance = (id: number) => {
  emit('delete', id)
}

watch(() => props.balances, (newBalances) => {
  rows.value = newBalances || []
}, { immediate: true })
</script>

<template>
  <div>
    <q-table
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="id"
      flat
      bordered
      hide-bottom
      class="balance-table"
    >
      <template v-slot:body-cell-amount="props">
        <q-td>
          {{ getCurrencyPrefix(props.row.currency) + props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td align="center" style="width: 100px;">
          <q-btn
            flat
            round
            icon="delete_outline"
            class="cursor-pointer"
            @click="deleteBalance(props.key)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.balance-table {
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;

  :deep(td) {
    border: none;
  }
}

</style>

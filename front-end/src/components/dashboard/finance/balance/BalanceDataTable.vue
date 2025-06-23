<script lang="ts" setup>
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { BalanceDataTableProps } from 'src/types/components/balance/props';
import { Balance } from 'src/types/components/balance/types';
import { ref, watch } from 'vue';

const props = defineProps<BalanceDataTableProps>()

const { getCurrencyPrefix, getNumberFormat } = useBalanceComposable()

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

const isGrid = (): boolean => {
  return props.winWidth <= 1023
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
      :grid="isGrid()"
      v-model:pagination="pagination"
      row-key="id"
      flat
      bordered
      hide-bottom
      class="balance-table"
    >
      <template v-slot:body-cell-amount="props">
        <q-td>
          {{ getCurrencyPrefix(props.row.currency) + getNumberFormat(props.value, props.row.currency) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat
            round
            icon="delete_outline"
            class="cursor-pointer"
            @click="deleteBalance(props.key)"
          />
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="item q-mb-sm" style="width: 100%;">
          <div class="cell">
            <span class="title">Name</span>
            <span class="content">{{ props.row.name }}</span></div>
          <div class="cell" style="margin-top: 8px;">
            <span class="title">Currency</span>
            <span class="content">{{ props.row.currency }}</span></div>
          <div class="cell" style="margin-top: 8px;">
            <span class="title">Amount</span>
            <span class="content">{{ getCurrencyPrefix(props.row.currency) + getNumberFormat(props.row.amount, props.row.currency) }}</span>
          </div>
          <div class="cell" style="margin-top: 8px;">
            <span class="title">Actions</span>
            <q-btn class="delete-btn" icon-right="delete_outline" label="Delete" @click="deleteBalance(props.row.id)" />
          </div>
        </div>
      </template>

    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.balance-table {
  border-radius: 2px;

  :deep(td) {
    border: none;
  }

  :deep(.q-table__grid-content) {
    display: flex;
    flex-direction: column;

    .item {
      vertical-align: top;
      padding: 12px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      background-color: #FFF;
      border-radius: 3px;

      .cell {
        display: flex;
        flex-direction: column;

        .title {
          opacity: 0.54;
          font-weight: 500;
          font-size: 12px;
        }

        .content {
          word-wrap: break-word;
        }

        .delete-btn {
          background: #ee2424;
          width: 100px;
          height: 30px;
          font-size: 12px;
          margin: 5px 0 0;

          i {
            margin-left: 2px;
            padding-bottom: 3px;
            font-size: 20px;
          }
        }
      }
    }

  }

  @media(min-width: 1024px) {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }
}

</style>

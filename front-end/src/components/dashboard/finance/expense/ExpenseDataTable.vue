<script setup lang="ts">
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { ExpenseDataTableProps } from 'src/types/components/expense/props';
import { Expense } from 'src/types/components/expense/types';
import { computed, ref, watch } from 'vue';
import { formatDateUs } from 'src/utils/DateFormat';

const props = defineProps<ExpenseDataTableProps>()

const emit = defineEmits(['search', 'delete']);

const rows = ref<Expense[]>([]);

const { getCurrencyPrefix, getNumberFormat } = useBalanceComposable()

const search = ref<string>('');

const columns = ref([
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
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
  rowsPerPage: 5,
  rowsNumber: rows.value.length,
});

const range = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage + 1;
  const end = Math.min(start + pagination.value.rowsPerPage - 1);
  return `Showing ${start} to ${end} of ${rows.value.length} entries`
})

const visibleRows = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return rows.value.slice(start, end);
});

const searchExpense = () => {
  emit('search', search.value)
}

const deleteExpense = (expense: Expense) => {
  emit('delete', expense)
}

const isGrid = (): boolean => {
  return props.winWidth <= 1023
}

watch(
  () => props.expenses,
  (newExpenses) => {
    rows.value = newExpenses;
    pagination.value.page = 1;
  },
  { immediate: true }
);

watch(
  () => pagination.value.rowsPerPage,
  () => {
    pagination.value.page = 1;
  },
  { immediate: true }
);
</script>

<template>
  <q-table
    :rows="visibleRows"
    :columns="columns"
    :grid="isGrid()"
    row-key="id"
    bordered
    square
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    class="expense-table"
    no-data-label="Nenhum registro encontrado"
  >
    <template v-slot:body-cell-date="props">
      <q-td>
        {{ formatDateUs(props.value) }}
      </q-td>
    </template>
    <template v-slot:body-cell-value="props">
      <q-td style="color: #ee2424;">
        {{ '-' + getCurrencyPrefix(currency) + getNumberFormat(props.value, currency) }}
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td align="center" style="width: 100px;">
        <q-btn
          flat
          round
          icon="delete_outline"
          class="cursor-pointer"
          @click="deleteExpense(props.row)"
        />
      </q-td>
    </template>

    <template v-slot:pagination="scope">
      <div class="tab-bottom flex justify-between" style="width: 100%;">
        <span class="showing-range">{{ range }}</span>
        <q-pagination
          v-model="pagination.page"
          :max="Math.ceil(rows.length / pagination.rowsPerPage)"
          :max-pages="5"
          :boundary-numbers="true"
          direction-links
          @update:model-value="scope.pagination.page = $event"
        />
      </div>
    </template>

    <template v-slot:top-left>
      <q-input
        outlined
        dense
        class="input-filter"
        placeholder="Search here..."
        v-model="search"
        @update:model-value="searchExpense"
      >
        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-right>
      <div class="record-page">
        <span>Per Page: </span>
        <q-select
          class="record-page-select"
          dense
          borderless
          v-model="pagination.rowsPerPage"
          :options="[5, 10, 20]"
          dropdown-icon="keyboard_arrow_down"
        />
      </div>
    </template>

    <template v-slot:item="props">
      <div class="item q-mb-sm" style="width: 100%;">
        <div class="cell">
          <span class="title">Description</span>
          <span class="content">{{ props.row.description }}</span></div>
        <div class="cell" style="margin-top: 8px;">
          <span class="title">Date</span>
          <span class="content">{{ formatDateUs(props.row.date) }}</span></div>
        <div class="cell" style="margin-top: 8px;">
          <span class="title">Value</span>
          <span class="content" style="color: #ee2424;">{{ '-' + getCurrencyPrefix(currency) + getNumberFormat(props.row.value, currency)  }}</span>
        </div>
        <div class="cell" style="margin-top: 8px;">
          <span class="title">Actions</span>
          <q-btn class="delete-btn" icon-right="delete_outline" label="Delete" @click="deleteExpense(props.row)" />
        </div>
      </div>
    </template>
  </q-table>
</template>

<style lang="scss" scoped>
.expense-table {
  border-radius: 3px;

  :deep(.q-table__top) {
    @media(max-width: 1024px) {
      justify-content: center;
      flex-direction: column;
    }
  }

  :deep(.q-table__bottom .q-table__control) {
    width: 100%;
  }

  .record-page {
    display: flex;
    align-items: center;

    .record-page-select {
      margin-left: 10px;

      :deep(.q-field__native) {
        color: #64748B;

        span {
          padding-top: 2px;
        }
      }

      :deep(.q-field__marginal) {
        padding-left: 2px;

        i {
          color: #64748B;
        }
      }
    }
  }

  .colunm-th {
    :deep(.q-table__sort-icon) {
      display: none;
    }
  }

  .input-filter {
    height: 50px;
    width: 250px;

    :deep(.q-field__control::before) {
      border-color: #e2e8f0;
    }

    :deep(.q-field__control) {
      padding: 0;
      padding-left: 12px;
    }

    :deep(.q-field__append) {
      width: 50px;

      .search {
        background-color: $primary;
        color: white;
        height: 100%;
        width: 100%;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }


    @media(max-width: 1024px) {
      width: 225px;
    }
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
          color: #FFF;
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

  .tab-bottom {
    @media(max-width: 1024px) {
      justify-content: center;
    }
  }

  .showing-range {
    color: #64748B;
    font-size: 14px;
  }

  @media(min-width: 1024px) {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }
}
</style>

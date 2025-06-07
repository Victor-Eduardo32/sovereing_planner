<script setup lang="ts">
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { SavingDataTableProps } from 'src/types/components/saving/props';
import { Saving } from 'src/types/components/saving/types';
import { computed, ref, watch } from 'vue';
import { formatDateUs } from 'src/utils/DateFormat';

const props = defineProps<SavingDataTableProps>()

const emit = defineEmits(['search']);

const rows = ref<Saving[]>([]);

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

const searchSaving = () => {
  emit('search', search.value)
}

watch(
  () => props.savings,
  (newSavings) => {
    rows.value = newSavings;
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
    row-key="id"
    bordered
    square
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    class="saving-table"
    no-data-label="Nenhum registro encontrado"
  >
    <template v-slot:body-cell-date="props">
      <q-td>
        {{ formatDateUs(props.value) }}
      </q-td>
    </template>
    <template v-slot:body-cell-value="props">
      <q-td style="color: #10B981;">
        {{ getCurrencyPrefix(currency) + getNumberFormat(props.value, currency) }}
      </q-td>
    </template>

    <template v-slot:pagination="scope">
      <div class="flex justify-between" style="width: 100%;">
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
        @update:model-value="searchSaving"
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
  </q-table>
</template>

<style lang="scss" scoped>
.saving-table {
  box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  border-radius: 3px;

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
  }

  .showing-range {
    color: #64748B;
    font-size: 14px;
  }
}
</style>

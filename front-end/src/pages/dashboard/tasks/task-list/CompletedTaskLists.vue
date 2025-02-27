<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import CompletedTaskListFile from 'src/components/dashboard/tasks/task-list/CompletedTaskListFile.vue';
import { useCompletedTaskListStore } from 'src/stores/CompletedTaskListStore';
import FormFilterCompletedTaskList from 'src/components/dashboard/tasks/task-list/FormFilterCompletedTaskList.vue';
import { FilterDates } from 'src/types/components/filter/types';
import ErrorPopup from 'src/components/dashboard/ErrorPopup.vue';

const useCompletedTaskList = useCompletedTaskListStore()

const gridLayout = ref<boolean>(true);
const listLayout = ref<boolean>(false);
const filter = ref<boolean>(false);
const winWidth = ref<number>(window.innerWidth);
const completedTaskLists = computed(() => {
  return useCompletedTaskList.completedTaskListsFiltred.length > 0 ? useCompletedTaskList.completedTaskListsFiltred : useCompletedTaskList.completedTaskLists
});

const errorMessage = computed(() => {
  return useCompletedTaskList.errorMessage
});

const verifyWindowWidth = async (): Promise<void> => {
  winWidth.value = window.innerWidth;

  if (winWidth.value <= 1023) {
    gridLayout.value = false;
    listLayout.value = true;
  }
};

const filterCompletedTaskList = async (dates: FilterDates): Promise<void> => {
  await useCompletedTaskList.filterCompletedTaskLists(dates.initialDate, dates.finalDate)
}

onMounted(async () => {
  await verifyWindowWidth();
  await useCompletedTaskList.getAllCompletedTaskLists();
  window.addEventListener('resize', verifyWindowWidth);
})

</script>

<template>
  <div class="flex justify-center" style="height: 100%">
    <q-scroll-area style="height: 100%; width: 100%">
      <div class="flex justify-center" style="height: 100%; width: 100%">
        <div class="body-list column items-center">
          <div style="width: 100%">
            <div
              class="flex justify-between items-center q-mb-sm"
            >
              <h6 class="fw-bold q-my-none" style="font-size: 24px">
                Completed Task List
              </h6>
              <q-breadcrumbs class="breadcrumbs flex items-center" style="height: 100%">
                <q-breadcrumbs-el label="Dashboard" />
                <q-breadcrumbs-el
                  class="cursor-pointer"
                  @click="$router.push('/dashboard/tasks/list')"
                  label="Tasks List"
                />
                <q-breadcrumbs-el label="Completed Tasks List" />
              </q-breadcrumbs>
            </div>
            <div
              class="bar-add flex justify-between items-center bg-white q-px-md"
              style="height: 65px"
            >
              <h5 class="title-bar q-my-none text-bold">Tasks</h5>
              <div class="action-btns flex items-center">
                <div class="layout-btns q-mr-md"  v-if="winWidth >= 1024">
                  <q-btn
                    class="view-btn q-mr-xs"
                    padding="xs"
                    color="primary"
                    icon="list"
                    :disable="listLayout"
                    @click="(listLayout = true), (gridLayout = false)"
                  />
                  <q-btn
                    class="view-btn q-ml-xs"
                    padding="xs"
                    color="primary"
                    icon="grid_view"
                    :disable="gridLayout"
                    @click="(gridLayout = true), (listLayout = false)"
                  />
                </div>
                <div class="completed-tasks-btns">
                  <q-btn
                    class="bg-purple text-white"
                    icon="filter_alt"
                    no-caps
                    label="Filter"
                    @click="filter = true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            :class="{ 'list': listLayout, 'grid': gridLayout }"
            style="width: 100%"
          >
            <template v-for="(completedTaskList, index) in completedTaskLists" :key="index">
              <completed-task-list-file
                :completed-task-list="completedTaskList"
                :grid-layout="gridLayout"
                :list-layout="listLayout"
              />
            </template>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <form-filter-completed-task-list
      v-if="filter"
      @close="filter = false"
      @filter="filterCompletedTaskList"
    />

    <error-popup v-if="errorMessage.length > 0" :message="errorMessage" @close="useCompletedTaskList.errorMessage = ''" />
  </div>
</template>

<style lang="scss" scoped>
.body-list {
  width: 75%;

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

  .list {
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 1023px) {
    width: 88% !important;

    .breadcrumbs {
        margin: 10px 0 5px 0;
    }

    .bar-add {
      height: auto !important;
      padding: 16px 16px;
      flex-direction: column;

      .title-bar {
        margin-bottom: 8px;
      }

      .action-btns {
        width: 100%;

        .completed-tasks-btns {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 5px;

          button {
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>

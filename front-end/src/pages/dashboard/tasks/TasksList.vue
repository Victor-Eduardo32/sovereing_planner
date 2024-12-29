<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import TaskFile from 'src/components/dashboard/tasks/TaskFile.vue';
import FormTask from 'src/components/dashboard/tasks/FormTask.vue';
import { useTasksStore } from 'src/stores/TasksStore';
import { TaskList } from 'src/types/components/tasks/types';

const useTasks = computed(() => {
  return useTasksStore();
});

const titles = ref<string[]>(['To Do', 'In Progress', 'Completed']);
const add_task = ref<boolean>(false);
const edit_task = ref<boolean>(false);
const edit_taskList = ref<TaskList>({id: undefined, title_task_list: '', description_task_list: '', tasks:[]});
const grid_layout = ref<boolean>(true);
const list_layout = ref<boolean>(false);
const win_width = ref<number>(window.innerWidth);

onMounted(async () => {
  await useTasks.value.setAllTasksList();
  await verifyWindowWidth();
  window.addEventListener('resize', verifyWindowWidth);
});

onBeforeMount(() => {
  window.removeEventListener('resize', verifyWindowWidth);
});

const verifyWindowWidth = async (): Promise<void> => {
  win_width.value = window.innerWidth;

  if (win_width.value <= 1023) {
    grid_layout.value = false;
    list_layout.value = true;
  }
};

const findTaskList = (id: number): void => {
  const foundTaskList = useTasks.value.getAllTasksList.find((taskList) => taskList.id == id);
  if (foundTaskList) {
    edit_taskList.value = foundTaskList;
    edit_task.value = true;
  } else {
    // Lidar com o caso em que o taskList não foi encontrado
    console.error(`TaskList com id ${id} não encontrado.`);
  }
}
</script>

<template>
  <div class="flex justify-center" style="height: 100%">
    <q-scroll-area style="height: 100%; width: 100%">
      <div class="flex justify-center" style="height: 100%; width: 100%">
        <div class="body-list column items-center" style="width: 75%">
          <div style="width: 100%">
            <div
              class="flex justify-between items-center q-mb-sm"
              style="height: 50px"
            >
              <h6 class="fw-bold q-my-none" style="font-size: 24px">
                Task List
              </h6>
              <q-breadcrumbs class="flex items-center" style="height: 100%">
                <q-breadcrumbs-el label="Dashboard" />
                <q-breadcrumbs-el label="Tasks List" />
              </q-breadcrumbs>
            </div>
            <div
              class="bar-add flex justify-between items-center bg-white q-px-md"
              style="height: 65px"
            >
              <h5 class="title-bar q-my-none text-bold">Tasks</h5>
              <div class="action-btns flex items-center">
                <div class="layout-btns q-mr-md" v-if="win_width >= 1024">
                  <q-btn
                    class="view-btn q-mr-xs"
                    padding="xs"
                    color="primary"
                    icon="list"
                    @click="(list_layout = true), (grid_layout = false)"
                  />
                  <q-btn
                    class="view-btn q-ml-xs"
                    padding="xs"
                    color="primary"
                    icon="grid_view"
                    @click="(grid_layout = true), (list_layout = false)"
                  />
                </div>
                <div class="tasks-btns">
                  <q-btn
                    class="bg-purple text-white q-mr-sm"
                    icon="archive"
                    label="Completed Tasks"
                    no-caps
                  />
                  <q-btn
                    class="bg-purple text-white"
                    icon="add"
                    label="Add Task"
                    no-caps
                    @click="(add_task = true), (edit_taskList = {id: undefined, title_task_list: '', description_task_list: '', tasks:[]})"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            :class="{ column: list_layout, flex: grid_layout }"
            class="flex justify-between"
            style="width: 100%"
          >
            <task-file
              :titles="titles"
              :tasks-list="useTasks.getAllTasksList"
              @edit-task="findTaskList"
              :grid-layout="grid_layout"
              :list-layout="list_layout"
            />
          </div>
        </div>
      </div>
    </q-scroll-area>
    <form-task
      v-if="add_task || (edit_task && edit_taskList !== undefined)"
      @close="(add_task = false), (edit_task = false)"
      :edit-task="edit_taskList"
    />
  </div>
</template>

<style lang="scss" scoped>
.body-list {
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

  @media (max-width: 1023px) {
    width: 88% !important;
    .bar-add {
      height: auto !important;
      padding: 16px 16px;
      flex-direction: column;

      .title-bar {
        margin-bottom: 8px;
      }

      .action-btns {
        width: 100%;

        .tasks-btns {
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

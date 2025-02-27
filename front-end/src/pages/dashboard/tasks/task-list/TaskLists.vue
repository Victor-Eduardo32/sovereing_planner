<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import TaskListFile from 'src/components/dashboard/tasks/task-list/TaskListFile.vue';
import FormTaskList from 'src/components/dashboard/tasks/task-list/FormTaskList.vue';
import { TaskList } from 'src/types/components/tasks/types';
import { useTaskListStore } from 'src/stores/TaskListStore';

const useTaskList = useTaskListStore();

const titles = ref([
  { name: 'To Do', isOpen: true },
  { name: 'In Progress', isOpen: true },
  { name: 'Completed', isOpen: true }
]);

const addTask = ref<boolean>(false);
const editTask = ref<boolean>(false);
const editTaskList = ref<TaskList>({id: undefined, title: '', description: '', priority_level: 1, tasks:[]});
const gridLayout = ref<boolean>(true);
const listLayout = ref<boolean>(false);
const winWidth = ref<number>(window.innerWidth);
const taskLists = computed(() => {
  return useTaskList.taskLists ? useTaskList.taskLists : []
});

onMounted(async () => {
  await verifyWindowWidth();
  await useTaskList.getAllTaskLists();
  window.addEventListener('resize', verifyWindowWidth);
});

onBeforeMount(() => {
  window.removeEventListener('resize', verifyWindowWidth);
});

const verifyWindowWidth = async (): Promise<void> => {
  winWidth.value = window.innerWidth;

  if (winWidth.value <= 1023) {
    gridLayout.value = false;
    listLayout.value = true;
  }
};

const findTaskList = (id: number): void => {
  const foundTaskList = taskLists.value.find((taskList) => taskList.id == id);

  if (!foundTaskList) {
    console.error(`TaskList com id ${id} não encontrado.`);
    return
  }

  editTaskList.value = foundTaskList;
  editTask.value = true;
}

const toggleTaskFileVisibility = (name: string) => {
  const foundTitle = titles.value.find((taskList) => taskList.name == name);

  if(foundTitle) foundTitle.isOpen = !foundTitle.isOpen;
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
                <q-breadcrumbs-el label="Task List" />
              </q-breadcrumbs>
            </div>
            <div
              class="bar-add flex justify-between items-center bg-white q-px-md"
              style="height: 65px"
            >
              <h5 class="title-bar q-my-none text-bold">Tasks</h5>
              <div class="action-btns flex items-center">
                <div class="layout-btns q-mr-md" v-if="winWidth >= 1024">
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
                <div class="tasks-btns">
                  <q-btn
                    class="bg-purple text-white q-mr-sm"
                    icon="archive"
                    label="Completed Task Lists"
                    no-caps
                    @click="$router.push('/dashboard/tasks/list/completed')"
                  />
                  <q-btn
                    class="bg-purple text-white"
                    icon="add"
                    label="Add Task List"
                    no-caps
                    @click="(addTask = true), (editTaskList = {id: undefined, title: '', description: '', priority_level: 1, tasks:[]})"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            :class="{ column: listLayout, flex: gridLayout }"
            class="flex justify-between q-mt-lg "
            style="width: 100%"
          >
            <task-list-file
              :titles="titles"
              :task-lists="taskLists"
              :grid-layout="gridLayout"
              :list-layout="listLayout"
              @edit-task="findTaskList"
              @toggle-task-file="toggleTaskFileVisibility"
            />
          </div>
        </div>
      </div>
    </q-scroll-area>
    <form-task-list
      v-if="addTask || (editTask && editTaskList !== undefined)"
      @close="(addTask = false), (editTask = false)"
      :edit-task="editTaskList"
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

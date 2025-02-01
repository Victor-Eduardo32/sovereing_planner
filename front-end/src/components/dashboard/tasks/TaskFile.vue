<script lang="ts" setup>
// import { useTasksStore } from 'src/stores/TasksStore';
import { TaskFileProps } from 'src/types/components/tasks/props';
import { TaskCheck, TaskList} from 'src/types/components/tasks/types';
import { ref, watch } from 'vue';

const props = defineProps<TaskFileProps>();
// const useTasks = computed(() => {
//   return useTasksStore();
// });

const checkboxStates = ref<TaskCheck>({
  toDo: [],
  inProgress: [],
  completed: [],
});
const checkedTasks = ref<TaskCheck>({
  toDo: [],
  inProgress: [],
  completed: [],
});
const checkTrue = ref<number>(0);
const checkFalse = ref<number>(0);

const emit = defineEmits(['edit-task']);

const verifyTasks = (tasks: TaskList, stateTask: number): boolean => {
  return tasks.tasks.some((task) => task.state >= stateTask);
};

// Armazena os ids que são necessário estar marcados caso estejam em um state acima do qual está sendo exibido
const checkTask = async (tasksList: TaskList[]): Promise<void> => {
  tasksList.forEach((tasks) => {
    tasks.tasks.forEach((task) => {
      if (task.id != null) {
        if (task.state >= 2) {
          checkboxStates.value.toDo.push(task.id);
          checkedTasks.value.toDo = checkboxStates.value.toDo;
        }

        if (task.state >= 3) {
          checkboxStates.value.inProgress.push(task.id);
          checkedTasks.value.inProgress = checkboxStates.value.inProgress;
        }

        if (task.state >= 4) {
          checkboxStates.value.completed.push(task.id);
          checkedTasks.value.completed = checkboxStates.value.completed;
        }
      }
    });
  });
};

// Ao ser chamado, compara as variárais checkboxStates e checkedTasks para saber se houve alguma diferença entre elas, caso sim, atualiza a task no qual foi marcada/desmarcada
const updateTaskState = (
  state: 'toDo' | 'inProgress' | 'completed',
  nextState: 'inProgress' | 'completed' | null
): void => {
  checkTrue.value = checkboxStates.value[state].filter(
    (id) => !checkedTasks.value[state].includes(id)
  )[0];
  if (checkTrue.value == undefined) {
    checkFalse.value = checkedTasks.value[state].filter(
      (id) => !checkboxStates.value[state].includes(id)
    )[0];
    checkboxStates.value.inProgress = checkboxStates.value.inProgress.filter(
      (id) => id !== checkFalse.value
    );

    if (nextState) {
      checkboxStates.value[nextState] = checkboxStates.value[nextState].filter(
        (id) => id !== checkFalse.value
      );
      checkedTasks.value[nextState] = checkboxStates.value[nextState];
    }

    if (state === 'inProgress' || state === 'toDo') {
      checkboxStates.value.completed = checkboxStates.value.completed.filter(
        (id) => id !== checkFalse.value
      );
      checkedTasks.value.completed = checkboxStates.value.completed;
    }
  }

  // const data: TaskStateUpdate = {
  //   id: checkTrue.value != undefined ? checkTrue.value : checkFalse.value,
  //   actionState: checkTrue.value != undefined ? true : false,
  //   state: state === 'toDo' ? 1 : state === 'inProgress' ? 2 : 3
  // };

  // useTasks.value.updateTaskState(data);

  checkedTasks.value[state] = checkboxStates.value[state];
};

watch(
  () => props.tasksList,
  (newTasksList) => {
    checkTask(newTasksList);
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="task-file"
    :class="{ 'grid-layout': gridLayout, 'list-layout': listLayout }"
    v-for="(title, index) in titles"
    :key="index"
  >
    <h6 class="q-mt-lg q-mb-sm" style="font-size: 19px">{{ title }}</h6>
    <template v-for="(task_list, index) in tasksList" :key="index">
      <div
        class="options-task bg-white q-pa-md q-mt-sm"
        v-if="
          (title == 'To Do' && verifyTasks(task_list, 1)) ||
          (title == 'In Progress' && verifyTasks(task_list, 2)) ||
          (title == 'Completed' && verifyTasks(task_list, 3))
        "
      >
        <div class="flex justify-between items-center">
          <span class="text-weight-medium">{{ task_list.title }}</span>
          <q-btn
            class="btn-actions"
            flat
            icon="more_horiz"
            text-color="black"
            style="color: #637381"
          >
            <q-menu
              class="no-shadow"
              auto-close
              :offset="[70, 0]"
              style="border: 1px solid #e2e8f0"
            >
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="emit('edit-task', task_list.id)">
                  <q-item-section side>
                    <q-icon name="edit_note" />
                  </q-item-section>

                  <q-item-section>Edit</q-item-section>
                </q-item>
                <!-- <q-item
                  clickable
                  v-close-popup
                  @click.stop="useTasks.destroyTaskList(task_list.id!)"
                >
                  <q-item-section side>
                    <q-icon name="delete" />
                  </q-item-section>

                  <q-item-section>Delete</q-item-section>
                </q-item> -->
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <p
          class="q-my-sm text-wrap"
          style="word-wrap: break-word; color: #637381"
        >
          {{ task_list.description }}
        </p>
        <div
          class="check-group"
          v-for="(task, index) in task_list.tasks"
          :key="index"
        >
          <template v-if="title == 'To Do' && task.state <= 4">
            <q-checkbox
              v-model="checkboxStates.toDo"
              :val="task.id"
              :label="task.name"
              color="primary"
              :class="{
                'text-strike': checkboxStates.toDo.some(
                  (check) => check == task.id
                ),
              }"
              @click="updateTaskState('toDo', 'inProgress');"
            />
          </template>
          <template v-if="title == 'In Progress' && task.state >= 2">
            <q-checkbox
              v-model="checkboxStates.inProgress"
              :val="task.id"
              :label="task.name"
              color="primary"
              :class="{
                'text-strike': checkboxStates.inProgress.some(
                  (check) => check == task.id
                ),
              }"
              @click="updateTaskState('inProgress', 'completed')"
            />
          </template>
          <template v-if="title == 'Completed' && task.state >= 3">
            <q-checkbox
              v-model="checkboxStates.completed"
              :val="task.id"
              :label="task.name"
              color="primary"
              :class="{
                'text-strike': checkboxStates.completed.some(
                  (check) => check == task.id
                ),
              }"
              @click="updateTaskState('completed', null)"
            />
          </template>
        </div>
        <div class="flex justify-end">
          <q-btn
            v-if="title == 'Completed'"
            class="bg-purple text-white"
            icon="check"
            label="Finish Task List"
            no-caps
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.grid-layout {
  width: 32%;
}

.list-layout {
  width: 100%;
}

.task-file {
  .options-task {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }

  .check-group {
    margin-left: -8px;
    word-break: break-all;
  }

  :deep(.btn-actions .q-focus-helper) {
    display: none;
  }

  :deep(.btn-actions .q-btn--active) {
    display: none;
  }
}
</style>

<script lang="ts" setup>
import { useTaskListComposable } from 'src/composables/useTaskList/useTaskListComposable';
import { useCompletedTaskListStore } from 'src/stores/modules/CompletedTaskListStore';
import { useTaskListStore } from 'src/stores/modules/TaskListStore';
import { useTaskStore } from 'src/stores/modules/TaskStore';
import { TaskFileProps } from 'src/types/components/tasks/props';
import { CompletedTask, CompletedTaskList, TaskCheck, TaskList, TaskStateUpdate } from 'src/types/components/tasks/types';
import { ref, watch } from 'vue';

const props = defineProps<TaskFileProps>();
const useTasks = useTaskStore()
const useTaskLists = useTaskListStore()
const useCompletedTaskLists = useCompletedTaskListStore()

const { verifyTaskListPriorityText, verifyTaskListPriorityColor } = useTaskListComposable()

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

const emit = defineEmits(['edit-task', 'toggle-task-file']);

const verifyTasks = (taskList: TaskList, stateTask: number): boolean => {
  return taskList && taskList.tasks ? taskList.tasks.some((task) => task.state >= stateTask) : false;
};

const verifyCompletedTaskList = (taskList: TaskList): boolean => {
  return !taskList.tasks.every(task => task.state == 4)
}

const verifyTaskListPriorityOrder = (taskLists: TaskList[]): TaskList[] => {
  return taskLists.sort((taskListA, taskListB) => taskListB.priority_level - taskListA.priority_level)
}

// Armazena os ids que são necessário estar marcados caso estejam em um state acima do qual está sendo exibido
const checkTask = async (taskLists: TaskList[]): Promise<void> => {
  taskLists.forEach((taskList) => {
    taskList.tasks.forEach((task) => {
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
  nextState: 'inProgress' | 'completed' | null,
  taskList: TaskList
): void => {
  checkTrue.value = checkboxStates.value[state].filter((id) => !checkedTasks.value[state].includes(id))[0];

  if (checkTrue.value == undefined) {
    checkFalse.value = checkedTasks.value[state].filter((id) => !checkboxStates.value[state].includes(id))[0];

    checkboxStates.value.inProgress = checkboxStates.value.inProgress.filter((id) => id !== checkFalse.value);

    if (nextState) {
      checkboxStates.value[nextState] = checkboxStates.value[nextState].filter((id) => id !== checkFalse.value);
      checkedTasks.value[nextState] = checkboxStates.value[nextState];
    }

    if (state === 'inProgress' || state === 'toDo') {
      checkboxStates.value.completed = checkboxStates.value.completed.filter((id) => id !== checkFalse.value);
      checkedTasks.value.completed = checkboxStates.value.completed;
    }
  }

  const data: TaskStateUpdate = {
    id: checkTrue.value ?? checkFalse.value,
    actionState: checkTrue.value != undefined,
    state: state === 'toDo' ? 1 : state === 'inProgress' ? 2 : 3
  };

  useTasks.updateTaskState(data, taskList);

  checkedTasks.value[state] = checkboxStates.value[state];
};

const completeTaskList = (taskList: TaskList) => {
  const completedTasks: CompletedTask[] = taskList.tasks.map(task => {
    return {
      name: task.name
    }
  })

  const completedTaskList: CompletedTaskList = {
    title: taskList.title,
    description: taskList.description,
    completed_tasks: completedTasks
  }

  useCompletedTaskLists.addCompletedTaskList(completedTaskList)
  useTaskLists.deleteTaskList(taskList.id!)
}

watch(
  () => props.taskLists,
  (newTaskLists) => {
    checkTask(newTaskLists);
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
    <div class="title-container flex items-center q-mb-sm bg-white rounded">
      <h6 class="title q-mt-none q-mb-none q-pl-sm" style="font-size: 19px;">{{ title.name }}</h6>
      <q-icon
        :class="{ 'rotate-arrow-icon': title.isOpen }"
        class=" open-task-list-btn cursor-pointer"
        style="font-size: 25px;"
        name="keyboard_arrow_right"
        @click="$emit('toggle-task-file', title.name)"
      />
    </div>

    <template v-for="(taskList, index) in taskLists" :key="index">
      <div
        class="options-task bg-white q-pa-md q-mt-sm q-mb-sm"
        v-if="
          ((title.name == 'To Do' && (verifyTasks(taskList, 1))) ||
          (title.name == 'In Progress' && verifyTasks(taskList, 2)) ||
          (title.name == 'Completed' && verifyTasks(taskList, 3))) && title.isOpen
          && verifyTaskListPriorityOrder(taskLists)
        "
      >
        <div class="flex justify-between items-center">
          <span  style="width: 80%; word-break: break-word;" class="text-weight-medium">{{ taskList.title }}</span>

          <q-btn
            class="btn-actions"
            flat
            icon="more_horiz"
            text-color="black"
            style="color: #637381; width: 5%;"
          >
            <q-menu
              class="no-shadow"
              auto-close
              :offset="[70, 0]"
              style="border: 1px solid #e2e8f0"
            >
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="emit('edit-task', taskList.id)">
                  <q-item-section side>
                    <q-icon name="edit_note" />
                  </q-item-section>

                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click.stop="useTaskLists.deleteTaskList(taskList.id!)"
                >
                  <q-item-section side>
                    <q-icon name="delete" />
                  </q-item-section>

                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div
          class="flex items-center q-my-sm text-wrap no-wrap"
          style="width: 100%;"
        >
          <q-icon
            class="q-mr-sm"
            :color="verifyTaskListPriorityColor(taskList.priority_level)"
            name="circle"
            style="font-size: 15px;"
          />
          <span style="width: 95%;">{{ verifyTaskListPriorityText(taskList.priority_level) }}</span>
      </div>
        <p
          class="q-my-sm text-wrap"
          style="word-break: break-word; color: #637381"
        >
          {{ taskList.description }}
        </p>
        <div
          class="check-group"
          v-for="(task, index) in taskList.tasks"
          :key="index"
        >
          <template v-if="title.name == 'To Do' && task.state <= 4">
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
              @click="updateTaskState('toDo', 'inProgress', taskList);"
            />
          </template>
          <template v-if="title.name == 'In Progress' && task.state >= 2">
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
              @click="updateTaskState('inProgress', 'completed', taskList)"
            />
          </template>
          <template v-if="title.name == 'Completed' && task.state >= 3">
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
              @click="updateTaskState('completed', null, taskList)"
            />
          </template>
        </div>
        <div class="flex justify-end">
          <q-btn
            v-if="title.name == 'Completed'"
            class="bg-purple text-white q-mt-sm"
            icon="check"
            label="Finish Task List"
            :disable="verifyCompletedTaskList(taskList)"
            @click="completeTaskList(taskList)"
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

  .title {
    width: 92%;
  }

  .open-task-list-btn {
    width: 8%;
  }
}

.list-layout {
  width: 100%;

  .title {
    width: 96%;
  }

  .open-task-list-btn {
    width: 4%;
  }

  @media (max-width: 1024px) {
    .title {
      width: 92%;
    }

    .open-task-list-btn {
      width: 8%;
    }
  }
}

.task-file {
  .title-container {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }

  .rotate-arrow-icon {
    transform: rotate(90deg);
  }

  .options-task {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }

  .check-group {
    margin-left: -8px;
    word-break: break-word;
  }

  :deep(.btn-actions .q-focus-helper) {
    display: none;
  }

  :deep(.btn-actions .q-btn--active) {
    display: none;
  }
}
</style>

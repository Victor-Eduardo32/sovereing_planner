<script lang="ts" setup>
import { useTaskListComposable } from 'src/composables/useTaskList/useTaskListComposable';
import { useTaskListStore } from 'src/stores/modules/TaskListStore';
import { Task, TaskList } from 'src/types/components/tasks/types';
import { ref } from 'vue';

const props = defineProps<{
  editTask: TaskList;
}>();

const { verifyTaskListPriorityColor } = useTaskListComposable()

const model = ref(null);

const editTask = ref<TaskList>(props.editTask);

const emit = defineEmits(['close']);

const useTaskLists = useTaskListStore();

const taskListTitle = ref<string>(
  editTask.value ? editTask.value.title : ''
);
const taskListDescription = ref<string>(
  editTask.value ? editTask.value.description : ''
);

const taskListPriority = ref<number>(
  editTask.value ? editTask.value.priority_level : 1
)

const tasks = ref<Task[]>(editTask.value ? JSON.parse(JSON.stringify(editTask.value.tasks)) : []);
const newTask = ref<string>('');

const verifyFormData = (taskListTitle: string, taskListDescription: string, tasks: Task[]): boolean => {
  return !(taskListTitle.length > 0 && taskListDescription.length > 0 && tasks.length > 0)
}

const addTask = async (): Promise<void> => {
  if(newTask.value.length == 0) {
    return
  }

  tasks.value.push({ name: newTask.value, state: 1 });
  newTask.value = '';
};

const removeTask = async (index: number): Promise<void> => {
  tasks.value.splice(index, 1);
};

const createTaskList = async (): Promise<void> => {
  await useTaskLists.addTaskList({
    title: taskListTitle.value,
    description: taskListDescription.value,
    priority_level: taskListPriority.value,
    tasks: tasks.value,
  });
  emit('close');
};

const updateTaskList = async (): Promise<void> => {
  await useTaskLists.updateTaskList({
    id: editTask.value.id,
    title: taskListTitle.value,
    description: taskListDescription.value,
    priority_level: taskListPriority.value,
    created_at: editTask.value.created_at,
    tasks: tasks.value,
  });
  emit('close');
};
</script>

<template>
  <div class="body-add flex items-center justify-center absolute">
    <q-form class="form-add q-pa-xl">
      <div class="flex justify-end">
        <q-icon class="close-btn" name="close" @click="$emit('close')" />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Task List Title</p>
        <q-input
          class="input-form bg-white"
          outlined
          v-model="taskListTitle"
          placeholder="Enter task list title"
        />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Task List Priority</p>
        <q-select
          class="input-form bg-white"
          outlined
          emit-value
          map-options
          v-model="taskListPriority"
          placeholder="Enter task list title"
          :options="[
            { label: 'Low', value: 1 },
            { label: 'Medium', value: 2 },
            { label: 'Higth', value: 3 },
          ]"
        >
          <template v-slot:prepend>
            <q-icon :color="verifyTaskListPriorityColor(taskListPriority)" name="circle" style="font-size: 15px;" />
          </template>
        </q-select>
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Task List Description</p>
        <q-input
          v-model="taskListDescription"
          class="input-form bg-white"
          outlined
          type="textarea"
          placeholder="Enter task list description"
        />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Tasks</p>
        <div
          class="flex q-mt-sm no-wrap"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <q-input
            v-model="task.name"
            class="input-form bg-white q-mr-sm"
            outlined
            readonly
            type="text"
            style="width: 100%"
            placeholder="Enter list text"
          />
          <q-btn
            flat
            class="btn-remove-task bg-white"
            square
            icon="remove"
            style="color: #637381"
            @click="removeTask(index)"
          />
        </div>
        <div class="flex q-mt-sm no-wrap" v-if="tasks.length < 5">
          <q-input
            v-model="newTask"
            class="input-form bg-white q-mr-sm"
            outlined
            type="text"
            style="width: 100%"
            placeholder="Enter list text"
          />
          <q-btn
            flat
            class="btn-add-task bg-white font-purple"
            square
            icon="add"
            @click="addTask"
          />
        </div>
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Add Image</p>
        <q-file
          class="upload-image bg-white cursor-pointer"
          outlined
          v-model="model"
        >
          <div class="column items-center justify-center" style="width: 100%">
            <q-icon class="icon-upload" name="start" />
            <p class="q-mb-none" style="color: #637381">
              <span class="font-purple">Click to upload</span> or drag and drop
            </p>
          </div>
        </q-file>
      </div>
      <div class="q-mb-md">
        <q-file
          class="image-name input-form bg-white q-px-md text-bold"
          readonly
          v-model="model"
          v-if="model"
        >
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="model = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
      </div>
      <div>
        <q-btn
          v-if="editTask.id != undefined"
          class="add-task bg-purple text-white"
          icon="add"
          type="button"
          label="Edit Task"
          no-caps
          style="width: 100%"
          :disable="verifyFormData(taskListTitle, taskListDescription, tasks)"
          @click="updateTaskList"
        />
        <q-btn
          v-else
          class="add-task bg-purple text-white"
          icon="add"
          type="button"
          label="Add Task"
          no-caps
          style="width: 100%"
          :disable="verifyFormData(taskListTitle, taskListDescription, tasks)"
          @click="createTaskList"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.body-add {
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;

  .form-add {
    background: #f1f5f9;
    width: 700px;
    height: 90%;
    overflow: auto;

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      color: #637381;
      cursor: pointer;
    }

    :deep(.input-form .q-field__control::before) {
      border-color: #e2e8f0;
    }

    :deep(.input-form .q-field__control) {
      border-radius: 0;
    }

    :deep(.input-form textarea) {
      resize: none;
    }

    .btn-add-task {
      border: 1px solid #e2e8f0 !important;
    }

    .btn-remove-task {
      border: 1px solid #e2e8f0 !important;
    }

    .upload-image {
      .icon-upload {
        transform: rotate(-90deg);
        width: 34px;
        height: 34px;
        background: #eff4fb !important;
        border: 1px solid #e2e8f0;
        border-radius: 50%;
      }

      :deep(.q-field__native) {
        display: none;
      }

      :deep(.q-field__control::before) {
        border: 1px dashed #e2e8f0;
      }

      :deep(.q-field__control) {
        height: 180px;
      }

      :deep(.q-field__control::after) {
        border: 1px dashed #e2e8f0;
      }

      :deep(.q-field__prepend) {
        padding-right: 6px;
      }
    }

    .image-name {
      :deep(.q-field__native div) {
        font-weight: bold;
      }
    }

    .add-task {
      :deep(.q-icon) {
        margin-right: 5px;
      }
    }

    @media (max-width: 1024px) {
      width: 100%;
      height: 100%;
      padding: 48px 24px;
    }
  }
}
</style>

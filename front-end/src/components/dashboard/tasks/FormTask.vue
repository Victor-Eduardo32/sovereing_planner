<script lang="ts" setup>
import { useTasksStore } from 'src/stores/TasksStore';
import { Task, TaskList } from 'src/types/components/tasks/types';
import { computed, ref } from 'vue';

const props = defineProps<{
  editTask: TaskList;
}>();

const model = ref(null);

const editTask = ref<TaskList>(props.editTask);

const emit = defineEmits(['close']);

const userTasks = computed(() => {
  return useTasksStore();
});

const title_task_list = ref<string>(
  editTask.value ? editTask.value.title_task_list : ''
);
const description_task_list = ref<string>(
  editTask.value ? editTask.value.description_task_list : ''
);
const tasks = ref<Task[]>(editTask.value ? editTask.value.tasks : []);
const new_task = ref<string>('');

const addTask = async (): Promise<void> => {
  tasks.value.push({ name_task: new_task.value, state_task: 1 });
  new_task.value = '';
};

const removeTask = async (index: number): Promise<void> => {
  tasks.value.splice(index, 1);
};

const createTaskList = async (): Promise<void> => {
  await userTasks.value.addTaskList({
    title_task_list: title_task_list.value,
    description_task_list: description_task_list.value,
    tasks: tasks.value,
  });
  emit('close');
};

const updateTaskList = async (): Promise<void> => {
  await userTasks.value.updateTaskList({
    id: editTask.value.id,
    title_task_list: title_task_list.value,
    description_task_list: description_task_list.value,
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
        <p class="text-bold q-mb-sm">Task title</p>
        <q-input
          class="input-form bg-white"
          outlined
          v-model="title_task_list"
          placeholder="Enter task title"
        />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Task description</p>
        <q-input
          v-model="description_task_list"
          class="input-form bg-white"
          outlined
          type="textarea"
          placeholder="Enter task description"
        />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Task list</p>
        <div class="flex no-wrap" v-if="tasks.length < 5">
          <q-input
            v-model="new_task"
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
        <div
          class="flex q-mt-sm no-wrap"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <q-input
            v-model="task.name_task"
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
          type="submit"
          label="Edit Task"
          no-caps
          style="width: 100%"
          @click="updateTaskList"
        />
        <q-btn
          v-else
          class="add-task bg-purple text-white"
          icon="add"
          type="submit"
          label="Add Task"
          no-caps
          style="width: 100%"
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

    :deep(.input-form .q-field__control::after) {
      border: 1px solid #e2e8f0;
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

<script lang="ts" setup>
import { CompletedTaskFileProps } from 'src/types/components/tasks/props';
import { computed } from 'vue';
import { formatDateUs } from 'src/utils/DateFormat';

const props = defineProps<CompletedTaskFileProps>();
const ended_at = computed(() => {
  return props.completedTaskList.ended_at ? formatDateUs(props.completedTaskList.ended_at) : ''
})

</script>

<template>
  <div class="completed-task-list-file" :class="{ 'list-layout': listLayout, 'grid-layout': gridLayout }">
    <div
      class="options-task bg-white q-pa-md q-mt-sm q-mb-sm"
    >
      <span class="flex text-weight-medium" style="width: 80%; word-break: break-word">
        {{ completedTaskList.title }}
      </span>
      <p class="q-my-sm text-wrap" style="word-break: break-word; color: #637381">
        {{ completedTaskList.description }}
      </p>
      <div
        v-for="(completedTask, index) in completedTaskList.completed_tasks"
        :key="index"
      >
        <p class="completed-task-name">
          <span class="index text-bold">{{ index + 1 }}: </span>
          <span class="name">{{ completedTask.name }}</span>
        </p>
      </div>
      <p class="q-mt-auto">
        <span class="text-bold">Ended at: </span>{{ ended_at }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.completed-task-list-file {
  margin: 5px;

  .options-task {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px 0;
  }

  .completed-task-name {
    display: flex;
    word-break: break-word;
  }
}

.grid-layout {
  width: 32.5%;

  .completed-task-name {
    .index {
      margin-right: 5px;
    }

    .name {
      width: 90%;
    }
  }
}

.list-layout {
  .completed-task-name {
    .index {
      margin-right: 5px;
    }

    .name {
      width: 95%;
    }
  }
}

@media (max-width: 1854px) {
  .completed-task-list-file {
    margin: 4px;
  }

  .grid-layout {
    .completed-task-name {
      .name {
        width: 89%;
      }
    }
  }
}

@media (max-width: 1538px) {
  .completed-task-list-file {
    margin: 3px;
  }
}

@media (max-width: 1214px) {
  .completed-task-list-file {
    margin: 2px;
  }
}

@media (max-width: 1023px) {
  .list-layout {
    .completed-task-name {
      .name {
        width: 93%;
      }
    }
  }
}
</style>

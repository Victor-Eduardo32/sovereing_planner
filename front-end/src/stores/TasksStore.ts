import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { TaskList, TaskStateUpdate } from 'src/types/components/tasks/types';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks_list: [] as TaskList[],
  }),
  getters: {
    getAllTasksList(state): TaskList[] {
      return state.tasks_list;
    }
  },
  actions: {
    async setAllTasksList() {
      axios.get('api/v1/tasks/get-tasks-list').then(response => {
        this.tasks_list = response.data;
      })
        .catch((error) => {
          throw new Error(
            error = error.response.data.message
          );
        })
    },
    async addTaskList(data: TaskList) {
      axios.post('api/v1/tasks/add-task-list', data)
        .catch((error) => {
          throw new Error(
            error.response.data.message
          );
        })
    },
    async updateTaskList(data: TaskList) {
      axios.put('api/v1/tasks/update-task-list', data)
        .catch((error) => {
          throw new Error(
            error.response.data.message
          );
        })
    },
    async updateTaskState(data: TaskStateUpdate) {
      axios.put('api/v1/tasks/update-task-state', data).then((response) => {
        this.tasks_list.forEach(task_list => {
          const taskIndex = task_list.tasks.findIndex(task => task.id === response.data.task.id);
          if (taskIndex !== -1) {
            task_list.tasks[taskIndex] = response.data.task;
          }
        });
      })
        .catch((error) => {
          throw new Error(
            error.response.data.message
          )
        })
    },
    async destroyTaskList(id: number) {
      axios.delete('api/v1/tasks/destroy-task-list/' + id).then(() => {
        this.tasks_list = this.tasks_list.filter(task => id !== task.id);
      })
        .catch((error) => {
          throw new Error(
            error.response.data.message
          );
        })
    }
  }
})

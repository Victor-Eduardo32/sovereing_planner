<script lang="ts" setup>
import { useAuthStore } from 'src/stores/AuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const logout = async (): Promise<void> => {
  await authStore.logout();
  router.push('/login')
}

interface MenuItem {
  icon: string;
  label: string;
  separator: boolean;
  children?: {
    name: string;
    url: string;
  }[];
}

const menuList = ref<MenuItem[]>([
  {
    icon: 'grid_view',
    label: 'Dashboard',
    separator: true,
  },
  {
    icon: 'task_alt',
    label: 'Tasks',
    separator: false,
    children: [
      {
        name: 'General',
        url: '/dashboard',
      },
      {
        name: 'List',
        url: '/dashboard/tasks/list',
      },
    ],
  },
  {
    icon: 'payments',
    label: 'Finance',
    separator: false,
    children: [
      {
        name: 'General',
        url: '/dashboard',
      },
      {
        name: 'Expenses',
        url: '/finance/expenses',
      },
      {
        name: 'Savings',
        url: '/dashboard',
      },
    ],
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
  },
]);
</script>

<template>
  <q-scroll-area class="fit text-white q-pa-md">
    <div class="flex items-center justify-center q-mb-md">
      <img
        class="q-mr-sm"
        src="src/assets/voidDashboard.svg"
        :width="40"
        :height="40"
      />
      <span class="text-bold" style="font-size: 18px">Sovereign Planner</span>
    </div>
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-expansion-item
          expand-separator
          :icon="menuItem.icon"
          :label="menuItem.label"
        >
          <template v-for="(children, index) in menuItem.children" :key="index">
            <q-item
              class="cursor-pointer text-white"
              clickable
              v-ripple
              :to="children.url"
            >
              <q-item-section style="margin-left: 55px">
                {{ children.name }}
              </q-item-section>
            </q-item>
          </template>
        </q-expansion-item>
      </template>
      <q-item
        class="cursor-pointer text-white"
        clickable
        v-ripple
        icon="logout"
        @click="logout"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>

        <q-item-section> Logout </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

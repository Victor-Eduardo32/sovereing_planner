<script lang="ts" setup>
import { useUserStore } from 'src/stores/UserStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = computed(() => {
  return useUserStore();
})
const router = useRouter();

const logout = async (): Promise<void> => {
  await user.value.logout();
  router.push('/');
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
        url: '/user',
      },
      {
        name: 'List',
        url: '/user/tasks/list',
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
        url: '/user',
      },
      {
        name: 'Expenses',
        url: '/finance/expenses',
      },
      {
        name: 'Savings',
        url: '/user',
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

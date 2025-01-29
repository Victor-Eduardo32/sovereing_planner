<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import SideBar from 'components/dashboard/SideBar.vue';
import TopBar from 'components/dashboard/TopBar.vue';

const drawer = ref<boolean>(false);
const win_width = ref<number>(window.innerWidth);

const verifyWindowWidth = (): void => {
  win_width.value = window.innerWidth;
}

onBeforeMount(async () => {
  window.addEventListener('resize', verifyWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', verifyWindowWidth);
})
</script>

<template>
  <q-layout class="dashboard" view="lHh Lpr lFf">
    <div class="sideBar" :class="{ 'absolute': win_width < 1024 }">
      <q-drawer v-model="drawer" show-if-above bordered style="width: 100%">
        <SideBar />
      </q-drawer>
    </div>
    <div class="dashboard-pages">
      <TopBar @open-sidebar="drawer = !drawer" />
      <router-view style="padding: 30px 0 15px 0; height: calc(100% - 80px)" />
    </div>
  </q-layout>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;

  .dashboard-pages {
    background: #f1f5f9;
    width: calc(100% - 260px);

    @media(max-width: 1024px){
      width: 100%;
    }
  }
}

.sideBar {
  width: 260px;
  .fit {
    background: #1c2434;

    :deep(.q-scrollarea__content) {
      position: inherit;
    }
  }

  :deep(div.q-drawer-container) {
    height: 100vh;
    max-width: 260px;
    width: 100%;

    .q-drawer {
      position: relative;
      height: 100%;
      width: 100% !important;
      border-right: 0 !important;
    }
  }
}
</style>

<template>
  <q-layout class="inter" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'MainLayout',
});
</script>

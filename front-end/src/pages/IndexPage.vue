<template>
  <q-page>
    <header-home />
  </q-page>
</template>

<script setup lang="ts">
import HeaderHome from 'src/components/home/headers/HeaderHome.vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'IndexPage',
  components: {
    HeaderHome,
  },
});
</script>

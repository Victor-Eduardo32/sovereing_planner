<script lang="ts" setup>
import { DashboardTitlePageProps } from 'src/types/components/pages/props';

const props = defineProps<DashboardTitlePageProps>()
void props
</script>

<template>
  <div
    class="flex justify-between items-center q-mb-sm"
    style="height: 50px"
  >
    <h6 class="fw-bold q-my-none" style="font-size: 24px">
      {{ title }}
    </h6>
    <q-breadcrumbs class="flex items-center" style="height: 100%">
      <q-breadcrumbs-el label="Dashboard" />
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <q-breadcrumbs-el :label="breadcrumb.breadcrumb" />
      </template>
    </q-breadcrumbs>
  </div>
</template>

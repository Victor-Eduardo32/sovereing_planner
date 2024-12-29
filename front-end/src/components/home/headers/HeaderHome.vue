<template>
  <q-header class="inter bg-white">
    <q-toolbar>
      <q-toolbar-title class="font-purple text-italic text-weight-bold">
        <q-avatar>
          <img src="src/assets/voidHome.svg" />
        </q-avatar>
        Sovereign Planner
      </q-toolbar-title>
      <q-btn
        no-caps
        flat
        padding="xs lg"
        class="btn-login text-weight-bold text-dark q-mr-sm"
        label="Sign In"
        size="1.1em"
        @click="$router.push('/login')"
      />
      <q-btn
        no-caps
        outline
        padding="sm lg"
        class="btn-create-account text-weight-bold bg-purple text-white q-ml-sm"
        label="Create an account"
        size="1.1em"
        @click="$router.push('/register')"
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderHome',
});
</script>

<style scoped lang="scss">
.btn-login {
  border: 3px solid #000 !important;
  border-radius: 10px !important;
}

.btn-create-account {
  border-radius: 10px !important;
}
</style>

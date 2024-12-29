<template>
  <q-header bordered id="header" class="text-primary" style="height: 80px">
    <q-toolbar
      class="toolbar flex items-center justify-between q-pa-none q-px-xl"
      style="height: 100%"
    >
      <div class="action-top flex items-center">
        <q-icon
          class="open-sidebar"
          @click="$emit('open-sidebar')"
          name="menu"
          style="cursor: pointer"
        />
        <q-input
          bottom-slots
          borderless
          v-model="search"
          label="Type to search..."
          maxlength="12"
          :dense="dense"
          color="orange"
          class="search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="social-top flex items-center">
        <q-toggle
          v-model="colorMode"
          color="purple"
          unchecked-icon="wb_sunny"
          checked-icon="nights_stay"
          class="dark-mode q-mr-md q-mt-sm"
        />
        <div class="flex items-center q-mr-lg">
          <q-btn
            class="btn-action text-dark q-mr-md"
            round
            icon="notifications"
          />
          <q-btn class="btn-action text-dark" round icon="chat" />
        </div>
        <div class="flex">
          <div class="text-right q-mr-lg">
            <h6 class="text-dark q-my-none">Victor Eduardo</h6>
            <span style="color: #637381">Developer</span>
          </div>
          <img
            src="src/assets/backgroundRegister.png"
            alt=""
            :height="50"
            style="border-radius: 50%"
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopBar',
  data() {
    return {
      search: '',
      colorMode: true,
      dense: false,
    };
  },
});
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  background: #fff;
  width: 100%;
  left: auto !important;
  top: auto;
  right: auto;

  .toolbar {
    :deep(.q-field) {
      padding: 0;
    }

    @media (max-width: 1023px) {
      padding: 0 12px;
    }
  }

  .social-top {
    @media (max-width: 1023px) {
      display: none;
    }
  }

  .action-top {
    .search {
      :deep(.q-field__label) {
        color: rgba(0, 0, 0, 0.6) !important;
      }
    }

    .open-sidebar {
      display: none;

      @media (max-width: 1023px) {
        display: block;
        color: #637381;
        font-size: 28px;
      }
    }

    @media (max-width: 1023px) {
      width: 100%;
      justify-content: space-between;
    }
  }

  .dark-mode {
    :deep(.q-toggle__track) {
      height: 0.8em;
      width: 3.5rem;
      border-radius: 25px;
      background: #8a99af;
    }

    :deep(.q-toggle__inner--truthy .q-toggle__track) {
      background: currentColor;
    }

    :deep(.q-toggle__inner) {
      padding: 0;
    }

    :deep(.q-toggle__thumb) {
      left: 0.1em;
      top: 0.08em;
      width: 0.65em;
      height: 0.65em;
    }

    :deep(.q-toggle__inner--truthy .q-toggle__thumb) {
      left: 0.65em !important;
    }
  }

  .btn-action {
    width: 34px;
    height: 34px;
    background: #eff4fb !important;
    border: 1px solid #e2e8f0;
  }

  .btn-action::before {
    box-shadow: none;
  }
}
</style>

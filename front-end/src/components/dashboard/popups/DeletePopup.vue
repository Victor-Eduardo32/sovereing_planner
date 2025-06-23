<script lang="ts" setup>
import { DeletePopupProps } from 'src/types/components/popup/props';
import { ref, watch } from 'vue';
import WarningPng from 'src/assets/props/warning.png';

const props = defineProps<DeletePopupProps>()
const dialog = ref<boolean>(false)
const emit = defineEmits(['close', 'delete-confirmation'])

watch(() => [props.message, props.title], ([newMessage, newTitle]) => {
    dialog.value = newMessage.length > 0 && newTitle.length > 0;
}, { immediate: true });

const onClose = () => {
  dialog.value = false;
  emit('close')
};

const onDelete = () => {
  dialog.value = false;
  emit('delete-confirmation')
};
</script>

<template>
  <q-dialog
    v-model="dialog"
    :backdrop-filter="'saturate(80%)'"
    @update:model-value="(value) => { if (!value) onClose(); }"
  >
    <q-card style="width: 90%; border-radius: 8px;">
      <q-card-section class="row justify-center items-center q-pb-none q-pt-xl text-h6">
        <div class="image-popup">
          <img
            :src="WarningPng"
            :width="35"
            :height="35"
          />
        </div>
      </q-card-section>
      <q-card-section class="title row justify-center items-center q-pt-lg q-pb-none text-center text-h5 text-bold">
        {{ title }}
      </q-card-section>

      <q-card-section class="message row justify-center items-center text-center q-pt-md q-pb-xl">
        {{ message }}
      </q-card-section>

      <q-card-actions class="q-pb-xl" align="center">
        <q-btn no-caps unelevated class="cancel-btn" label="Cancel" v-close-popup @click="onClose" />
        <q-btn no-caps unelevated class="delete-btn" label="Delete" v-close-popup @click="onDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" setup>
.image-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 50%;

  img {
    margin-bottom: 1px;
  }
}

.title {
  color: #292929;
}

.message {
  color: #64748B;
}

.cancel-btn {
  background: #eff4fb;
  border: 1px solid #e2e8f0;
  height: 45px;
  width: 170px;
  margin-right: 10px;
  font-weight: 500;

  @media(max-width: 1024px) {
    margin-right: 0 !important;
  }
}

.delete-btn {
  background: #ee2424;
  color: white;
  height: 45px;
  width: 170px;
  margin-left: 10px;
  font-weight: 4500;

  @media(max-width: 1024px) {
    margin-left: 0 !important;
    margin-top: 10px;
  }
}

</style>

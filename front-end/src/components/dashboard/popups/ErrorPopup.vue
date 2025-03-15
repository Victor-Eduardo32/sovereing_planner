<script lang="ts" setup>
import { ErrorPopupProps } from 'src/types/components/popup/props';
import { ref, watch } from 'vue';

const props = defineProps<ErrorPopupProps>()
const dialog = ref<boolean>(false)
const emit = defineEmits(['close'])

watch(() => props.message, (newMessage) => {
  if (newMessage.length > 0) {
    dialog.value = true;
  }
}, { immediate: true });

const onClose = () => {
  dialog.value = false;
  emit('close')
};

</script>

<template>
  <q-dialog
    v-model="dialog"
    :backdrop-filter="'saturate(80%)'"
    @update:model-value="(value) => { if (!value) onClose(); }"
  >
    <q-card style="width: 90%;">
      <q-card-section class="row items-center q-pb-none text-h6">
        Error
      </q-card-section>

      <q-card-section>
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup @click="onClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

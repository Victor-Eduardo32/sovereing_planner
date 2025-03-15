<script lang="ts" setup>
import { useCompletedTaskListStore } from 'src/stores/modules/CompletedTaskListStore';
import { endOfDay } from 'src/utils/DateFormat';
import { ref } from 'vue';

const initialDate = ref<string>('')
const finalDate = ref<string>('')
const filterMessage = ref<string>('')

const emit = defineEmits(['filter', 'close']);
void emit;

const useCompletedTaskLists = useCompletedTaskListStore();
void useCompletedTaskLists;

const verifyFormData = (): boolean => {
  return !(initialDate.value.length == 10 && finalDate.value.length == 10)
}

const filterCompletedTaskListsData = () => {
  const initialDateObj = new Date(initialDate.value).toISOString()
  const finalDateObj = endOfDay(new Date(finalDate.value))

  if(initialDateObj > finalDateObj) {
    filterMessage.value = "Initial date can't be greater than the final date"
    return
  }

  if(filterMessage.value.length > 0) filterMessage.value = ''
  emit('filter', { initialDate: initialDateObj, finalDate: finalDateObj })
  emit('close')
}
</script>

<template>
  <div class="body-filter flex items-center justify-center absolute">
    <q-form class="form-filter q-pa-xl">
      <div class="flex justify-end">
        <q-icon class="close-btn" name="close" @click="$emit('close')" />
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Initial Date</p>
        <q-input class="input-form bg-white" outlined v-model="initialDate" mask="####/##/##">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy :breakpoint="1024" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="initialDate" mask="YYYY/MM/DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="q-mb-md">
        <p class="text-bold q-mb-sm">Final Date</p>
        <q-input class="input-form bg-white" outlined v-model="finalDate" mask="####/##/##">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy :breakpoint="1024" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="finalDate" mask="YYYY/MM/DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="flex justify-center q-my-md" v-if="filterMessage.length > 0">
        <span style="color: red; font-weight: 450;"> {{ filterMessage }}</span>
      </div>
      <div>
        <q-btn
          class="add-task bg-purple text-white"
          icon="add"
          type="button"
          label="Filter"
          no-caps
          style="width: 100%"
          :disable="verifyFormData()"
          @click="filterCompletedTaskListsData"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.body-filter {
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;

  .form-filter {
    background: #f1f5f9;
    width: 700px;
    height: 90%;
    overflow: auto;

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      color: #637381;
      cursor: pointer;
    }

    :deep(.input-form .q-field__control::before) {
      border-color: #e2e8f0;
    }

    :deep(.input-form .q-field__control) {
      border-radius: 0;
    }

    :deep(.input-form textarea) {
      resize: none;
    }

    .btn-add-task {
      border: 1px solid #e2e8f0 !important;
    }

    .btn-remove-task {
      border: 1px solid #e2e8f0 !important;
    }

    .upload-image {
      .icon-upload {
        transform: rotate(-90deg);
        width: 34px;
        height: 34px;
        background: #eff4fb !important;
        border: 1px solid #e2e8f0;
        border-radius: 50%;
      }

      :deep(.q-field__native) {
        display: none;
      }

      :deep(.q-field__control::before) {
        border: 1px dashed #e2e8f0;
      }

      :deep(.q-field__control) {
        height: 180px;
      }

      :deep(.q-field__control::after) {
        border: 1px dashed #e2e8f0;
      }

      :deep(.q-field__prepend) {
        padding-right: 6px;
      }
    }

    .image-name {
      :deep(.q-field__native div) {
        font-weight: bold;
      }
    }

    .add-task {
      :deep(.q-icon) {
        margin-right: 5px;
      }
    }

    @media (max-width: 1024px) {
      width: 100%;
      height: 100%;
      padding: 48px 24px;
    }
  }
}
</style>

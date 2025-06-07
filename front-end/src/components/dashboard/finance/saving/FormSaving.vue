<script lang="ts" setup>
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { FormSavingProps } from 'src/types/components/saving/props';
import { stringToDate } from 'src/utils/DateFormat';
import { ref } from 'vue';

const props = defineProps<FormSavingProps>();
const emit = defineEmits(['close', 'create']);

const { getCurrencyPrefix, getNumberMask } = useBalanceComposable()

const description = ref<string>('')
const date = ref<string>('')
const price = ref<number>(0)

const verifyFormData = (): boolean => {
  return !(description.value.length > 0 && date.value.length == 10 && price.value > 0)
}

const createSaving = () => {
  const data = {
    description: description.value,
    date: stringToDate(date.value),
    value: price.value
  }

  description.value = ''
  date.value = ''
  price.value = 0

  emit('create', data)
  emit('close')
}

void props;
</script>

<template>
  <q-dialog
    :model-value="visible"
    @update:model-value="(value) => { if (!value) emit('close', value); }"
    class="saving-form"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 100%;">
      <q-card-section>
        <span class="text-h6">Add Saving</span>
        <q-icon class="close-btn" name="close" @click="$emit('close', false)" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <p class="text-bold q-mb-sm">Saving Description</p>
          <q-input
            class="input-form bg-white"
            outlined
            v-model="description"
            placeholder="Enter saving description"
          />
        </div>

        <div class="q-mt-md">
          <p class="text-bold q-mb-sm">Date</p>
          <q-input class="input-form bg-white" outlined v-model="date" mask="####/##/##">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy :breakpoint="1024" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY/MM/DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="q-mt-md">
          <p class="text-bold q-mb-sm">Value</p>
          <q-input
            class="input-form bg-white"
            outlined
            :mask="getNumberMask(currency)"
            unmasked-value
            fill-mask="0"
            reverse-fill-mask
            :prefix="getCurrencyPrefix(currency)"
            v-model="price"
            placeholder="Enter saving value"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="add-task bg-purple text-white"
          icon="add"
          type="button"
          label="Add Saving"
          no-caps
          @click="createSaving"
          :disable="verifyFormData()"
          style="width: 100%"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.input-form {
  :deep(.q-field__prepend) {
    width: 20px;
    padding-right: 10px;
  }
}

.close-btn {
  position: absolute;
  top: 17px;
  right: 15px;
  font-size: 30px;
  color: #637381;
  cursor: pointer;
}
</style>

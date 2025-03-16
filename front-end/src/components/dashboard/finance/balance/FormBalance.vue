<script lang="ts" setup>
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { Currency } from 'src/enums/currency';
import { useBalanceStore } from 'src/stores/modules/BalanceStore';
import { FormBalanceProps } from 'src/types/components/balance/props';
import { ref } from 'vue';

const useBalance = useBalanceStore()

const props = defineProps<FormBalanceProps>();
const emit = defineEmits(['close']);

const { getCurrencyIcon } = useBalanceComposable()

const name = ref<string>('')
const currency = ref<Currency>(Currency.BRL)

const verifyFormData = (): boolean => {
  return !(name.value.length > 0)
}

const createBalance = async () => {
  await useBalance.addBalance({
    name: name.value,
    currency: currency.value
  })

  name.value = ''
  currency.value = Currency.BRL
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
        <span class="text-h6">Add Balance</span>
        <q-icon class="close-btn" name="close" @click="$emit('close', false)" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <p class="text-bold q-mb-sm">Balance Name</p>
          <q-input
            class="input-form bg-white"
            outlined
            v-model="name"
            placeholder="Enter balance name"
            maxlength="50"
          >
            <template v-slot:append>
              <span style="font-size: 15px;">{{ name.length }}/50</span>
            </template>
          </q-input>
        </div>

        <div class="q-mt-md">
          <p class="text-bold q-mb-sm">Currency</p>
          <q-select
            class="input-form bg-white"
            outlined
            emit-value
            map-options
            v-model="currency"
            placeholder="Enter task list title"
            :options="[
              { label: 'BRL', value: 'BRL' },
              { label: 'USD', value: 'USD' },
              { label: 'EUR', value: 'EUR' },
            ]"
          >
            <template v-slot:append>
              <q-icon v-if="currency === 'BRL'" :name="getCurrencyIcon(currency)" style="font-size: 14px; color: black;" />
              <q-icon v-else :name="getCurrencyIcon(currency)" style="font-size: 19px; color: black;" />
            </template>
          </q-select>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="add-task bg-purple text-white"
          icon="add"
          type="button"
          label="Create Balance"
          no-caps
          :disable="verifyFormData()"
          @click="createBalance"
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

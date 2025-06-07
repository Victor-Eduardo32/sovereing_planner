<script lang="ts" setup>
import { useBalanceComposable } from 'src/composables/useBalance/useBalanceComposable';
import { SelectBalanceProps } from 'src/types/components/balance/props';
import { Balance } from 'src/types/components/balance/types';
import { ref, watch } from 'vue';

const props = defineProps<SelectBalanceProps>()

const emit = defineEmits(['close', 'selected'])

const { getCurrencyPrefix, getNumberFormat } = useBalanceComposable()

const balancesOptions = ref<Balance[]>([])

const selectBalance = (id: number) => {
  emit('selected', id)
  emit('close')
}

watch(() => props.balances, (newBalances) => {
  balancesOptions.value = newBalances || []
}, { immediate: true })
</script>

<template>
  <q-dialog
    :model-value="visible"
    @update:model-value="(value) => { if (!value) emit('close', value); }"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 100%;">
      <q-card-section>
        <span class="text-h6">Select your balance</span>
        <q-icon class="close-btn" name="close" @click="$emit('close', false)" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-none" style="">
        <template v-for="(balance, index) in balancesOptions" :key="index">
          <q-list>
            <q-item
              clickable v-ripple
              :disable="balance.id == selectedBalance.id"
              @click="selectBalance(balance.id!)"
            >
              <q-item-section style="flex: 2; padding-right: 3px;">
                {{ balance.name }}
              </q-item-section>
              <q-item-section style="flex: 1;">
                {{ balance.currency }}
              </q-item-section>
              <q-item-section style="flex: 1;">
                {{ getCurrencyPrefix(balance.currency) + getNumberFormat(balance.amount!, balance.currency) }}
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: 17px;
  right: 15px;
  font-size: 30px;
  color: #637381;
  cursor: pointer;
}
</style>

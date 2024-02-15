<template>
  <n-radio-group v-model:value="value" @update:value="onUpdated" v-if="type === 'radio'">
    <n-radio-button :value="currency.code" v-for="currency in options">{{ currency.code }}</n-radio-button>
  </n-radio-group>
  <n-select v-model:value="value" :options="options" filterable v-bind="$attrs" @update:value="onUpdated" v-else />
</template>

<script setup lang="ts">
  import { getCurrencyList, Metadata } from '@/api/metadata.ts';
  import { arr2Obj, getSelectOptions } from '@/utils/common.ts';
  import { CurrencyInfo } from '@/api/system.ts';

  const props = withDefaults(
    defineProps<{
      type?: 'radio' | 'select';
    }>(),
    {
      type: 'radio',
    }
  );

  const value = defineModel('modelValue', { default: 'CNY' });
  const emit = defineEmits(['update:modelValue', 'change']);
  emit('update:modelValue', value.value);
  const options = ref<Metadata[]>([]);
  let currency: Record<string, CurrencyInfo>;
  const setOption = async () => {
    const response = await getCurrencyList();
    console.log(response);
    currency = arr2Obj(response, 'code');
    options.value = getSelectOptions(
      <Metadata[]>response,
      'code',
      'code',
      {},
      {
        ignore: {
          disabled: true,
        },
      }
    );
    console.log(options.value);
  };
  const onUpdated = (v: string) => {
    if (currency) {
      emit('change', v, currency[v]);
    }
  };
  setOption();
</script>

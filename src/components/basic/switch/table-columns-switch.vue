<template>
  <n-switch :checked-value="0" :unchecked-value="1" @updateValue="handleChange" :value="modelValue">
    <template #checked>
      <span style="font-size: 12px">启用</span>
    </template>
    <template #unchecked>
      <span style="font-size: 12px">禁用</span>
    </template>
  </n-switch>
</template>

<script setup lang="ts">
  import { SwitchProps } from 'naive-ui';
  import { connectDatabase } from '@/api/connectDatabase.ts';
  import { MyBoolean } from '@/utils/types.ts';

  const props = defineProps<{
    modelValue?: SwitchProps['value'];
    databaseTableName: string;
    id: number;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const handleChange = async (v: MyBoolean) => {
    const res = await connectDatabase('update', props.databaseTableName, { disabled: v, id: props.id });
    if (!res.error) {
      emit('update:modelValue', v);
    }
  };
</script>

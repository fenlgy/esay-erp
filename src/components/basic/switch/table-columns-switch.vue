<template>
  <n-switch :checked-value="true" :unchecked-value="false" @updateValue="handleChange" :value="modelValue">
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
  import { MyBoolean } from '@/utils/types.ts';
  import { ModelStatic } from '@sequelize/core';

  const props = defineProps<{
    modelValue?: SwitchProps['value'];
    model: ModelStatic;
    id: number;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const handleChange = async (v: MyBoolean) => {
    // const res = await connectDatabase('update', props.databaseTableName, { disabled: v, id: props.id });
    await props.model.update(
      { disabled: v },
      {
        where: {
          id: props.id,
        },
      }
    );
    emit('update:modelValue', v);
    $myMessage.success('小主，更新成功啦！');
  };
</script>

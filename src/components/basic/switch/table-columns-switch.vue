<template>
  <n-switch
    :checked-value="0"
    :unchecked-value="1"
    @updateValue="handleChange"
    :value="modelValue"
  >
    <template #checked>
      <span style="font-size: 12px">启用</span>
    </template>
    <template #unchecked>
      <span style="font-size: 12px">禁用</span>
    </template>
  </n-switch>
</template>

<script setup lang="ts">
import { SwitchProps } from "naive-ui";
import { connectDatabase } from "@/api/connectDatabase.ts";
import { SQL_WHERE_UNIQ_KEY } from "@/api/db.ts";

const props = defineProps<{
  modelValue?: SwitchProps["value"]
  databaseTableName: string
  id: number
}>();

const emit = defineEmits(['update:modelValue'])

const message = useMessage()
const handleChange = async (v) => {
  const res = await connectDatabase("update", props.databaseTableName, {
    [SQL_WHERE_UNIQ_KEY]: {
      id:props.id
    },
    disabled: v
  });

  if (res.error){
    message.success(res.error)
  }else {
    emit('update:modelValue',v)
    message.success('小主，更新成功啦！')
  }
};
</script>

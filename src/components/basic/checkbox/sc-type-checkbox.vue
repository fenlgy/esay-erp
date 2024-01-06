<template>
  <n-checkbox v-model:checked="types.client" @change="onChange">
    客户
  </n-checkbox>
  <n-checkbox v-model:checked="types.supplier" @change="onChange">
    供应商
  </n-checkbox>
</template>

<script setup lang="ts">
import { SCType } from "@/api/scrm.ts";

defineProps<{
  value: SCType | undefined
}>();

const emit = defineEmits(["update:value", "change"]);

const types = reactive({
  client: false,
  supplier: false
});

function getType() {
  if (types.client && types.supplier) {
    return 0;
  } else {
    if (types.client) return 1;
    if (types.supplier) return 2;
  }
  return undefined;
}

// 采用 watch 方式监听再更新值会在form验证之后，导致验证失败
const onChange = () => {
  const curVal = getType();
  emit("update:value", curVal);
  emit("change", curVal);
};

</script>
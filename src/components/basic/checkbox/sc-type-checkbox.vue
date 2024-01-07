<template>
  <n-checkbox v-model:checked="types.client" @update:checked="onChange">
    客户
  </n-checkbox>
  <n-checkbox v-model:checked="types.supplier" @update:checked="onChange">
    供应商
  </n-checkbox>
</template>

<script setup lang="ts">
import { SCType } from "@/api/scrm.ts";

const props = defineProps<{
  value?: SCType
}>();

const emit = defineEmits(["update:value", "change"]);

const types = reactive({
  client: false,
  supplier: false
});

watch(() => props.value, (newVal) => {
  switch (newVal) {
    case 0:
      types.client = true;
      types.supplier = true;
      break;
    case 1:
      types.client = true;
      break;
    case 2:
      types.supplier = true;
      break;
    default:
      types.client = false;
      types.supplier = false;
      break
  }
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
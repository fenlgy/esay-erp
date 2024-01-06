<template>
  <n-space size="small">
    <n-tag :size="size" v-if="type === 0 || type === 1" :color="tagColor.blueGreen" :bordered="false">客户</n-tag>
    <n-tag :size="size" v-if="type === 0 || type === 2" :color="tagColor.orange" :bordered="false">供应商</n-tag>
  </n-space>
</template>

<script setup lang="ts">
import { TagProps } from "naive-ui";
import { tagColor } from "@/utils/config.ts";
import { SCType } from "@/api/scrm.ts";

withDefaults(defineProps<{
  size?: TagProps["size"]
  type: SCType
}>(), {
  size: "small"
});


</script>
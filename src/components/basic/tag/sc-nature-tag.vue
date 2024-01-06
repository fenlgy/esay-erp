<template>
  <n-space size="small">
    <n-tag :size="size" v-if="type === 1" :color="tagColor.golden" :bordered="false">企业</n-tag>
    <n-tag :size="size" v-if="type === 2 " :color="tagColor.gray" :bordered="false">个人</n-tag>
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
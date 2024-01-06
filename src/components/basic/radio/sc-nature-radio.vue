<template>
  <n-radio-group v-model:value="value">
    <n-radio-button :value="1">企业</n-radio-button>
    <n-radio-button :value="2">个人</n-radio-button>
  </n-radio-group>
</template>

<script setup lang="ts">
import { SCNature } from "@/api/scrm.ts";

const value = defineModel<SCNature>();

</script>
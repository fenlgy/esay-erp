<template>
<n-page-header title="商品详情" subtitle="PO2893972300">
<template #extra>
  <n-space size="small">
    <n-button type="primary">完成</n-button>
    <n-button type="primary" secondary>完成</n-button>
    <n-button secondary>
      <template #icon>
        <n-icon :component="DotsVertical"/>
      </template>
    </n-button>
  </n-space>

</template>
</n-page-header>
</template>

<script setup lang="ts">

import { DotsVertical } from "@vicons/tabler";
</script>

<style scoped>

</style>
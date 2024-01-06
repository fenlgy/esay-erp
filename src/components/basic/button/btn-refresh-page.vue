<template>
  <n-button secondary @click="handleClick">
    <template #icon>
      <n-icon :component="SyncOutlined" />
    </template>
  </n-button>
</template>

<script setup lang="ts">

import { SyncOutlined } from "@vicons/antd";
import { NButton } from "naive-ui";

const reload = <()=>void>inject("reload");
const handleClick = () => {
  reload();
};

</script>

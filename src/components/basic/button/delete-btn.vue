<template>
  <n-popconfirm negative-text="取消" positive-text="确认" @positive-click="onDelete">
    <template #trigger>
      <Btn v-bind="$attrs" quaternary secondary> 删除 </Btn>
    </template>
    <n-text strong depth="1"> 删除后不能恢复！</n-text>
    确认删除？
  </n-popconfirm>
</template>

<script setup lang="ts">
  defineProps<{
    onDelete: () => void;
  }>();
</script>

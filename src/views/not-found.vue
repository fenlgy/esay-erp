<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-space justify="center">
        <btn type="primary" to="back" >返回上一页</btn>
        <btn type="primary" secondary to="/" >返回首页</btn>
      </n-space>
    </template>
  </n-result>
</template>

<script setup lang="ts">

</script>
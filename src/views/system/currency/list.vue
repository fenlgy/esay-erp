<template>
  <pages-list :columns="columns" :get-data="() => getMetadata('currency')"> </pages-list>
</template>

<script setup lang="ts">
  import { renderTableSwitch } from '@/utils/render.tsx';
  import { getMetadata } from '@/api/system.ts';
  import { Metadata } from '%/database/model/metadata.ts';
  const columns = [
    { title: '中文名', key: 'name' },
    { title: '英文名', key: 'enName' },
    { title: '代码', key: 'code' },
    { title: '符号', key: 'symbol' },
    {
      title: '启用',
      key: 'disabled',
      render(row) {
        // return h(renderEnableOrDisableTag(!row.disabled));
        return h(renderTableSwitch(row, Metadata));
      },
    },
  ];
</script>

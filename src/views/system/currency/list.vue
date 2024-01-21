<template>
  <pages-list :columns="columns" :get-data="getCurrencyList"> </pages-list>
</template>

<script setup lang="ts">
  import { renderTableSwitch } from '@/utils/render.tsx';
  import { getCurrencyList } from '@/api/metadata.ts';
  import { CurrencyInfo } from '@/api/system.ts';
  const columns = [
    { title: '中文名', key: 'name' },
    { title: '英文名', key: 'ename' },
    { title: '代码', key: 'code' },
    { title: '符号', key: 'symbol' },
    {
      title: '启用',
      key: 'disabled',
      render(row: CurrencyInfo) {
        // return h(renderEnableOrDisableTag(!row.disabled));
        return h(renderTableSwitch(row, 'basic'));
      },
    },
  ];
</script>

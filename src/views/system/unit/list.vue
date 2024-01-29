<template>
  <pages-list :columns="columns" :get-data="() => getMetadata('unit')">
    <template #buttons>
      <quick-add title="新增仓库" v-model:data="data" :submit="addWarehouse">
        <form-item label="仓库名" required path="name">
          <n-input v-model:value="data.name"></n-input>
        </form-item>
        <form-item label="英文名" path="ename">
          <n-input v-model:value="data.enName"></n-input>
        </form-item>
      </quick-add>
    </template>
  </pages-list>
</template>

<script setup lang="ts">
  import { addWarehouse, getMetadata } from '@/api/system.ts';
  import { renderTableSwitch } from '@/utils/render.tsx';
  import { Metadata } from '%/database/model/metadata.ts';

  const data = ref({});

  const columns = [
    { title: '仓库', key: 'name' },
    { title: '英文名', key: 'enName' },
    { title: 'Code', key: 'code' },
    // {
    //   title: '创建时间',
    //   key: 'createdAt',
    //   render(row: { createdAt: Date }) {
    //     return formatDate(row.createdAt);
    //   },
    // },
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

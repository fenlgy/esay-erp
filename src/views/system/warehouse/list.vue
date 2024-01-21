<template>
  <pages-list :columns="columns" :get-data="getWarehouse">
    <template #buttons>
      <quick-add title="新增仓库" v-model:data="data" :submit="addWarehouse">
        <form-item label="仓库名" required path="name">
          <n-input v-model:value="data.name"></n-input>
        </form-item>
        <form-item label="英文名" path="ename">
          <n-input v-model:value="data.ename"></n-input>
        </form-item>
      </quick-add>
    </template>
  </pages-list>
</template>

<script setup lang="ts">
  import { addWarehouse, deleteWarehouse, getWarehouse } from '@/api/system.ts';
  import { renderTableSwitch } from '@/utils/render.tsx';
  import { GoodsDetail } from '@/api/products.ts';
  import TableActionButtons from '@/components/basic/button/table-action-buttons.vue';
  import { formatDate } from '@/utils/formatter.ts';

  const data = ref({});

  const columns = [
    { title: '仓库', key: 'name' },
    { title: '英文名', key: 'ename' },
    {
      title: '创建时间',
      key: 'createdTime',
      render(row: { createdTime: number }) {
        return formatDate(row.createdTime);
      },
    },
    {
      title: '启用',
      key: 'disabled',
      render(row: { id: number; disabled: number }) {
        return h(renderTableSwitch(row, 'warehouse'));
      },
    },
    {
      title: '操作',
      width: 100,
      render(row: GoodsDetail) {
        return h(TableActionButtons, {
          buttons: [
            { type: 'edit', to: `/goods/detail/${row.id}` },
            { type: 'delete', onDelete: () => handleDelete(row.id) },
          ],
        });
      },
    },
  ];

  const handleDelete = (id: number) => {
    return deleteWarehouse(id);
  };
</script>

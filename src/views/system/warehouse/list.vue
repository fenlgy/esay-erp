<template>
  <pages-list :columns="columns" :get-data="getWarehouse">
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
  import { addWarehouse, deleteWarehouse, getWarehouse } from '@/api/system.ts';
  import { renderTableSwitch } from '@/utils/render.tsx';
  import TableActionButtons from '@/components/basic/button/table-action-buttons.vue';
  import { formatDate } from '@/utils/formatter.ts';
  import { Warehouse } from '%/database/model/warehouse.ts';

  const data = ref(<Warehouse>{});

  const columns = [
    { title: '仓库', key: 'name' },
    { title: '英文名', key: 'enName' },
    {
      title: '创建时间',
      key: 'createdAt',
      render(row: { createdAt: Date }) {
        return formatDate(row.createdAt);
      },
    },
    {
      title: '启用',
      key: 'disabled',
      render(row: { id: number; disabled: number }) {
        return h(renderTableSwitch(row, Warehouse));
      },
    },
    {
      title: '操作',
      width: 100,
      render(row: Warehouse) {
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

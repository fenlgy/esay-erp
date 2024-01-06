<template>
  <pages-list :columns="columns" :get-data="getUnitList">
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

import { addWarehouse, deleteWarehouse, getUnitList } from "@/api/system.ts";
import {  renderTableSwitch } from "@/utils/render.tsx";
import { GoodsDetail } from "@/api/products.ts";
import TableActionButtons from "@/components/basic/button/table-action-buttons.vue";

const data = ref({});

const columns = [
  { title: "仓库", key: "name" },
  { title: "英文名", key: "ename" },
  { title: "创建时间", key: "createdTime" },
  {
    title: "启用", key: "disabled", render(row) {
      // return h(renderEnableOrDisableTag(!row.disabled));
      return h(renderTableSwitch(row, "basic"));
    }
  },
  {
    title: "操作", width: 100, render(row: GoodsDetail) {
      return h(TableActionButtons, {
        buttons: [
          { type: "edit", to: `/goods/detail/${row.id}` },
          { type: "delete", onDelete: () => handleDelete(row.id) }
        ]
      });
    }
  }
];

const handleDelete = (id: number) => {
  return deleteWarehouse(id);
};

</script>
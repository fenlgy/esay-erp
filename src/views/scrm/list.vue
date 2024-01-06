<template>
  <pages-list :columns="columns" :get-data="getScrmList">
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

import { addWarehouse, deleteWarehouse } from "@/api/system.ts";
import { renderTableSwitch } from "@/utils/render.tsx";
import { GoodsDetail } from "@/api/products.ts";
import TableActionButtons from "@/components/basic/button/table-action-buttons.vue";
import { getScrmList, SCInfo } from "@/api/scrm.ts";
import ScTypeTag from "@/components/basic/tag/sc-type-tag.vue";
import ScNatureTag from "@/components/basic/tag/sc-nature-tag.vue";

const data = ref({});

const columns = [
  { title: "名称", key: "name" },
  {
    title: "类型", key: "type",
    render(row:SCInfo) {
      return h(ScTypeTag,{type:row.type});
    }
  },
  { title: "性质", key: "isPersonal",render(row:SCInfo){
    return h(ScNatureTag,{type:row.isPersonal})
    } },
  { title: "创建时间", key: "createdTime" },
  {
    title: "启用", key: "disabled", render(row: SCInfo) {
      return h(renderTableSwitch(row, "scrm"));
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
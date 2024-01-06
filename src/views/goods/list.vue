<template>
  <pages-list :columns="columns" :get-data="getProducts">
    <template #buttons>
      <quick-add title="新增" v-model:data="data" :submit="addProduct">
        <form-item label="品名" path="name" required>
          <n-input v-model:value="data.name" />
        </form-item>
        <form-item label="英文名称" path="ename">
          <n-input v-model:value="data.ename" />
        </form-item>
        <form-item label="单位" path="unit" required>
          <unit-select v-model:value="data.unit" />
        </form-item>
        <form-item label="SKU" path="sku" required>
          <n-input v-model:value="data.sku" />
        </form-item>
      </quick-add>
      <!--      <btn type="primary" secondary to="/goods/detail/">新增</btn>-->
    </template>
  </pages-list>
</template>

<script setup lang="ts">
import { addProduct, deleteProduct, getProducts, GoodsDetail } from "@/api/products.ts";
import { GoodsInfo } from "@/views/goods/typs.ts";
import { renderEnableOrDisableTag } from "@/utils/render.tsx";
import Btn from "@/components/basic/button/btn.vue";
import { timeFormat } from "@/utils/common.ts";
import PagesList from "@/components/pages/pages-list.vue";
import TableActionButtons from "@/components/basic/button/table-action-buttons.vue";
import TableColumnsSwitch from "@/components/basic/switch/table-columns-switch.vue";

const hh = ref(0);
const data = ref(<GoodsDetail>{});
const columns = [
  {
    title: "品名", key: "name", render(row: GoodsDetail) {
      return h(Btn, {
        size: "small",
        text: true,
        tag: "a",
        to: `/goods/detail/${row.id}`,
        type: "primary"
      }, { default: () => row.name });
    }
  },
  { title: "英文名", key: "ename" },
  { title: "单位", key: "unit" },
  { title: "SKU", key: "sku" },
  {
    title: "启用", key: "disabled",
    render(row: GoodsInfo) {
      return h(TableColumnsSwitch,
        {
          modelValue: row.disabled, ["onUpdate:modelValue"]: (val) => (row.disabled = val),
          id: row.id, databaseTableName: "products"
        });
    }
  },
  {
    title: "创建时间", key: "createdTime", render(row: GoodsDetail) {
      return timeFormat(<number>row.createdTime);
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

const handleDelete = async (id: number) => {
  await deleteProduct(id);
};

</script>

<style scoped>

</style>
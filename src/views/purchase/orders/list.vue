<template>
  <pages-list :get-data="getPurchaseOrderList" :columns="columns">
    <template #buttons>
      <n-button @click="handleAddOrder">新增</n-button>
    </template>
  </pages-list>
  <edit :id="orderId" v-model:show="showEdit" />

</template>

<script setup lang="ts">

import { getPurchaseOrderList, PurchaseOrder } from "@/api/purchase.ts";
import Edit from "@/views/purchase/orders/edit.vue";
import { NButton } from "naive-ui";

const orderId = ref<number>();
const showEdit = ref();

const handleAddOrder = () => {
  orderId.value = undefined
  showEdit.value = true;
};
const handleEditOrder = (id: number) => {
  showEdit.value = true;
  orderId.value = id;
};
const columns = [
  {
    title: "订单号", key: "orderNumber", render(row: PurchaseOrder) {
      return h(NButton, {
        type: "primary",
        text: true,
        onClick: () => handleEditOrder(row.id)
      }, { default: () => row.orderNumber });
    }
  },
  { title: "供应商", key: "supplier" },
  { title: "订单日期", key: "orderDate" },
  { title: "货好日期", key: "goodsReadyDate" }
];

</script>
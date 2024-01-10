<template>
  <pages-list :get-data="getPurchaseOrderList" :columns="columns">
    <template #buttons>
      <edit/>
    </template>
  </pages-list>
</template>

<script setup lang="ts">

import { getPurchaseOrderList, PurchaseOrder } from "@/api/purchase.ts";
import { renderTableLinkButton } from "@/utils/render.tsx";
import Edit from "@/views/purchase/orders/edit.vue";


const columns = [
  {
    title: "订单号", key: "orderNumber", render(row: PurchaseOrder) {
      return h(renderTableLinkButton(`/purchase/order/edit/${row.id}`, row.orderNumber));
    }
  },
  { title: "供应商", key: "supplier" },
  { title: "订单日期", key: "orderDate" },
  { title: "货好日期", key: "goodsReadyDate" },
]




</script>
<template>
  <simple-page title="新增采购订单" :data="pageData" type="edit" :submit="handleSubmit">
    <n-card :bordered="false">
      <form-item required label="供应商" path="supplier">
        <supplier-select v-model:value="pageData.supplier" />
      </form-item>
      <form-item required label="订单日期" path="orderDate">
        <n-date-picker v-model:value="pageData.orderDate" />
      </form-item>
      <form-item required label="货好日期" path="goodsReadyDate">
        <n-date-picker v-model:value="pageData.goodsReadyDate" />
      </form-item>
      <form-item required label="采购清单" path="purchaseList">
        <n-input v-model:value="pageData.purchaseList" />
      </form-item>
    </n-card>
  </simple-page>
</template>

<script setup lang="ts">
import { generateSerialNumber } from "@/api/generateSerialNumber.ts";
import SupplierSelect from "@/components/basic/select/supplier-select.vue";
import { addPurchaseOrder, PurchaseOrder } from "@/api/purchase.ts";

// generateSerialNumber('purchaseOrder').then(item => console.log(item))

const pageData = ref(<PurchaseOrder>{});
const handleSubmit = async () => {
  pageData.value.orderNumber = <string>await generateSerialNumber("purchaseOrder");
  return addPurchaseOrder(pageData.value);
};
</script>

<style scoped>

</style>
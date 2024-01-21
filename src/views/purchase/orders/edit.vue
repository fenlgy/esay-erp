<template>
  <simple-page title="新增采购订单" :data="pageData" type="edit" :submit="handleSubmit" width="1100" v-model:show="show">
    <n-space vertical size="large">
      <n-card title="基本信息">
        <n-grid :cols="4" :x-gap="24">
          <n-grid-item>
            <form-item required label="供应商" path="supplier">
              <supplier-select v-model:value="pageData.supplier" />
            </form-item>
          </n-grid-item>
          <n-grid-item>
            <form-item required label="订单日期" path="orderDate">
              <n-date-picker v-model:value="pageData.orderDate" />
            </form-item>
          </n-grid-item>
          <n-grid-item>
            <form-item required label="货好日期" path="goodsReadyDate">
              <n-date-picker v-model:value="pageData.goodsReadyDate" />
            </form-item>
          </n-grid-item>
          <!--      <form-item required label="采购清单" path="purchaseIdList">-->
          <!--        <n-input v-model:value="pageData.purchaseIdList" />-->
          <!--      </form-item>-->
        </n-grid>
      </n-card>
      <n-card>
        <n-space vertical size="large">
          <n-page-header title="采购清单">
            <template #subtitle>币别：<currency-select v-model="pageData.currency" size="small" /></template>
          </n-page-header>
          <goods-list v-model:data="pageData.purchaseList" :currency="pageData.currency" />
        </n-space>
      </n-card>
    </n-space>
  </simple-page>
</template>

<script setup lang="ts">
  import SupplierSelect from '@/components/basic/select/supplier-select.vue';
  import { addPurchaseOrder, PurchaseOrder } from '@/api/purchase.ts';
  import GoodsList from '@/views/purchase/orders/component/goods-list.vue';
  import { getSumFromArr } from '@/utils/common.ts';

  const show = defineModel('show', {
    default: false,
  });

  const pageData = ref(<PurchaseOrder>{ purchaseList: [{}] });
  const handleSubmit = async () => {
    debugger;
    const total = getSumFromArr(pageData.value.purchaseList, ['quantity', 'subtotalPrice']);
    pageData.value.price = total.subtotalPrice;
    return addPurchaseOrder(pageData.value);
  };
</script>

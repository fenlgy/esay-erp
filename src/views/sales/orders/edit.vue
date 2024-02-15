<template>
  <simple-page title="新增采购订单" :data="pageData" type="edit" :submit="handleSubmit" width="1100" v-model:show="show">
    <n-space vertical size="large">
      <n-card title="基本信息">
        <n-grid :cols="4" :x-gap="24">
          <n-grid-item>
            <form-item required label="客户" path="client">
              <supplier-select v-model:value="pageData.client" />
            </form-item>
          </n-grid-item>
          <n-grid-item>
            <form-item required label="订单日期" path="orderDate">
              <n-date-picker v-model:value="pageData.orderDate" />
            </form-item>
          </n-grid-item>
          <n-grid-item>
            <form-item required label="货好日期" path="readyDay">
              <n-date-picker v-model:value="pageData.readyDay" />
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
          <goods-list v-model:data="pageData.goodsInOrder" :currency="pageData.currency" />
        </n-space>
      </n-card>
    </n-space>
  </simple-page>
</template>

<script setup lang="ts">
  import SupplierSelect from '@/components/basic/select/supplier-select.vue';
  import GoodsList from '@/views/purchase/orders/component/goods-list.vue';
  import { getSumFromArr } from '@/utils/common.ts';
  import { GoodsInOrder } from '%/database/model/goods-in-order.ts';
  import { addSalesOrder } from '@/api/sales.ts';
  import { SalesOrder } from '%/database/model/sales-order.ts';

  const show = defineModel('show', {
    default: false,
  });

  const pageData = ref(<SalesOrder>{ goodsInOrder: [{}] });
  const handleSubmit = async () => {
    const total = getSumFromArr(pageData.value.goodsInOrder, ['quantity', 'subtotalPrice']);
    pageData.value.goodsInOrder.forEach((item: GoodsInOrder) => (item.currency = pageData.value.currency));
    pageData.value.totalPrice = total.subtotalPrice;
    return addSalesOrder(pageData.value);
  };
</script>

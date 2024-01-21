<template>
  <pages-list :get-data="getPurchaseOrderList" :columns="columns">
    <template #buttons>
      <n-button @click="handleAddOrder" type="primary">新增</n-button>
    </template>
  </pages-list>
  <edit v-model:show="showEdit" />
  <detail v-model:show="showDetail" :id="orderId" />
</template>

<script setup lang="ts">
  import { getPurchaseOrderList, PurchaseOrder } from '@/api/purchase.ts';
  import Edit from '@/views/purchase/orders/edit.vue';
  import { NButton } from 'naive-ui';
  import dayjs from 'dayjs';
  import Detail from './ditail.vue';

  const orderId = ref<number>();
  const showEdit = ref();
  const showDetail = ref();

  const handleAddOrder = () => {
    orderId.value = undefined;
    showEdit.value = true;
  };
  const handleEditOrder = (id: number) => {
    showDetail.value = true;
    orderId.value = id;
  };
  const columns = [
    {
      title: '订单号',
      key: 'orderNumber',
      render(row: PurchaseOrder) {
        return h(
          NButton,
          {
            type: 'primary',
            text: true,
            onClick: () => handleEditOrder(row.id),
          },
          { default: () => row.orderNumber }
        );
      },
    },
    { title: '供应商', key: 'supplier' },
    {
      title: '订单日期',
      key: 'orderDate',
      render(row) {
        return dayjs(row.orderDate).format('YYYY-MM-DD');
      },
    },
    {
      title: '货好日期',
      key: 'goodsReadyDate',
      render(row) {
        return dayjs(row.goodsReadyDate).format('YYYY-MM-DD');
      },
    },
  ];
</script>

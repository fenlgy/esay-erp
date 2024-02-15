<template>
  <pages-list :get-data="getSalesOrderList" :columns="columns">
    <template #buttons>
      <n-button @click="handleAddOrder" type="primary">新增</n-button>
    </template>
  </pages-list>
  <edit v-model:show="showEdit" v-if="mountedEdit" />
  <detail v-model:show="showDetail" :id="orderId" v-if="mountedDetail" />
</template>

<script setup lang="ts">
  import { getSalesOrderList } from '@/api/sales.ts';
  import Edit from './edit.vue';
  import { NButton } from 'naive-ui';
  import dayjs from 'dayjs';
  import Detail from './ditail.vue';
  import { SalesOrder } from '%/database/model/sales-order.ts';

  const orderId = ref<number>();
  const showEdit = ref();
  const showDetail = ref();
  const mountedDetail = ref(false);
  const mountedEdit = ref(false);

  const handleAddOrder = () => {
    mountedEdit.value = true;
    nextTick(() => {
      showEdit.value = true;
    });
  };
  const handleEditOrder = (id: number) => {
    orderId.value = id;
    mountedDetail.value = true;
    nextTick(() => {
      showDetail.value = true;
    });
  };
  const columns = [
    {
      title: '订单号',
      key: 'orderNumber',
      render(row: SalesOrder) {
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
    { title: '客户', key: 'client' },
    { title: '币别', key: 'currency' },
    {
      title: '总金额',
      key: 'totalPrice',
    },
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

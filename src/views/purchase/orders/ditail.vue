<template>
  <simple-page
    title="订单详情"
    :subtitle="pageData.orderNumber"
    :data="pageData"
    type="edit"
    :submit="handleSubmit"
    width="1100"
    v-model:show="show"
  >
    <template #headerExtra>
      <btn @click="handleDelete">删除</btn>
    </template>
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
            <template #subtitle>币别：<currency-select v-model="currency" size="small" /></template>
          </n-page-header>
          <goods-list v-model:data="pageData.purchaseList" :currency="currency" />
        </n-space>
      </n-card>
    </n-space>
  </simple-page>
</template>

<script setup lang="ts">
  import SupplierSelect from '@/components/basic/select/supplier-select.vue';
  import { deletePurchaseOrder, getPurchaseOrderDetail, PurchaseOrder, updatePurchaseOrder } from '@/api/purchase.ts';
  import GoodsList from '@/views/purchase/orders/component/goods-list.vue';

  const props = defineProps<{
    id: number;
  }>();
  const show = defineModel('show', {
    default: false,
  });

  const currency = ref();

  const pageData = ref(<PurchaseOrder>{ purchaseList: [{}] });
  const handleSubmit = async () => {
    return updatePurchaseOrder(pageData.value);
  };

  const message = useMessage();
  const handleDelete = async () => {
    const res = await deletePurchaseOrder({
      id: props.id,
      orderNumber: pageData.value.orderNumber,
    });
    if (res.error) {
    }
    message.success('删除成功！');
    $myReload();
  };

  watch(show, (v) => {
    if (v && props.id) {
      getPurchaseOrderDetail(props.id).then((res) => {
        console.log(res);
        pageData.value = res;
      });
    }
  });
</script>

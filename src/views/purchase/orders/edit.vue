<template>
  <simple-page title="新增采购订单" :data="pageData" type="edit" :submit="handleSubmit" width="1000"
               v-model:show="show">
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
      <!--      <form-item required label="采购清单" path="purchaseIdList">-->
      <!--        <n-input v-model:value="pageData.purchaseIdList" />-->
      <!--      </form-item>-->
    </n-card>
    <n-card :bordered="false" title="采购清单">
      <goods-list v-model:data="pageData.purchaseList" />
    </n-card>
  </simple-page>
</template>

<script setup lang="ts">
import SupplierSelect from "@/components/basic/select/supplier-select.vue";
import { addPurchaseOrder, getPurchaseOrderDetail, PurchaseOrder } from "@/api/purchase.ts";
import GoodsList from "@/views/purchase/orders/component/goods-list.vue";

// generateSerialNumber('purchaseOrder').then(item => console.log(item))
const props = defineProps<{
  id?: number
}>();
const show = defineModel("show", {
  default: false
});

const pageData = ref(<PurchaseOrder>{ purchaseList: [{}] });
const handleSubmit = async () => {
  return addPurchaseOrder(pageData.value);
};


watch(show,(v)=>{
  if(v && props.id){
    getPurchaseOrderDetail(props.id).then(res => {
      console.log(res);
      pageData.value = res;

    });
  }
})

</script>
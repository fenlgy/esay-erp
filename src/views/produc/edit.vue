<template>
  <n-layout>
    <n-layout-header bordered>
      <n-page-header :subtitle="pageData.enName" @back="handleBack">
        <template #title> 新增商品 </template>
      </n-page-header>
    </n-layout-header>
    <n-layout-content>
      <n-form ref="formRef" :label-width="80" :model="pageData">
        <n-grid :cols="24" x-gap="16">
          <n-form-item-gi label="品名" path="name" :span="8">
            <n-input v-model:value="pageData.name" />
          </n-form-item-gi>
          <n-form-item-gi label="英文名称" path="ename" :span="8">
            <n-input v-model:value="pageData.enName" />
          </n-form-item-gi>
          <n-form-item-gi label="单位" path="unit" :span="8">
            <unit-select v-model:value="pageData.unit" />
          </n-form-item-gi>
          <n-form-item-gi label="SKU" path="sku" :span="8">
            <n-input v-model:value="pageData.sku" />
          </n-form-item-gi>
          <n-switch v-model:value="pageData.disabled" />
        </n-grid>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick"> 验证 </n-button>
        </n-form-item>
      </n-form>
    </n-layout-content>
    <n-layout-footer>
      <n-space size="small" justify="end">
        <btn type="primary" @click="handleSubmit">提交</btn>
        <btn @click="handleDelete">删除</btn>
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
  import { deleteProduct, getProductsDetail, updateProducts } from '@/api/products.ts';
  import { Product } from '%/database/model/product.ts';

  const router = useRouter();
  const route = useRoute();
  const handleBack = () => {
    router.go(-1);
  };

  const id = route.params.id;

  const pageData = ref<Product>(<Product>{});
  const getPageData = async () => {
    pageData.value = <Product>await getProductsDetail(Number(id));
  };

  id && getPageData();

  const handleSubmit = async () => {
    console.log(pageData.value);
    const res = await updateProducts(<Product>pageData.value);
    if (!res.error) {
      handleBack();
    }
    // pageData.value.changed('enName', true);
  };

  const handleDelete = async () => {
    const res = await deleteProduct(id[0]);
    if (!res.error) {
      handleBack();
    }
  };

  const handleValidateClick = () => {};
</script>

<style scoped></style>

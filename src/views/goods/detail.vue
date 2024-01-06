<template>
  <n-layout>
    <n-layout-header bordered>
      <n-page-header :subtitle="pageData.ename" @back="handleBack">
        <template #title>
          {{ pageData.name }}
        </template>
        <template #extra>
          <n-space>
            <n-button>催更</n-button>
          </n-space>
        </template>

      </n-page-header>
    </n-layout-header>
    <n-layout-content>
      {{ pageData.name }}
      <n-input v-model:value="pageData.name"></n-input>
      <n-input v-model:value="pageData.ename"></n-input>
      <n-input v-model:value="pageData.sku"></n-input>
      <n-input v-model:value="pageData.unit"></n-input>
      <n-input v-model:value="pageData.disabled"></n-input>
      <n-switch v-model:value="pageData.disabled" />
    </n-layout-content>
    <n-layout-footer>
      <n-space size="small" justify="end">
        <btn type="primary" @click="handleSubmit">提交</btn>
        <btn>保存草稿</btn>
      </n-space>
    </n-layout-footer>
  </n-layout>


</template>

<script setup lang="ts">
import { getProductsDetail, GoodsDetail, updateProducts } from "@/api/products.ts";

const router = useRouter();
const route = useRoute();
const handleBack = () => {
  router.go(-1);
};

const id = route.params.id

const pageData = ref(<GoodsDetail>{});
const getPageData = async () => {
  pageData.value = await getProductsDetail(Number(id));
  console.log(pageData.value);
};


id && getPageData();

const handleSubmit = () => {
  console.log(pageData.value);
  updateProducts(pageData.value);
};

</script>

<style scoped>

</style>
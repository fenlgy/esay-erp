<template>
  <simple-page title="新增客商" :data="pageData" :submit="handleSubmit" width="500">
    <n-card :bordered="false">
      <n-row>
        <n-col :span="12">
          <form-item label="类型" path="nature">
            <sc-nature-radio v-model:value="pageData.nature"></sc-nature-radio>
          </form-item>
        </n-col>
        <n-col :span="12">
          <form-item required label="性质" path="type">
            <sc-type-checkbox v-model:value="pageData.type" />
          </form-item>
        </n-col>
      </n-row>
      <form-item required :label="isPersonal ? '姓名':'企业名称'" path="name">
        <n-input v-model:value="pageData.name"></n-input>
      </form-item>
      <form-item label="公司编码" path="name" v-if="!isPersonal">
        <n-input v-model:value="pageData.code"></n-input>
      </form-item>


      <form-item :label="isPersonal ?'身份证': '社会统一信用代码'" path="nature">
        <n-input v-model:value="pageData.uniqueId"></n-input>
      </form-item>
    </n-card>
  </simple-page>
</template>

<script setup lang="ts">

import PagesEdit from "@/components/pages/pages-edit.vue";
import ScTypeCheckbox from "@/components/basic/checkbox/sc-type-checkbox.vue";
import { addScrm, getScrmList, SCInfo } from "@/api/scrm.ts";

const route = useRoute();
const id = route.params.id;
const pageData = ref(<SCInfo>{
  nature: 1
});

const isPersonal = ref();
watch(() => pageData.value.nature, (newVal) => {
  isPersonal.value = newVal !== 1;
});

const getPageData = async () => {
  const res = await getScrmList({ id: id[0] });
  console.log(res);
  pageData.value = res.data[0];
};
console.log("id", id);
id && getPageData();


const handleSubmit = () => {
  console.log(pageData.value);

  return addScrm(pageData.value);
};
</script>
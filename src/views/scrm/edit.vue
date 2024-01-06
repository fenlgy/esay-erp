<template>
  <pages-edit title="新增客商" :data="pageData">
    <n-space vertical>
      <n-card title="基本信息" :content-style="{padding:0}" :bordered="false">
        <form-item label="类型" path="nature">
          <sc-nature-radio v-model:value="pageData.nature"></sc-nature-radio>
        </form-item>
        <form-item required :label="isPersonal ? '姓名':'企业名称'" path="name">
          <n-input v-model:value="pageData.name"></n-input>
        </form-item>
        <form-item label="公司编码" path="name" v-if="!isPersonal">
          <n-input v-model:value="pageData.code"></n-input>
        </form-item>
        <form-item required label="性质" path="type">
          <sc-type-checkbox v-model:value="pageData.type" />
        </form-item>

        <form-item :label="isPersonal ?'身份证': '社会统一信用代码'" path="nature">
          <n-input v-model:value="pageData.uniqueId"></n-input>
        </form-item>
      </n-card>
      <n-card>
        <n-tabs type="card">
          <n-tab-pane name="dd" tab="银行信息">
            <bank-management/>
          </n-tab-pane>
          <n-tab-pane name="dd3" tab="联系信息">ewe</n-tab-pane>
        </n-tabs>
      </n-card>
    </n-space>
  </pages-edit>
</template>

<script setup lang="ts">

import PagesEdit from "@/components/pages/pages-edit.vue";
import ScTypeCheckbox from "@/components/basic/checkbox/sc-type-checkbox.vue";
import { getScrmList, SCInfo } from "@/api/scrm.ts";
import ChildrenLlistInfo from "@/components/combination/children-llist-info.vue";

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
  const res = await getScrmList({ id: id });
  console.log(res);
};
id || getPageData();

</script>
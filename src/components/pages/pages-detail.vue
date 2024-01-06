<template>
  <n-layout>
    <n-layout-header bordered>
      <n-page-header title="商品详情" subtitle="PO2893972300" @back="handleBack">
        <template #extra>
          <n-space size="small">
            <n-button type="primary">完成</n-button>
            <n-button type="primary" secondary>完成</n-button>
            <n-button secondary>
              <template #icon>
                <n-icon :component="DotsVertical" />
              </template>
            </n-button>
          </n-space>

        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout-content>
      22
    </n-layout-content>

  </n-layout>
</template>

<script setup lang="ts">

import { DotsVertical } from "@vicons/tabler";
import { getScrmList, SCInfo } from "@/api/scrm.ts";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
console.log(id);
const pageData = ref<SCInfo>(<SCInfo>{});
const getPageData = async () => {
  const res = await getScrmList({ id: id });
  console.log(res);
};
id || getPageData();

const handleBack = () => {
  router.go(-1);
}
</script>

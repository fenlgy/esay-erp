<template>
  <n-space vertical>
    <n-card :bordered="false" size="small">
      <n-space vertical size="large">
        <n-space size="small">
          <btn-refresh-page />
          <slot name="buttons"></slot>
        </n-space>
        <n-data-table
          :loading="isLoading"
          :columns="columns"
          :data="data"
          :pagination="{
          pageSize:10
        }"
          :bordered="false"
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { TableColumns } from "naive-ui/es/data-table/src/interface";
import { MyResponseWithData } from "@/utils/types.ts";

const props = withDefaults(defineProps<{
  columns: TableColumns
  getData: () => any[]
}>(), {});

const isLoading = ref();
const data = ref();

const queryData = async () => {
  isLoading.value = true;
  const res = <MyResponseWithData<any[]>>await props.getData();
  isLoading.value = false;
  data.value = res.data;
  console.log(res.data);
};
queryData()
</script>

<style scoped>

</style>
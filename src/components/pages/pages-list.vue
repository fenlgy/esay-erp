<template>
  <n-space vertical>
    <n-card :bordered="false" size="small">
      <n-space vertical size="large">
        <n-space size="small">
          <refresh-page-btn />
          <slot name="buttons"></slot>
        </n-space>
        <n-data-table
          :loading="isLoading"
          :columns="columns"
          :data="data"
          :pagination="{
            pageSize: 10,
          }"
          :bordered="false"
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
  import { TableColumns } from 'naive-ui/es/data-table/src/interface';

  const props = withDefaults(
    defineProps<{
      columns: TableColumns;
      getData: () => any[];
    }>(),
    {}
  );

  const isLoading = ref();
  const data = ref();

  const queryData = async () => {
    isLoading.value = true;
    data.value = await props.getData();
    isLoading.value = false;
    // data.value = res.data ?? res;
    // console.log(data.value);
  };
  queryData();
</script>

<style scoped></style>

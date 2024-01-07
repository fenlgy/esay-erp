<template>
  <n-space vertical>
    <n-form :model="data">
      <n-data-table
        size="small"
        :loading="isLoading"
        :columns="columns"
        :data="data"
        :bordered="false"
      />
    </n-form>
    <n-button type="primary" @click="handleAdd">
      <template #icon>
        <n-icon>
          <FileAddTwotone />
        </n-icon>
      </template>
      新增
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { TableColumns } from "naive-ui/es/data-table/src/interface";
import { AnyObject } from "@/utils/types.ts";
import { FileAddTwotone } from "@vicons/antd";

const props = withDefaults(defineProps<{
  columns: TableColumns
  data: AnyObject[]
}>(), {});

const row = props.columns.reduce((pre, cur: { key: any }) => {
  pre[cur.key] = null;
  return pre;
}, <AnyObject>{});

const handleAdd = () => {
  props.data.push({ ...row });
};
const isLoading = ref(false);
</script>

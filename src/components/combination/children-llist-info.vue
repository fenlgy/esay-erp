<template>
  <n-space vertical>
    <n-form>
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
import { TableColumn, TableColumns } from "naive-ui/es/data-table/src/interface";
import { AnyObject } from "@/utils/types.ts";
import { FileAddTwotone } from "@vicons/antd";

const props = withDefaults(defineProps<{
  columns: TableColumns
  data: AnyObject[]
}>(), {});

const row = props.columns.map((item: TableColumn) => {
  return {
    [item.key]: null
  };
});

const handleAdd = () => {
  props.data.push({...row})
};
console.log(row);
const isLoading = ref(false);
</script>

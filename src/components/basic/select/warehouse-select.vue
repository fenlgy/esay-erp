<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">
  import { getSelectOptions } from '@/utils/common.ts';
  import { getWarehouse } from '@/api/system.ts';
  import { Warehouse } from '%/database/model/warehouse.ts';

  const options = ref<Warehouse[]>([]);
  const setOption = async () => {
    const response = await getWarehouse();
    options.value = getSelectOptions(
      <Warehouse[]>response,
      'name',
      'name',
      {},
      {
        ignore: {
          disabled: true,
        },
      }
    );
  };

  setOption();
</script>

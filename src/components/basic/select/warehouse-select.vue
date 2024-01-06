<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">

import { getSelectOptions } from "@/utils/common.ts";
import { getWarehouse, WareHouseInfo } from "@/api/system.ts";

const options = ref<WareHouseInfo[]>([]);
const setOption = async () => {
  const response = await getWarehouse();
  if (response.error) {
    console.error(response.error);
  } else {
    options.value = getSelectOptions(<WareHouseInfo[]>response.data, "name", "name", {}, {
      ignore: {
        disabled: 1
      }
    });
  }
};

setOption();
</script>
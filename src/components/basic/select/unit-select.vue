<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">

import { getUnit, MetadataUnit } from "@/api/metadata.ts";
import { getSelectOptions } from "@/utils/common.ts";

const options = ref<MetadataUnit[]>([]);
const setOption = async () => {
  const response = await getUnit();
  if (response.error) {
    console.error(response.error);
  } else {
    options.value = getSelectOptions(<MetadataUnit[]>response.data, "name", "name", {}, {
      ignore: {
        disabled: 1
      }
    });
  }
};

setOption();
</script>
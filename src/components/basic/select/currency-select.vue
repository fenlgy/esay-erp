<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">

import { getCurrency, Metadata } from "@/api/metadata.ts";
import { getSelectOptions } from "@/utils/common.ts";

const options = ref<Metadata[]>([]);
const setOption = async () => {
  const response = await getCurrency();
  if (response.error) {
    console.error(response.error);
  } else {
    options.value = getSelectOptions(<Metadata[]>response.data, "code", "code", {}, {
      ignore: {
        disabled: 1
      }
    });
  }
};

setOption();
</script>
<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">

import { getSelectOptions } from "@/utils/common.ts";
import { getScrmList } from "@/api/scrm.ts";
import { SelectOption } from "naive-ui";

const options = ref<SelectOption[]>([]);
const setOption = async () => {
  const response = await getScrmList({type:2});
  if (response.error) {
    console.error(response.error);
  } else {
    options.value = getSelectOptions(response.data, "name", "name", {}, {
      ignore: {
        disabled: 1
      }
    });
  }
};

setOption();
</script>
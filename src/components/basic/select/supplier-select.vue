<template>
  <n-select :options="options" filterable v-bind="$attrs"></n-select>
</template>

<script setup lang="ts">
  import { getSelectOptions } from '@/utils/common.ts';
  import { getScrmList } from '@/api/scrm.ts';
  import { SelectOption } from 'naive-ui';
  import { Op } from '@sequelize/core';

  const options = ref<SelectOption[]>([]);
  const setOption = async () => {
    // const response = await getScrmList([{type:2},{type:0}]);
    const response = await getScrmList({ where: { [Op.or]: { type: [0, 2] } } });
    options.value = getSelectOptions(
      response,
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

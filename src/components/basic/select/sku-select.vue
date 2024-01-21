<template>
  <n-select :options="options" filterable v-bind="$attrs" ref="selectRef">
    <template #action>
      <n-space align="center">
        <n-input v-if="show" size="small"></n-input>
        <n-button size="small" type="primary" @click="hideInput" v-if="show">确定</n-button>
        <n-button size="small" type="default" @click="hideInput" v-if="show">取消</n-button>
        <n-button size="tiny" text @click="handleAdd" v-if="!show">+ 添加单位</n-button>
      </n-space>
    </template>
  </n-select>
</template>

<script setup lang="ts">
  import { Metadata } from '@/api/metadata.ts';
  import { getSelectOptions } from '@/utils/common.ts';
  import { getProducts } from '@/api/products.ts';

  const selectRef = ref();
  const options = ref<Metadata[]>([]);
  const setOption = async () => {
    const response = await getProducts();
    if (response.error) {
      console.error(response.error);
    } else {
      options.value = getSelectOptions(
        <Metadata[]>response.data,
        'name',
        'name',
        {},
        {
          ignore: {
            disabled: 1,
          },
        }
      );
    }
  };

  setOption();

  const show = ref(false);

  const handleAdd = () => {
    selectRef.value?.focus();
    show.value = true;
  };

  const hideInput = () => {
    selectRef.value?.focus();
    show.value = false;
  };

  const handleBlur = () => {
    // show.value = false
  };
</script>

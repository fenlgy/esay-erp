<template>
  <n-form :model="data">
    <n-data-table :data="data" :columns="columns" :loading="isLoading" size="small" />
  </n-form>
</template>

<script setup lang="ts">
import { AnyObject } from "@/utils/types.ts";
import { h } from "vue";
import InputFormItem from "@/components/basic/form/input-form-item.vue";
import TableActionButtons from "@/components/basic/button/table-action-buttons.vue";
import FormItem from "@/components/basic/form/form-item.vue";
import SkuSelect from "@/components/basic/select/sku-select.vue";

const data = defineModel<AnyObject[]>("data", {
  default: [{}]
});

const isLoading = ref(false);
const columns = [
  {
    title: "品名", key: "name", width: 160, render(row, index: number) {
      return h(FormItem, {
        path: `${index}.sku`,
        required: true
      }, {
        default: () => h(SkuSelect, {
          value: row.name, consistentMenuWidth: false,
          "onUpdate:value": (v: string,i) => {
            console.log(i)
            row.name = v
            row.sku = i.sku;
            row.unit = i.unit;
          }
        })
      });
    }
  },
  { title: "SKU", key: "sku" },
  { title: "单位", key: "unit" },
  {
    title: "操作", key: "name", width: 90, render(row, index) {
      return h(TableActionButtons, {
        buttons: [
          { type: "add", onClick: () => data.value.push({}) },
          {
            type: "delete", popConfirm: { reload: false }, show: data.value.length > 1,
            onDelete: () => {
              data.value.splice(index, 1);
            }
          }]
      });
    }
  }
];
watch(() => data, (v) => console.log(v));
</script>

<style scoped>

</style>
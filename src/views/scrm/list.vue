<template>
  <pages-list :columns="columns" :get-data="getScrmList">
    <template #buttons>
      <edit/>
    </template>
  </pages-list>


</template>
<script setup lang="ts">

import { renderTableLinkButton, renderTableSwitch } from "@/utils/render.tsx";
import { GoodsDetail } from "@/api/products.ts";
import TableActionButtons from "@/components/basic/button/table-action-buttons.vue";
import { getScrmList, SCInfo } from "@/api/scrm.ts";
import ScTypeTag from "@/components/basic/tag/sc-type-tag.vue";
import ScNatureTag from "@/components/basic/tag/sc-nature-tag.vue";
import Edit from "@/views/scrm/edit.vue";

const data = ref({});
const columns = [
  {
    title: "名称", key: "name", render(row: SCInfo) {
      return h(renderTableLinkButton(`/scrm/edit/${row.id}`, row.name));
    }
  },
  {
    title: "类型", key: "type",
    render(row: SCInfo) {
      return h(ScTypeTag, { type: row.type });
    }
  },
  {
    title: "性质", key: "nature", render(row: SCInfo) {
      return h(ScNatureTag, { type: row.nature });
    }
  },
  { title: "创建时间", key: "createdTime" },
  {
    title: "启用", key: "disabled", render(row: SCInfo) {
      return h(renderTableSwitch(row, "scrm"));
    }
  },
  {
    title: "操作", width: 60, render(row: GoodsDetail) {
      return h(TableActionButtons, {
        buttons: [
          { type: "edit", to: `/scrm/edit/${row.id}` },
        ]
      });
    }
  }
];

</script>
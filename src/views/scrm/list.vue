<template>
  <pages-list :columns="columns" :get-data="getScrmList">
    <template #buttons>
      <btn type="primary" @click="handleUseNextShowClick">新增</btn>
    </template>
  </pages-list>
  <edit v-model:show="nextShow" v-if="immediatelyShow" />
</template>
<script setup lang="ts">
  import { renderTableLinkButton, renderTableSwitch } from '@/utils/render.tsx';
  import TableActionButtons from '@/components/basic/button/table-action-buttons.vue';
  import { getScrmList } from '@/api/scrm.ts';
  import ScTypeTag from '@/components/basic/tag/sc-type-tag.vue';
  import ScNatureTag from '@/components/basic/tag/sc-nature-tag.vue';
  import Edit from '@/views/scrm/edit.vue';
  import { Cs } from '%/database/model/cs.ts';
  import { formatDate } from '@/utils/formatter.ts';
  import { useNextShow } from '@/views/hook/useNextShow.ts';

  const { handleUseNextShowClick, immediatelyShow, nextShow } = useNextShow();

  const columns = [
    {
      title: '名称',
      key: 'name',
      render(row: Cs) {
        return h(renderTableLinkButton(`/scrm/edit/${row.id}`, row.name));
      },
    },
    {
      title: '类型',
      key: 'type',
      render(row: Cs) {
        return h(ScTypeTag, { type: row.type });
      },
    },
    {
      title: '性质',
      key: 'nature',
      render(row: Cs) {
        return h(ScNatureTag, { type: row.nature });
      },
    },
    {
      title: '创建时间',
      key: 'createdAt',
      render(row: { createdAt: Date }) {
        return formatDate(row.createdAt);
      },
    },
    {
      title: '启用',
      key: 'disabled',
      render(row: Cs) {
        return h(renderTableSwitch(row, Cs));
      },
    },
    {
      title: '操作',
      width: 60,
      render(row: Cs) {
        return h(TableActionButtons, {
          buttons: [{ type: 'edit', to: `/scrm/edit/${row.id}` }],
        });
      },
    },
  ];
</script>

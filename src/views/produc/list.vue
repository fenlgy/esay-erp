<template>
  <pages-list :columns="columns" :get-data="getProducts">
    <template #buttons>
      <quick-add title="新增" v-model:data="data" :submit="addProduct">
        <form-item label="品名" path="name" required>
          <n-input v-model:value="data.name" />
        </form-item>
        <!--        <form-item label="英文名称" path="ename">-->
        <!--          <n-input v-model:value="data.ename" />-->
        <!--        </form-item>-->
        <form-item label="单位" path="unit" required>
          <unit-select v-model:value="data.unit" />
        </form-item>
        <form-item label="SKU" path="sku" required>
          <n-input v-model:value="data.sku" />
        </form-item>
      </quick-add>
      <import-template :header-mapping="{ 订单号: 'orderNo', 订单类型: 'orderType' }" @uploaded="(data) => console.log(data)"
        >批量导入</import-template
      >
      <!--      <btn type="primary" secondary to="/goods/detail/">新增</btn>-->
    </template>
  </pages-list>
</template>

<script setup lang="ts">
  import { addProduct, deleteProduct, getProducts } from '@/api/products.ts';
  import PagesList from '@/components/pages/pages-list.vue';
  import TableActionButtons from '@/components/basic/button/table-action-buttons.vue';
  import { renderTableLinkButton, renderTableSwitch } from '@/utils/render.tsx';
  import { Product } from '%/database/model/product.ts';
  import { formatDate } from '@/utils/formatter.ts';

  const data = ref(<Product>{});
  const columns = [
    {
      title: '品名',
      key: 'name',
      render(row: Product) {
        return h(renderTableLinkButton(`/product/detail/${row.id}`, row.name));
      },
    },
    { title: '英文名', key: 'enName' },
    { title: '单位', key: 'unit' },
    { title: 'SKU', key: 'sku' },
    {
      title: '启用',
      key: 'disabled',
      render(row: Product) {
        return h(renderTableSwitch(row, Product));
      },
    },
    {
      title: '创建日期',
      key: 'createdAt',
      render(row: { createdAt: Date }) {
        return formatDate(row.createdAt);
      },
    },
    {
      title: '操作',
      width: 100,
      render(row: Product) {
        return h(TableActionButtons, {
          buttons: [
            { type: 'edit', to: `/product/detail/${row.id}` },
            {
              type: 'delete',
              popConfirm: {
                reload: true,
              },
              onDelete: () => handleDelete(row.id),
            },
          ],
        });
      },
    },
  ];

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };
</script>

<style scoped></style>

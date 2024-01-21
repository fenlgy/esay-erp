<template>
  <n-data-table :data="data" :columns="columns" :loading="isLoading" size="small" :summary="summary" />
</template>

<script setup lang="ts">
  import { AnyObject } from '@/utils/types.ts';
  import { h, RendererElement, RendererNode, VNode } from 'vue';
  import TableActionButtons from '@/components/basic/button/table-action-buttons.vue';
  import FormItem from '@/components/basic/form/form-item.vue';
  import SkuSelect from '@/components/basic/select/sku-select.vue';
  import InputNumberFormItem from '@/components/basic/form/input-number-form-item.vue';
  import { DataTableCreateSummary, NText } from 'naive-ui';
  import { RowData } from 'naive-ui/es/data-table/src/interface';
  import { getCurrency } from '@/api/metadata.ts';

  const props = defineProps<{
    currency?: string;
  }>();
  const data = defineModel<AnyObject[]>('data', {
    default: [{}],
  });

  const currencySymbol = ref();
  watch(
    () => props.currency,
    (v: string) => {
      getCurrency(v).then((res) => (currencySymbol.value = res.symbol));
    }
  );

  const computeNumber = (row) => {
    row.subtotalPrice = row.quantity * row.unitPrice || '';
    row.taxAmount = row.subtotalPrice * row.taxRate * 0.01;
    row.amountExcludingTax = row.subtotalPrice - row.taxAmount;
  };

  const isLoading = ref(false);
  const columns = [
    {
      title: '品名',
      key: 'name',
      width: 160,
      render(row, index: number) {
        return h(
          FormItem,
          {
            path: `purchaseList.${index}.sku`,
            required: true,
          },
          {
            default: () =>
              h(SkuSelect, {
                'value': row.name,
                'consistentMenuWidth': false,
                'onUpdate:value': (v: string, i) => {
                  console.log(i);
                  row.name = v;
                  row.sku = i.sku;
                  row.unit = i.unit;
                },
              }),
          }
        );
      },
    },
    { title: 'SKU', key: 'sku' },
    // { title: '单位', key: 'unit' },
    {
      title: '数量',
      key: 'quantity',
      width: 100,
      render(row, index: number): VNode<RendererNode, RendererElement, { [p: string]: any }> {
        return h(
          InputNumberFormItem,
          {
            'path': `purchaseList.${index}.quantity`,
            'required': true,
            'value': row.quantity,
            'onUpdate:value': (v) => (row.quantity = v),
          },
          { suffix: () => row.unit }
        );
      },
    },
    {
      title: '含税单价',
      key: 'unitPrice',
      width: 100,
      render(row, index: number): VNode<RendererNode, RendererElement, { [p: string]: any }> {
        return h(
          InputNumberFormItem,
          {
            'path': `purchaseList.${index}.unitPrice`,
            'required': true,
            'value': row.unitPrice,
            'onUpdate:value': (v) => (row.unitPrice = v),
          },
          { prefix: () => currencySymbol.value }
        );
      },
    },
    {
      title: '含税金额',
      key: 'subtotalPrice',
      width: 90,
      render(row): VNode<RendererNode, RendererElement, { [p: string]: any }> {
        // row.subtotalPrice = row.quantity * row.unitPrice || '';
        computeNumber(row);
        return row.subtotalPrice;
      },
    },
    {
      title: '税率',
      key: 'taxRate',
      width: 70,
      render(row, index: number): VNode<RendererNode, RendererElement, { [p: string]: any }> {
        return h(
          InputNumberFormItem,
          {
            'path': `purchaseList.${index}.taxRate`,
            'required': true,
            'value': row.taxRate,
            'onUpdate:value': (v) => {
              row.taxRate = v;
              computeNumber(row);
              // row.taxAmount = row.subtotalPrice * row.taxRate * 0.01;
              // row.amountExcludingTax = row.subtotalPrice - row.taxAmount;
            },
          },
          { suffix: () => '%' }
        );
      },
    },
    {
      title: '不含税金额',
      key: 'amountExcludingTax',
    },
    {
      title: '税额',
      key: 'taxAmount',
    },
    {
      title: '操作',
      key: 'name',
      width: 90,
      render(row, index) {
        return h(TableActionButtons, {
          buttons: [
            { type: 'add', onClick: () => data.value.push({}) },
            {
              type: 'delete',
              popConfirm: { reload: false },
              show: data.value.length > 1,
              onDelete: () => {
                data.value.splice(index, 1);
              },
            },
          ],
        });
      },
    },
  ];

  const summary: DataTableCreateSummary = (pageData) => {
    return {
      name: { colSpan: 1, value: '总计' },
      sku: { colSpan: 1 },
      quantity: {
        colSpan: 1,
        value: h(
          'span',
          {},
          (pageData as RowData[]).reduce((prevValue, row) => prevValue + row.quantity, 0)
        ),
      },
      unitPrice: { colSpan: 1 },
      subtotalPrice: {
        value: h(
          'span',
          { style: { fontWeight: 'bold' } },
          (pageData as RowData[]).reduce((prevValue, row) => prevValue + row.subtotalPrice, 0)
        ),
        colSpan: 2,
      },
      amountExcludingTax: {
        value: h(
          'span',
          { style: { fontWeight: 'bold' } },
          (pageData as RowData[]).reduce((prevValue, row) => prevValue + row.amountExcludingTax, 0)
        ),
        colSpan: 1,
      },
      taxAmount: {
        value: h(
          'span',
          { style: { fontWeight: 'bold' } },
          (pageData as RowData[]).reduce((prevValue, row) => prevValue + row.taxAmount, 0)
        ),
        colSpan: 2,
      },
    };
  };
</script>

<style scoped></style>

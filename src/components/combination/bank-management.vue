<template>
  <children-llist-info :columns="columns" v-model:data="data"></children-llist-info>
</template>

<script setup lang="ts">

import { NInput } from "naive-ui";
import { BankInfo } from "@/api/bank.ts";
import FormItem from "@/components/basic/form/form-item.vue";
import InputFormItem from "@/components/basic/form/input-form-item.vue";
import CurrencySelect from "@/components/basic/select/currency-select.vue";

const tt = ref();
const data = ref([]);
watch(() => data, (v) => {
  console.log(v);
}, { deep: true });
const columns = [
  {
    title: "币别", width: 100, key: "currency",
    render(row: BankInfo) {
      return h(CurrencySelect, {
        value: row.currency, onUpdateValue(v) {
          row.currency = v;
        }
      });
    }
  },
  {
    title: "开户银行", width: 160, key: "bankName",
    render(row: BankInfo, index: number) {
      return h(InputFormItem, {
        value: row.bankName, ["onUpdate:value"](v) {
          row.bankName = v;
        }, required: true, path: `${index}.bankName`
      });
    }
  },
  {
    title: "银行账号", width: 160, key: "bankAccount",
    render(row: BankInfo, index: number) {
      return h(FormItem, { required: true, path: `${index}.bankAccount` }, {
        default: () => h(NInput, {
          value: row.bankAccount, onUpdateValue(v) {
            row.bankAccount = v;
          }
        })
      });
    }
  },
  {
    title: "银行地址", key: "bankAddress",
    render(row: BankInfo, index: number) {
      return h(InputFormItem, {
        value: row.bankAddress, ["onUpdate:value"](v) {
          row.bankAddress = v;
        }, required: true, path: `${index}.bankAddress`
      });
    }
  },
  { title: "swiftCode", width: 100,key: "swiftCode",
    render(row: BankInfo, index: number) {
      return h(InputFormItem, {
        value: row.swiftCode, ["onUpdate:value"](v) {
          row.swiftCode = v;
        }, required: true, path: `${index}.swiftCode`
      });
    }
  },
  { title: "是否默认", key: "isDefault" }
];
</script>
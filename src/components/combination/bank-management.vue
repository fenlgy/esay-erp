<template>
  <children-llist-info :columns="columns" v-model:data="data"></children-llist-info>
</template>

<script setup lang="ts">

import { NInput } from "naive-ui";
import { BankInfo } from "@/api/bank.ts";
import WarehouseSelect from "@/components/basic/select/warehouse-select.vue";
import { renderTableFormInput } from "@/utils/render.tsx";
import FormItem from "@/components/basic/form/form-item.vue";
const data = ref([])

watch(()=>data,(v)=>{
  console.log(v)
},{deep:true})
const columns = [
  { title: "币别",width:100 ,key: "currency",
    render(row:BankInfo){
    return h(WarehouseSelect,{value:row.currency,onUpdateValue(v){
      row.currency = v
      }})
    } },
  { title: "开户银行",width:160, key: "bankName",
    render(row:BankInfo){
      return h(renderTableFormInput({model:row.bankName,required:true}))
    } },
  { title: "银行账户", width:160,key: "bankAccount",
    render(row:BankInfo,index:number){
      return h(FormItem,{required:true,path:`${index}.bankAccount`},{default:()=> h(NInput,{value:row.bankAccount,onUpdateValue(v){
            row.bankAccount = v
          }})})
    }},
  { title: "银行地址", key: "bankAddress" },
  { title: "swiftCode", key: "swiftCode" },
  { title: "是否默认", key: "isDefault" }
];
</script>
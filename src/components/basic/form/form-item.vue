<template>
  <n-form-item :rule="_rule" v-bind="$attrs">
    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </n-form-item>
</template>

<script setup lang="ts">
import { FormItemRule } from "naive-ui";
import { isNumber } from "@/utils/is.ts";

const props = withDefaults(defineProps<{
  required?:boolean
  rule?:FormItemRule
}>(),{
  required:false,
})

const _rule = ref(props.rule)
if (props.required && !props.rule){
  _rule.value = {
    required:true,
    message:'不能为空',
    trigger:['input','blur'],
    // todo 图片上传等几组的判断：数组，对象形式的
    validator:(rule,value)=> {
      if (isNumber(value)){
        return !!(value || value === 0);
      }else {
        return !!value
      }
    }
  }
}

</script>

<style scoped>

</style>
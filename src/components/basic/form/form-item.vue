<template>
  <n-form-item :rule="_rule" v-bind="$attrs">
    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </n-form-item>
</template>

<script setup lang="ts">
import { FormItemRule } from "naive-ui";

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
    trigger:['input','blur']
  }
}

</script>

<style scoped>

</style>
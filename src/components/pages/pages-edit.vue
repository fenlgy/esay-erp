<template>
  <n-layout>
    <n-layout-header bordered>
      <n-page-header :title="title" :subtitle="subTitle" @back="handleBack">
      </n-page-header>
    </n-layout-header>
    <n-layout-content>
      <n-form :model="data" ref="formRef">
        <slot />
      </n-form>
    </n-layout-content>
    <n-layout-footer>
      <n-space size="small">
        <n-button type="primary" @click="handleSubmit">完成</n-button>
        <n-button type="primary" secondary>完成</n-button>
        <n-button @click="handleBack">返回</n-button>
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { AnyObject } from "@/utils/types.ts";
import { ValidationError } from "sequelize";

const props = withDefaults(defineProps<{
  title: string
  subTitle?: string
  data: AnyObject
}>(), {});

const emit = defineEmits(['update:data'])
const router = useRouter();
const formRef = ref()

const handleSubmit = () => {
  formRef.value?.validate().then(async (errors: ValidationError) => {
    console.log(errors)
  })
}

const handleBack = () => {
  router.go(-1);
};
</script>

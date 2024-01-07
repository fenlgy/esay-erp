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
        <n-button type="primary" @click="handleSubmit">提交</n-button>
        <n-button type="primary" secondary v-if="!!save">保存草稿</n-button>
        <n-button @click="handleBack">返回</n-button>
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { AnyObject, MyResponse } from "@/utils/types.ts";
import { ValidationError } from "sequelize";

const props = withDefaults(defineProps<{
  title: string
  subTitle?: string
  data: AnyObject
  submit: () => void
  save?: () => void
}>(), {});

const emit = defineEmits(["update:data"]);
const router = useRouter();
const formRef = ref();
const message = useMessage();

const handleSubmit = () => {
  formRef.value?.validate().then(async (errors: ValidationError) => {
    console.log(errors);
    // emit('update:data',props.data)
    const res = await <Promise<MyResponse<any>>>props.submit();
    if (res.error) {
      message.error(res.error);
    } else {
      message.success("新增成功！");
    }
  }).catch(err => console.error(err));
};

const handleBack = () => {
  router.go(-1);
};
</script>

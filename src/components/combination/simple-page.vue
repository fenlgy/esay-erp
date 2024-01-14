<template>
  <n-button @click="()=> pageShow = true" :type="buttonType" v-if="widthAddButton">{{ buttonName }}</n-button>
  <n-drawer v-model:show="pageShow" :width="width">
    <n-drawer-content>
      <template #header>
        <n-space>
          <n-button text size="tiny">
            <n-icon @click="handleClose">
              <CloseOutlined />
            </n-icon>
          </n-button>
          {{ title }}
        </n-space>
      </template>
      <template #default>
        <n-form :model="data" ref="formRef">
          <slot />
        </n-form>
      </template>
      <template #footer>
        <n-space size="small">
          <n-button type="primary" @click="handleSubmit">提交</n-button>
          <n-button type="primary" secondary v-if="!!save">保存草稿</n-button>
          <n-button @click="handleClose">关闭</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { AnyObject, MyResponse } from "@/utils/types.ts";
import { CloseOutlined } from "@vicons/antd";
import { ButtonProps } from "naive-ui";

const props = withDefaults(defineProps<{
  buttonType?: ButtonProps["type"]
  buttonName?: string
  widthAddButton?: boolean
  title: string
  data: AnyObject
  type?: "edit" | "detail"
  submit?: () => void
  save?: () => void
  width?: string | number
}>(), {
  type: "edit",
  buttonName: "新增",
  buttonType: "primary",
  width: 400,
  widthAddButton: false
});

const pageShow = defineModel("show", {
  default: false
});
// const show = defineModel<boolean>("show", { default: false });
const formRef = ref();
const message = useMessage();

const handleSubmit = () => {
  formRef.value?.validate().then(async (errors) => {
    console.log(errors);
    // emit('update:data',props.data)
    const res = await <Promise<MyResponse<any>>>props.submit();
    if (res.error) {
      message.error(res.error);
    } else {
      message.success("新增成功！");
      $myReload();
      handleClose();
    }
  }).catch(err => console.error(err));
};

const handleSave = () => {

};

const handleClose = () => {
  pageShow.value = false;
};
</script>

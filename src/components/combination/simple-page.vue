<template>
  <n-button @click="() => (pageShow = true)" :type="buttonType" v-if="widthAddButton">{{ buttonName }}</n-button>
  <n-drawer v-model:show="pageShow" :width="width" :show-mask="false">
    <n-drawer-content :header-style="{ display: 'block' }">
      <template #header>
        <n-page-header :title="title" :subtitle="subtitle" @back="handleClose">
          <template #back>
            <n-icon>
              <CloseOutlined />
            </n-icon>
          </template>
          <template #extra v-if="$slots.headerExtra">
            <n-space>
              <n-button type="primary" @click="handleSubmit">提交</n-button>
              <n-button type="primary" secondary v-if="!!save">保存草稿</n-button>
              <slot name="headerExtra" />
            </n-space>
          </template>
        </n-page-header>
      </template>
      <template #default>
        <n-form :model="data" ref="formRef">
          <slot />
        </n-form>
      </template>
      <template #footer v-if="type === 'edit'">
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
  import { AnyObject, MyResponse } from '@/utils/types.ts';
  import { CloseOutlined } from '@vicons/antd';
  import { ButtonProps, FormValidationError } from 'naive-ui';

  const props = withDefaults(
    defineProps<{
      buttonType?: ButtonProps['type'];
      buttonName?: string;
      widthAddButton?: boolean;
      title: string;
      subtitle?: string;
      data: AnyObject;
      type?: 'edit' | 'detail';
      submit?: () => void;
      save?: () => void;
      width?: string | number;
    }>(),
    {
      type: 'edit',
      buttonName: '新增',
      buttonType: 'primary',
      width: 400,
      widthAddButton: false,
    }
  );
  console.log(23232);
  const pageShow = defineModel('show', {
    default: false,
  });
  const formRef = ref();
  const message = useMessage();

  const handleSubmit = () => {
    formRef.value
      ?.validate()
      .then(async (errors: Array<FormValidationError>) => {
        console.log(errors);
        // emit('update:data',props.data)
        const res = await (<Promise<MyResponse<any>>>props.submit());
        if (res.error) {
          message.error(res.error);
        } else {
          $myReload();
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
        console.error(err.errors);
      });
  };

  const handleClose = () => {
    pageShow.value = false;
  };
</script>

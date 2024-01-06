<template>
  <n-button @click="showModal = true" :type="buttonType">
    {{buttonName}}
  </n-button>
  <n-modal v-model:show="showModal"
           preset="card"
           style="width: 480px"
           :title="title"
           :segmented="{footer:true}"
           @close="closeModal"
  >
    <n-form
      ref="formRef"
      :model="data"
    >
      <slot />
    </n-form>
    <template #footer>
      <n-space justify="end">
        <n-button type="primary" @click="handleSubmit">提交</n-button>
        <n-button type="primary" secondary @click="handleSubmit">提交并继续新增</n-button>
        <n-button @click="closeModal">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ButtonProps } from "naive-ui";
import { ValidationError } from "sequelize";
import { AnyObject, MyResponse } from "@/utils/types.ts";

const props = withDefaults(defineProps<{
  title:string
  buttonName?:string
  buttonType?: ButtonProps["type"]
  modalWidth?: string | number
  data: AnyObject
  beforeSubmit?: () => void
  afterSubmit?: () => void
  submit: (AnyObject) => Promise<MyResponse<any>>
}>(), {
  buttonType: "primary",
  buttonName:'新增'
});

const reload = inject('reload') as Function
const emit = defineEmits(['update:data'])

const showModal = ref(false);
const message = useMessage();
const formRef = ref();

const closeModal = ()=>{
  showModal.value = false
  console.log(props.data)
  emit('update:data',{})
}


const handleSubmit = async () => {
  formRef.value?.validate().then(async (errors: ValidationError) => {
    props.beforeSubmit && await props.beforeSubmit();
    if (!errors) {

      props.submit(props.data).then((response: MyResponse<any>) => {
        if (!response.error) {
          message.success("提交成功");
          reload()
          closeModal();
          console.log(response.data);
        } else {
          message.error(response.error);
        }

        props.afterSubmit && props.afterSubmit();
      });
    } else {
      console.log(errors);
    }
  }).catch((errors: ValidationError) => console.error(errors));
};


</script>

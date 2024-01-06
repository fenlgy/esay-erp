<template>
  <Btn v-bind="$attrs" :to="buttons.edit.to" quaternary size="small" @click="buttons.edit.onClick"
       v-if="buttonsName.includes('edit')">
    <n-icon>
      <component :is="iconType['edit']" />
    </n-icon>
  </Btn>

  <n-popconfirm v-if="buttonsName.includes('delete')"
                negative-text="取消"
                positive-text="确认"
                @positive-click="handleDelete"
  >
    <template #trigger>
      <Btn v-bind="$attrs" :to="buttons.delete.to" quaternary size="small" @click="buttons.delete.onClick">
        <n-icon>
          <component :is="iconType['delete']" />
        </n-icon>
      </Btn>
    </template>
    删除后将不可恢复！
  </n-popconfirm>
</template>

<script setup lang="ts">
import { DeleteTwotone, EditTwotone, FileTextTwotone } from "@vicons/antd";
import { arr2Obj } from "@/utils/common.ts";

const props = defineProps<{
  buttons: {
    name?: string
    type: keyof typeof iconType
    to?: string
    id?: number
    onClick?: Function
    onDelete?:Function
  }[]
}>();

const buttons = arr2Obj(props.buttons, "type");
const buttonsName = Object.keys(buttons);

const iconType = {
  detail: FileTextTwotone,
  edit: EditTwotone,
  delete: DeleteTwotone
};

const message = useMessage()
const reload = inject('reload') as Function
const handleDelete = async() =>  {
  buttons.delete.onDelete && await buttons.delete.onDelete()
  message.success('已被残忍删除！')
  reload()
};

const tips = {
  edit: "编辑",
  delete: "删除",
  detail: "详情"
};
</script>

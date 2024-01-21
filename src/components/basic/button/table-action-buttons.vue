<template>
  <template v-for="btn in _buttons">
    <n-popconfirm
      v-if="btn.show !== false && btn.type === 'delete' && btn.popConfirm !== false"
      negative-text="取消"
      positive-text="确认"
      @positive-click="handleDelete"
    >
      <template #trigger>
        <Btn v-bind="$attrs" :to="btn.to" quaternary size="small" @click="btn.onClick">
          <n-icon>
            <component :is="iconType[<BtnType>btn.type]" />
          </n-icon>
        </Btn>
      </template>
      刀下留人～ ,死而不能复生!
    </n-popconfirm>
    <Btn v-bind="$attrs" :to="btn.to" quaternary size="small" @click="btn.onClick" v-else-if="btn.show !== false">
      <n-icon>
        <component :is="iconType[<BtnType>btn.type]" />
      </n-icon>
    </Btn>
  </template>
</template>

<script setup lang="ts">
  import { DeleteTwotone, EditTwotone, FileAddTwotone, FileTextTwotone } from '@vicons/antd';
  import { arr2Obj } from '@/utils/common.ts';

  type BtnType = keyof typeof iconType;
  const props = defineProps<{
    buttons: {
      name?: string;
      type: BtnType;
      to?: string;
      id?: number;
      onClick?: Function;
      onDelete?: Function;
      popConfirm?: boolean | { reload: boolean };
      show?: boolean;
    }[];
  }>();

  const _buttons = computed(() => {
    return props.buttons;
  });

  const buttons = arr2Obj(props.buttons, 'type');
  // const buttonsName = Object.keys(buttons);

  const iconType = {
    detail: FileTextTwotone,
    edit: EditTwotone,
    delete: DeleteTwotone,
    add: FileAddTwotone,
  };

  const message = useMessage();
  const reload = inject('reload') as Function;
  const handleDelete = async () => {
    buttons.delete.onDelete && (await buttons.delete.onDelete());
    message.success('已被残忍删除！');
    buttons.delete.popConfirm?.reload !== false && reload();
  };

  // const tips = {
  //   edit: "编辑",
  //   delete: "删除",
  //   detail: "详情"
  // };
</script>

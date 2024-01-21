<template>
  <n-button @click="handleClick" v-bind="$attrs">
    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </n-button>
</template>

<script setup lang="ts">
  import { ButtonProps } from 'naive-ui';

  interface Props extends /* @vue-ignore */ ButtonProps {
    to?: string | 'back';
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['click']);

  const router = useRouter();
  const handleClick = (e: Event) => {
    if (props.to) {
      if (props.to === 'back') {
        router.go(-1);
      } else {
        router.push(props.to);
      }
    } else {
      emit('click', e);
    }
  };
</script>

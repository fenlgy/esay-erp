<template>
  <n-button @click="debounceClick" v-bind="$attrs">
    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </n-button>
</template>

<script setup lang="ts">

import { debounce } from "lodash";

type Props = {
  to?: string | "back"
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["click"]);

const router = useRouter();
const handleClick = (e: Event) => {
  if (props.to) {
    if (props.to === "back") {
      router.go(-1);
    } else {
      router.push(props.to);
    }
  } else {
    emit("click", e);
  }
};
const debounceClick = debounce(handleClick,200)

</script>

<style scoped>

</style>
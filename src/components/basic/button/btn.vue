<template>
  <n-button @click="handleClick" v-bind="$attrs">
    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </n-button>
</template>

<script setup lang="ts">

type Props = {
  to?: string | "back"
}

const props = withDefaults(defineProps<Props>(), {});

const router = useRouter();
const handleClick = () => {
  if (props.to === "back") {
    router.go(-1);
  }
  props.to && router.push(props.to);
};
</script>

<style scoped>

</style>
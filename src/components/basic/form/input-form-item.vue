<template>
  <form-item :required="required" :path="path">
    <n-input v-model:value="_value"></n-input>
  </form-item>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  required?: boolean
  path: string
  value: any
}>(), {
  required: false
});

const emit = defineEmits(["update:value"]);
const _value = computed({
  get() {
    return props.value;
  },
  set(v) {
    emit("update:value", v);
  }
});

</script>

<style>
.n-data-table .n-form-item .n-form-item-feedback-wrapper {
  min-height: 0
}

.n-data-table .n-form-item.n-form-item--top-labelled {
  grid-template-rows: 0 ;
}
</style>
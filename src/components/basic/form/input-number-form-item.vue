<template>
  <form-item
    :required="required"
    :path="path"
  >
    <n-input-number
      v-model:value="_value"
      :show-button="false"
    >
      <template
        v-for="slot in Object.keys($slots)"
        v-slot:[slot]="scope"
      >
        <slot
          :name="slot"
          v-bind="scope ?? {}"
        />
      </template>
    </n-input-number>
  </form-item>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      required?: boolean;
      path: string;
    }>(),
    {
      required: false,
    }
  );

  const _value = defineModel('value');
</script>

<style>
  .n-data-table .n-form-item .n-form-item-feedback-wrapper {
    min-height: 0;
  }

  .n-data-table .n-form-item.n-form-item--top-labelled {
    grid-template-rows: 0 !important;
  }
</style>

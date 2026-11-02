<template>
  <Input v-bind="props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { Input, type InputProps } from 'ant-design-vue';

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  lazy: true,
  // Preserve unset booleans so Input and ConfigProvider defaults still apply.
  allowClear: undefined,
  autofocus: undefined,
  bordered: undefined,
  disabled: undefined,
  focused: undefined,
  hidden: undefined,
  loading: undefined,
  readonly: undefined,
});
</script>

<style scoped lang="scss">
// :deep(.ant-input::placeholder) {
//   color: #888;
// }
</style>

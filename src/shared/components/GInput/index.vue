<template>
  <Input class="px-4 py-[9px] leading-5 placeholder:text-[#888]">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { Input } from 'ant-design-vue';
</script>

<style scoped lang="scss">
:deep(.ant-input::placeholder) {
  color: #888;
}
</style>

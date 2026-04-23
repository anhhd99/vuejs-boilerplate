<script setup lang="ts">
import { watch, ref, markRaw } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layoutComponent = ref();
const isLoaded = ref<boolean>(false);

watch(
  () => route.meta.layout,
  async (layout) => {
    isLoaded.value = false;
    const metaLayout = layout || 'default';

    try {
      const component = await import(`../../../layouts/${metaLayout}/index.vue`);
      isLoaded.value = true;
      layoutComponent.value = markRaw(component?.default);
    } catch (e) {
      const fallback = await import('../../../layouts/default/index.vue');
      isLoaded.value = true;
      layoutComponent.value = markRaw(fallback?.default);
    }
  },
  { flush: 'pre', immediate: true },
);
</script>

<template>
  <component :is="layoutComponent" :isLoaded="isLoaded"></component>
</template>

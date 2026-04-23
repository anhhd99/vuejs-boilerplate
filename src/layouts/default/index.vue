<script lang="ts" setup>
import { Header } from './components';

interface Props {
  isLoaded: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div id="__main" class="w-full h-full">
    <div id="__header">
      <Header />
    </div>

    <div id="__content" class="h-[calc(100%-68px)] flex">
      <div id="main-content" class="grow min-w-0 overflow-auto relative">
        <router-view v-if="props.isLoaded" />
      </div>
    </div>
  </div>
</template>

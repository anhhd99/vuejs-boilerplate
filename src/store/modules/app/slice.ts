import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from './types';

export const useAppStore = defineStore('appStore', () => {
  const me = ref<User | null>(null);

  return {
    me,
  };
});

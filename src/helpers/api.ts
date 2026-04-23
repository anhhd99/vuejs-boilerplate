export const isNotifyWhenFail = (response: any) => {
  if (response?.data?.success) {
    return false;
  }

  if (response?.config?.offNotify) {
    return false;
  }

  return !!response?.data?.message;
};

/**
 * Called once before the app fully initializes (e.g. in main.ts).
 * Use this to prefetch global data such as the current user profile.
 *
 * TODO: Uncomment and implement when auth store is ready.
 * Example:
 *   const appStore = useAppStore();
 *   if (!isNoTokenPresent()) {
 *     await authStore.fetchCurrentUser();
 *     appStore.isFetchedAll = true;
 *   }
 */
export const fetchBeforeInitApp = async (): Promise<void> => {
  // Implementation pending — see TODO above.
};

export const isNotifyWhenFail = (response: any) => {
  if (response?.data?.success) {
    return false;
  }

  if (response?.config?.offNotify) {
    return false;
  }

  return !!response?.data?.message;
};

export const fetchBeforeInitApp = async () => {
  // const isEmptyToken = isNoTokenPresent();
  // const appStore = useAppStore();
  // const authStore = useAuthStore();
  // if (isEmptyToken) {
  //   return;
  // }
  // await authStore.fetchCurrentUser();
  // appStore.isFetchedAll = true;
  // authStore.isLogined = true;
};

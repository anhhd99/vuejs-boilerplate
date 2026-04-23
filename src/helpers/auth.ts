const GAPP_ID_KEY = 'gappid';

export const getGappIdStorage = (): string => {
  return localStorage.getItem(GAPP_ID_KEY) || '';
};

export const setGappIdStorage = (val: any) => {
  return localStorage.setItem(GAPP_ID_KEY, val);
};

/**
 * Clear localStorage ngoại trừ keys.
 *
 */
export const appStorageClear = (exceptKeys: string[] = [GAPP_ID_KEY]): void => {
  Object.keys(localStorage).forEach((item) => {
    if (exceptKeys.includes(item)) {
      return;
    }

    localStorage.removeItem(item);
  });
};

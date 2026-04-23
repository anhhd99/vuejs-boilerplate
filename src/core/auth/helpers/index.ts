import { RouteName } from '@/shared/constants';

export const APP_ACCESS_TOKEN = 'app_access_token';
export const APP_REFRESH_TOKEN = 'app_refresh_token';

export const getAppAccessToken = (): string | null => {
  return localStorage.getItem(APP_ACCESS_TOKEN);
};

export const getAppRefreshToken = (): string | null => {
  return localStorage.getItem(APP_REFRESH_TOKEN);
};

export const isNoTokenPresent = (): boolean => {
  const accessToken = getAppAccessToken();
  const refreshToken = getAppRefreshToken();

  return !accessToken && !refreshToken;
};

export const authGuard = async ({
  to,
}): Promise<{
  canAccess: boolean;
  redirectTo: any;
}> => {
  const isEmptyToken = isNoTokenPresent();

  if (to.name === RouteName.LOGIN && !isEmptyToken) {
    return {
      canAccess: false,
      redirectTo: { name: RouteName.HOMEPAGE },
    };
  }

  // Skip checking if is public route
  if (to.meta.isPublic) {
    return {
      canAccess: true,
      redirectTo: {},
    };
  }

  if (isEmptyToken) {
    return {
      canAccess: false,
      redirectTo: { name: RouteName.LOGIN, query: { returnUrl: encodeURIComponent(to.fullPath) } },
    };
  }

  return {
    canAccess: true,
    redirectTo: {},
  };
};

export const setAppToken = (authInfo: any): void => {
  localStorage.setItem(APP_ACCESS_TOKEN, authInfo.access_token);
  localStorage.setItem(APP_REFRESH_TOKEN, authInfo.refresh_token);
};

export const removeAppToken = (): void => {
  localStorage.removeItem(APP_ACCESS_TOKEN);
  localStorage.removeItem(APP_REFRESH_TOKEN);
};

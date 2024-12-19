import { USER_INFO_KEY } from '@app/constants/auth';
import { UserTypeResponse } from '@app/types/user';

import { getCookie, removeCookie } from '../cacheCookie';

export const saveUserToCache = (value: UserTypeResponse, ttl: number): void => {
  const now = new Date().getTime();
  const item = {
    value,
    expiry: now + ttl // Lưu thời gian hết hạn (milliseconds)
  };

  localStorage.setItem(USER_INFO_KEY, JSON.stringify(item));
};

export const getUserFromCache = (): UserTypeResponse | null => {
  const user = localStorage.getItem(USER_INFO_KEY);

  if (!user) return null;

  const item = JSON.parse(user);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem(USER_INFO_KEY);
    return null;
  }

  return item.value;
};

export const removeUserFromCache = (): void => {
  localStorage.removeItem(USER_INFO_KEY);
};

export const getTokenFromCache = (): { access_token: string | undefined; refresh_token: string | undefined } => {
  const access_token = getCookie('access_token');
  const refresh_token = getCookie('refresh_token');
  return {
    access_token,
    refresh_token
  };
};

export const removeTokenFromCache = (): void => {
  removeCookie('access_token');
  removeCookie('refresh_token');
  removeCookie('client_id');
};

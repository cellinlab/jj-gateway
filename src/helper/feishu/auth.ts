import { APP_ID, APP_SECRET } from './const';

import { methodV } from '@/utils/request';

export type GetAppTokenRes = {
  code: number;
  msg: string;
  app_access_token: string;
  expire: number;
};

export const getAppToken = async () => {
  const { data } = await methodV({
    url: '/auth/v3/app_access_token/internal',
    method: 'POST',
    params: {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    },
  });

  return data as GetAppTokenRes;
};

export const getUserAccessToken = async (code) => {
  const { data } = await methodV({
    url: '/suite/passport/oauth/token',
    method: 'POST',
    params: {
      grant_type: 'authorization_code',
      app_id: APP_ID,
      app_secret: APP_SECRET,
      code,
    },
  });

  return data as GetAppTokenRes;
};

export const getUserToken = async ({ code, app_token }) => {
  const { data } = await methodV({
    url: '/authen/v1/access_token',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
    params: {
      grant_type: 'authorization_code',
      code,
    },
  });

  return data;
};

export const refreshUserToken = async ({ refresh_token, app_token }) => {
  const { data } = await methodV({
    url: '/authen/v1/refresh_access_token',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token,
      app_token,
    },
  });

  return data;
};

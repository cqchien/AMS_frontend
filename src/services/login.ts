import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
  isMobileApp: boolean;
};

export async function login(params: LoginParamsType) {
  return request('/auth/login/', {
    method: 'POST',
    data: params,
  });
}


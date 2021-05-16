import { stringify } from 'querystring';
import type { Effect } from 'umi';
import { history } from 'umi';

import { setAuthority, setToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { login } from '@/services/login';

export type LoginModelType = {
  namespace: string;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {};
};

const Model: LoginModelType = {
  namespace: 'login',

  effects: {
    *login({ payload }, { call }) {
      const response = yield call(login, { ...payload, isMobileApp: false });
      // Login successfully
      yield setToken(response.token.accessToken);
      setAuthority(payload.role.toLowerCase());
      if (response) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {},
};

export default Model;

import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/shared/constants';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import('./pages/login/index.vue'),
    meta: {
      isPublic: true,
      layout: 'defaultNoHeader',
    },
  },
];

export default routes;

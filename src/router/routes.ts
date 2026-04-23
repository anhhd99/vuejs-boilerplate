import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/shared/constants';
import Homepage from '@/modules/homepage/index.vue';
import NotFound from '@/modules/notFound/index.vue';

import auth from '@/modules/auth/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: NotFound,
  },
  {
    path: '',
    name: RouteName.HOMEPAGE,
    component: Homepage,
    meta: { layout: 'defaultNoHeader' },
  },

  ...auth,
];

export default routes;

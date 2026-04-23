import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';
import MainLayout from '@/shared/layout/MainLayout/index.vue';
import { authGuard } from '@/core';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: MainLayout,
      children: routes,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const guard = await authGuard({ to });

  if (guard.canAccess) {
    return next();
  }

  return next(guard.redirectTo);
});

export default router;

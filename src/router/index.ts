/**
 * 路由配置文件
 * 负责创建路由实例和配置路由守卫
 */
import { createRouter, createWebHistory } from 'vue-router';
import { useProviderStore } from '@/stores/modules/provider';
import { useUserStore } from '@/stores/modules/user';
import { getPinia } from '@/stores/setup';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whiteList = ['/auth/login', '/auth/register', '/auth/forgot-password'];

const hasRoleAccess = (
  requiredRoles: string[],
  userRoles: string[],
  userPermissions: string[],
): boolean => {
  if (!requiredRoles.length) return true;
  if (userPermissions.includes('*')) return true;
  if (userRoles.includes('super_admin')) return true;
  return requiredRoles.some((role) => userRoles.includes(role));
};

router.beforeEach((to, from, next) => {
  const providerStore = useProviderStore(getPinia());
  providerStore.loadingBar?.start();

  const userStore = useUserStore(getPinia());
  const isLoggedIn = userStore.isLoggedIn;
  const token = userStore.getToken;

  if (isLoggedIn && token) {
    if (to.path === '/auth/login') {
      const redirect = (to.query.redirect as string) || '/dashboard/workbench';
      next(redirect);
    } else {
      const requiredRoles = (to.meta.roles as string[] | undefined) || [];
      const userRoles = userStore.getRoles;
      const userPermissions = userStore.getPermissions;
      if (!hasRoleAccess(requiredRoles, userRoles, userPermissions)) {
        providerStore.message?.error('您没有访问该页面的权限');
        next('/dashboard/workbench');
        return;
      }
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      providerStore.message?.warning('登录已过期，请重新登录');
      next({
        path: '/auth/login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
});

router.afterEach(() => {
  const providerStore = useProviderStore(getPinia());
  providerStore.loadingBar?.finish();
});

router.onError(() => {
  const providerStore = useProviderStore(getPinia());
  providerStore.loadingBar?.error();
});

export default router;

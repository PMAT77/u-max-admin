/**
 * 认证相关路由配置
 * 包含登录页面路由
 */
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layouts/blank/index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },
];

export default routes;

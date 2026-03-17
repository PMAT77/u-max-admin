/**
 * 路由配置主文件
 * 负责组合各个模块的路由配置
 */
import type { RouteRecordRaw } from 'vue-router'
import AuthRoutes from './models/auth'
import DashboardRoutes from './models/dashboard'
import CommonRoutes from './models/common'
import UserRoutes from './models/user'


/**
 * 重定向路由配置
 */
const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/redirect',
    component: () => import('@/views/redirect/index.vue'),
    meta: {
      hideTag: true,
      show: false
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          hideTag: true
        }
      }
    ]
  }
]

/**
 * 总路由配置
 */
const routes: RouteRecordRaw[] = [
  ...redirectRoutes,
  ...AuthRoutes,
  ...DashboardRoutes,
  ...CommonRoutes,
  ...UserRoutes
]

export default routes
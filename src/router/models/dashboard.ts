/**
 * 仪表盘相关路由配置
 * 包含控制台页面路由
 */
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts/default/index.vue'),
    meta: {
      title: '控制台',
      icon: 'Dashboard'
    },
    children: [
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          title: '工作台', 
          icon: 'Workbench'
        }
      }
    ]
  }
]

export default routes
/**
 * 认证相关路由配置
 * 包含登录页面路由
 */
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [ 
  {
    path: '/user',
    component: () => import('@/layouts/default/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'User',
      show: false
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: '用户中心',
          icon: 'User',
          roles: ['admin', 'user']
        },
        component: () => import('@/views/user/profile/index.vue')
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        meta: {
          title: '修改密码',
          icon: 'Lock',
          roles: ['admin', 'user']
        },
        component: () => import('@/views/user/change-password/index.vue')
      }
    ]
  }, 
]

export default routes
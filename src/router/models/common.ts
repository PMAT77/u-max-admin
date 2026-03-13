/**
 * 通用路由配置
 * 包含关于页面和404页面路由
 */
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/common',
    component: () => import('../../layouts/default/index.vue'),
    meta: {
      title: '通用',
      icon: 'ellipsis'
    },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/common/About.vue'),
        meta: {
          title: '关于',
          icon: 'info-circle'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../../layouts/blank/index.vue'),
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('@/views/common/NotFound.vue')
      }
    ]
  }
]

export default routes
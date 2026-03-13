/**
 * 路由配置主文件
 * 负责组合各个模块的路由配置
 */
import type { RouteRecordRaw } from 'vue-router'
import AuthRoutes from './models/auth' // 认证相关路由
import DashboardRoutes from './models/dashboard' // 仪表盘相关路由
import CommonRoutes from './models/common' // 通用页面路由

/**
 * 重定向路由配置
 * 用于设置默认路由重定向
 */
const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth/login' // 根路径重定向到登录页
  }
]

/**
 * 总路由配置
 * 组合所有模块的路由
 */
const routes: RouteRecordRaw[] = [
  ...redirectRoutes, // 重定向路由
  ...AuthRoutes, // 认证路由
  ...DashboardRoutes, // 仪表盘路由
  ...CommonRoutes // 通用路由
]

export default routes
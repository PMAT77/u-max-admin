/**
 * 路由配置文件
 * 负责创建路由实例和配置路由守卫
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHistory(), // 使用HTML5 history模式
  routes // 导入路由配置
})

/**
 * 路由守卫
 * 用于控制页面访问权限和登录状态管理
 */
router.beforeEach((to, from, next) => {
  // 检查是否已登录（通过localStorage中的token判断）
  const isLoggedIn = localStorage.getItem('token') !== null

  console.log('当前路由:', to.path, '是否已登录:', isLoggedIn)
  
  // 定义不需要登录的路由
  const noNeedLogin = ['/auth/login']
  
  // 如果用户已登录
  if (isLoggedIn) {
    // 如果已登录且访问的是登录页面，重定向到仪表盘
    if (to.path === '/auth/login') {
      next('/dashboard/console')
    } else {
      // 已登录，放行
      next()
    }
  } else {
    // 未登录
    if (noNeedLogin.includes(to.path)) {
      // 访问的是不需要登录的页面，放行
      next()
    } else {
      // 访问的是需要登录的页面，重定向到登录页
      console.log('未登录，请登录')
      next('/auth/login')
    }
  }
})

export default router
/**
 * 路由配置文件
 * 负责创建路由实例和配置路由守卫
 */
import { createRouter, createWebHistory } from 'vue-router'
import { globalLoadingBar, globalMessage } from '@/utils/naive' 
import { useUserStore } from '@/stores/modules/user'
import { getPinia } from '@/stores/setup'
import routes from './routes'

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHistory(), // 使用HTML5 history模式
  routes // 导入路由配置
})

/**
 * 白名单路由
 * 不需要登录即可访问的路由
 */
const whiteList = ['/auth/login', '/auth/register', '/auth/forgot-password']

/**
 * 路由守卫
 * 用于控制页面访问权限和登录状态管理
 */
router.beforeEach((to, from, next) => {
  // 开始加载条
  globalLoadingBar.start()
  
  // 在组件外部使用 userStore
  const userStore = useUserStore(getPinia())
  const isLoggedIn = userStore.isLoggedIn
  const token = userStore.getToken

  console.log('当前路由:', to.path, '是否已登录:', isLoggedIn, 'Token:', token ? '存在' : '不存在')
  
  // 如果用户已登录（有 token）
  if (isLoggedIn && token) {
    // 如果已登录且访问的是登录页面，重定向到仪表盘
    if (to.path === '/auth/login') {
      // 如果有重定向参数，跳转到重定向地址
      const redirect = (to.query.redirect as string) || '/dashboard/workbench'
      next(redirect)
    } else {
      // 已登录，放行
      next()
    }
  } else {
    // 未登录或 token 不存在
    if (whiteList.includes(to.path)) {
      // 访问的是白名单中的页面，放行
      next()
    } else {
      // 访问的是需要登录的页面，重定向到登录页
      // 并带上重定向参数
      console.log('未登录或 Token 已过期，请重新登录')
      globalMessage.warning('登录已过期，请重新登录')
      next({
        path: '/auth/login',
        query: {
          redirect: to.fullPath // 保存重定向地址
        }
      })
    }
  }
})

/**
 * 路由后置守卫
 * 用于结束加载条
 */
router.afterEach(() => {
  globalLoadingBar.finish()
})

/**
 * 路由错误守卫
 * 用于处理路由错误
 */
router.onError(() => {
  globalLoadingBar.error()
})

export default router
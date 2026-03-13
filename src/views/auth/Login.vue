/**
 * 登录页面组件
 * 包含登录表单和背景区域
 */
<template>
  <div class="flex-1">
    <div class="flex h-full" :class="{ 'justify-center': layoutStore.getLoginLayout === 'center' }"> 
      <!-- 登录背景区域 -->
      <div v-if="layoutStore.getLoginLayout !== 'center'" class="hidden flex-1 login-bg login-left-container lg:block inset-0" :class="getOrderClass(!isLeft)"></div>
      
      <!-- 登录表单容器 -->
      <div 
        :class="[
          'flex flex-col items-center justify-center login-form-container',
          layoutStore.getLoginLayout === 'center' ? 'w-full max-w-md px-4' : 'flex-1 w-[34%]',
          layoutStore.getLoginLayout !== 'center' ? getOrderClass(isLeft) : ''
        ]"
      >
        <!-- 登录面板组件 -->
        <LoginPanel @login="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"> 
import { ref, computed } from 'vue'
import { useLoadingBar } from 'naive-ui'
import { userApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'

import LoginPanel from '@/components/auth/LoginPanel.vue' 

// 路由实例
const router = useRouter()
// 布局状态管理实例
const layoutStore = useLayoutStore()

// 背景是否在左侧（基于主题配置）
const isLeft = computed(() => layoutStore.getLoginLayout === 'left')
// 加载条实例
const loadingBar = useLoadingBar()
const notification = useNotification()
const message = useMessage()


/**
 * 获取排序类名
 * @param {boolean} isLeft - 是否在左侧
 * @returns {string} 排序类名
 */
const getOrderClass = (isLeft: Boolean) => {
  return isLeft ? 'order-1' : 'order-2'
}

/**
 * 处理登录
 * @param {Object} loginData - 登录数据
 * @param {string} loginData.type - 登录类型
 * @param {Object} loginData.data - 登录数据
 */
async function handleLogin(loginData: { type: string; data: any }) {
  const { type, data } = loginData
  console.log('登录类型', type, '数据', data)
  
  // 开始加载
  const loading = message.loading('登录中...')
  loadingBar.start()
  const timer = setTimeout(async () => {
    try {
      
      let response
      switch (type) {
        case 'account':
          // 账号密码登录
          response = await userApi.login({
            username: data.username,
            password: data.password
          })
          break
        case 'phone':
          // 手机号登录逻辑
          console.log('手机号登录', data)
          break
        default:
          break
      }
      
      // 登录成功处理
      if (response && response.code === 200 && response.data) {
        // 保存token
        localStorage.setItem('token', response.data.token)
        // 跳转到控制台
        router.push('/dashboard/console')

        notification.success({
          title: '登录成功',
          content: 'Oi！欢迎您，superman',
          duration: 2500,
          keepAliveOnHover: true
        })
      }
    } catch (error) {
      console.error('登录失败', error)
    } finally {
      // 结束加载
      loadingBar.finish()
      loading.destroy()
      clearTimeout(timer)
    }
  }, 3000)
}
</script>
 
<style scoped lang="scss">
.login-bg {
  background: linear-gradient(135deg,#03020c),radial-gradient(800px circle at 30% 40%,rgba(40,80,120,.35),transparent 60%),radial-gradient(600px circle at 70% 30%,rgba(50,100,150,.35),transparent 70%),radial-gradient(700px circle at 50% 90%,rgba(60,70,120,.35),transparent 60%); 
}

.dark .login-bg {
  background: linear-gradient(135deg, #03020c, #1a1a2e);
  
  &::before {
    background: radial-gradient(circle at 30% 40%, rgba(40, 80, 120, 0.35) 0%, transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(50, 100, 150, 0.35) 0%, transparent 70%),
                radial-gradient(circle at 50% 90%, rgba(60, 70, 120, 0.35) 0%, transparent 60%);
  }
}

.login-form-container { 
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-radius: 16px 0 0 16px;
  padding: 40px;
  height: 100vh;
  overflow-y: auto;
}

.dark .login-form-container {
  background: #1a1a2e;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-content {
  width: 100%;
  max-width: 400px;
}
</style>
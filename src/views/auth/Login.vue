/** * 登录页面组件 * 包含登录表单和背景区域 */
<template>
  <div class="flex-1">
    <div class="flex h-full" :class="{ 'justify-center': layoutStore.getLoginLayout === 'center' }">
      <!-- 登录背景区域 -->
      <div
        v-if="layoutStore.getLoginLayout !== 'center'"
        class="hidden flex-1 login-bg login-left-container lg:block inset-0"
        :class="getOrderClass(!isLeft)"
      >
        <div class="flex items-center justify-center h-full">
          <n-image :src="loginBgUrl" :width="400" />
        </div>
      </div>

      <!-- 登录表单容器 -->
      <div
        :class="[
          'flex flex-col items-center justify-center login-form-container',
          layoutStore.getLoginLayout === 'center' ? 'w-full max-w-md px-4' : 'flex-1 w-[34%]',
          layoutStore.getLoginLayout !== 'center' ? getOrderClass(isLeft) : '',
        ]"
      >
        <!-- 登录面板组件 -->
        <LoginPanel @login="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotification, useMessage } from 'naive-ui';
import { userApi } from '@/api/user';
import { useRouter, useRoute } from 'vue-router';
import { useLayoutStore, useUserStore } from '@/stores';
import { handleApiError } from '@/utils/errorHandler';

import LoginPanel from '@/components/auth/LoginPanel.vue';

const router = useRouter();
const route = useRoute();
const layoutStore = useLayoutStore();
const userStore = useUserStore();
const notification = useNotification();
const message = useMessage();

// 背景是否在左侧（基于主题配置）
const isLeft = computed(() => layoutStore.getLoginLayout === 'left');
const loginBgUrl = new URL('@/assets/imgs/login-bg.png', import.meta.url).href;

/**
 * 获取排序类名
 * @param {boolean} isLeft - 是否在左侧
 * @returns {string} 排序类名
 */
const getOrderClass = (isLeft: boolean) => {
  return isLeft ? 'order-1' : 'order-2';
};

async function handleLogin(loginData: { type: string; data: any }) {
  const { type, data } = loginData;

  const loading = message.loading('登录中...');

  try {
    let response;
    switch (type) {
      case 'account':
        response = await userApi.login({
          username: data.username,
          password: data.password,
          captcha: data.captcha,
          captchaId: data.captchaId,
        });
        break;
      case 'phone':
        message.warning('手机号登录功能开发中');
        return;
      default:
        break;
    }

    if (response && response.code === 200 && response.data) {
      userStore.login({
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        userInfo: response.data.userInfo,
      });

      const infoResponse = await userApi.getInfo();
      if (infoResponse.code === 200 && infoResponse.data) {
        userStore.setUserInfo(infoResponse.data);
      } else {
        userStore.logout();
        throw new Error(infoResponse.message || '获取用户信息失败');
      }

      const redirect = (route.query.redirect as string) || '/dashboard/workbench';
      router.push(redirect);

      notification.success({
        title: '登录成功',
        content: `Oi！欢迎您，${userStore.getNickname || 'superman'}~`,
        duration: 2500,
        keepAliveOnHover: true,
      });
    }
  } catch (error) {
    handleApiError(error);
  } finally {
    loading.destroy();
  }
}
</script>

<style scoped lang="scss">
.login-bg {
  background: var(--u-login-overlay);
}

.login-left-container {
  position: relative;
}

.login-form-container {
  background: var(--u-bg-card);
  color: var(--u-text-primary);
  box-shadow: var(--u-shadow-elevated);
  border-radius: calc(var(--u-radius-base) * 2) 0 0 calc(var(--u-radius-base) * 2);
  padding: 40px;
  height: 100vh;
  overflow-y: auto;
}

.login-content {
  width: 100%;
  max-width: 400px;
}
</style>

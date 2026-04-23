/** * 账号登录表单组件 * 用于账号密码登录 */
<template>
  <n-form :model="form" :rules="rules" :show-label="false" ref="formRef" label-placement="top">
    <!-- 账号输入框 -->
    <n-form-item label="账号" path="username">
      <n-input v-model:value="form.username" placeholder="请输入账号" size="large">
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
    </n-form-item>
    <!-- 密码输入框 -->
    <n-form-item label="密码" path="password">
      <n-input
        v-model:value="form.password"
        type="password"
        placeholder="请输入密码"
        size="large"
        show-password-on="click"
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>
    <!-- 图形验证码输入框 -->
    <n-form-item label="图形验证码" path="captcha">
      <n-input
        v-model:value="form.captcha"
        placeholder="请输入图形验证码"
        size="large"
        class="mr-3"
        :maxlength="4"
      >
        <template #prefix>
          <n-icon :component="CodeSigningService" />
        </template>
      </n-input>
      <n-button
        size="large"
        class="w-40% overflow-hidden"
        :loading="captchaLoading"
        @click="refreshCaptcha"
      >
        <template v-if="captchaImage">
          <img :src="captchaImage" alt="验证码" class="h-32px pointer-events-none" />
        </template>
        <template v-else> 获取验证码 </template>
      </n-button>
    </n-form-item>
    <!-- 登录按钮 -->
    <n-button type="primary" block size="large" @click="handleLogin">登 录</n-button>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { User, Locked, CodeSigningService } from '@vicons/carbon';
import type { FormInst, FormRules } from 'naive-ui';
import type { LoginByAccountEmits } from '@/types/components';
import { captchaApi } from '@/api/captcha';

/**
 * 登录表单数据接口
 */
interface LoginForm {
  username: string;
  password: string;
  captcha: string;
  captchaId: string;
}

const emit = defineEmits<LoginByAccountEmits>();

/** 表单引用 */
const formRef = ref<FormInst | null>(null);

/** 表单数据 */
const form = ref<LoginForm>({
  username: 'superman',
  password: '123456',
  captcha: '',
  captchaId: '',
});

/** 验证码图片（Base64） */
const captchaImage = ref<string>('');
/** 验证码加载状态 */
const captchaLoading = ref<boolean>(false);

/** 表单验证规则 */
const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: ['input', 'blur'],
    },
    {
      min: 3,
      max: 20,
      message: '账号长度应在3-20个字符之间',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
    {
      min: 6,
      max: 20,
      message: '密码长度应在6-20个字符之间',
      trigger: ['input', 'blur'],
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['input', 'blur'],
    },
    {
      min: 4,
      max: 4,
      message: '验证码长度为4个字符',
      trigger: ['input', 'blur'],
    },
  ],
});

/**
 * 刷新验证码
 */
async function refreshCaptcha(): Promise<void> {
  captchaLoading.value = true;
  try {
    const response = await captchaApi.getCaptcha();
    if (response.code === 200 && response.data) {
      captchaImage.value = response.data.image;
      form.value.captchaId = response.data.captchaId;
    }
  } catch (error) {
    console.error('获取验证码失败:', error);
  } finally {
    captchaLoading.value = false;
  }
}

/**
 * 处理登录
 */
async function handleLogin(): Promise<void> {
  if (formRef.value) {
    const valid = await formRef.value.validate();
    if (valid) {
      emit('login', {
        type: 'account',
        data: {
          username: form.value.username,
          password: form.value.password,
          captcha: form.value.captcha,
          captchaId: form.value.captchaId,
        },
      });
    }
  }
}

onMounted(() => {
  refreshCaptcha();
});
</script>

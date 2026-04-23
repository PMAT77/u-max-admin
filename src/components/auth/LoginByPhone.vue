/** * 手机号登录表单组件 * 用于手机号验证码登录 */
<template>
  <n-form :model="form" :rules="rules" ref="formRef" label-placement="top" size="large">
    <!-- 手机号输入框 -->
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="form.phone" placeholder="请输入手机号">
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
    </n-form-item>
    <!-- 验证码输入框 -->
    <n-form-item label="验证码" path="code">
      <div class="flex w-full">
        <n-input-otp v-model:value="form.code" />
        <n-button text type="primary" class="ml-3" @click="handleGetCode">获取验证码</n-button>
      </div>
    </n-form-item>
    <!-- 登录按钮 -->
    <n-button type="primary" size="large" block @click="handleLogin">登 录</n-button>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { User } from '@vicons/carbon';
import type { FormInst, FormRules } from 'naive-ui';
import type { LoginByPhoneEmits } from '@/types/components';

/**
 * 组件事件
 */
const emit = defineEmits<LoginByPhoneEmits>();

/**
 * 表单引用
 */
const formRef = ref<FormInst | null>(null);

/**
 * 表单数据
 */
const form = ref({
  phone: '', // 手机号
  code: [], // 验证码
});

/**
 * 表单验证规则
 */
const rules = ref<FormRules>({
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['input', 'blur'],
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号格式',
      trigger: ['input', 'blur'],
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['input', 'blur'],
    },
    {
      validator: (rule, value) => {
        return value.length === 6;
      },
      message: '验证码长度为6个字符',
      trigger: ['input', 'blur'],
    },
  ],
});

/**
 * 处理获取验证码
 */
async function handleGetCode() {
  if (formRef.value) {
    const valid = await formRef.value.validate();
    if (valid) {
      // 这里可以添加获取验证码的逻辑
      console.log('获取验证码:', form.value.phone);
    }
  }
}

/**
 * 处理登录
 */
async function handleLogin() {
  if (formRef.value) {
    const valid = await formRef.value.validate();
    if (valid) {
      emit('login', {
        type: 'phone', // 登录类型
        data: form.value, // 登录数据
      });
    }
  }
}
</script>

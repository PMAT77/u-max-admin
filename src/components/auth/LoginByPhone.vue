/**
 * 手机号登录表单组件
 * 用于手机号验证码登录
 */
<template>
  <n-form :model="form" ref="formRef" label-placement="top" size="large">
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
        <n-input-otp v-model:value="form.code" /> <!-- 验证码输入 -->
        <n-button text type="primary" class="ml-3">获取验证码</n-button> <!-- 获取验证码按钮 -->
      </div>
    </n-form-item>  
    <!-- 登录按钮 -->
    <n-button type="primary" size="large" block @click="handleLogin">登 录</n-button>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User } from '@vicons/carbon'

/**
 * 组件事件
 */
const emit = defineEmits(['login'])

/**
 * 表单数据
 */
const form = ref({
  phone: '', // 手机号
  code: [] // 验证码
})

/**
 * 处理登录
 */
function handleLogin() {
  emit('login', {
    type: 'phone', // 登录类型
    data: form.value // 登录数据
  })
}
</script>

<style lang="scss" scoped>
  
</style>

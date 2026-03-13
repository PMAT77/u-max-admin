/**
 * 账号登录表单组件
 * 用于账号密码登录
 */
<template>
  <n-form :model="form" :show-label="false" ref="formRef" label-placement="top">
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
      <n-input v-model:value="form.password" type="password" placeholder="请输入密码" size="large" show-password-on="click">
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item> 
    <!-- 图形验证码输入框 -->
    <n-form-item label="图形验证码" path="captcha">
      <n-input v-model:value="form.captcha" placeholder="请输入图形验证码" size="large" class="mr-3" :maxlength="6">
        <template #prefix>
          <n-icon :component="CodeSigningService" />
        </template>
      </n-input>
      <n-button size="large" class="w-40%">
        <!-- 验证码图片 -->
      </n-button>
    </n-form-item> 
    <!-- 登录按钮 -->
    <n-button type="primary" block size="large" @click="handleLogin">登 录</n-button>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User, Locked, CodeSigningService } from '@vicons/carbon' 

/**
 * 组件事件
 */
const emit = defineEmits(['login'])

/**
 * 表单数据
 */
const form = ref({
  username: 'superman', // 默认用户名
  password: '123456', // 默认密码
  captcha: '' // 验证码
})

/**
 * 处理登录
 */
function handleLogin() {
  emit('login', {
    type: 'account', // 登录类型
    data: form.value // 登录数据
  })
}
</script>

<style lang="scss" scoped>
  
</style>

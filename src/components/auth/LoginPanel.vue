/** * 登录面板组件 * 包含账号、手机号和扫码登录选项 */
<template>
  <div class="login-content">
    <!-- 欢迎信息 -->
    <div class="mt-6 flex items-center">
      <n-h2 class="mb-3">Oi！欢迎登录 🦄</n-h2>
    </div>

    <!-- 登录方式选项卡 -->
    <div class="w-65 mb-6">
      <n-tabs v-model:value="activeTab" type="segment" animated>
        <n-tab name="account">
          <div class="flex items-center gap-4px">
            <n-icon size="18"> <User /> </n-icon>
            <span>账号</span>
          </div>
        </n-tab>
        <n-tab name="phone">
          <div class="flex items-center gap-4px">
            <n-icon size="18"> <Mobile /> </n-icon>
            <span>手机号</span>
          </div>
        </n-tab>
        <n-tab name="scan">
          <div class="flex items-center gap-4px">
            <n-icon size="18"> <QrCode /> </n-icon>
            <span>扫码</span>
          </div>
        </n-tab>
      </n-tabs>
    </div>

    <!-- 登录表单组件 -->
    <LoginByAccount v-if="activeTab === 'account'" ref="loginByAccountRef" @login="handleLogin" />
    <LoginByPhone v-if="activeTab === 'phone'" ref="loginByPhoneRef" @login="handleLogin" />
    <LoginByQrcode v-if="activeTab === 'scan'" ref="loginByQrcodeRef" />

    <!-- 账号登录时的额外选项 -->
    <div v-if="activeTab === 'account'" class="flex justify-between items-center py-4 mt-3">
      <div>
        <span>没有账号？</span>
        <n-button text type="primary">创建账号</n-button>
      </div>
      <div class="flex items-center">
        <span class="mr-1">快捷登录</span>
        <n-button quaternary circle size="small">
          <template #icon>
            <n-icon :component="LogoGithub" />
          </template>
        </n-button>
        <n-dropdown trigger="hover" :options="dropdownOptions">
          <n-button quaternary circle size="small">
            <template #icon>
              <n-icon :component="OverflowMenuVertical" />
            </template>
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { NIcon } from 'naive-ui';
import { User, Mobile, QrCode, LogoGithub, OverflowMenuVertical, LogoWechat } from '@vicons/carbon';
import { QqOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/renderer';

import LoginByAccount from './LoginByAccount.vue'; // 账号登录组件
import LoginByPhone from './LoginByPhone.vue'; // 手机号登录组件
import LoginByQrcode from './LoginByQrcode.vue'; // 扫码登录组件

import type { Component } from 'vue';
import type { LoginPanelEmits } from '@/types/components';

/**
 * 组件事件
 */
const emit = defineEmits<LoginPanelEmits>();

// 组件引用
// 当前激活的选项卡
const activeTab = ref('account');
// 下拉菜单选项
const dropdownOptions = [
  {
    label: 'QQ',
    key: 'qq',
    icon: renderIcon(QqOutlined),
  },
  {
    label: '微信',
    key: 'wechat',
    icon: renderIcon(LogoWechat),
  },
];

/**
 * 处理登录事件
 * @param {Object} loginData - 登录数据
 * @param {string} loginData.type - 登录类型
 * @param {Object} loginData.data - 登录数据
 */
function handleLogin(loginData: { type: string; data: any }) {
  emit('login', loginData);
}
</script>

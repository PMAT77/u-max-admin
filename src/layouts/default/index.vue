/**
 * 默认布局组件
 * 包含侧边栏、顶部导航栏和内容区域
 */
<template>
  <n-layout class="h-screen " has-sider> 
    <!-- 侧边栏 -->
    <n-layout-sider
      bordered
      position="static"
      collapse-mode="width"
      class="u-max-layout__aside"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :width="layoutStore.getSidebarWidth"
      :class="layoutStore.getSidebarClass"
    >
      <div class="flex flex-col h-full">
        <SystemLogo v-if="layoutStore.getShowLogo" />

        <div class="u-max-layout__aside--menu">
          <n-menu
            mode="vertical"
            :options="menuOptions"
            :value="activeMenu"
            @update:value="handleMenuUpdate"
          /> 
        </div>

        <div class="u-max-layout__aside--footer">
          <div class="flex justify-end py-2 w-full">
            <n-button quaternary class="tool-btn w-38px h-38px mr-3" :focusable="false" @click="layoutStore.setIsCollapse(!layoutStore.getIsCollapse)"> 
              <template #icon>
                <n-icon size="20">
                  <TextIndentLess v-if="!layoutStore.getIsCollapse" />
                  <TextIndentMore v-else />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </n-layout-sider>
    
    <n-scrollbar class="u-max-layout__scrollbar" content-style="overflow: hidden;">
      <n-layout-header 
        bordered
        class="u-max-layout__header" 
        :class="layoutStore.getHeaderClass"
      > 
        <LayoutNavbar />
      </n-layout-header>
      
      <!-- 内容区域 -->
      <n-layout-content class="p-4" style="padding: 0">
        <router-view />
        <PreferenceButton />
      </n-layout-content>
    </n-scrollbar>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon } from 'naive-ui'
import { useLayoutStore } from '@/stores/layout'
// import { useRouterStore } from '@/stores/router' 
import { TextIndentLess, TextIndentMore, Home, User } from '@vicons/carbon'
import PreferenceButton from '@/components/common/PreferenceButton.vue'
import SystemLogo from '@/components/common/SystemLogo.vue'
import LayoutNavbar from './components/LayoutNavbar.vue'

import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'

// 路由和状态管理
const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()
// const routerStore = useRouterStore() 

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 菜单选项（从路由Store获取）
const menuOptions = computed(() => []) 

// 图标映射表
const iconMap: Record<string, Component> = {
  home: Home,
  user: User, 
}

function renderIcon(icon: string | undefined) {
  if (!icon) return undefined
  const IconComponent = iconMap[icon]
  return () => h(NIcon, null, { default: () => h(IconComponent) })
}

/**
 * 处理菜单更新
 * @param {string} key - 菜单key
 */
function handleMenuUpdate(key: string) {
  router.push(key)
}

/**
 * 处理个人资料
 */
function handleProfile() {
  console.log('个人资料')
}

/**
 * 处理退出登录
 */
function handleLogout() {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<style scoped lang="scss">
.u-max-layout--vertical,
.u-max-layout--sidebar {
  --border-radius: 0.5rem;
  --max-layout-z-index: 1000;
  --max-layout-sidebar-height: calc(100vh - var(--max-layout-sidebar-margin-top));
}
.u-max-layout--vertical {
  --max-layout-sidebar-margin-top: 0px;
}
.u-max-layout--sidebar {
  --max-layout-sidebar-margin-top: 56px;
}


.u-max-layout__aside {
  margin-top: var(--max-layout-sidebar-margin-top);
} 

.u-max-layout__aside.u-max-layout--sidebar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--max-layout-z-index);
  height: var(--max-layout-sidebar-height);
}

.u-max-layout__aside--menu {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.u-max-layout__aside--footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.u-max-layout__header--fixed {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--max-layout-z-index);
}
</style>
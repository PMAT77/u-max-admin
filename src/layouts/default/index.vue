/**
 * 默认布局组件
 * 包含侧边栏、顶部导航栏和内容区域
 */
<template>
  <n-layout class="u-max-layout h-screen" has-sider> 
    <!-- 侧边栏 -->
    <n-layout-sider
      bordered
      position="static"
      collapse-mode="width"
      class="u-max-sider"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :width="layoutStore.getSidebarWidth"
      :class="layoutStore.getSidebarClass"
    >
      <div class="flex flex-col h-full">
        <SystemLogo v-if="layoutStore.getShowLogo" />

        <div class="u-max-sider__menu">
          <n-menu
            mode="vertical"
            :options="menuOptions"
            :value="activeMenu"
            @update:value="handleMenuUpdate"
          /> 
        </div>

        <div class="u-max-sider__footer">
          <div class="flex justify-end py-2 w-full">
            <n-button quaternary class="u-max-btn w-38px h-38px mr-3" :focusable="false" @click="layoutStore.setIsCollapse(!layoutStore.getIsCollapse)"> 
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
    
    <n-scrollbar class="u-max-scrollbar" content-style="overflow: hidden;">
      <n-layout-header 
        bordered
        class="u-max-header" 
        :class="layoutStore.getHeaderClass"
      > 
        <LayoutNavbar />
      </n-layout-header>
      
      <!-- 内容区域 -->
      <n-layout-content class="u-max-content p-4" style="padding: 0">
        <router-view />
        <PreferenceButton />
      </n-layout-content>
    </n-scrollbar>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { TextIndentLess, TextIndentMore } from '@vicons/carbon'
import PreferenceButton from '@/components/common/PreferenceButton.vue'
import SystemLogo from '@/components/common/SystemLogo.vue'
import LayoutNavbar from './components/LayoutNavbar.vue'

// 路由和状态管理
const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

// 当前激活的菜单
const activeMenu = computed(() => route.path)

const menuOptions = computed(() => [])

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
.u-max-layout {
  --u-max-radius: 0.5rem;
  --u-max-z-index: 1000;
  --u-max-header-height: 56px;
  --u-max-sidebar-height: calc(100vh - var(--u-max-sider-margin-top));
}

.u-max-sider {
  margin-top: var(--u-max-sider-margin-top);
  transition: all 0.3s var(--n-bezier);

  &--vertical {
    --u-max-sider-margin-top: 0px;
  }

  &--sidebar {
    --u-max-sider-margin-top: var(--u-max-header-height);
    position: absolute;
    left: 0;
    top: 0;
    z-index: var(--u-max-z-index);
    height: var(--u-max-sidebar-height);
  }
}

.u-max-sider__menu {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.u-max-sider__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.u-max-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--u-max-z-index);
}
</style>
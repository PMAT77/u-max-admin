/** * 默认布局组件 * 包含侧边栏、顶部导航栏和内容区域 */
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
        <Logo v-if="layoutStore.getShowLogo" />

        <Menu />

        <div class="u-max-sider__footer">
          <div class="flex justify-end py-2 w-full">
            <n-button
              quaternary
              class="u-max-btn w-38px h-38px mr-3"
              :focusable="false"
              @click="layoutStore.setIsCollapse(!layoutStore.getIsCollapse)"
            >
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
      <n-layout-header bordered class="u-max-header u-max-header--fixed">
        <Navbar />
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
import { onMounted } from 'vue';
import { useLayoutStore } from '@/stores';
import { useRouteStore } from '@/stores';
import { TextIndentLess, TextIndentMore } from '@vicons/carbon';
import Logo from './components/Logo/index.vue';
import Navbar from './components/Navbar/index.vue';
import Menu from './components/Menu/index.vue';
import PreferenceButton from '@/components/common/PreferenceButton.vue';

const layoutStore = useLayoutStore();
const routeStore = useRouteStore();

onMounted(() => {
  routeStore.initMenu();
});
</script>

<style scoped lang="scss">
.u-max-layout {
  --u-max-radius: 0.5rem;
  --u-max-z-index: 1000;
  --u-max-header-height: 56px;
}

.u-max-sider {
  transition: all 0.3s var(--n-bezier);

  &--vertical {
    height: 100vh;
  }

  &--sidebar {
    position: absolute;
    left: 0;
    top: var(--u-max-header-height);
    z-index: calc(var(--u-max-z-index) - 1);
    height: calc(100vh - var(--u-max-header-height));
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

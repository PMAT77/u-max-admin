/** * 默认布局组件 * 包含侧边栏、顶部导航栏和内容区域 */
<template>
  <n-layout
    class="u-max-layout h-screen"
    :class="{ 'u-max-layout--gap': layoutStore.getIsGap }"
    :has-sider="layoutStore.getSidebarShow"
    :style="layoutStackCssVars"
  >
    <!-- 侧边栏 -->
    <n-layout-sider
      v-if="layoutStore.getSidebarShow"
      bordered
      :inverted="themeStore.isSiderDark"
      position="static"
      collapse-mode="width"
      class="u-max-sider"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :width="layoutStore.getSidebarWidth"
      :class="layoutStore.getSidebarClass"
    >
      <div class="flex min-h-0 flex-col h-full">
        <Logo v-if="layoutStore.getShowLogo" class="shrink-0" />

        <div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Menu />
        </div>

        <div class="flex shrink-0 items-center justify-end w-full">
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
      <n-layout-header
        v-if="showHeader"
        class="u-max-header"
        :class="{
          'u-max-header--fixed': layoutStore.getHeaderFixed,
          'u-max-header--no-tag': !layoutStore.getShowTagView,
        }"
      >
        <n-config-provider v-bind="layoutHeaderProviderProps">
          <Navbar v-if="layoutStore.getShowTopbar" />
          <TagView v-if="layoutStore.getShowTagView" />
        </n-config-provider>
      </n-layout-header>

      <!-- 内容区域 -->
      <n-layout-content class="u-max-content p-4 h-full" :style="contentStyle">
        <div class="px-2.5 pt-2.5 box-border size-full">
          <router-view />
          <PreferenceButton />
        </div>
      </n-layout-content>
    </n-scrollbar>
  </n-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { NConfigProvider } from 'naive-ui';
import { layoutHeaderProviderProps } from '@/utils/naive';
import { useLayoutStore, useThemeStore } from '@/stores';
import { useMenuStore } from '@/stores';
import { TextIndentLess, TextIndentMore } from '@vicons/carbon';
import Logo from './components/Logo/index.vue';
import Navbar from './components/Navbar/index.vue';
import TagView from './components/TagView/index.vue';
import Menu from './components/Menu/index.vue';
import PreferenceButton from '@/components/common/PreferenceButton.vue';

const layoutStore = useLayoutStore();
const themeStore = useThemeStore();
const menuStore = useMenuStore();
const showHeader = computed(() => layoutStore.getShowTopbar || layoutStore.getShowTagView);

/** sidebar 绝对定位侧栏需与整块固定顶栏（顶栏 + 页签）对齐，仅用 header 高度会挡住菜单 */
const layoutStackCssVars = computed(() => {
  if (!showHeader.value) {
    return { '--u-max-layout-header-stack': '0px' } as Record<string, string>;
  }
  let stack = 0;
  if (layoutStore.getShowTopbar) stack += layoutStore.getHeaderHeight;
  if (layoutStore.getShowTagView) stack += layoutStore.getTagHeight;
  return { '--u-max-layout-header-stack': `${stack}px` } as Record<string, string>;
});

const contentStyle = computed(() => {
  if (!showHeader.value || !layoutStore.getHeaderFixed) {
    return { padding: '0' };
  }

  const topbarHeight = layoutStore.getShowTopbar ? layoutStore.getHeaderHeight : 0;
  const tagHeight = layoutStore.getShowTagView ? layoutStore.getTagHeight : 0;
  return {
    padding: `calc(${topbarHeight}px + ${tagHeight}px) 0 0`,
  };
});

onMounted(() => {
  menuStore.initMenu();
});
</script>

<style scoped lang="scss">
.u-max-layout {
  --u-max-z-index: 1000;
  --u-max-header-height: var(--u-layout-header-height);
}

.u-max-layout--gap {
  .u-max-header {
    margin-left: var(--u-layout-gap-size);
    margin-right: var(--u-layout-gap-size);
  }

  .u-max-header--fixed {
    left: var(--u-layout-gap-size);
    right: auto;
    width: calc(100% - (var(--u-layout-gap-size) * 2));
    margin-left: 0;
    margin-right: 0;
  }
}

.u-max-sider {
  background-color: var(--u-sider-bg-color);
  color: var(--u-sider-text-color);
  border-right-color: var(--u-sider-border-color);
  transition:
    background-color var(--u-transition-duration) var(--n-bezier),
    color var(--u-transition-duration) var(--n-bezier),
    border-color var(--u-transition-duration) var(--n-bezier);

  &--vertical {
    height: 100vh;
  }

  &--sidebar {
    position: absolute;
    left: 0;
    /* 由 layoutStackCssVars 注入：顶栏 + 页签（按开关）；勿仅用 header 高度，否则会与 TagView 重叠 */
    top: var(--u-max-layout-header-stack, var(--u-layout-header-height));
    z-index: calc(var(--u-max-z-index) - 1);
    height: calc(100vh - var(--u-max-layout-header-stack, var(--u-layout-header-height)));
  }
}

.u-max-header {
  width: auto;
  color: var(--u-header-text-color);
  backdrop-filter: saturate(180%) blur(4px);
  transition:
    background-color var(--u-transition-duration) var(--n-bezier),
    border-color var(--u-transition-duration) var(--n-bezier);
}

.u-max-layout--gap .u-max-header {
  border-bottom-left-radius: var(--u-radius-base);
  border-bottom-right-radius: var(--u-radius-base);
  overflow: hidden;
}

.u-max-header--no-tag {
  :deep(.u-max-navbar) {
    border-bottom-color: transparent;
  }
}

.u-max-header--fixed {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--u-max-z-index);
}

:deep(.u-max-scrollbar) {
  position: relative;
}

:deep(.u-max-sider .n-layout-sider-scroll-container),
:deep(.u-max-sider .n-layout-scroll-container) {
  background-color: var(--u-sider-bg-color);
  color: var(--u-sider-text-color);
  transition:
    background-color var(--u-transition-duration) var(--n-bezier),
    color var(--u-transition-duration) var(--n-bezier);
}
</style>

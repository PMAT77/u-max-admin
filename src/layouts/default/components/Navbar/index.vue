/** * 导航栏组件 * 显示顶部导航栏，包含 Logo 和导航菜单 */
<template>
  <div class="u-max-layout__nav flex items-center" :style="{ height: '56px' }">
    <Logo v-if="layoutStore.getLayoutMode === 'sidebar'" />

    <div class="u-max-layout__nav__left">
      <div class="h-full flex items-center gap-1">
        <n-button
          quaternary
          class="tool-btn w-38px h-38px ml-2"
          :focusable="false"
          @click="layoutStore.toggleSidebar(!layoutStore.getSidebarShow)"
        >
          <template #icon>
            <n-icon size="20">
              <AlignLeftOutlined />
            </n-icon>
          </template>
        </n-button>

        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button quaternary class="tool-btn w-38px h-38px mr-2" :focusable="false">
              <template #icon>
                <n-icon size="20"><Star /></n-icon>
              </template>
            </n-button>
          </template>
          收藏夹
        </n-tooltip>

        <Breadcrumb />
      </div>
    </div>

    <div class="u-max-layout__nav__center"></div>

    <div class="u-max-layout__nav__right"></div>
  </div>
</template>

<script setup>
import { useLayoutStore } from '@/stores';
import { Star } from '@vicons/carbon';
import { AlignLeftOutlined } from '@vicons/antd';
import Logo from '../Logo/index.vue';
import Breadcrumb from '../Breadcrumb/index.vue';

// 获取布局状态管理实例
const layoutStore = useLayoutStore();
</script>

<style scoped lang="scss">
.u-max-layout__nav {
  .u-max-layout__nav__left {
    .tool-btn i {
      transition: all 0.3s var(--n-bezier);
    }

    .tool-btn:hover i {
      transform: scale(1.1);
    }
  }

  .u-max-layout__nav__center {
    flex-grow: 1;
    flex-basis: 0;
    height: 100%;
  }
}
</style>

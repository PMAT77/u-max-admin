/** * Logo 组件 * 显示应用的 Logo 和标题 * 使用配置驱动的方式管理不同的显示策略 */
<template>
  <div class="u-max__logo flex flex-shrink-0" :class="logoClass" :style="containerStyle">
    <div class="w-full h-full flex items-center">
      <div class="u-max__logo--item">
        <a href="/" class="flex items-center justify-center" :class="logoItemClass">
          <n-avatar :size="logoSize" :circle="logoCircle" :style="logoStyle">
            <n-icon :component="RobotFilled" />
          </n-avatar>

          <n-gradient-text v-if="showText" type="info" class="text-2xl ml-2">
            UMax Admin
          </n-gradient-text>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@/stores';
import { RobotFilled } from '@vicons/antd';

const layoutStore = useLayoutStore();

const mode = computed(() => layoutStore.getLayoutMode);
const isCollapse = computed(() => layoutStore.getIsCollapse);
const bigLogo = computed(() => layoutStore.getBigLogo);
const logoClass = computed(() => layoutStore.getLogoClass);

const containerStyle = computed(() => {
  if (mode.value === 'vertical' && !isCollapse.value) {
    return { height: 'calc(var(--u-layout-logo-height) + var(--u-layout-logo-extra-height))' };
  }
  return { height: 'var(--u-layout-logo-height)' };
});

const logoItemClass = computed(() => {
  if (mode.value === 'vertical' && !isCollapse.value) {
    return 'flex-col';
  }
  return '';
});

const logoSize = computed(() => {
  if (mode.value === 'sidebar') return 32;
  if (isCollapse.value) return 32;
  return bigLogo.value ? 45 : 32;
});

const logoCircle = computed(() => {
  if (isCollapse.value) return true;
  return bigLogo.value;
});

const logoStyle = computed(() => ({
  color: 'var(--u-bg-card)',
  backgroundColor: 'var(--u-primary-color)',
}));

const showText = computed(() => {
  if (mode.value === 'sidebar') return true;
  if (isCollapse.value) return false;
  return bigLogo.value;
});
</script>

<style scoped lang="scss">
.u-max__logo {
  display: flex;
  align-items: center;
  color: var(--u-sider-text-color);

  &.u-max-logo--sidebar {
    width: var(--u-layout-sidebar-width);
  }

  .u-max__logo--item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: all var(--u-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    padding-inline: 0;
    text-align: center;
    display: flex;
    justify-content: center;

    & a {
      text-decoration: none;
    }
  }
}
</style>

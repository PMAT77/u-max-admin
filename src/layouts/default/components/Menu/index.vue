<template>
  <div :class="isHeaderMenu ? 'u-max-header__menu' : 'u-max-sider__menu'">
    <n-menu
      v-if="!isHeaderMenu"
      class="u-max-menu"
      :class="menuRootClass"
      :inverted="themeStore.isSiderDark"
      mode="vertical"
      :options="menuOptions"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :value="menuStore.activeMenu"
      v-model:expanded-keys="expandedKeys"
      @update:value="handleMenuUpdate"
    />
    <n-menu
      v-else
      class="u-max-menu u-max-menu--header"
      :class="menuRootClass"
      :inverted="themeStore.isHeaderDark"
      mode="horizontal"
      :options="headerMenuOptions"
      :value="menuStore.activeMenu"
      @update:value="handleMenuUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLayoutStore, useMenuStore, useThemeStore } from '@/stores';

const props = withDefaults(
  defineProps<{
    /** 侧栏内纵向菜单；顶栏水平布局下为横向顶栏菜单 */
    placement?: 'sider' | 'header';
  }>(),
  { placement: 'sider' },
);

const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const themeStore = useThemeStore();

const isHeaderMenu = computed(() => props.placement === 'header');

const rawMenuOptions = computed(() => menuStore.getMenuOptions);
function buildMenuOptions(forHeader: boolean): any[] {
  const source = rawMenuOptions.value.filter((item) => item.show !== false);
  const transformed: any[] = [];

  source.forEach((item, index) => {
    if (layoutStore.getMenuSplit) {
      const children = (item.children || []).filter((child: any) => child.show !== false);

      if (children.length > 0) {
        transformed.push({
          type: 'group',
          key: `group:${item.key}`,
          label: item.label,
          children,
        });
      } else {
        transformed.push(item);
      }
    } else {
      transformed.push(item);
    }

    if (!forHeader && layoutStore.getShowMenuBorder && index < source.length - 1) {
      transformed.push({
        type: 'divider',
        key: `divider:${item.key}`,
      });
    }
  });

  return transformed;
}

const menuOptions = computed<any[]>(() => buildMenuOptions(false));

/** 横向顶栏菜单不支持 divider；菜单分割+分组在纯顶栏场景下改为平铺一级（避免 Naive 横向对 group 支持差） */
const headerMenuOptions = computed<any[]>(() => {
  const raw = buildMenuOptions(true);
  if (!layoutStore.getMenuSplit) return raw;
  const flat: any[] = [];
  for (const item of raw) {
    if (item?.type === 'group' && item.children?.length) {
      for (const c of item.children) {
        if (c && c.show !== false) flat.push(c);
      }
    } else if (item?.type !== 'divider') {
      flat.push(item);
    }
  }
  return flat;
});

const menuRootClass = computed(() => ({
  'u-max-menu--split': layoutStore.getMenuSplit && !isHeaderMenu.value,
  'u-max-menu--border': layoutStore.getShowMenuBorder && !isHeaderMenu.value,
}));
const expandedKeys = ref<string[]>([]);

function handleMenuUpdate(key: string) {
  router.push(key);
}

function syncRouteState() {
  const currentPath =
    route.matched.length > 0 ? route.matched[route.matched.length - 1].path : route.path;
  menuStore.setCurrentPath(currentPath);
}

function updateExpandedKeys() {
  if (isHeaderMenu.value) return;
  if (!layoutStore.getMenuSplit) {
    expandedKeys.value = menuStore.getExpandedKeys;
    return;
  }

  const currentPath =
    route.matched.length > 0 ? route.matched[route.matched.length - 1].path : route.path;
  expandedKeys.value = findParentKeysInSplitMenu(menuOptions.value, currentPath);
}

function findParentKeysInSplitMenu(options: any[], targetKey: string, parents: string[] = []): string[] {
  for (const option of options) {
    if (!option || option.type === 'divider') continue;

    if (option.type === 'group') {
      const result = findParentKeysInSplitMenu(option.children || [], targetKey, parents);
      if (result.length) return result;
      continue;
    }

    if (option.key === targetKey) {
      return parents;
    }

    if (option.children?.length) {
      const result = findParentKeysInSplitMenu(option.children, targetKey, [...parents, option.key]);
      if (result.length) return result;
    }
  }

  return [];
}

onMounted(() => {
  syncRouteState();
});

watch(
  () => route.fullPath,
  () => {
    syncRouteState();
    updateExpandedKeys();
  },
);

watch(
  () => menuStore.getMenuOptions,
  (options) => {
    if (options.length > 0) {
      updateExpandedKeys();
    }
  },
  { immediate: true },
);

watch(
  () => [layoutStore.getMenuSplit, layoutStore.getShowMenuBorder, props.placement] as const,
  () => {
    updateExpandedKeys();
  },
);
</script>

<style scoped lang="scss">
.u-max-header__menu {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

/* 侧栏 / 顶栏横向菜单共用：选中态背景与主题侧栏一致（由 ThemeProvider 写入 --u-sider-item-active-bg） */
.u-max-menu {
  --n-item-color-active: var(--u-sider-item-active-bg) !important;
  --n-item-color-active-hover: var(--u-sider-item-active-bg) !important;
  --n-item-color-active-collapsed: var(--u-sider-item-active-bg) !important;

  :deep(.n-menu-item-content),
  :deep(.n-submenu .n-submenu-children .n-menu-item-content) {
    border-radius: var(--u-radius-base);
  }

  :deep(.n-menu-item-content),
  :deep(.n-submenu .n-submenu-label) {
    color: var(--u-sider-text-color);
  }
}

.u-max-menu--split {
  :deep(.n-menu-item-group-title) {
    padding: var(--u-menu-group-title-padding);
    font-size: var(--u-font-size-xs);
    color: color-mix(in srgb, var(--u-sider-text-color) 70%, transparent);
    font-weight: 600;
    letter-spacing: 0.02em;
  }
}

.u-max-menu--border {
  :deep(.n-menu-divider) {
    margin: var(--u-menu-divider-margin);
  }
}

.u-max-menu--header {
  flex: 1;
  min-width: 0;

  :deep(.n-menu-item-content),
  :deep(.n-submenu .n-submenu-children .n-menu-item-content) {
    border-radius: var(--u-radius-base);
  }

  :deep(.n-menu-item-content),
  :deep(.n-submenu .n-submenu-label) {
    color: var(--u-header-text-color, var(--u-text-primary));
  }

  :deep(.n-menu-item-content--selected),
  :deep(.n-submenu .n-submenu-label--selected) {
    color: var(--u-primary-color) !important;
  }

  :deep(.n-menu) {
    min-width: 0;
  }
}
</style>

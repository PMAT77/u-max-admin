<template>
  <div class="u-max-sider__menu">
    <n-menu
      class="u-max-menu"
      :class="menuClass"
      :inverted="themeStore.isSiderDark"
      mode="vertical"
      :options="menuOptions"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :value="menuStore.activeMenu"
      v-model:expanded-keys="expandedKeys"
      @update:value="handleMenuUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLayoutStore, useMenuStore, useThemeStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const themeStore = useThemeStore();

const rawMenuOptions = computed(() => menuStore.getMenuOptions);
const menuOptions = computed<any[]>(() => {
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

    if (layoutStore.getShowMenuBorder && index < source.length - 1) {
      transformed.push({
        type: 'divider',
        key: `divider:${item.key}`,
      });
    }
  });

  return transformed;
});

const menuClass = computed(() => ({
  'u-max-menu--split': layoutStore.getMenuSplit,
  'u-max-menu--border': layoutStore.getShowMenuBorder,
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
  () => [layoutStore.getMenuSplit, layoutStore.getShowMenuBorder],
  () => {
    updateExpandedKeys();
  },
);
</script>

<style scoped lang="scss">
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
</style>

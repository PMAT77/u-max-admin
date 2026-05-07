/**
 * Naive UI 独立 API
 * 用于在组件外部使用 Naive UI 的 API
 * 如 loadingBar、message、notification、dialog 等
 */
import { darkTheme } from 'naive-ui';
import { computed } from 'vue';
import { useThemeStore } from '@/stores/modules/theme';
import { useProviderStore } from '@/stores/modules/provider';
import { getPinia } from '@/stores/setup';

function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0))
      .toString(16)
      .slice(1)
  );
}

function primaryCommonOverrides(themeStore: ReturnType<typeof useThemeStore>) {
  return {
    primaryColor: themeStore.primaryColor,
    primaryColorHover: lightenColor(themeStore.primaryColor, 10),
    primaryColorPressed: darkenColor(themeStore.primaryColor, 10),
    primaryColorSuppl: themeStore.primaryColor,
    borderRadius: themeStore.borderRadius,
  };
}

export const configProviderProps = computed(() => {
  const themeStore = useThemeStore(getPinia());
  const bodyColor = themeStore.isDark ? '#121217' : '#f5f7fa';
  const cardColor = themeStore.isDark ? '#1a1a22' : '#ffffff';
  return {
    theme: themeStore.isDark ? darkTheme : null,
    themeOverrides: {
      common: {
        ...primaryCommonOverrides(themeStore),
        bodyColor,
        cardColor,
      },
    },
  };
});

/**
 * 顶栏与全局 Naive 主题不一致时（如全局亮色 + 顶栏深色），为顶栏子树注入匹配的 Naive 主题，
 * 避免按钮、面包屑、标签栏等仍使用全局主题的文本色。
 */
export const layoutHeaderProviderProps = computed(() => {
  const themeStore = useThemeStore(getPinia());
  if (themeStore.isHeaderDark === themeStore.isDark) {
    return {};
  }
  return {
    theme: themeStore.isHeaderDark ? darkTheme : null,
    themeOverrides: {
      common: primaryCommonOverrides(themeStore),
    },
  };
});

export const globalLoadingBar = {
  start: () => {
    const store = useProviderStore(getPinia());
    store.loadingBar?.start();
  },
  finish: () => {
    const store = useProviderStore(getPinia());
    store.loadingBar?.finish();
  },
  error: () => {
    const store = useProviderStore(getPinia());
    store.loadingBar?.error();
  },
};

export const globalMessage = {
  info: (content: string) => {
    const store = useProviderStore(getPinia());
    store.message?.info(content);
  },
  success: (content: string) => {
    const store = useProviderStore(getPinia());
    store.message?.success(content);
  },
  warning: (content: string) => {
    const store = useProviderStore(getPinia());
    store.message?.warning(content);
  },
  error: (content: string) => {
    const store = useProviderStore(getPinia());
    store.message?.error(content);
  },
};

export const globalNotification = {
  info: (content: string) => {
    const store = useProviderStore(getPinia());
    store.notification?.info({ content });
  },
  success: (content: string) => {
    const store = useProviderStore(getPinia());
    store.notification?.success({ content });
  },
  warning: (content: string) => {
    const store = useProviderStore(getPinia());
    store.notification?.warning({ content });
  },
  error: (content: string) => {
    const store = useProviderStore(getPinia());
    store.notification?.error({ content });
  },
};

export const globalDialog = {
  info: (content: string) => {
    const store = useProviderStore(getPinia());
    store.dialog?.info({ content });
  },
  success: (content: string) => {
    const store = useProviderStore(getPinia());
    store.dialog?.success({ content });
  },
  warning: (content: string) => {
    const store = useProviderStore(getPinia());
    store.dialog?.warning({ content });
  },
  error: (content: string) => {
    const store = useProviderStore(getPinia());
    store.dialog?.error({ content });
  },
};

export default {
  loadingBar: globalLoadingBar,
  message: globalMessage,
  notification: globalNotification,
  dialog: globalDialog,
};

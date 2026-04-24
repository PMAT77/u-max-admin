/** * 导航栏组件 * 显示顶部导航栏，包含 Logo 和导航菜单 */
<template>
  <div
    class="u-max-navbar flex items-center min-w-0"
    :class="{ 'u-max-navbar--horizontal': layoutStore.getLayoutMode === 'horizontal' }"
    :style="{ height: `${layoutStore.getHeaderHeight}px` }"
  >
    <Logo v-if="layoutStore.getLayoutMode === 'sidebar' || showHorizontalTopMenu" />

    <div class="flex items-center shrink-0">
      <div class="h-full flex items-center gap-1">
        <n-button
          v-if="layoutStore.getLayoutMode !== 'horizontal' || layoutStore.getSidebarShow"
          quaternary
          class="u-max-navbar__btn w-38px h-38px ml-2"
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
            <n-button quaternary class="u-max-navbar__btn w-38px h-38px mr-2" :focusable="false">
              <template #icon>
                <n-icon size="20"><Star /></n-icon>
              </template>
            </n-button>
          </template>
          收藏夹
        </n-tooltip>

        <!-- 面包屑：中等屏幕及以上显示 -->
        <div v-if="layoutStore.getShowBreadcrumb" class="hidden lg:block">
          <Breadcrumb />
        </div>
      </div>
    </div>

    <div v-if="showHorizontalTopMenu" class="u-max-navbar__topmenu min-h-0 min-w-0 flex-1 px-1">
      <Menu placement="header" />
    </div>

    <div v-else class="flex-grow basis-0 h-full min-w-0"></div>

    <div class="u-max-navbar__right shrink-0 pr-4">
      <n-flex align="center" :size="4">
        <!-- 主题切换 -->
        <n-button
          quaternary
          class="u-max-navbar__btn w-38px h-38px anim-rotate"
          :focusable="false"
          @click="themeStore.toggleTheme()"
        >
          <template #icon>
            <n-icon :size="20">
              <Sun v-if="themeStore.isDark" />
              <Moon v-else />
            </n-icon>
          </template>
        </n-button>

        <!-- 全屏切换：小屏幕及以上显示 -->
        <n-button
          quaternary
          class="u-max-navbar__btn w-38px h-38px hidden lg:flex"
          :focusable="false"
          @click="toggleFullScreen()"
        >
          <template #icon>
            <n-icon :size="20">
              <FullScreenMaximize20Filled v-if="!isFullScreen" />
              <FullScreenMinimize24Regular v-else />
            </n-icon>
          </template>
        </n-button>

        <!-- 语言切换：中等屏幕及以上显示 -->
        <n-dropdown
          :options="translateOptions"
          :value="localeStore.getLocale"
          trigger="click"
          placement="bottom-end"
          class="hidden lg:block"
          @select="toggleLocale"
        >
          <n-button
            quaternary
            class="u-max-navbar__btn w-38px h-38px hidden md:flex"
            :focusable="false"
          >
            <template #icon>
              <n-icon :size="20">
                <Translate />
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>

        <!-- 通知消息 -->
        <n-popover placement="bottom">
          <template #trigger>
            <n-badge class="hidden lg:block" :value="notificationCount" :max="99" :offset="[-7, 7]">
              <n-button quaternary class="u-max-navbar__btn w-38px h-38px" :focusable="false">
                <template #icon>
                  <n-icon :size="20">
                    <Notification />
                  </n-icon>
                </template>
              </n-button>
            </n-badge>
          </template>

          <n-card
            size="small"
            segmented
            class="w-320px"
            header-style="padding-left: 0; padding-right: 0;"
            content-style="padding: 5px 0;"
            :bordered="false"
          >
            <template #header>
              <n-dropdown
                :options="notificationOptions"
                :value="notificationValue"
                trigger="hover"
                placement="bottom-end"
                @select="toggleNotification"
              >
                <n-button class="flex" text :focusable="false">
                  <n-icon class="mr-2" :size="20">
                    <Notification />
                  </n-icon>
                  <span class="font-size-16px">全部通知</span>
                  <n-icon class="ml-1" :size="18">
                    <ChevronDown />
                  </n-icon>
                </n-button>
              </n-dropdown>
            </template>

            <template #header-extra>
              <n-dropdown
                :options="notificationMoreOptions"
                trigger="hover"
                placement="bottom-end"
                @select="handleNotificationMoreSelect"
              >
                <n-button quaternary circle size="small" :focusable="false">
                  <n-icon :size="20">
                    <OverflowMenuHorizontal />
                  </n-icon>
                </n-button>
              </n-dropdown>
            </template>

            <template #default>
              <n-list hoverable clickable>
                <n-scrollbar style="max-height: 240px">
                  <n-list-item v-for="item in notificationList" :key="item.id">
                    <n-thing>
                      <template #avatar>
                        <n-button strong secondary circle type="primary" :focusable="false">
                          <n-icon :size="20">
                            <Notification />
                          </n-icon>
                        </n-button>
                      </template>

                      <template #header>
                        <n-ellipsis style="max-width: 234px">
                          {{ item.title }}
                        </n-ellipsis>
                      </template>

                      <template #description>
                        <n-flex justify="space-between" align="center" class="line-height-22px">
                          <n-text depth="3">
                            {{ item.createTime }}
                          </n-text>

                          <n-button
                            v-permission="'notification:mark-read'"
                            quaternary
                            circle
                            size="tiny"
                            :focusable="false"
                            @click.stop="handleMarkRead"
                          >
                            <n-icon :size="16">
                              <CheckmarkDone />
                            </n-icon>
                          </n-button>
                        </n-flex>
                      </template>
                    </n-thing>
                  </n-list-item>
                </n-scrollbar>
              </n-list>
            </template>

            <template #action>
              <n-flex justify="center">
                <n-button text :focusable="false">
                  <n-icon class="mr-1" :size="18">
                    <ChevronDown />
                  </n-icon>
                  <span>加载更多</span>
                </n-button>
              </n-flex>
            </template>
          </n-card>
        </n-popover>

        <n-divider vertical class="hidden sm:block" />

        <!-- 用户信息 -->
        <n-dropdown
          placement="bottom-end"
          size="huge"
          style="padding: 10px"
          :options="userMenuOptions"
          @select="handleUserMenuSelect"
        >
          <n-button quaternary class="u-max-navbar__btn px-1">
            <div class="flex items-center px-1">
              <n-avatar
                round
                class="mr-2"
                :style="{
                  color: '#ffffff',
                  backgroundColor: 'var(--u-primary-color)',
                }"
              >
                <n-icon :component="RobotFilled" />
              </n-avatar>
              <!-- 用户名：中等屏幕及以上显示 -->
              <div class="hidden md:flex items-center">
                <n-button class="flex" text :focusable="false">
                  <span>{{ userStore.getUsername }}</span>
                  <n-icon class="ml-1" :size="18">
                    <ChevronDown />
                  </n-icon>
                </n-button>
              </div>
            </div>
          </n-button>
        </n-dropdown>
      </n-flex>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLayoutStore, useThemeStore, useLocaleStore, useUserStore } from '@/stores';
import { setI18nLocale } from '@/i18n';
import {
  Star,
  Sun,
  Moon,
  User,
  Locked,
  Notification,
  NotificationNew,
  Translate,
  ChevronDown,
  Delete,
  OverflowMenuHorizontal,
} from '@vicons/carbon';
import { AlignLeftOutlined, RobotFilled } from '@vicons/antd';
import { FullScreenMaximize20Filled, FullScreenMinimize24Regular } from '@vicons/fluent';
import { CheckmarkDone } from '@vicons/ionicons5';
import { renderUserDropdownHeader, renderIcon, renderUserDropdownFooter } from '@/utils/renderer';
import { useDocumentFullscreen } from '@/utils/fullscreen';

import Logo from '../Logo/index.vue';
import Breadcrumb from '../Breadcrumb/index.vue';
import Menu from '../Menu/index.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';

const router = useRouter();

const layoutStore = useLayoutStore();

/** 水平模式且无侧栏时，路由菜单渲染在顶栏中部 */
const showHorizontalTopMenu = computed(
  () => layoutStore.getLayoutMode === 'horizontal' && !layoutStore.getSidebarShow,
);
const themeStore = useThemeStore();
const localeStore = useLocaleStore();
const userStore = useUserStore();

const { isFullscreen: isFullScreen, toggle: toggleFullScreen } = useDocumentFullscreen();
const notificationCount = ref(100);
const notificationValue = ref('all');

// 语言选项
const translateOptions = computed(() =>
  localeStore.getLocaleOptions.map((item) => ({
    label: item.label,
    key: item.key,
    icon: renderIcon(h(SvgIcon, { name: item.icon })),
  })),
);

// 通知选项
const notificationOptions = computed(() => [
  {
    label: '全部通知',
    key: 'all',
    icon: renderIcon(h(Notification)),
  },
  {
    label: '未读通知',
    key: 'unread',
    icon: renderIcon(h(NotificationNew)),
  },
]);

// 更多通知选项
const notificationMoreOptions = computed(() => [
  {
    label: '标记所有为已读',
    key: 'mark-as-read',
    icon: renderIcon(h(CheckmarkDone)),
  },
  {
    label: '清除所有通知',
    key: 'clear',
    icon: renderIcon(h(Delete)),
  },
]);

// 通知列表
const notificationList = [
  {
    id: 1,
    title: '重构布局系统，优化菜单和面包屑组件',
    createTime: '2023-07-01 10:00:00',
  },
  {
    id: 2,
    title: '添加详细的 README 文档',
    createTime: '2023-07-01 10:00:00',
  },
  {
    id: 3,
    title: '实现大体框架设计',
    createTime: '2023-07-01 10:00:00',
  },
];

// 用户菜单选项
const userMenuOptions = computed(() => [
  {
    key: 'header',
    type: 'render',
    render: renderUserDropdownHeader,
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: '用户信息',
    key: 'user-info',
    icon: renderIcon(h(User)),
  },
  ...(userStore.hasPermission('user:password:update')
    ? [
        {
          label: '修改密码',
          key: 'change-password',
          icon: renderIcon(h(Locked)),
        },
      ]
    : []),
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    type: 'render',
    render: renderUserDropdownFooter,
  },
]);

/**
 * 处理语言切换
 * @param key 语言代码
 */
function toggleLocale(key: string) {
  localeStore.setLocale(key as any);
  setI18nLocale(key);
}

/**
 * 处理通知切换
 * @param key 通知类型
 */
function toggleNotification(key: string) {
  notificationValue.value = key;
}

function handleMarkRead() {
  notificationCount.value = 0;
}

/**
 * 处理通知更多选择
 * @param key 选项值
 */
function handleNotificationMoreSelect(key: string) {
  switch (key) {
    case 'mark-as-read':
      notificationCount.value = 0;
      break;
    case 'clear':
      notificationCount.value = 0;
      break;
    default:
      break;
  }
}

function handleUserMenuSelect(key: string) {
  switch (key) {
    case 'user-info':
      router.push('/user/profile');
      break;
    case 'change-password':
      if (!userStore.hasPermission('user:password:update')) {
        return;
      }
      router.push('/user/change-password');
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.u-max-navbar {
  border-bottom: 1px solid var(--u-header-border-color, var(--u-border-color));
  background-color: var(--u-header-bg-color, var(--u-bg-elevated));
  color: var(--u-header-text-color, var(--u-text-primary));
  transition:
    background-color var(--u-transition-duration) var(--n-bezier),
    border-color var(--u-transition-duration) var(--n-bezier);

  /* 水平模式无侧栏折叠钮，Logo/首控件易贴边；与右侧 pr-4（16px）量级一致 */
  &.u-max-navbar--horizontal {
    padding-left: calc(var(--u-space-3) + var(--u-space-1));
  }

  .u-max-navbar__btn,
  .u-max-navbar__btn i {
    transition: all var(--u-transition-duration) var(--n-bezier);
  }

  .u-max-navbar__btn:hover {
    --n-btn-primary-bg-color: color-mix(in srgb, var(--u-primary-color) 12%, transparent);
    --n-btn-primary-color: var(--u-primary-color);
    background-color: var(--n-btn-primary-bg-color);
    color: var(--n-btn-primary-color);
  }

  .u-max-navbar__btn:hover i {
    transform: scale(1.1);
  }

  .u-max-navbar__right {
    .u-max-navbar__btn.anim-rotate:hover {
      transform: rotate(90deg);
    }
  }

  .u-max-navbar__topmenu {
    display: flex;
    align-items: stretch;
    height: 100%;
  }
}
</style>

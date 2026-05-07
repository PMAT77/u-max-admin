/** * 偏好设置按钮组件 * 显示浮动按钮和偏好设置抽屉 */
<template>
  <n-tooltip trigger="hover" placement="left">
    <template #trigger>
      <n-float-button
        position="fixed"
        width="50"
        height="50"
        bottom="80"
        right="20"
        @click="showDrawer = true"
      >
        <n-icon :component="Template" />
      </n-float-button>
    </template>
    偏好设置
  </n-tooltip>

  <n-drawer v-model:show="showDrawer" :width="340" placement="right" to="body" resizable>
    <n-drawer-content title="偏好设置" closable>
      <div class="preference-panel">
        <n-tabs v-model:value="activeTab" type="segment" animated>
          <n-tab name="theme">主题设置</n-tab>
          <n-tab name="layout">框架布局</n-tab>
          <n-tab name="style">主题风格</n-tab>
        </n-tabs>

        <n-scrollbar class="preference-scroll">
          <div v-if="activeTab === 'theme'" class="preference-content">
            <section class="preference-section">
              <h3 class="preference-title">布局主题</h3>
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="侧边栏主题" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-select v-model:value="siderTheme" class="w-150px" :options="themeOptions" />
                  </div>
                </n-form-item>
                <n-form-item label="顶栏主题" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-select v-model:value="headerTheme" class="w-150px" :options="themeOptions" />
                  </div>
                </n-form-item>
                <n-form-item label="色弱模式" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="isColorWeak" />
                  </div>
                </n-form-item>
                <n-form-item label="灰色模式" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="isGrayMode" />
                  </div>
                </n-form-item>
              </n-form>
            </section>

            <n-divider class="!my-10px" />

            <section class="preference-section">
              <h3 class="preference-title">圆角</h3>
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="圆角值" class="mb-0">
                  <div class="flex w-full items-center gap-3">
                    <n-slider
                      v-model:value="radiusValue"
                      :min="0"
                      :max="1"
                      :step="0.05"
                      class="flex-1"
                    />
                    <span class="min-w-44px text-right text-xs text-[var(--u-text-secondary)]">
                      {{ radiusValue.toFixed(2) }}
                    </span>
                  </div>
                </n-form-item>
              </n-form>
            </section>
          </div>

          <div v-else-if="activeTab === 'layout'" class="preference-content">
            <section class="preference-section">
              <h3 class="preference-title">布局模式</h3>
              <div class="layout-grid">
                <div v-for="item in layoutPatterns" :key="item.key" class="layout-grid__cell">
                  <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                      <button
                        type="button"
                        class="layout-card w-full"
                        :class="{ 'is-active': currentLayoutPattern === item.key }"
                        @click="handleLayoutPatternChange(item.key)"
                      >
                        <span class="layout-preview" :class="item.previewClass">
                          <span
                            v-if="item.key !== 'horizontal'"
                            class="layout-preview__block layout-preview__sider"
                          />
                          <span class="layout-preview__block layout-preview__header" />
                          <span class="layout-preview__block layout-preview__content" />
                        </span>
                      </button>
                    </template>
                    {{ item.label }}
                  </n-tooltip>
                </div>
              </div>
            </section>

            <n-divider class="!my-10px" />

            <section class="preference-section">
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="间隙布局" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="isGapLayoutEnabled" />
                  </div>
                </n-form-item>
                <n-form-item label="菜单分割" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="isMenuSplit" />
                  </div>
                </n-form-item>
                <n-form-item label="菜单分割线" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showMenuBorder" />
                  </div>
                </n-form-item>
              </n-form>
            </section>

            <n-divider class="!my-10px" />

            <section class="preference-section">
              <h3 class="preference-title">顶栏</h3>
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="显示顶栏" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showTopbar" />
                  </div>
                </n-form-item>
                <n-form-item label="固定顶栏" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="fixedTopbar" />
                  </div>
                </n-form-item>
                <n-form-item label="顶栏高度" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-input-number
                      v-model:value="headerHeight"
                      :min="40"
                      :max="90"
                      class="w-150px"
                    />
                  </div>
                </n-form-item>
              </n-form>
            </section>

            <n-divider class="!my-10px" />

            <section class="preference-section">
              <h3 class="preference-title">面包屑</h3>
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="显示面包屑" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showBreadcrumb" />
                  </div>
                </n-form-item>
                <n-form-item label="显示面包屑图标" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showBreadcrumbIcon" />
                  </div>
                </n-form-item>
              </n-form>
            </section>

            <n-divider class="!my-10px" />

            <section class="preference-section">
              <h3 class="preference-title">页签</h3>
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="显示页签" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showTagView" />
                  </div>
                </n-form-item>
                <n-form-item label="显示页签图标" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="showTagIcon" />
                  </div>
                </n-form-item>
                <n-form-item label="页签高度" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-input-number v-model:value="tagHeight" :min="36" :max="60" class="w-150px" />
                  </div>
                </n-form-item>
              </n-form>
            </section>
          </div>

          <div v-else class="preference-content">
            <section class="preference-section">
              <n-radio-group v-model:value="styleType" class="flex justify-center mt-10px mb-15px">
                <n-radio-button value="pure">纯色主题</n-radio-button>
                <n-radio-button value="skin">主题皮肤</n-radio-button>
              </n-radio-group>
              <n-color-picker
                v-model:value="primaryColorInput"
                :modes="['hex']"
                :show-alpha="false"
                @update:value="handlePrimaryColorChange"
              />
            </section>
            <section class="preference-section">
              <n-form
                label-placement="left"
                label-width="auto"
                label-align="left"
                :show-feedback="false"
              >
                <n-form-item label="顶部透明" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="headerTransparent" />
                  </div>
                </n-form-item>
                <n-form-item label="侧边栏透明" class="mb-2 last:mb-0">
                  <div class="flex w-full justify-end">
                    <n-switch v-model:value="siderTransparent" />
                  </div>
                </n-form-item>
              </n-form>
            </section>
          </div>
        </n-scrollbar>

        <div class="preference-footer">
          <n-button class="w-1/2" strong type="primary" @click="handleCopyConfig"
            >复制配置</n-button
          >
          <n-button class="w-1/2" strong @click="handleReset">重置配置</n-button>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Moon, Screen, Sun, Template } from '@vicons/carbon';
import { useLayoutStore, useThemeStore } from '@/stores';
import type { LayoutMode } from '@/config/layout/type';

const showDrawer = ref(false);
const activeTab = ref<'theme' | 'layout' | 'style'>('theme');
const themeStore = useThemeStore();
const layoutStore = useLayoutStore();
const message = useMessage();

const themeModeType = ref<'light' | 'dark' | 'system'>('dark');
const siderTheme = computed({
  get: () => themeStore.siderTheme,
  set: (value: 'light' | 'dark') => themeStore.setSiderTheme(value),
});
const headerTheme = computed({
  get: () => themeStore.headerTheme,
  set: (value: 'light' | 'dark') => themeStore.setHeaderTheme(value),
});
const isColorWeak = ref(false);
const isGrayMode = ref(false);
const showTopbar = computed({
  get: () => layoutStore.getShowTopbar,
  set: (value: boolean) => layoutStore.setShowTopbar(value),
});
const fixedTopbar = computed({
  get: () => layoutStore.getHeaderFixed,
  set: (value: boolean) => layoutStore.setHeaderFixed(value),
});
const showBreadcrumb = computed({
  get: () => layoutStore.getShowBreadcrumb,
  set: (value: boolean) => layoutStore.setShowBreadcrumb(value),
});
const showBreadcrumbIcon = computed({
  get: () => layoutStore.getShowBreadcrumbIcon,
  set: (value: boolean) => layoutStore.setShowBreadcrumbIcon(value),
});
const showTagView = computed({
  get: () => layoutStore.getShowTagView,
  set: (value: boolean) => layoutStore.setShowTagView(value),
});
const showTagIcon = computed({
  get: () => layoutStore.getShowTagIcon,
  set: (value: boolean) => layoutStore.setShowTagIcon(value),
});
const isMenuSplit = computed({
  get: () => layoutStore.getMenuSplit,
  set: (value: boolean) => layoutStore.setMenuSplit(value),
});
const showMenuBorder = computed({
  get: () => layoutStore.getShowMenuBorder,
  set: (value: boolean) => layoutStore.setShowMenuBorder(value),
});
const styleType = ref<'pure' | 'skin'>('pure');
const headerTransparent = ref(false);
const siderTransparent = ref(false);
const headerHeight = computed({
  get: () => layoutStore.getHeaderHeight,
  set: (value: number | null) => {
    if (value === null) return;
    layoutStore.setHeaderHeight(value);
  },
});
const tagHeight = computed({
  get: () => layoutStore.getTagHeight,
  set: (value: number | null) => {
    if (value === null) return;
    layoutStore.setTagHeight(value);
  },
});
const primaryColorInput = ref(themeStore.primaryColor);
const isGapLayoutEnabled = computed({
  get: () => layoutStore.getIsGap,
  set: (value: boolean) => layoutStore.setIsGap(value),
});

const themeOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
];

/** 与 `LayoutMode` / `layouts` 配置一致，仅展示已实现布局 */
const layoutPatterns: { key: LayoutMode; previewClass: string; label: string }[] = [
  { key: 'vertical', previewClass: 'preview-vertical', label: '经典' },
  { key: 'sidebar', previewClass: 'preview-sidebar', label: '侧边' },
  { key: 'horizontal', previewClass: 'preview-horizontal', label: '水平' },
];

const currentLayoutPattern = ref<LayoutMode>('vertical');

const layoutMode = computed<LayoutMode>({
  get: () => layoutStore.getLayoutMode,
  set: (value) => {
    layoutStore.setLayoutMode(value);
    if (value === 'horizontal') {
      layoutStore.setSidebarShow(false);
      layoutStore.setIsCollapse(false);
    } else {
      layoutStore.setSidebarShow(true);
    }
  },
});

const radiusValue = computed<number>({
  get: () => {
    const parsed = Number.parseFloat(themeStore.borderRadius);
    if (Number.isNaN(parsed)) return 0;
    return Math.min(1, Math.max(0, parsed));
  },
  set: (value: number) => {
    const normalized = Math.min(1, Math.max(0, value));
    themeStore.setBorderRadius(`${normalized}rem` as any);
  },
});

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

watch(themeModeType, (value) => {
  if (value === 'system') {
    themeStore.setTheme(prefersDark.matches ? 'dark' : 'light');
    return;
  }
  themeStore.setTheme(value);
});

watch(
  () => themeStore.mode,
  (value) => {
    if (themeModeType.value !== 'system') {
      themeModeType.value = value;
    }
  },
  { immediate: true },
);

watch(
  () => themeStore.primaryColor,
  (value) => {
    primaryColorInput.value = value;
  },
  { immediate: true },
);

watch(isGrayMode, (value) => {
  applyVisualFilter();
});

watch(isColorWeak, (value) => {
  applyVisualFilter();
});

watch(headerTransparent, (value) => {
  document.documentElement.style.setProperty('--u-header-opacity', value ? '0.82' : '1');
});

watch(siderTransparent, (value) => {
  document.documentElement.style.setProperty('--u-sider-opacity', value ? '0.82' : '1');
});

watch(
  () => layoutStore.getLayoutMode,
  (mode) => {
    if (currentLayoutPattern.value !== mode) {
      currentLayoutPattern.value = mode;
    }
    /* 侧边栏布局下侧栏绝对定位，与间隙布局不搭配：进入该模式时关闭间隙 */
    if (mode === 'sidebar' && layoutStore.getIsGap) {
      layoutStore.setIsGap(false);
    }
  },
  { immediate: true },
);

function handleLayoutPatternChange(patternKey: LayoutMode) {
  currentLayoutPattern.value = patternKey;
  layoutMode.value = patternKey;
}

function handlePrimaryColorChange(color: string) {
  themeStore.setPrimaryColor(color);
}

async function handleCopyConfig() {
  const data = {
    theme: themeStore.mode,
    primaryColor: themeStore.primaryColor,
    borderRadius: themeStore.borderRadius,
    siderTheme: themeStore.siderTheme,
    headerTheme: themeStore.headerTheme,
    layoutMode: layoutStore.getLayoutMode,
    sidebarShow: layoutStore.getShowSidebar,
    sidebarCollapse: layoutStore.getIsCollapse,
    menuSplit: layoutStore.getMenuSplit,
    showMenuBorder: layoutStore.getShowMenuBorder,
    showTopbar: layoutStore.getShowTopbar,
    headerFixed: layoutStore.getHeaderFixed,
    showBreadcrumb: layoutStore.getShowBreadcrumb,
    showBreadcrumbIcon: layoutStore.getShowBreadcrumbIcon,
    showTagView: layoutStore.getShowTagView,
    showTagIcon: layoutStore.getShowTagIcon,
    headerHeight: layoutStore.getHeaderHeight,
    tagHeight: layoutStore.getTagHeight,
    styleType: styleType.value,
  };
  try {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    message.success('配置已复制到剪贴板');
  } catch {
    message.error('复制失败，请检查浏览器剪贴板权限');
  }
}

function handleReset() {
  activeTab.value = 'theme';
  themeModeType.value = 'dark';
  isColorWeak.value = false;
  isGrayMode.value = false;
  styleType.value = 'pure';
  headerTransparent.value = false;
  siderTransparent.value = false;
  currentLayoutPattern.value = 'vertical';
  themeStore.resetTheme();
  layoutStore.resetLayout();
  primaryColorInput.value = themeStore.primaryColor;
  message.success('已恢复默认配置');
}

function applyVisualFilter() {
  const filters: string[] = [];
  if (isGrayMode.value) filters.push('grayscale(1)');
  if (isColorWeak.value) filters.push('invert(80%)');
  document.documentElement.style.filter = filters.join(' ');
}

onMounted(() => {
  if (prefersDark.matches) {
    themeModeType.value = themeStore.mode;
  }
});
</script>

<style scoped lang="scss">
.n-float-button {
  background: var(--u-bg-card);
  color: var(--u-text-primary);
  border: 1px solid var(--u-border-color);
  box-shadow: var(--u-shadow-card);
}

.preference-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: calc(100vh - 140px);
}

.preference-scroll {
  flex: 1;
  min-height: 0;
}

.preference-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-right: 4px;
}

.preference-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preference-title {
  color: var(--u-text-secondary);
}

:deep(.n-form-item-label__text) {
  opacity: 0.5;
}

.mode-group {
  width: 100%;
}

.mode-item {
  width: 100%;
  text-align: center;
}

.preference-color-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
}

.preference-color-item {
  height: 22px;
  border: 2px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  &.is-active {
    border-color: var(--u-text-primary);
  }
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.layout-grid__cell {
  min-width: 0;
}

.layout-card {
  border: 1px solid var(--u-border-color);
  border-radius: 10px;
  padding: 4px;
  background-color: var(--u-bg-card);
  cursor: pointer;
  transition: all 0.2s ease;

  &.is-active {
    border-color: var(--u-primary-color);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--u-primary-color) 35%, transparent);
  }
}

.layout-preview {
  display: grid;
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  padding: 4px;
  gap: 5px;
  border-radius: 8px;
  background-color: color-mix(in srgb, var(--u-text-primary) 4%, var(--u-bg-card));
  overflow: hidden;

  /* 图二：顶栏浅主色、内容浅灰、侧栏饱和主色 */
  --preview-chrome: var(--u-primary-color);
  --preview-topbar: color-mix(in srgb, var(--u-primary-color) 28%, var(--u-bg-elevated));
  --preview-body: color-mix(in srgb, var(--u-text-primary) 10%, var(--u-bg-elevated));
}

.layout-preview__block {
  min-width: 0;
  min-height: 0;
  border-radius: 3px;
}

.layout-preview__sider {
  background-color: var(--preview-chrome);
}

.layout-preview__header {
  background-color: var(--preview-topbar);
}

.layout-preview__content {
  background-color: var(--preview-body);
}

/* 经典：侧栏 + 顶栏 + 主区域 */
.preview-vertical {
  grid-template-columns: 10px 1fr;
  grid-template-rows: 9px 1fr;
  grid-template-areas:
    'sider header'
    'sider content';
}

.preview-vertical .layout-preview__sider {
  grid-area: sider;
}

.preview-vertical .layout-preview__header {
  grid-area: header;
}

.preview-vertical .layout-preview__content {
  grid-area: content;
}

/* 侧边：通栏顶栏 + 侧栏 + 主区域 */
.preview-sidebar {
  grid-template-columns: 10px 1fr;
  grid-template-rows: 9px 1fr;
  grid-template-areas:
    'head head'
    'side body';
}

.preview-sidebar .layout-preview__sider {
  grid-area: side;
}

.preview-sidebar .layout-preview__header {
  grid-area: head;
}

.preview-sidebar .layout-preview__content {
  grid-area: body;
}

/* 水平：通栏顶栏 + 主区域 */
.preview-horizontal {
  grid-template-columns: 1fr;
  grid-template-rows: 9px 1fr;
  grid-template-areas:
    'head'
    'body';
}

.preview-horizontal .layout-preview__header {
  grid-area: head;
}

.preview-horizontal .layout-preview__content {
  grid-area: body;
}

.preference-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--u-border-color);
  padding-top: 12px;
}
</style>

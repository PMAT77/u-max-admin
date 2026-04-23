<template>
  <div class="u-max-tagview" :style="{ ...cssVars, height: `${layoutStore.getTagHeight}px` }">
    <n-scrollbar x-scrollable>
      <draggable
        v-model="tagList"
        class="u-max-tagview__container"
        item-key="path"
        ghost-class="u-max-tagview__ghost"
        chosen-class="u-max-tagview__chosen"
        drag-class="u-max-tagview__drag"
        :animation="200"
        :move="checkMove"
      >
        <template #item="{ element: tag }">
          <div
            class="u-max-tagview__item"
            :class="{
              'u-max-tagview__item--active': isActive(tag),
              'u-max-tagview__item--affix': tag.affix,
            }"
            :draggable="!tag.affix"
            @click="handleClick(tag)"
            @contextmenu.prevent="handleContextMenu($event, tag)"
          >
            <component
              v-if="layoutStore.getShowTagIcon && tag.icon && iconMap[tag.icon]"
              class="u-max-tagview__item-icon"
              :is="renderIcon(iconMap[tag.icon], { size: 16 })"
            />
            <span class="u-max-tagview__item-title">{{ tag.title }}</span>
            <n-button text circle class="u-max-tagview__item-close">
              <n-icon v-if="!tag.affix" size="14" @click.stop="handleClose(tag)">
                <Close />
              </n-icon>
            </n-button>
          </div>
        </template>
      </draggable>
    </n-scrollbar>

    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="contextMenuX"
      :y="contextMenuY"
      :options="contextMenuOptions"
      :show="showContextMenu"
      @select="handleContextMenuSelect"
      @clickoutside="showContextMenu = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  Close,
  Remove,
  Refresh,
  SwapHorizontal,
  ReturnUpBack,
  ReturnDownForward,
} from '@vicons/ionicons5';
import { renderIcon } from '@/utils/renderer';
import { iconMap } from '@/config/route';
import { useTagViewStore, type TagView } from '@/stores/modules/tagView';
import { useLayoutStore, useThemeStore } from '@/stores';
import draggable from 'vuedraggable';

const router = useRouter();
const route = useRoute();
const tagViewStore = useTagViewStore();
const themeStore = useThemeStore();
const layoutStore = useLayoutStore();

const cssVars = computed(() => ({
  '--tag-active-bg-color': `${themeStore.primaryColor}1a`,
  '--tag-active-shadow-color': `${themeStore.primaryColor}1a`,
  '--tag-border-radius': themeStore.borderRadius,
  '--tag-item-hover-color': 'color-mix(in srgb, var(--u-primary-color) 12%, transparent)',
  '--tag-item-close-hover-color': 'color-mix(in srgb, var(--u-text-primary) 12%, transparent)',
}));

const tagList = computed({
  get: () => tagViewStore.getVisitedTags,
  set: (val) => {
    tagViewStore.visitedTags = val;
  },
});

const showContextMenu = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const selectedTag = ref<TagView | null>(null);

const contextMenuOptions = computed(() =>
  [
    {
      label: '重新加载',
      key: 'refresh',
      icon: renderIcon(Refresh, { size: 16 }),
      show: !!selectedTag.value,
      disabled: false,
    },
    {
      label: '关闭当前',
      key: 'close',
      icon: renderIcon(Close, { size: 16 }),
      show: !!selectedTag.value && !selectedTag.value.affix,
      disabled: selectedTag.value?.affix || selectedTagIsOnly.value,
    },
    {
      type: 'divider',
      key: 'd1',
      show: !!selectedTag.value,
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      icon: renderIcon(ReturnUpBack, { size: 16 }),
      show: !!selectedTag.value && !selectedTagIsFirst.value,
      disabled: selectedTagIsFirst.value,
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: renderIcon(ReturnDownForward, { size: 16 }),
      show: !!selectedTag.value && !selectedTagIsLast.value,
      disabled: selectedTagIsLast.value,
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: renderIcon(SwapHorizontal, { size: 16 }),
      show: !!selectedTag.value,
      disabled: selectedTagIsOnly.value,
    },
    {
      type: 'divider',
      key: 'd2',
      show: !!selectedTag.value,
    },
    {
      label: '关闭所有',
      key: 'closeAll',
      icon: renderIcon(Remove, { size: 16 }),
      disabled: false,
    },
  ].filter((item) => item.show !== false),
);

function isActive(tag: TagView): boolean {
  return tag.path === route.path;
}

function handleClick(tag: TagView): void {
  if (tag.path !== route.path) {
    router.push(tag.fullPath);
  }
}

function handleClose(tag: TagView): void {
  const nextTag = tagViewStore.closeTag(tag.path);
  if (nextTag && isActive(tag)) {
    router.push(nextTag.fullPath);
  }
}

function handleContextMenu(e: MouseEvent, tag: TagView | null): void {
  if (!tag) return;
  const isValidTag = tagViewStore.getVisitedTags.some((t) => t.path === tag.path);
  if (!isValidTag) return;
  selectedTag.value = tag;
  contextMenuX.value = e.clientX;
  contextMenuY.value = e.clientY;
  showContextMenu.value = true;
}

const selectedTagIndex = computed(() => {
  if (!selectedTag.value) return -1;
  return tagViewStore.getVisitedTags.findIndex((t) => t.path === selectedTag.value?.path);
});

const selectedTagIsFirst = computed(() => selectedTagIndex.value === 0);
const selectedTagIsLast = computed(
  () => selectedTagIndex.value === tagViewStore.getVisitedTags.length - 1,
);
const selectedTagIsOnly = computed(() => tagViewStore.getVisitedTags.length === 1);

function handleContextMenuSelect(key: string): void {
  showContextMenu.value = false;

  switch (key) {
    case 'refresh':
      if (selectedTag.value) {
        router.replace({
          path: selectedTag.value.fullPath,
          query: { ...route.query, t: Date.now() },
        });
      } else {
        router.replace({
          path: '/redirect' + route.fullPath,
          query: { ...route.query, t: Date.now() },
        });
      }
      break;
    case 'close':
      if (selectedTag.value) {
        handleClose(selectedTag.value);
      }
      break;
    case 'closeLeft':
      if (selectedTag.value) {
        tagViewStore.closeLeftTags(selectedTag.value.path);
      }
      break;
    case 'closeRight':
      if (selectedTag.value) {
        tagViewStore.closeRightTags(selectedTag.value.path);
      }
      break;
    case 'closeOther':
      if (selectedTag.value) {
        tagViewStore.closeOtherTags(selectedTag.value.path);
        if (!isActive(selectedTag.value)) {
          router.push(selectedTag.value.fullPath);
        }
      }
      break;
    case 'closeAll':
      const firstTag = tagViewStore.closeAllTags();
      if (firstTag && !isActive(firstTag)) {
        router.push(firstTag.fullPath);
      }
      break;
  }
}

function checkMove(evt: any): boolean {
  const { relatedContext, draggedContext } = evt;

  if (draggedContext.element?.affix || relatedContext.element?.affix) return false;

  return true;
}

function addCurrentRoute(): void {
  if (route.name && !route.meta?.hideTag) {
    tagViewStore.addTag(route);
  }
}

watch(
  () => route.path,
  () => {
    addCurrentRoute();
  },
  { immediate: true },
);

onMounted(() => {
  addCurrentRoute();
});
</script>

<style scoped lang="scss">
.u-max-tagview {
  user-select: none;
  background-color: var(--u-header-bg-color, var(--u-bg-elevated));
  color: var(--u-header-text-color, var(--u-text-primary));
  border-bottom: 1px solid var(--u-header-border-color, var(--u-border-color));
  transition:
    background-color 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);

  :deep(.n-scrollbar-content) {
    height: 100%;
  }
}

.u-max-tagview__container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 var(--u-space-2);
  gap: var(--u-tag-item-gap);
}

.u-max-tagview__item {
  display: flex;
  align-items: center;
  padding: var(--u-tag-item-padding);
  font-size: var(--u-tag-item-font-size);
  color: var(--n-text-color-2);
  background-color: var(--n-color-hover);
  border-radius: var(--tag-border-radius);
  cursor: pointer;
  transition:
    background-color var(--u-transition-duration) var(--n-bezier),
    box-shadow var(--u-transition-duration) var(--n-bezier);
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;

  &:hover {
    background-color: var(--tag-item-hover-color);
  }

  &--active {
    color: var(--n-text-color);
    background-color: var(--tag-active-bg-color);
    box-shadow: 0 0 0 1px var(--tag-active-shadow-color);

    &::before {
      content: '';
      position: absolute;
      left: 8px;
      width: var(--u-tag-icon-size);
      height: var(--u-tag-icon-size);
      border-radius: 50%;
      background-color: var(--n-primary-color);
    }
  }

  &[draggable='true'] {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

.u-max-tagview__ghost {
  opacity: 0.4;
}

.u-max-tagview__chosen {
  opacity: 0.8;
}

.u-max-tagview__drag {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: var(--u-shadow-card);
}

.u-max-tagview__item-icon {
  margin-right: var(--u-space-1);
}

.u-max-tagview__item-title {
  max-width: var(--u-tag-title-max-width);
  overflow: hidden;
  text-overflow: ellipsis;
}

.u-max-tagview__item-close {
  cursor: pointer;
  margin-left: var(--u-tag-close-gap);
  border-radius: 50%;
  transition: all var(--u-transition-duration-fast) ease;
}

.u-max-tagview__item-close:hover {
  background-color: var(--tag-item-close-hover-color);
}
</style>

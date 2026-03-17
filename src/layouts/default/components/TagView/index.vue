/** * TagView 组件 * 谷歌风格的标签页导航，支持拖拽和右键菜单 */
<template>
  <div class="u-max-tagview">
    <n-scrollbar x-scrollable>
      <div class="u-max-tagview__container" @contextmenu.prevent="handleContextMenu($event, null)">
        <div
          v-for="(tag, index) in tagViewStore.getVisitedTags"
          :key="tag.path"
          class="u-max-tagview__item"
          :class="{
            'u-max-tagview__item--active': isActive(tag),
            'u-max-tagview__item--affix': tag.affix,
          }"
          :draggable="!tag.affix"
          @click="handleClick(tag)"
          @contextmenu.prevent="handleContextMenu($event, tag)"
          @dragstart="handleDragStart($event, index)"
          @dragover.prevent="handleDragOver($event, index)"
          @drop="handleDrop($event, index)"
          @dragend="handleDragEnd"
        >
          <n-icon size="14" class="u-max-tagview__item-icon"> </n-icon>
          <span class="u-max-tagview__item-title">{{ tag.title }}</span>
          <n-icon
            v-if="!tag.affix"
            class="u-max-tagview__item-close"
            size="14"
            @click.stop="handleClose(tag)"
          >
            <Close />
          </n-icon>
        </div>
      </div>
    </n-scrollbar>

    <!-- 右键菜单 -->
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
import { Close } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/renderer';
import { useTagViewStore, type TagView } from '@/stores/modules/tagView';

const router = useRouter();
const route = useRoute();
const tagViewStore = useTagViewStore();

// 拖拽状态
const dragIndex = ref<number | null>(null);
const dropIndex = ref<number | null>(null);

// 右键菜单状态
const showContextMenu = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const selectedTag = ref<TagView | null>(null);

// 右键菜单选项
const contextMenuOptions = computed(() =>
  [
    {
      label: '刷新',
      key: 'refresh',
      show: !!selectedTag.value,
    },
    {
      label: '关闭',
      key: 'close',
      show: !!selectedTag.value && !selectedTag.value?.affix,
    },
    {
      type: 'divider',
      key: 'd1',
      show: !!selectedTag.value,
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      show: !!selectedTag.value,
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      show: !!selectedTag.value,
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      show: !!selectedTag.value,
    },
    {
      type: 'divider',
      key: 'd2',
    },
    {
      label: '关闭所有',
      key: 'closeAll',
    },
  ].filter((item) => item.show !== false),
);

/**
 * 判断标签是否激活
 */
function isActive(tag: TagView): boolean {
  return tag.path === route.path;
}

/**
 * 点击标签
 */
function handleClick(tag: TagView): void {
  if (tag.path !== route.path) {
    router.push(tag.fullPath);
  }
}

/**
 * 关闭标签
 */
function handleClose(tag: TagView): void {
  const nextTag = tagViewStore.closeTag(tag.path);
  if (nextTag && isActive(tag)) {
    router.push(nextTag.fullPath);
  }
}

/**
 * 处理右键菜单
 */
function handleContextMenu(e: MouseEvent, tag: TagView | null): void {
  selectedTag.value = tag;
  contextMenuX.value = e.clientX;
  contextMenuY.value = e.clientY;
  showContextMenu.value = true;
}

/**
 * 处理右键菜单选择
 */
function handleContextMenuSelect(key: string): void {
  showContextMenu.value = false;

  switch (key) {
    case 'refresh':
      router.replace({ path: '/redirect' + route.fullPath });
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

/**
 * 拖拽开始
 */
function handleDragStart(e: DragEvent, index: number): void {
  dragIndex.value = index;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
  }
}

/**
 * 拖拽经过
 */
function handleDragOver(e: DragEvent, index: number): void {
  dropIndex.value = index;
}

/**
 * 拖拽放下
 */
function handleDrop(e: DragEvent, index: number): void {
  if (dragIndex.value !== null && dragIndex.value !== index) {
    tagViewStore.moveTag(dragIndex.value, index);
  }
}

/**
 * 拖拽结束
 */
function handleDragEnd(): void {
  dragIndex.value = null;
  dropIndex.value = null;
}

/**
 * 添加当前路由到标签
 */
function addCurrentRoute(): void {
  if (route.name && !route.meta?.hideTag) {
    tagViewStore.addTag(route);
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    addCurrentRoute();
  },
  { immediate: true },
);

// 初始化固定标签
onMounted(() => {
  addCurrentRoute();
});
</script>

<style scoped lang="scss">
.u-max-tagview {
  height: 47px;
  background-color: var(--n-color);
  user-select: none;

  :deep(.n-scrollbar-content) {
    height: 100%;
  }
}

.u-max-tagview__container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  gap: 4px;
}

.u-max-tagview__item {
  display: flex;
  align-items: center;
  // height: 28px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--n-text-color-2);
  background-color: var(--n-color-hover);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;

  &:hover {
    background-color: var(--n-color-pressed);
  }

  &--active {
    color: var(--n-text-color);
    background-color: var(--n-color-target);
    box-shadow: 0 0 0 1px var(--n-border-color);

    &::before {
      content: '';
      position: absolute;
      left: 8px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--n-primary-color);
    }
  }

  &--affix {
    padding-left: 20px;
  }

  &[draggable='true'] {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

.u-max-tagview__item-title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.u-max-tagview__item-close {
  margin-left: 6px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--n-text-color);
  }
}

// 暗色主题
:global(.dark) {
  .u-max-tagview__item-close:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>

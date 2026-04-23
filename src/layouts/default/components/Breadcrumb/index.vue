<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.key">
      <div class="flex items-center line-height-18px">
        <component
          v-if="layoutStore.getShowBreadcrumbIcon && item.icon"
          class="mr-1"
          :is="item.icon"
        />
        <span>{{ item.label }}</span>
      </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutStore, useMenuStore } from '@/stores';

const menuStore = useMenuStore();
const layoutStore = useLayoutStore();
const breadcrumbs = computed(() => menuStore.getBreadcrumbs);
</script>

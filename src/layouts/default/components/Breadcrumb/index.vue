<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.key">
      <div class="flex items-center line-height-18px">
        <component class="mr-1" :is="item.icon" />
        <span>{{ item.label }}</span>
      </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMenuStore } from '@/stores';

const menuStore = useMenuStore();
const breadcrumbs = computed(() => menuStore.getBreadcrumbs);
</script>

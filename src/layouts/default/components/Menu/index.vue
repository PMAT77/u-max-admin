<template>
  <div class="u-max-sider__menu">
    <n-menu
      mode="vertical"
      :options="menuOptions"
      :collapsed="layoutStore.getIsCollapse"
      :collapsed-width="layoutStore.getCollapsedWidth"
      :value="routeStore.activeMenu"
      v-model:expanded-keys="expandedKeys"
      @update:value="handleMenuUpdate"
    /> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLayoutStore, useRouteStore } from '@/stores'

const route = useRoute() 
const router = useRouter() 
const layoutStore = useLayoutStore()
const routeStore = useRouteStore() 

const menuOptions = computed(() => routeStore.getMenuOptions) 
const expandedKeys = ref<string[]>([])

function handleMenuUpdate(key: string) {  
  router.push(key)
}

function syncRouteState() {
  const currentPath = route.matched.length > 0 
    ? route.matched[route.matched.length - 1].path 
    : route.path
  routeStore.setCurrentPath(currentPath)
}

function updateExpandedKeys() {
  const keys = routeStore.getExpandedKeys
  keys.forEach(key => {
    if (!expandedKeys.value.includes(key)) {
      expandedKeys.value.push(key)
    }
  })
}

onMounted(() => {
  syncRouteState()
})

watch(() => route.fullPath, () => {
  syncRouteState()
  updateExpandedKeys()
})

watch(() => routeStore.getMenuOptions, (options) => {
  if (options.length > 0) {
    expandedKeys.value = routeStore.getExpandedKeys
  }
}, { immediate: true })
</script>

<template>
  <svg
    class="svg-icon"
    :class="svgClass"
    :style="style"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: number | string
  color?: string
  width?: number | string
  height?: number | string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: 'currentColor'
})

const iconName = computed(() => `#icon-${props.name}`)

const svgClass = computed(() => props.className || '')

const style = computed(() => {
  const width = props.width || props.size
  const height = props.height || props.size
  
  return {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    color: props.color
  }
})
</script>

<style scoped lang="scss">
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>

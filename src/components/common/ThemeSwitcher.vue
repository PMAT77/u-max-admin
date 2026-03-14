/** * 主题切换器组件 * 用于配置主题模式和主题颜色 */
<template>
  <div class="theme-switcher">
    <n-space vertical>
      <!-- 主题设置卡片 -->
      <n-card title="主题设置">
        <n-form>
          <!-- 主题模式选择 -->
          <n-form-item label="主题模式">
            <n-radio-group v-model:value="theme" name="theme">
              <n-radio value="light">亮色</n-radio>
              <n-radio value="dark">暗色</n-radio>
            </n-radio-group>
          </n-form-item>
          <!-- 主题颜色选择 -->
          <n-form-item label="主题颜色">
            <n-color-picker v-model:value="primaryColor" />
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { computed } from 'vue';

/**
 * 组件属性
 */
const props = defineProps({
  /**
   * 主题配置对象
   * @default { theme: 'dark', primaryColor: '#667eea' }
   */
  modelValue: {
    type: Object,
    default: () => ({
      theme: 'dark',
      primaryColor: '#667eea',
    }),
  },
});

/**
 * 组件事件
 */
const emit = defineEmits(['update:modelValue']);

/**
 * 主题模式计算属性
 * 支持双向绑定
 */
const theme = computed({
  get() {
    return props.modelValue.theme;
  },
  set(value) {
    emit('update:modelValue', {
      ...props.modelValue,
      theme: value,
    });
  },
});

/**
 * 主题颜色计算属性
 * 支持双向绑定
 */
const primaryColor = computed({
  get() {
    return props.modelValue.primaryColor;
  },
  set(value) {
    emit('update:modelValue', {
      ...props.modelValue,
      primaryColor: value,
    });
  },
});
</script>

<style scoped>
.theme-switcher {
  padding: 16px;
}
</style>

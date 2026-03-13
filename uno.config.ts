import { defineConfig } from 'unocss'

export default defineConfig({
  safelist: [
    'order-1',
    'order-2',
    // 添加所有可能的动态类名
  ],
})
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        NaiveUiResolver()
      ],
      dts: 'src/components.d.ts'
    }),
    viteMockServe({
      mockPath: 'src/mock',
      localEnabled: process.env.VITE_USE_MOCK === 'true',
      prodEnabled: process.env.VITE_USE_MOCK === 'true',
      watchFiles: true
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
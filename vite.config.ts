import { defineConfig } from 'vite-plus';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

const useMock = process.env.VITE_USE_MOCK === 'true';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'lf',
    sortPackageJson: false,
    ignorePatterns: [],
  },
  plugins: [
    vue(),
    vueJsx(),
    unocss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts',
    }),
    viteMockServe({
      mockPath: 'src/mock',
      localEnabled: true,
      // Production mock is disabled by default, must be explicitly enabled by VITE_USE_MOCK=true.
      prodEnabled: useMock,
      watchFiles: true,
    } as any),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

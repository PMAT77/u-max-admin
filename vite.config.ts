import { defineConfig } from 'vite-plus';
import { loadEnv } from 'vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

/** 与 Vite CLI 的 --mode 对齐，供 loadEnv 读取对应 .env.[mode] */
function resolveViteConfigMode(): string {
  const modeIdx = process.argv.indexOf('--mode');
  if (modeIdx !== -1 && process.argv[modeIdx + 1]) {
    return process.argv[modeIdx + 1];
  }
  if (process.argv.includes('build') || process.argv.includes('preview')) {
    return 'production';
  }
  return 'development';
}

const viteMode = resolveViteConfigMode();
const loadedEnv = loadEnv(viteMode, process.cwd(), '');
/** 仅 development 且 VITE_USE_MOCK=true；生产 / preview 构建下恒为 false */
const enableViteMock = viteMode === 'development' && loadedEnv.VITE_USE_MOCK === 'true';

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
      localEnabled: enableViteMock,
      prodEnabled: false,
      watchFiles: enableViteMock,
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

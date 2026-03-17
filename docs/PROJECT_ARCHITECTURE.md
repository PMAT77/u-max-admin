# Naive Admin Max 项目架构文档

> 本文档旨在帮助 AI 助手快速理解项目架构和开发规范，以便更高效地协助开发。

---

## 目录

1. [项目概述](#项目概述)
2. [技术栈概览](#技术栈概览)
3. [目录结构详解](#目录结构详解)
4. [核心开发规范](#核心开发规范)
5. [状态管理规范](#状态管理规范)
6. [路由系统规范](#路由系统规范)
7. [API 请求规范](#api-请求规范)
8. [样式开发规范](#样式开发规范)
9. [组件开发规范](#组件开发规范)
10. [国际化规范](#国际化规范)
11. [Mock 数据规范](#mock-数据规范)
12. [常见开发场景指南](#常见开发场景指南)
13. [技术债与注意事项](#技术债与注意事项)

---

## 项目概述

**Naive Admin Max** 是一个基于 Vue 3 + TypeScript + Vite 的现代化后台管理系统模板。采用 Naive UI 作为组件库，支持主题切换、国际化、权限控制等企业级特性。

### 核心特性

- 🔐 完整的登录认证流程
- 🎨 主题切换（亮色/暗色）+ 自定义主色
- 🌐 国际化支持（中/英）
- 📐 多种布局模式（vertical/sidebar/top）
- 🏷️ 标签页缓存
- 🔧 Mock 数据支持

---

## 技术栈概览

### 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 核心框架，使用 Composition API |
| TypeScript | 5.9.x | 类型安全 |
| Vite | 7.x | 构建工具 |

### UI 与样式

| 技术 | 版本 | 说明 |
|------|------|------|
| Naive UI | 2.44.x | Vue 3 组件库 |
| UnoCSS | 66.x | 原子化 CSS 引擎 |
| Sass | 1.98.x | CSS 预处理器 |
| @vicons/* | 0.13.x | 图标库 |

### 状态与路由

| 技术 | 版本 | 说明 |
|------|------|------|
| Pinia | 3.x | 状态管理 |
| pinia-plugin-persistedstate | 4.x | 状态持久化 |
| Vue Router | 4.x | 路由管理 |

### 工具链

| 技术 | 说明 |
|------|------|
| unplugin-auto-import | 自动导入 Vue API |
| unplugin-vue-components | 组件自动注册 |
| vite-plugin-mock | Mock 数据 |
| vite-plugin-svg-icons | SVG 图标注册 |
| vue-i18n | 国际化 |
| axios | HTTP 请求 |
| @vueuse/core | Vue 工具集 |

---

## 目录结构详解

```
src/
├── api/                          # API 请求层
│   ├── index.ts                  # Axios 实例 + 拦截器配置
│   ├── user.ts                   # 用户相关 API
│   └── route.ts                  # 路由/菜单相关 API
│
├── assets/                       # 静态资源
│   ├── imgs/                     # 图片资源
│   └── svgs/                     # SVG 图标（自动注册）
│
├── components/                   # 组件库
│   ├── auth/                     # 认证业务组件
│   │   ├── LoginPanel.vue        # 登录面板容器
│   │   ├── LoginByAccount.vue    # 账号登录表单
│   │   ├── LoginByPhone.vue      # 手机号登录表单
│   │   └── LoginByQrcode.vue     # 扫码登录
│   └── common/                   # 通用组件
│       ├── ThemeProvider.vue     # 主题提供者
│       ├── ThemeSwitcher.vue     # 主题切换器
│       ├── PreferenceButton.vue  # 偏好设置按钮
│       └── SvgIcon.vue           # SVG 图标组件
│
├── config/                       # 配置文件
│   └── layouts/                  # 布局配置
│       ├── index.ts              # 布局配置项
│       └── type.ts               # 布局类型定义
│
├── i18n/                         # 国际化
│   ├── index.ts                  # i18n 实例配置
│   └── locales/                  # 语言包
│       ├── zh-CN.ts              # 简体中文
│       └── en-US.ts              # 英文
│
├── icons/                        # 图标配置
│   └── index.ts                  # SVG 图标注册逻辑
│
├── layouts/                      # 布局组件
│   ├── blank/                    # 空白布局（登录页等）
│   │   └── index.vue
│   └── default/                  # 默认布局（侧边栏+顶栏+内容）
│       ├── index.vue
│       └── components/           # 布局子组件
│           ├── Logo/
│           ├── Menu/
│           ├── Navbar/
│           ├── Breadcrumb/
│           └── TagView/
│
├── mock/                         # Mock 数据
│   ├── index.ts                  # Mock 配置
│   ├── user.ts                   # 用户 Mock
│   └── route.ts                  # 路由 Mock
│
├── router/                       # 路由系统
│   ├── index.ts                  # 路由实例 + 守卫
│   ├── routes.ts                 # 路由配置汇总
│   └── models/                   # 路由模块
│       ├── auth.ts               # 认证路由
│       ├── dashboard.ts          # 仪表盘路由
│       ├── user.ts               # 用户路由
│       └── common.ts             # 公共路由
│
├── stores/                       # 状态管理
│   ├── index.ts                  # Store 统一导出
│   ├── setup.ts                  # Pinia 配置 + 外部使用工具
│   └── modules/                  # Store 模块
│       ├── user.ts               # 用户状态
│       ├── theme.ts              # 主题状态
│       ├── layout.ts             # 布局状态
│       ├── route.ts              # 路由状态
│       ├── locale.ts             # 国际化状态
│       └── tagView.ts            # 标签页状态
│
├── styles/                       # 全局样式
│   ├── normal.scss               # 全局样式重置
│   └── variables.scss            # SCSS 变量
│
├── types/                        # TypeScript 类型定义
│   ├── api.ts                    # API 类型
│   └── components.ts             # 组件类型
│
├── utils/                        # 工具函数
│   ├── naive.ts                  # Naive UI 全局 API
│   ├── renderer.ts               # 渲染工具
│   ├── errorHandler.ts           # 错误处理
│   ├── tokenStorage.ts           # Token 存储
│   └── menu.ts                   # 菜单工具
│
├── views/                        # 页面视图
│   ├── auth/                     # 认证页面
│   │   └── Login.vue
│   ├── dashboard/                # 仪表盘页面
│   │   └── Dashboard.vue
│   ├── user/                     # 用户页面
│   │   └── profile/index.vue
│   ├── common/                   # 公共页面
│   │   ├── About.vue
│   │   └── NotFound.vue
│   └── redirect/                 # 重定向页面
│       └── index.vue
│
├── App.vue                       # 根组件
├── main.ts                       # 应用入口
└── vite-env.d.ts                 # Vite 类型声明
```

---

## 核心开发规范

### 应用初始化顺序

```
main.ts 初始化流程（顺序不可更改）：

1. createApp(App)
2. app.use(pinia)              ← 必须最先注册
3. import '@/utils/naive'      ← 依赖 Pinia
4. import router               ← 依赖 Pinia + Naive
5. app.use(router)
6. app.use(i18n)
7. app.mount('#app')
```

### 文件命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `LoginPanel.vue` |
| 工具文件 | camelCase | `errorHandler.ts` |
| 类型文件 | camelCase | `components.ts` |
| Store 模块 | camelCase | `user.ts` |
| 路由模块 | camelCase | `dashboard.ts` |
| 样式文件 | camelCase | `normal.scss` |

### 导入路径别名

```typescript
// vite.config.ts 配置
resolve: {
  alias: {
    '@': '/src'
  }
}

// 使用示例
import { useUserStore } from '@/stores'
import LoginPanel from '@/components/auth/LoginPanel.vue'
```

---

## 状态管理规范

### Store 模块结构

```typescript
// stores/modules/xxx.ts
import { defineStore } from 'pinia'

export const useXxxStore = defineStore('xxx', {
  state: () => ({
    // 状态
  }),

  getters: {
    // 获取器（命名以 get 开头）
    getXxx(): Type { return this.xxx }
  },

  actions: {
    // 操作方法
    setXxx(value: Type): void { this.xxx = value }
  },

  persist: true  // 是否持久化
})
```

### 现有 Store 模块

| 模块 | 文件 | 职责 | 持久化 |
|------|------|------|--------|
| user | `stores/modules/user.ts` | Token、用户信息、登录状态 | ✅ |
| theme | `stores/modules/theme.ts` | 主题模式、主色、圆角 | ✅ |
| layout | `stores/modules/layout.ts` | 布局配置、侧边栏状态 | ✅ |
| route | `stores/modules/route.ts` | 菜单、面包屑、当前路径 | ❌ |
| locale | `stores/modules/locale.ts` | 语言设置 | ✅ |
| tagView | `stores/modules/tagView.ts` | 标签页缓存 | - |

### 在组件中使用

```typescript
import { useUserStore, useThemeStore } from '@/stores'

const userStore = useUserStore()
const themeStore = useThemeStore()

// 读取状态
const isLoggedIn = userStore.isLoggedIn
const isDark = themeStore.isDark

// 调用方法
userStore.setToken('xxx')
themeStore.toggleTheme()
```

### 在组件外部使用（如路由守卫）

```typescript
import { useStoreOutsideSetup } from '@/stores/setup'
import { useUserStore } from '@/stores/modules/user'

const userStore = useStoreOutsideSetup(useUserStore)
console.log(userStore.isLoggedIn)
```

---

## 路由系统规范

### 路由配置结构

```typescript
// router/models/xxx.ts
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/module',
    name: 'ModuleName',
    component: () => import('@/layouts/default/index.vue'),
    meta: {
      title: '模块名称',      // 必填：菜单标题
      icon: 'IconName',       // 可选：菜单图标
      hideTag: false,         // 可选：是否隐藏标签
      show: true,             // 可选：是否显示在菜单
      affix: false,           // 可选：是否固定标签
    },
    children: [
      {
        path: 'page',
        name: 'PageName',
        component: () => import('@/views/module/Page.vue'),
        meta: { title: '页面名称' }
      }
    ]
  }
]

export default routes
```

### 添加新路由模块

1. 在 `router/models/` 下创建路由文件
2. 在 `router/routes.ts` 中导入并合并

```typescript
// router/routes.ts
import NewModuleRoutes from './models/newModule'

const routes: RouteRecordRaw[] = [
  ...redirectRoutes,
  ...AuthRoutes,
  ...DashboardRoutes,
  ...NewModuleRoutes,  // 添加新模块
]
```

### 路由守卫逻辑

```
beforeEach
    │
    ├── globalLoadingBar.start()
    │
    ├── 检查登录状态
    │   ├── 已登录 + 访问登录页 → 重定向到工作台
    │   ├── 已登录 + 其他页面 → 放行
    │   └── 未登录
    │       ├── 白名单页面 → 放行
    │       └── 需认证页面 → 重定向登录页
    │
    ↓
afterEach → globalLoadingBar.finish()
```

### 白名单配置

```typescript
// router/index.ts
const whiteList = ['/auth/login', '/auth/register', '/auth/forgot-password']
```

### 布局选择

| 布局 | 使用场景 | 路径 |
|------|----------|------|
| default | 需要侧边栏和导航的页面 | `@/layouts/default/index.vue` |
| blank | 登录页等纯净页面 | `@/layouts/blank/index.vue` |

---

## API 请求规范

### Axios 实例配置

```typescript
// api/index.ts
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})
```

### 请求拦截器

```typescript
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 响应拦截器

统一处理以下错误：
- 401: 登录过期 → 清除 Token → 跳转登录页
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器错误
- 网络错误

### API 模块定义

```typescript
// api/xxx.ts
import service from './index'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

export const xxxApi = {
  getList: (): Promise<ApiResponse<ListData[]>> => {
    return service.get('/xxx/list')
  },
  
  getItem: (id: string): Promise<ApiResponse<ItemData>> => {
    return service.get(`/xxx/${id}`)
  },
  
  create: (data: CreateParams): Promise<ApiResponse> => {
    return service.post('/xxx', data)
  },
  
  update: (id: string, data: UpdateParams): Promise<ApiResponse> => {
    return service.put(`/xxx/${id}`, data)
  },
  
  delete: (id: string): Promise<ApiResponse> => {
    return service.delete(`/xxx/${id}`)
  }
}
```

### 在页面中调用 API

```typescript
import { xxxApi } from '@/api/xxx'
import { handleApiError } from '@/utils/errorHandler'

async function fetchData() {
  try {
    const response = await xxxApi.getList()
    if (response.code === 200) {
      // 处理数据
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

---

## 样式开发规范

### 样式方案选择

| 场景 | 推荐方案 | 示例 |
|------|----------|------|
| 布局、间距、简单样式 | UnoCSS 原子类 | `class="flex items-center mt-4"` |
| 复杂样式、主题相关 | SCSS | `<style scoped lang="scss">` |
| 全局变量 | variables.scss | `$primary-color: #667eea` |

### UnoCSS 常用类

```html
<!-- 布局 -->
<div class="flex items-center justify-center">
<div class="flex flex-col h-full">

<!-- 间距 -->
<div class="mt-4 mb-2 px-4 py-2">
<div class="m-6 p-4">

<!-- 尺寸 -->
<div class="w-full h-screen">
<div class="w-65 max-w-md">

<!-- 显示 -->
<div class="hidden lg:block">
<div class="overflow-y-auto">
```

### SCSS 作用域样式

```vue
<style scoped lang="scss">
.component-name {
  // 样式
  
  &--modifier {
    // 修饰符样式
  }
  
  &__element {
    // 元素样式
  }
}
</style>
```

### 主题相关

```typescript
// 使用主题 Store
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()

// 切换主题
themeStore.toggleTheme()

// 设置主色
themeStore.setPrimaryColor('#1890ff')

// 判断暗色模式
const isDark = themeStore.isDark
```

---

## 组件开发规范

### 组件分类

| 目录 | 用途 | 特点 |
|------|------|------|
| `components/auth/` | 认证业务组件 | 与登录流程相关 |
| `components/common/` | 通用组件 | 可复用、无业务逻辑 |
| `views/` | 页面组件 | 路由级别 |
| `layouts/` | 布局组件 | 页面框架 |

### 组件模板

```vue
<template>
  <div class="component-name">
    <!-- 内容 -->
  </div>
</template>

<script setup lang="ts">
// 1. 导入
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

// 2. Props 定义
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 3. Emits 定义
interface Emits {
  (e: 'update', value: string): void
  (e: 'close'): void
}
const emit = defineEmits<Emits>()

// 4. 响应式状态
const loading = ref(false)

// 5. 计算属性
const displayTitle = computed(() => props.title.toUpperCase())

// 6. 方法
function handleClick() {
  emit('update', 'value')
}
</script>

<style scoped lang="scss">
.component-name {
  // 样式
}
</style>
```

### 类型定义位置

```typescript
// 组件特定的 Props/Emits 类型
// 放在 types/components.ts

export interface XxxProps {
  title: string
}

export type XxxEmits = {
  (e: 'close'): void
}
```

---

## 国际化规范

### 语言包结构

```typescript
// i18n/locales/zh-CN.ts
export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    submit: '提交',
  },
  auth: {
    login: '登录',
    logout: '退出登录',
    username: '用户名',
    password: '密码',
  },
  // ...
}
```

### 使用国际化

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <button>{{ t('common.confirm') }}</button>
</template>
```

### 切换语言

```typescript
import { setI18nLocale } from '@/i18n'

setI18nLocale('en-US')
```

---

## Mock 数据规范

### Mock 文件结构

```typescript
// mock/xxx.ts
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/xxx/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ]
      }
    }
  },
  {
    url: '/api/xxx/create',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: '创建成功',
        data: { id: Date.now(), ...body }
      }
    }
  }
] as MockMethod[]
```

### Mock 配置

```typescript
// vite.config.ts
viteMockServe({
  mockPath: 'src/mock',
  localEnabled: true,    // 开发环境启用
  prodEnabled: false,    // 生产环境禁用（建议）
  watchFiles: true
})
```

### 注意事项

- Mock 接口路径需要带 `/api` 前缀
- 确保 `.env` 中配置了 `VITE_API_BASE_URL=/api`

---

## 常见开发场景指南

### 场景一：添加新页面

1. **创建页面组件**
   ```typescript
   // src/views/module/Page.vue
   <template>
     <div class="page-container">
       <!-- 页面内容 -->
     </div>
   </template>
   
   <script setup lang="ts">
   // 页面逻辑
   </script>
   ```

2. **添加路由配置**
   ```typescript
   // src/router/models/module.ts
   const routes: RouteRecordRaw[] = [
     {
       path: '/module',
       name: 'Module',
       component: () => import('@/layouts/default/index.vue'),
       meta: { title: '模块', icon: 'Dashboard' },
       children: [
         {
           path: 'page',
           name: 'Page',
           component: () => import('@/views/module/Page.vue'),
           meta: { title: '页面' }
         }
       ]
     }
   ]
   ```

3. **注册路由模块**
   ```typescript
   // src/router/routes.ts
   import ModuleRoutes from './models/module'
   
   const routes = [
     // ...
     ...ModuleRoutes
   ]
   ```

### 场景二：添加新 API

1. **定义 API 模块**
   ```typescript
   // src/api/module.ts
   import service from './index'
   
   export const moduleApi = {
     getList: () => service.get('/module/list'),
     getItem: (id: string) => service.get(`/module/${id}`),
     create: (data: any) => service.post('/module', data),
   }
   ```

2. **添加 Mock 数据**（可选）
   ```typescript
   // src/mock/module.ts
   export default [
     {
       url: '/api/module/list',
       method: 'get',
       response: () => ({ code: 200, data: [] })
     }
   ] as MockMethod[]
   ```

### 场景三：添加新的全局状态

1. **创建 Store 模块**
   ```typescript
   // src/stores/modules/newStore.ts
   import { defineStore } from 'pinia'
   
   export const useNewStore = defineStore('new', {
     state: () => ({
       data: null
     }),
     getters: {
       getData() { return this.data }
     },
     actions: {
       setData(data: any) { this.data = data }
     },
     persist: true
   })
   ```

2. **导出 Store**
   ```typescript
   // src/stores/index.ts
   export { useNewStore } from './modules/newStore'
   ```

### 场景四：添加新的菜单图标

1. **在路由 meta 中指定图标名**
   ```typescript
   meta: { title: '页面', icon: 'NewIcon' }
   ```

2. **在 route store 中注册图标映射**
   ```typescript
   // src/stores/modules/route.ts
   import { NewIconComponent } from '@vicons/xxx'
   
   const iconMap: Record<string, any> = {
     NewIcon: NewIconComponent,
     // ...
   }
   ```

---

## 技术债与注意事项

### 高优先级

| 问题 | 位置 | 建议 |
|------|------|------|
| 验证码功能未实现 | `LoginByAccount.vue` | 需要实现验证码生成和校验 |
| 错误处理使用 alert | `api/index.ts` | 改用 `globalMessage` |
| API 路径配置不明确 | `.env` | 确保 `VITE_API_BASE_URL` 配置正确 |

### 中优先级

| 问题 | 建议 |
|------|------|
| 类型定义重复 | 统一到 `types/` 目录 |
| Token 双重存储 | 移除手动 localStorage 操作，依赖 persist 插件 |
| 硬编码默认值 | 从配置或环境变量读取 |
| 手机号/扫码登录未实现 | 需要补充完整逻辑 |

### 低优先级

| 问题 | 建议 |
|------|------|
| 缺少请求取消机制 | 添加 AbortController 支持 |
| 缺少请求重试机制 | 网络异常时自动重试 |
| 缺少 API 缓存 | 对不常变化的数据添加缓存 |

---

## 快速参考

### 常用导入

```typescript
// Store
import { useUserStore, useThemeStore, useLayoutStore } from '@/stores'

// Router
import { useRouter, useRoute } from 'vue-router'

// API
import { userApi } from '@/api/user'

// Naive UI
import { useMessage, useNotification, useDialog } from 'naive-ui'

// 全局 API（组件外使用）
import { globalMessage, globalLoadingBar } from '@/utils/naive'

// 国际化
import { useI18n } from 'vue-i18n'
```

### 环境变量

```bash
# .env
VITE_API_BASE_URL=/api
```

### 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

---

*文档版本: 1.0.0*
*最后更新: 2026-03-16*

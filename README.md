# UMax Admin

基于 Vue 3 + Vite + Naive UI 构建的企业级中后台管理系统。

## 项目预览

### 登录页

![登录页](docs/images/login.png)

### 控制台

![控制台](docs/images/dashboard.png)

## 特性

- 🚀 **Vue 3 Composition API** - 现代化的 Vue 开发方式
- 🎨 **Naive UI** - 优秀的 Vue 3 组件库
- 📦 **Vite** - 极速的开发体验
- 🎯 **TypeScript** - 完整的类型支持
- 🗂️ **Pinia** - 轻量级状态管理
- 🎨 **UnoCSS** - 原子化 CSS 引擎
- 📱 **响应式** - 完美支持移动端
- 🌙 **主题切换** - 支持亮色/暗色主题
- 🌐 **国际化** - 多语言支持
- ⚙️ **配置驱动** - 灵活的布局配置系统

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.5.25 | 核心框架 |
| Vite | ^7.3.1 | 构建工具 |
| Naive UI | ^2.44.1 | UI 组件库 |
| TypeScript | ^5.9.3 | 类型支持 |
| Pinia | ^3.0.4 | 状态管理 |
| UnoCSS | ^66.6.6 | CSS 引擎 |
| Axios | ^1.13.6 | HTTP 请求 |
| Vue Router | ^4.6.4 | 路由管理 |
| Vue I18n | ^12.0.0 | 国际化 |

## 目录结构

```
src/
├── api/                    # API 接口
│   ├── index.ts           # Axios 实例配置
│   ├── user.ts            # 用户相关 API
│   └── route.ts           # 路由/菜单 API
├── assets/                 # 静态资源
├── components/            # 公共组件
│   ├── auth/             # 认证相关组件
│   │   ├── LoginByAccount.vue
│   │   ├── LoginByPhone.vue
│   │   ├── LoginByQrcode.vue
│   │   └── LoginPanel.vue
│   └── common/           # 通用组件
│       ├── PreferenceButton.vue
│       ├── ThemeProvider.vue
│       └── ThemeSwitcher.vue
├── config/                # 配置文件
│   └── layouts/          # 布局配置
│       ├── index.ts      # 布局配置入口
│       └── type.ts       # 布局类型定义
├── i18n/                  # 国际化
│   ├── index.ts          # i18n 配置
│   └── locales/          # 语言包
│       ├── zh-CN.ts      # 中文
│       └── en-US.ts      # 英文
├── layouts/              # 布局组件
│   ├── blank/           # 空白布局
│   └── default/         # 默认布局
│       └── components/
│           ├── Breadcrumb/  # 面包屑
│           ├── Logo/        # Logo
│           ├── Menu/        # 菜单
│           └── Navbar/      # 导航栏
├── mock/                 # Mock 数据
├── router/              # 路由配置
│   ├── index.ts        # 路由入口
│   ├── routes.ts       # 路由汇总
│   └── models/         # 路由模块
│       ├── auth.ts
│       ├── common.ts
│       └── dashboard.ts
├── stores/              # Pinia 状态管理
│   ├── index.ts        # Store 统一导出
│   └── modules/        # 模块化 Store
│       ├── layout.ts   # 布局状态
│       ├── route.ts    # 路由/菜单状态
│       └── theme.ts    # 主题状态
├── styles/             # 全局样式
├── types/              # 类型定义
│   ├── api.ts          # API 类型
│   └── components.ts   # 组件类型
├── utils/              # 工具函数
│   ├── errorHandler.ts # 错误处理
│   └── tokenStorage.ts # Token 存储
├── views/              # 页面视图
│   ├── auth/          # 认证页面
│   ├── common/        # 通用页面
│   └── dashboard/     # 仪表盘
├── App.vue
└── main.ts
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 开发清单

### ✅ 已完成

| 功能 | 说明 | 状态 |
|------|------|------|
| 项目初始化 | Vue 3 + Vite + TypeScript 基础项目搭建 | ✅ |
| UI 框架集成 | Naive UI 组件库集成 | ✅ |
| 状态管理 | Pinia 模块化状态管理 + 持久化 | ✅ |
| 路由管理 | Vue Router 路由配置 + 守卫 | ✅ |
| 主题系统 | 亮色/暗色主题切换 | ✅ |
| 登录页 | 三种登录方式（账号/手机/二维码） | ✅ |
| 布局架构 | 配置驱动布局系统 | ✅ |
| 多布局模式 | 支持 vertical/sidebar/top 三种布局 | ✅ |
| API 封装 | Axios 请求封装 + 错误处理 | ✅ |
| Mock 数据 | 开发环境 Mock 数据支持 | ✅ |
| 自动导入 | unplugin-auto-import API 自动导入 | ✅ |
| 组件自动导入 | unplugin-vue-components 组件自动导入 | ✅ |
| 图标支持 | ionicons5 / carbon / antd 图标库 | ✅ |
| CSS 预处理器 | SCSS 支持 | ✅ |
| CSS 工具 | UnoCSS 原子化 CSS | ✅ |
| 路由菜单 | 从路由自动生成菜单 | ✅ |
| 面包屑导航 | 动态面包屑导航 | ✅ |
| 国际化 | 多语言支持 (中/英) | ✅ |
| 404 页面 | 404 未找到页面 | ✅ |
| 登录守卫 | 路由守卫权限控制 | ✅ |

### 🚧 开发中

| 功能 | 说明 | 状态 |
|------|------|------|
| 用户管理 | 用户列表/增删改查 | 🚧 |
| 角色管理 | 角色权限配置 | 🚧 |
| 菜单管理 | 动态菜单配置 | 🚧 |
| 系统设置 | 系统配置页面 | 🚧 |

### 📋 待实现

| 功能 | 说明 | 状态 |
|------|------|------|
| 表格组件 | 通用表格封装 | 📋 |
| 表单组件 | 通用表单封装 | 📋 |
| 权限指令 | v-permission 指令 | 📋 |
| 标签栏 | 多页签缓存功能 | 📋 |
| 主题自定义 | 主题色/圆角自定义 | 📋 |
| 导出功能 | Excel/PDF 导出 | 📋 |
| 富文本编辑器 | 文本编辑功能 | 📋 |
| 图片上传 | 图片上传组件 | 📋 |

## 布局架构

本项目采用**配置驱动**的方式实现布局系统，简洁高效。

### 核心概念

```typescript
// 1. 定义布局配置
interface LayoutConfig {
  mode: LayoutMode
  sidebarWidth: number
  collapsedWidth: number
  bigLogo: boolean
  showLogo: boolean
  showSidebar: boolean
  showTopbar: boolean
  headerFixed: boolean
  siderClass: string
  headerClass: string
}

// 2. 配置不同布局模式
const layouts = {
  vertical: { ... },
  sidebar: { ... },
  top: { ... }
}

// 3. 切换布局
layoutStore.setLayoutMode('sidebar')
```

### 布局模式

| 模式 | 说明 |
|------|------|
| vertical | 垂直布局，侧边栏全屏高度 |
| sidebar | 侧边栏布局，侧边栏在头部下方 |
| top | 顶部导航布局，无侧边栏 |

### 扩展新布局

```typescript
// 1. 在 config/layouts/index.ts 添加新配置
const layouts = {
  // ...
  mixin: {
    mode: 'mixin',
    sidebarWidth: 200,
    // ...其他配置
  }
}

// 2. 在 type.ts 添加类型
export type LayoutMode = 'vertical' | 'sidebar' | 'top' | 'mixin'

// 3. 切换布局
layoutStore.setLayoutMode('mixin')
```

## 状态管理

采用 Pinia 模块化架构，状态清晰分离：

| Store | 说明 |
|-------|------|
| layout | 布局配置、侧边栏状态 |
| route | 菜单数据、面包屑、激活状态 |
| theme | 主题配置、语言设置 |

```typescript
// 使用示例
import { useLayoutStore, useRouteStore, useThemeStore } from '@/stores'

const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
const themeStore = useThemeStore()
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| VITE_API_BASE_URL | API 基础路径 | /api |
| VITE_MOCK_ENABLE | 是否启用 Mock | true |

## 浏览器支持

- Chrome >= 90
- Firefox >= 90
- Safari >= 15
- Edge >= 90

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送到分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

## License

MIT License © 2024 UMax Admin

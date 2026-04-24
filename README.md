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
- 🗂️ **Pinia** - 轻量级状态管理 + 持久化
- 🎨 **UnoCSS** - 原子化 CSS 引擎
- 📱 **响应式** - 完美支持移动端
- 🌙 **主题切换** - 支持亮色/暗色主题 + 自定义主色 + 圆角定制 + 侧栏/顶栏独立明暗主题
- 🌐 **国际化** - 多语言支持（中/英）
- ⚙️ **配置驱动** - 灵活的布局配置系统（`vertical` / `sidebar` / **`horizontal`（顶栏横向菜单）**）
- 🔐 **登录认证** - 多种登录方式（账号/手机/二维码）
- 🛡️ **RBAC 权限闭环** - 路由 `meta.roles` + 菜单过滤 + 按钮/操作级 `v-permission`
- 🔄 **Token 自动续期** - accessToken + refreshToken 双令牌与 401 自动刷新重试
- 🏷️ **标签页** - 多页签缓存功能
- 🤖 **验证码** - 集成验证码生成与验证

## 技术栈

| 技术                        | 版本            | 说明       |
| --------------------------- | --------------- | ---------- |
| Vue                         | ^3.5.25         | 核心框架   |
| Vite                        | ^7.3.1          | 构建工具   |
| Naive UI                    | ^2.44.1         | UI 组件库  |
| TypeScript                  | ^5.9.3          | 类型支持   |
| Pinia                       | ^3.0.4          | 状态管理   |
| pinia-plugin-persistedstate | ^4.7.1          | 状态持久化 |
| UnoCSS                      | ^66.6.6         | CSS 引擎   |
| Axios                       | ^1.13.6         | HTTP 请求  |
| Vue Router                  | ^4.6.4          | 路由管理   |
| Vue I18n                    | ^12.0.0-alpha.3 | 国际化     |

## 目录结构

```cmd
src/
├── api/                    # API 接口
│   ├── index.ts           # Axios 实例配置
│   ├── captcha.ts        # 验证码 API
│   ├── user.ts           # 用户相关 API
│   └── route.ts          # 路由/菜单 API
├── assets/                 # 静态资源
│   ├── imgs/             # 图片资源
│   └── svgs/             # SVG 图标
├── components/            # 公共组件
│   ├── auth/             # 认证相关组件
│   │   ├── LoginByAccount.vue
│   │   ├── LoginByPhone.vue
│   │   ├── LoginByQrcode.vue
│   │   └── LoginPanel.vue
│   └── common/           # 通用组件
│       ├── PreferenceButton.vue
│       ├── NaiveProvider.vue
│       ├── SvgIcon.vue
│       └── ThemeProvider.vue
├── config/                # 配置文件
│   ├── layout/           # 布局配置
│   │   ├── index.ts
│   │   └── type.ts
│   ├── route/            # 路由配置
│   │   └── index.ts      # 图标映射
│   └── theme/            # 主题配置
│       ├── index.ts
│       └── type.ts
├── i18n/                  # 国际化
│   ├── index.ts          # i18n 配置
│   └── locales/          # 语言包
│       ├── zh-CN.ts
│       └── en-US.ts
├── icons/                 # 图标配置
│   └── index.ts
├── layouts/              # 布局组件
│   ├── blank/           # 空白布局
│   └── default/         # 默认布局
│       └── components/
│           ├── Breadcrumb/
│           ├── Logo/
│           ├── Menu/
│           ├── Navbar/
│           └── TagView/
├── mock/                 # Mock 数据
│   ├── index.ts
│   ├── captcha.ts
│   ├── user.ts
│   └── route.ts
├── router/              # 路由配置
│   ├── index.ts         # 路由入口 + 守卫
│   ├── routes.ts        # 路由汇总
│   └── models/          # 路由模块
│       ├── auth.ts
│       ├── common.ts
│       ├── dashboard.ts
│       └── user.ts
├── stores/              # Pinia 状态管理
│   ├── index.ts        # Store 统一导出
│   ├── setup.ts        # Pinia 配置
│   └── modules/        # 模块化 Store
│       ├── layout.ts   # 布局状态
│       ├── locale.ts   # 国际化状态
│       ├── menu.ts     # 菜单状态
│       ├── provider.ts # Naive UI 全局 API 容器
│       ├── tagView.ts  # 标签页状态
│       ├── theme.ts    # 主题状态
│       └── user.ts     # 用户状态
├── styles/              # 全局样式
│   ├── normal.scss
│   └── tokens.scss
├── types/               # 类型定义
│   ├── api.ts
│   └── components.ts
├── utils/               # 工具函数
│   ├── captcha.ts      # 验证码生成
│   ├── errorHandler.ts # 错误处理
│   ├── menu.ts         # 菜单工具
│   ├── naive.ts        # Naive UI 全局 API
│   ├── permission.ts   # 权限判断 + v-permission 指令
│   ├── renderer.ts     # 渲染工具
│   └── tokenStorage.ts # access/refresh token 存储
├── views/              # 页面视图
│   ├── auth/
│   ├── common/
│   ├── dashboard/
│   ├── redirect/
│   └── user/
├── App.vue
└── main.ts
```

## 文档

- **架构与开发规范**：[`docs/PROJECT_ARCHITECTURE.md`](docs/PROJECT_ARCHITECTURE.md)
- **开发计划与待办清单**：[`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md)（问题分析、优化方向、分阶段 backlog）

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

| 功能         | 说明                                      | 状态 |
| ------------ | ----------------------------------------- | ---- |
| 项目初始化   | Vue 3 + Vite + TypeScript 基础项目搭建    | ✅   |
| UI 框架集成  | Naive UI 组件库集成                       | ✅   |
| 状态管理     | Pinia 模块化状态管理 + 持久化             | ✅   |
| 路由管理     | Vue Router 路由配置 + 守卫                | ✅   |
| 主题系统     | 亮色/暗色主题切换 + 自定义主色 + 圆角 + 侧栏/顶栏独立主题 | ✅   |
| 登录页       | 三种登录方式（账号/手机/二维码）          | ✅   |
| 布局架构     | 配置驱动布局系统                          | ✅   |
| 多布局模式   | 支持 vertical/sidebar/horizontal 三种布局 | ✅   |
| API 封装     | Axios 请求封装 + 错误处理                 | ✅   |
| Mock 数据    | 开发环境 Mock 数据支持                    | ✅   |
| 自动导入     | unplugin-auto-import API 自动导入         | ✅   |
| 组件自动导入 | unplugin-vue-components 组件自动导入      | ✅   |
| 图标支持     | ionicons5 / carbon / antd / fluent 图标库 | ✅   |
| CSS 预处理器 | SCSS 支持                                 | ✅   |
| CSS 工具     | UnoCSS 原子化 CSS                         | ✅   |
| 路由菜单     | 从路由自动生成菜单                        | ✅   |
| 面包屑导航   | 动态面包屑导航                            | ✅   |
| 国际化       | 多语言支持（中/英）                       | ✅   |
| 404 页面     | 404 未找到页面                            | ✅   |
| 登录守卫     | 路由守卫权限控制                          | ✅   |
| 操作级权限   | `v-permission` + store 权限判断          | ✅   |
| Token 续期   | 401 自动刷新 Token 并重试原请求          | ✅   |
| 权限热更新   | 登录后主动拉取 `/user/info` 覆盖权限数据 | ✅   |
| 标签页缓存   | 多页签缓存功能                            | ✅   |
| 验证码功能   | 验证码生成与验证                          | ✅   |

### 🚧 开发中

| 功能     | 说明              | 状态 |
| -------- | ----------------- | ---- |
| 用户管理 | 用户列表/增删改查 | 🚧   |
| 角色管理 | 角色权限配置      | 🚧   |
| 菜单管理 | 动态菜单配置      | 🚧   |
| 系统设置 | 系统配置页面      | 🚧   |

### 📋 待实现

| 功能         | 说明              | 状态 |
| ------------ | ----------------- | ---- |
| 表格组件     | 通用表格封装      | 📋   |
| 表单组件     | 通用表单封装      | 📋   |
| 导出功能     | Excel/PDF 导出    | 📋   |
| 富文本编辑器 | 文本编辑功能      | 📋   |
| 图片上传     | 图片上传组件      | 📋   |

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
  showBreadcrumb: boolean
  showBreadcrumbIcon: boolean
  showTagView: boolean
  showTagIcon: boolean
  menuSplit: boolean
  showMenuBorder: boolean
  isGap: boolean
  headerHeight: number
  tagHeight: number
  siderClass: string
  logoClass: string
}

// 2. 配置不同布局模式
const layouts = {
  vertical: { ... },
  sidebar: { ... },
  horizontal: { ... }
}

// 3. 切换布局
layoutStore.setLayoutMode('sidebar')
```

### 布局模式

| 模式 | 说明 |
|------|------|
| vertical | 垂直布局，侧边栏全屏高度 |
| sidebar | 侧边栏布局，侧边栏在头部下方 |
| horizontal | 水平模式：顶栏横向菜单，无侧边栏 |

### 侧栏说明

- **收拢按钮**固定在侧栏最底部；菜单区域单独滚动，避免按钮随长菜单滚走。
- **侧栏背景过渡**：主题变量在内部滚动容器上生效时，需在该节点声明 `background-color` 的 `transition`（详见 `docs/PROJECT_ARCHITECTURE.md`「主题系统」小节）。

### 扩展新布局

```typescript
// 1. 在 config/layout/index.ts 添加新配置
const layouts = {
  // ...
  mixin: {
    mode: 'mixin',
    sidebarWidth: 200,
    // ...其他配置
  },
};

// 2. 在 type.ts 添加类型
export type LayoutMode = 'vertical' | 'sidebar' | 'horizontal' | 'mixin';

// 3. 切换布局
layoutStore.setLayoutMode('mixin');
```

## 状态管理

采用 Pinia 模块化架构，状态清晰分离：

| Store | 说明 |
|-------|------|
| layout | 布局配置（含菜单分割/分割线、间隙布局、顶栏/页签高度、面包屑/页签显隐）与侧边栏状态 |
| menu | 菜单数据、面包屑、激活状态 |
| theme | 主题配置（模式、主色、圆角、侧栏主题、顶栏主题） |
| user | 用户信息、登录状态、Token |
| locale | 语言设置 |
| tagView | 标签页缓存 |

```typescript
// 使用示例
import { useLayoutStore, useMenuStore, useThemeStore } from '@/stores';

const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const themeStore = useThemeStore();

// 主题切换
themeStore.toggleTheme();
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

## License

MIT License © 2026 UMax Admin

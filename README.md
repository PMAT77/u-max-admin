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
- 🔌 **策略模式** - 灵活的布局架构

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

## 目录结构

```
src/
├── api/                    # API 接口
│   ├── index.ts           # Axios 实例配置
│   └── user.ts            # 用户相关 API
├── assets/                 # 静态资源
├── components/            # 公共组件
│   ├── auth/             # 认证相关组件
│   │   ├── LoginByAccount.vue
│   │   ├── LoginByPhone.vue
│   │   ├── LoginByQrcode.vue
│   │   └── LoginPanel.vue
│   └── common/           # 通用组件
│       ├── PreferenceButton.vue
│       ├── SystemLogo.vue
│       ├── ThemeProvider.vue
│       └── ThemeSwitcher.vue
├── layouts/              # 布局组件
│   ├── blank/           # 空白布局
│   ├── default/         # 默认布局
│   │   └── components/
│   │       └── LayoutNavbar.vue
│   └── strategy/        # 布局策略（核心架构）
│       ├── BaseLayoutStrategy.ts
│       ├── SidebarLayoutStrategy.ts
│       ├── TopLayoutStrategy.ts
│       ├── VerticalLayoutStrategy.ts
│       ├── LayoutStrategyFactory.ts
│       └── types.ts
├── mock/                 # Mock 数据
├── router/              # 路由配置
│   ├── index.ts        # 路由入口
│   ├── routes.ts       # 路由汇总
│   └── models/         # 路由模块
│       ├── auth.ts
│       ├── common.ts
│       └── dashboard.ts
├── stores/              # Pinia 状态管理
│   ├── layout.ts       # 布局状态
│   ├── router.ts       # 路由状态
│   └── theme.ts        # 主题状态
├── styles/             # 全局样式
├── views/              # 页面视图
│   ├── auth/          # 认证页面
│   ├── common/        # 通用页面
│   └── dashboard/    # 仪表盘
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
| 状态管理 | Pinia 状态管理 + 持久化 | ✅ |
| 路由管理 | Vue Router 路由配置 + 守卫 | ✅ |
| 主题系统 | 亮色/暗色主题切换 | ✅ |
| 登录页 | 三种登录方式（账号/手机/二维码） | ✅ |
| 布局架构 | 策略模式布局系统 | ✅ |
| 多布局模式 | 支持 vertical/sidebar/top 三种布局 | ✅ |
| API 封装 | Axios 请求封装 + 错误处理 | ✅ |
| Mock 数据 | 开发环境 Mock 数据支持 | ✅ |
| 自动导入 | unplugin-auto-import API 自动导入 | ✅ |
| 组件自动导入 | unplugin-vue-components 组件自动导入 | ✅ |
| 图标支持 | ionicons5 / carbon / antd 图标库 | ✅ |
| CSS 预处理器 | SCSS 支持 | ✅ |
| CSS 工具 | UnoCSS 原子化 CSS | ✅ |
| 路由菜单 | 从路由自动生成菜单 | ✅ |
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
| 面包屑 | 路由面包屑导航 | 📋 |
| 标签栏 | 多页签缓存功能 | 📋 |
| 国际化 | 多语言支持 | 📋 |
| 主题自定义 | 主题色/圆角自定义 | 📋 |
| 导出功能 | Excel/PDF 导出 | 📋 |
| 富文本编辑器 | 文本编辑功能 | 📋 |
| 图片上传 | 图片上传组件 | 📋 |

## 布局架构

本项目采用**策略模式**实现布局架构，方便扩展和维护。

### 核心概念

```typescript
// 1. 定义布局策略接口
interface LayoutStrategy {
  mode: LayoutMode
  sidebarWidth: number
  showLogo: boolean
  sidebarClass: string
  headerClass: string
}

// 2. 实现具体策略
class VerticalLayoutStrategy extends BaseLayoutStrategy { }
class SidebarLayoutStrategy extends BaseLayoutStrategy { }
class TopLayoutStrategy extends BaseLayoutStrategy { }

// 3. 使用工厂创建
const strategy = LayoutStrategyFactory.create('sidebar')
```

### 扩展新布局

```typescript
// 1. 创建新策略类
class MixinLayoutStrategy extends BaseLayoutStrategy {
  mode = 'mixin' as const
  // 实现具体逻辑...
}

// 2. 注册到工厂
LayoutStrategyFactory.register('mixin', MixinLayoutStrategy)

// 3. 切换布局
layoutStore.setLayoutMode('mixin')
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

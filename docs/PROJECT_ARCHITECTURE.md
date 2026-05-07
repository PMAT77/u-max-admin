# UMax Admin 项目架构文档（按当前代码重写）

> 本文档用于描述当前代码已实现的真实架构、关键机制、开发约束与已知边界。  
> 任务优先级、待办和里程碑见 `docs/DEVELOPMENT_PLAN.md`。  
> **§1–§14** 为架构总览与关键机制；**§15–§23** 为原附录合并后的目录展开、规范速查、操作清单与技术债（与代码同步维护）。

**文档版本**: 2.2.0  
**最后更新**: 2026-05-07

---

## 1. 项目定位与现状

`u-max-admin` 是一个基于 Vue 3 + TypeScript + Naive UI 的中后台模板工程，目标是提供可扩展的管理端基础骨架。

### 1.1 已具备能力

- 账号密码登录链路（含 token/refreshToken 管理、401 自动续期）
- 路由守卫与角色权限校验（含 `v-permission`）
- 三种布局模式（`vertical` / `sidebar` / `horizontal`）
- 多区域主题（全局、顶栏、侧栏）与 CSS 变量体系
- 菜单、面包屑、标签页、偏好设置联动
- i18n 基础接入（中/英）
- Mock 联调体系与 API 分层封装（**仅开发服务器**启用，与生产构建隔离，见 §10）

### 1.2 当前边界（非完全实现）

- 手机号登录、扫码登录仅有 UI/入口，流程尚未闭环。
- 用户资料、修改密码、仪表盘页面仍为占位或空实现。
- 工程质量：已有 `vp check` / `vp test` 与 `.github/workflows/quality.yml` 示例；**业务单测与覆盖率**仍待加强。

---

## 2. 技术栈与工具链

### 2.1 核心

- Vue 3（Composition API）
- TypeScript
- Vite+（通过 `vp` 命令统一开发工具链）
- Vue Router 4
- Pinia + persistedstate

### 2.2 UI 与样式

- Naive UI
- UnoCSS
- Sass
- `@vicons/*` 图标库

### 2.3 工程插件

- `unplugin-auto-import`
- `unplugin-vue-components`
- `vite-plugin-svg-icons`
- `vite-plugin-mock`
- Axios
- vue-i18n

---

## 3. 目录结构（关键模块）

```text
src/
  api/                 # Axios 封装与业务 API
  components/
    auth/              # 登录相关组件（账号/手机/扫码）
    common/            # 主题、偏好、Provider 等通用组件
  config/
    layout/            # 布局模式与默认配置
    theme/             # 主题调色板与默认主题配置
    route/             # 路由图标映射
  i18n/                # 国际化实例与语言包
  layouts/
    blank/             # 空布局（登录页）
    default/           # 主布局（侧栏/顶栏/内容/标签页）
  mock/                # 本地 Mock 数据
  router/              # 路由定义与守卫
  stores/              # Pinia 模块
  styles/              # tokens 与全局样式
  utils/               # naive、权限、token、错误处理等工具
  views/               # 路由页面（部分仍占位）
```

---

## 4. 启动与初始化链路

`src/main.ts` 的关键顺序：

1. `createApp(App)`
2. `setupStore(app)`（必须先注册 Pinia）
3. 导入 `./utils/naive`（依赖 Pinia 上下文）
4. 注入 router、i18n、全局指令与全局组件
5. `app.mount('#app')`

该顺序保证路由守卫、全局 Naive API、权限指令等模块在运行时可正确获取 store。

---

## 5. 状态管理架构（Pinia）

### 5.1 Store 模块

- `user`：登录态、token、用户信息、权限能力
- `theme`：明暗模式、主色、圆角、侧栏/顶栏主题
- `layout`：布局模式、侧栏状态、头部/页签/面包屑配置
- `menu`：菜单数据、激活路径、面包屑
- `locale`：语言状态
- `tagView`：标签页状态
- `provider`：Naive 全局 API 容器（不持久化）

### 5.2 布局状态关键点

- `layout.mode` 支持 `vertical` / `sidebar` / `horizontal`。
- 持久化兼容旧值：`top` 会在 hydrate 后迁移为 `horizontal`。
- `horizontal` 模式下 `menuSplit` 会影响侧栏显示逻辑。

---

## 6. 路由与权限系统

### 6.1 路由组织

- 路由按模块拆分在 `src/router/models`。
- `src/router/routes.ts` 汇总模块路由。
- `default` 布局承载需要导航框架的页面，`blank` 用于登录等纯页面。

### 6.2 守卫流程（`src/router/index.ts`）

- 进入路由前启动 loadingBar。
- 已登录访问登录页：重定向到工作台。
- 已登录访问受限路由：按 `meta.roles` + 用户角色/权限判断。
- 未登录访问非白名单：跳转登录并携带 `redirect`。
- 路由结束后关闭 loadingBar。

### 6.3 操作级权限

- 模板层：`v-permission`
- 脚本层：`userStore` 权限方法

---

## 7. API 与认证链路

### 7.1 Axios 封装

`src/api/index.ts` 提供统一实例，包含：

- 请求拦截：自动附带 `Authorization`
- 响应拦截：统一错误提示
- `401` 处理：刷新 token 后重放请求
- 刷新失败：清理登录态并跳回登录页

### 7.2 登录主链路

- 账号登录成功后写入 token 与用户信息。
- 立即调用 `userApi.getInfo()` 以服务端返回覆盖权限信息。
- 获取用户信息失败时执行登出，避免脏登录态。

### 7.3 当前风险点与注意项

- 手机号登录/扫码登录分支尚未接入真实 API 流程。
- **本地 Mock 演示账号**（`superman` / `123456`）仅定义在 `src/mock/user.ts`；关闭 `VITE_USE_MOCK` 或生产构建后走真实鉴权，勿将 Mock 凭据当作线上账号。

---

## 8. 主题与布局系统

### 8.1 主题核心机制

- `ThemeProvider` 基于 `themeStore` 计算并注入 CSS Variables。
- 变量覆盖全局 token 与区域 token（顶栏/侧栏）。
- 顶栏通过 `layoutHeaderProviderProps` 注入局部 Naive 主题，解决“区域明暗与全局明暗不一致”时的组件令牌问题。

### 8.2 布局关键机制

- 主布局在 `layouts/default/index.vue`。
- `sidebar` 模式下侧栏绝对定位，使用 `--u-max-layout-header-stack` 动态对齐顶栏 + 标签页总高度。
- 侧栏菜单区单独滚动，底部收拢按钮固定，避免长菜单导致按钮滚出视区。

### 8.3 偏好设置现状

- 偏好抽屉可驱动主题和布局 store。
- 部分“主题风格”开关为视觉层状态，尚未形成完整业务约束（需在计划文档中继续推进）。

---

## 9. i18n、样式与设计令牌

### 9.1 i18n

- `src/i18n/index.ts` 初始化实例，`locale` 状态持久化。
- 当前存在业务文案硬编码，属于持续治理项。

### 9.2 样式约定

- 布局和轻样式优先 UnoCSS。
- 复杂组件样式使用 scoped SCSS。
- 主题相关颜色、尺寸与过渡统一走 `src/styles/tokens.scss` 的语义变量。

---

## 10. Mock 策略（生产与本地隔离）

`vite.config.ts` 通过 `loadEnv` 与 `resolveViteConfigMode()` 读取与 CLI 一致的 mode（`build`/`preview` 默认 `production`，支持 `--mode`），并计算 **`enableViteMock`**：

| 配置项         | 实际行为                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `localEnabled` | 仅当 **`viteMode === 'development'`** 且 **`.env*` 中 `VITE_USE_MOCK === 'true'`** 时为 `true` |
| `prodEnabled`  | **恒为 `false`**，生产/预览构建**绝不**注入 Mock                                               |
| `watchFiles`   | 与 `localEnabled` 同步，避免未启用 Mock 时无意义监听                                           |

**结论**：`vp build` / `vp preview` 产物中**不包含** `vite-plugin-mock` 对接口的拦截；运行时请求仅走 `VITE_API_BASE_URL` 指向的真实服务。`.env` 里写 `VITE_USE_MOCK=true` 只影响本地 `vp dev`，**不能**让生产包走 Mock。

**约定**：环境变量模板见仓库根目录 **`.env.example`**；`import.meta.env` 类型见 **`src/vite-env.d.ts`**。

**本地演示登录（Mock）**：账号 `superman`、密码 `123456`（见 `src/mock/user.ts`），仅在上述 Mock 启用且请求被插件拦截时有效。

---

## 11. 当前实现状态清单

### 11.1 已实现（可用）

- 基础登录（账号）、鉴权守卫、权限判断
- API 拦截与 token 续期
- 布局、主题、菜单、标签页
- i18n 框架接入
- 偏好设置驱动 store

### 11.2 开发中/未闭环

- 手机号登录流程
- 扫码登录流程
- 用户资料页
- 修改密码页
- 仪表盘业务内容

---

## 12. 开发约束与建议

- 文档状态必须与代码实现一致，不得把占位功能标记为“已完成”。
- 新增页面时优先复用现有布局、路由模型和权限约定。
- 所有主题相关样式优先使用 CSS token，避免硬编码颜色。
- 新增 API 模块时，保持与 `src/api/index.ts` 返回结构一致。
- 生产构建禁止启用 `vite-plugin-mock`（当前 `prodEnabled` 已写死为 `false`）；若未来引入其他 Mock 手段须单独评审。

---

## 13. 常用命令（Vite+）

```bash
vp install
vp dev
vp build
vp preview
vp check
vp test
```

---

## 14. 关联文档

- 开发计划与优先级：`docs/DEVELOPMENT_PLAN.md`
- 项目说明与快速开始：`README.md`

## 15. 目录结构与模块边界（展开）

以下在 §3 基础上展开至文件级，便于定位；**以仓库实际文件为准**。

```text
src/
├── api/
│   ├── index.ts          # Axios 实例、拦截器、401 续期
│   ├── captcha.ts
│   ├── user.ts
│   └── route.ts
├── assets/
├── components/
│   ├── auth/             # LoginPanel、LoginByAccount/Phone/Qrcode
│   └── common/           # ThemeProvider、NaiveProvider、PreferenceButton、SvgIcon
├── config/
│   ├── layout/
│   ├── route/index.ts    # iconMap：路由 meta.icon 在此注册
│   └── theme/
├── i18n/
├── icons/
├── layouts/
│   ├── blank/index.vue
│   └── default/          # Logo、Menu、Navbar、Breadcrumb、TagView
├── mock/                 # vite-plugin-mock 数据源（仅开发，见 §10）
├── router/
│   ├── index.ts          # 守卫、白名单
│   ├── routes.ts
│   └── models/           # auth、common、dashboard、user
├── stores/
│   ├── setup.ts          # getPinia() 等
│   ├── index.ts          # 聚合导出各业务 store
│   └── modules/
│       ├── user.ts / theme.ts / layout.ts / menu.ts / locale.ts / tagView.ts
│       └── provider.ts   # Naive 全局 API 容器（不持久化；多从本文件直接 import）
├── styles/               # tokens.scss、normal.scss
├── types/
├── utils/
│   ├── naive.ts          # globalMessage、globalLoadingBar（组件外安全调用）
│   ├── permission.ts     # v-permission
│   ├── tokenStorage.ts / errorHandler.ts / renderer.ts / captcha.ts / fullscreen.ts
├── views/
│   ├── auth/Login.vue
│   ├── dashboard/
│   ├── user/profile/、user/change-password/
│   ├── common/、redirect/
├── App.vue
├── main.ts
└── vite-env.d.ts
```

---

## 16. 应用初始化与 Naive 全局 API

### 16.1 `main.ts` 顺序（不可随意调整）

1. `createApp(App)`
2. `setupStore(app)` — 必须先注册 Pinia
3. `import '@/utils/naive'` — 依赖已就绪的 Pinia（供后续路由等使用）
4. `app.use(router)`、`app.use(i18n)`、全局指令与组件
5. `app.mount('#app')`

### 16.2 Naive 全局 API 与 `provider` Store

`useMessage` / `useLoadingBar` 等须在 Provider 子树内调用。本项目约定：

1. **`components/common/NaiveProvider.vue`** 在 `n-loading-bar-provider` 等内部取实例，写入 **`stores/modules/provider.ts`**。
2. **`utils/naive.ts`** 导出 `globalMessage`、`globalLoadingBar` 等；内部通过 **`useProviderStore(getPinia())`** 取实例，未就绪时为空操作，可在 **`router/index.ts`** 等组件外安全调用。

```typescript
import { globalMessage, globalLoadingBar } from '@/utils/naive';

router.beforeEach(() => {
  globalLoadingBar?.start();
});
```

---

## 17. 开发规范速查

### 17.1 文件命名

| 类型       | 规范       | 示例              |
| ---------- | ---------- | ----------------- |
| 组件       | PascalCase | `LoginPanel.vue`  |
| 工具/类型  | camelCase  | `errorHandler.ts` |
| Store 模块 | camelCase  | `user.ts`         |
| 路由模块   | camelCase  | `dashboard.ts`    |

### 17.2 路径别名

`@` → `src/`（见 `vite.config.ts` 的 `resolve.alias`）。

### 17.3 路由 `meta` 常用字段

在 `router/models/*.ts` 中：`title`（菜单标题）、`icon`（须在 `config/route/index.ts` 的 `iconMap` 注册）、`roles`（访问所需角色）、`show`、`hideTag`、`affix`、`noCache` 等与布局/菜单/标签页联动。

### 17.4 新增路由模块

1. 在 `src/router/models/` 新建模块并 `export default routes`。
2. 在 `src/router/routes.ts` 中 `import` 并展开合并到总路由数组。

### 17.5 守卫与白名单

逻辑见 `src/router/index.ts`：`whiteList` 含 `/auth/login` 等；已登录访问登录页会重定向到工作台；`meta.roles` 与 `userStore` 角色、`permissions`（含 `*`、`super_admin`）共同决定访问。

### 17.6 操作级权限

- 模板：`v-permission="'code'"` 或 `v-permission="['a','b']"`（`utils/permission.ts`）。
- 脚本：`userStore` 内权限判断方法（与登录后 `/user/info` 回填一致）。

---

## 18. API 模块约定

- 统一通过 **`import service from './index'`** 使用已配置拦截器的实例；`baseURL` 为 `import.meta.env.VITE_API_BASE_URL`。
- 业务文件导出 `xxxApi` 对象，方法返回 `Promise`，与后端约定的 `code` / `message` / `data` 结构保持一致（类型可放在 `src/types/api.ts` 等）。
- **登录后**须以 **`userApi.getInfo()`**（或等价接口）覆盖权限；失败应登出，避免脏会话（见 §7.2）。

---

## 19. 样式与组件分层

| 场景           | 推荐                                                     |
| -------------- | -------------------------------------------------------- |
| 布局、间距     | UnoCSS 原子类                                            |
| 复杂与主题相关 | `scoped` + Sass，语义色走 token                          |
| 全局主题变量   | `src/styles/tokens.scss` + `ThemeProvider` 注入（见 §8） |

**组件分层**：`components/auth` 承载登录业务；`components/common` 放与页面无关的通用块；**页面级**组件放在 `views/`；**壳层**在 `layouts/`。新增业务优先贴近现有目录命名。

---

## 20. i18n 与 Mock 文件

- 语言包：`src/i18n/locales/*.ts`，切换语言可用 `setI18nLocale`（见 `src/i18n/index.ts`）。
- **Mock**：每个文件 `export default [ ... ] as MockMethod[]`，`url` 建议带 **`/api`** 前缀与 `VITE_API_BASE_URL` 对齐；在 `src/mock/index.ts` 聚合导出。**启用条件与生产隔离见 §10**，勿在业务代码中 `import` mock 数据文件。

---

## 21. 常见操作清单

1. **新页面**：`views/...` 建页 → `router/models` 注册路由与 `meta` → 如需菜单图标则在 `iconMap` 注册。
2. **新 API**：`src/api/<domain>.ts` 使用 `service` 导出 `xxxApi` → 视需要增加 **`src/types`** 与 Mock 条目（仅开发）。
3. **新 Store**：`stores/modules/<name>.ts` + 在 `stores/index.ts` 导出（若需全局快捷导入）。
4. **新菜单图标**：安装对应 `@vicons/*` → `config/route/index.ts` 的 `iconMap` → 路由 `meta.icon` 使用同一键名。

---

## 22. 已知技术债与后续方向

与 `docs/DEVELOPMENT_PLAN.md` P2 呼应，包括但不限于：

| 方向         | 说明                                              |
| ------------ | ------------------------------------------------- |
| 类型收敛     | API 与 Store 模型统一到 `src/types`，减少重复定义 |
| 登录方式扩展 | 手机号 / 扫码登录接口与状态机闭环                 |
| 验证码       | `utils/captcha.ts` 与接口、登录表单进一步打通     |
| 请求弹性     | 取消（AbortController）、可选重试与缓存策略       |
| 测试覆盖     | 在 `vp test` 上增加关键链路与模块单测             |

---

## 23. 快速参考

### 常用导入

```typescript
import { useUserStore, useThemeStore, useLayoutStore, useMenuStore } from '@/stores';
import { useProviderStore } from '@/stores/modules/provider';
import { useRouter, useRoute } from 'vue-router';
import { userApi } from '@/api/user';
import { useMessage } from 'naive-ui'; // 仅组件 setup 内
import { globalMessage, globalLoadingBar } from '@/utils/naive';
import { useI18n } from 'vue-i18n';
import { setI18nLocale } from '@/i18n';
```

### 环境变量（模板见 `.env.example`）

```bash
VITE_API_BASE_URL=/api
VITE_USE_MOCK=true   # 仅 vp dev + development，见 §10
```

常用 CLI 见 **§13**。

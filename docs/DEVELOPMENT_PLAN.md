# UMax Admin 开发计划与后续工作清单

> 与 `README.md`、`docs/PROJECT_ARCHITECTURE.md` 配合使用：架构与规范见架构文档，**本文件**侧重「已知问题、优化方向、待办功能、实施顺序」，便于迭代时查阅。

**文档版本**: 1.0.0  
**最后更新**: 2026-04-24  

---

## 1. 与近期提交的对应关系

以下能力已在主分支实现（细节以代码与 `PROJECT_ARCHITECTURE.md` 1.4.0 为准）：

| 主题 | 说明 |
|------|------|
| 主题与布局 | 区域调色板 `areaThemePalettes`；顶栏子树 `layoutHeaderProviderProps` + `n-config-provider`；`--u-header-item-hover-bg` 等变量 |
| 布局 | `LayoutMode`：`horizontal`（原 `top`）及持久化迁移；`sidebar` 与 `--u-max-layout-header-stack`；侧栏模式自动关间隙布局 |
| 菜单 | `Menu`：`placement='header'` 横向顶栏；与侧栏共用 `--u-sider-item-active-bg` |
| 标签栏 | `TagView` 基于 `--u-header-*` 的胶囊与过渡；与顶栏主题一致 |
| 偏好设置 | 布局卡片仅三种已实现模式；名称 Tooltip；Logo/用户头像图标固定白色 |
| 工程 | `src/utils/naive.ts` 抽取主色覆盖；`renderer` 与 Navbar 头像样式对齐 |

---

## 2. 现状与问题分析

### 2.1 功能与页面

| 问题 | 位置 / 说明 | 影响 |
|------|----------------|------|
| 用户中心占位 | `views/user/profile/index.vue`、`change-password/index.vue` 仅占位 `123` | 路由可进，无真实业务 |
| 业务页偏少 | 除 Dashboard、About、NotFound、Login、User 占位外几乎无模块 | 模板感强，需按业务补路由与视图 |
| 扫码 / 手机登录 | 登录面板有入口，`PROJECT_ARCHITECTURE` 已标「需补逻辑」 | 体验不完整 |
| 验证码 | Mock + `utils/captcha` 有基础，与登录表单集成程度需复核 | 生产对接前需联调 |

### 2.2 工程与质量

| 问题 | 说明 |
|------|------|
| 无自动化测试 | `package.json` 无 `test` 脚本；无 Vitest / Cypress 等 | 重构风险高 |
| 无 Lint/Format CI | 依赖本地 IDE；`eslint` 在 dependencies 非常规 | 可迁 devDependencies 并加 `lint` 脚本 |
| `vue-i18n` 使用 alpha | `^12.0.0-alpha.3` | 关注正式版与 breaking change |
| Mock 策略 | 文档示例曾出现 `prodEnabled`；需明确生产是否关闭 mock、环境变量约定 | 避免误连 mock |

### 2.3 主题与布局边角

| 点 | 说明 |
|----|------|
| `horizontal` + 菜单分割 | 已有侧栏时顶栏横向菜单隐藏；分割 + 复杂多级菜单在横向下的交互需持续验收 | 边界场景 |
| 偏好「主题风格」 | `skin` 等开关若未接线，易成空壳 | 接线或隐藏未实现项 |
| 顶栏下拉 / 传送 | 部分 Naive 弹出层 teleport 到 body 时是否仍继承顶栏 `n-config-provider` | 若有个别组件色不对，可局部再包一层 |

---

## 3. 可优化点（非阻塞）

1. **类型集中**：API 与 Store 的重复接口类型逐步收敛到 `types/`。
2. **请求层**：`AbortController`、失败重试、GET 幂等缓存（按接口粒度启用）。
3. **路由与菜单**：服务端菜单与前端静态路由二选一并文档化；权限变更后的菜单热更新流程可加强。
4. **无障碍**：布局按钮、`n-tooltip` 与键盘焦点顺序抽检。
5. **性能**：大菜单路由懒加载已部分具备；可审计首屏 chunk、Naive 按需引入是否充分。

---

## 4. 待开发功能清单（建议优先级）

### P0 — 基础闭环（建议下一迭代）

- [ ] **用户资料页**：展示/编辑用户信息，对接 `userApi` 与 `/user/info` 字段约定。
- [ ] **修改密码页**：表单校验、对接修改密码接口、成功后登出或刷新 token 策略。
- [ ] **登录方式补全**：手机验证码流程、扫码登录与后端契约（或隐藏入口直至可用）。

### P1 — 体验与一致性

- [ ] **偏好设置**：`skin`/透明等开关若未实现，与 `ThemeProvider` 接线或改为「敬请期待」并禁用。
- [ ] **面包屑 / 水平布局**：可选在 `horizontal` 下默认收起面包屑以省宽度（可配置项）。
- [ ] **TagView**：右键菜单、刷新路由与 `keep-alive` 策略（若启用缓存）文档化与实现。
- [ ] **国际化**：业务文案从硬编码中文迁出比例；英文完整性检查。

### P2 — 工程化

- [ ] **Vitest**：对 `stores` 纯逻辑、`utils` 关键函数做单测。
- [ ] **ESLint + Prettier**：`npm run lint` / `format`，CI 中跑一遍。
- [ ] **环境变量文档**：`.env.example` + README 表格说明 `VITE_*`。

### P3 — 扩展能力（按业务选型）

- [ ] 表格页模板（查询区 + 表格 + 分页）与权限列控制示例。
- [ ] 字典 / 枚举统一拉取与缓存。
- [ ] 操作日志、审计列表（若后端提供）。
- [ ] WebSocket / SSE 通知与 Navbar 消息中心对接。

---

## 5. 建议里程碑（可按周调整）

| 阶段 | 目标 | 产出 |
|------|------|------|
| M1 | P0 用户模块 + 登录补全 | 可演示账号体系闭环 |
| M2 | P1 偏好与布局打磨 + i18n 扫尾 | 可对外演示的 UI 一致性 |
| M3 | P2 测试与 CI | 合并前自动检查 |
| M4 | P3 业务模板 | 复制即可开新业务模块 |

---

## 6. 关键文件速查（本计划相关）

| 领域 | 路径 |
|------|------|
| 主题与 CSS 变量 | `src/components/common/ThemeProvider.vue`、`src/config/theme/index.ts`、`src/styles/tokens.scss` |
| Naive 全局与顶栏子树 | `src/utils/naive.ts`、`src/layouts/default/index.vue` |
| 布局与侧栏偏移 | `src/layouts/default/index.vue`、`src/stores/modules/layout.ts` |
| 菜单 | `src/layouts/default/components/Menu/index.vue`、`src/layouts/default/components/Navbar/index.vue` |
| 标签栏 | `src/layouts/default/components/TagView/index.vue` |
| 偏好 | `src/components/common/PreferenceButton.vue` |
| 用户下拉头 | `src/utils/renderer.ts` |

---

## 7. 维护说明

- 完成功能后：在 **§4** 勾选条目，并在 `PROJECT_ARCHITECTURE.md` 或模块 README 中补「行为说明」一句即可。
- 若优先级变化：只改 **§4、§5**，不必重写 §2/§3。
- 大版本发布前：将 §2 中已修复项下沉到架构文档「技术债」或删除，保持本文件精简。

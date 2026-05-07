/**
 * 应用程序入口文件
 * 负责初始化Vue应用、集成Pinia、路由和全局组件
 */
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './stores/setup';
import { setupSvgIcon } from './icons';

// 导入全局样式
import 'uno.css';
import './styles/tokens.scss';
import './styles/normal.scss';

// 导入 naive UI 全局 API（必须在 Pinia 注册后导入）

// 创建Vue应用实例
const app = createApp(App);

// 集成Pinia状态管理（必须最先注册）
setupStore(app);

import './utils/naive';
import router from './router';
import axios from 'axios';
import i18n from './i18n';
import { permissionDirective } from './utils/permission';

// 注册SvgIcon组件
setupSvgIcon(app);
// 集成路由
app.use(router);
// 集成国际化
app.use(i18n);
// 全局注入axios
app.config.globalProperties.$axios = axios;
// 全局权限指令：v-permission="'user:edit'" 或 v-permission="['a','b']"
app.directive('permission', permissionDirective);
// 挂载应用到DOM
app.mount('#app');

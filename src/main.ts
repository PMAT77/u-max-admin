/**
 * 应用程序入口文件
 * 负责初始化Vue应用、集成Pinia、路由和全局组件
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ThemeProvider from './components/common/ThemeProvider.vue'
import axios from 'axios'

// 导入全局样式
import 'uno.css'
import './styles/normal.scss'

// 创建Vue应用实例
const app = createApp(App)
// 创建Pinia实例
const pinia = createPinia()

// 使用Pinia持久化插件
pinia.use(piniaPluginPersistedstate)

// 注册全局组件
app.component('ThemeProvider', ThemeProvider)
// 集成Pinia状态管理
app.use(pinia)
// 集成路由
app.use(router)
// 全局注入axios
app.config.globalProperties.$axios = axios
// 挂载应用到DOM
app.mount('#app')
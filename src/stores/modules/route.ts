/**
 * 路由状态管理Store
 * 负责管理路由和菜单相关的状态
 */
import { defineStore } from 'pinia'
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { Home, Screen, Settings, Document, ChartPie, Calendar, ToolBox, MessageQueue, Notification, Help } from '@vicons/carbon'
import { DashboardOutlined } from '@vicons/antd'
import { menuApi } from '@/api/route'
import routes from '@/router/routes'
import { renderIcon } from '@/utils/renderer'

export interface MenuOption {
  label: string
  key: string
  icon?: () => VNode
  show?: boolean
  children?: MenuOption[]
}

export interface BreadcrumbItem {
  label: string
  key: string
  icon?: () => VNode
}

const iconMap: Record<string, any> = {
  Dashboard: DashboardOutlined,
  Workbench: Screen,
  SettingOutlined: Settings,
  FileTextOutlined: Document,
  PieChartOutlined: ChartPie,
  CalendarOutlined: Calendar,
  InboxOutlined: ToolBox,
  MessageOutlined: MessageQueue,
  BellOutlined: Notification,
  HelpOutlined: Help
} 

const generateMenuFromRoutes = (routes: any[], parentPath: string = ''): MenuOption[] => {
  const menuOptions: MenuOption[] = []

  routes.forEach((route: any) => {
    if (route.redirect || !route.meta) return

    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path

    const menuOption: MenuOption = {
      label: route.meta.title,
      key: fullPath,
      show: route.meta.show !== false,
      icon: route.meta.icon ? renderIcon(iconMap[route.meta.icon] || Home) : undefined
    }

    if (route.children && route.children.length > 0) {
      menuOption.children = generateMenuFromRoutes(route.children, fullPath)
    }

    menuOptions.push(menuOption)
  })

  return menuOptions
}

const getMenuFromMock = async (): Promise<MenuOption[]> => {
  const response = await menuApi.getMenu()
  const menuData = response.data || []
  return menuData.map((item: any) => ({
    ...item,
    label: item.meta.title,
    key: item.path,
    show: item.meta.show !== false,
    icon: item.meta?.icon ? renderIcon(iconMap[item.meta.icon] || Home) : undefined,
    children: item.children?.map((child: any) => ({
      ...child,
      label: child.meta.title,
      key: child.path,
      icon: child.meta?.icon ? renderIcon(iconMap[child.meta.icon] || Home) : undefined
    }))
  }))
}

const findBreadcrumbPath = (menus: MenuOption[], targetKey: string, path: BreadcrumbItem[] = []): BreadcrumbItem[] | null => {
  for (const menu of menus) {
    const currentPath = [...path, { label: menu.label, key: menu.key, icon: menu.icon }]
    
    if (menu.key === targetKey) {
      return currentPath
    }
    
    if (menu.children && menu.children.length > 0) {
      const result = findBreadcrumbPath(menu.children, targetKey, currentPath)
      if (result) return result
    }
  }
  return null
}

const findParentKeys = (menus: MenuOption[], targetKey: string, parents: string[] = []): string[] | null => {
  for (const menu of menus) {
    if (menu.key === targetKey) {
      return parents
    }
    
    if (menu.children && menu.children.length > 0) {
      const result = findParentKeys(menu.children, targetKey, [...parents, menu.key])
      if (result) return result
    }
  }
  return null
}

export const useRouteStore = defineStore('route', {
  state: () => ({
    menuOptions: [] as MenuOption[],
    isLoading: false,
    activeMenu: '',
    currentPath: '',
  }),

  getters: {
    getMenuOptions: (state) => state.menuOptions,
    getIsLoading: (state) => state.isLoading,
    getActiveMenu: (state) => state.activeMenu,
    getBreadcrumbs(): BreadcrumbItem[] {
      if (!this.currentPath || this.menuOptions.length === 0) {
        return []
      }
      return findBreadcrumbPath(this.menuOptions, this.currentPath) || []
    },
    getExpandedKeys(): string[] {
      if (!this.currentPath || this.menuOptions.length === 0) {
        return []
      }
      return findParentKeys(this.menuOptions, this.currentPath) || []
    },
  },

  actions: {
    async initMenu() {
      this.isLoading = true
      try {
        const mockMenu = await getMenuFromMock()
        const routeMenu = generateMenuFromRoutes(routes)
        this.menuOptions = [...routeMenu, ...mockMenu]
      } catch (error) {
        console.error('获取菜单失败:', error)
        this.menuOptions = generateMenuFromRoutes(routes)
      } finally {
        this.isLoading = false
      }
    },

    generateMenuFromRoutes() {
      this.menuOptions = generateMenuFromRoutes(routes)
    },

    async getMenuFromMock() {
      this.isLoading = true
      try {
        const mockMenu = await getMenuFromMock()
        this.menuOptions = mockMenu
      } catch (error) {
        console.error('获取Mock菜单失败:', error)
      } finally {
        this.isLoading = false
      }
    },

    setActiveMenu(path: string) {
      this.activeMenu = path
    },

    setCurrentPath(path: string) {
      this.currentPath = path
      this.activeMenu = path
    },
  },

  persist: false,
})

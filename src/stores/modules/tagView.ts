/**
 * TagView 状态管理 Store
 * 用于管理标签页导航
 */ 
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router' 

export interface TagView {
  path: string
  name: string
  title: string
  fullPath: string
  query?: Record<string, any>
  affix?: boolean
  icon?: string
}

export const useTagViewStore = defineStore('tagView', {
  state: (): {
    visitedTags: TagView[]
    cachedTags: string[]
  } => ({
    visitedTags: [],
    cachedTags: [],
  }),

  getters: {
    getVisitedTags(): TagView[] {
      return this.visitedTags
    },
    getCachedTags(): string[] {
      return this.cachedTags
    },
  },

  actions: {
    /**
     * 初始化固定标签
     */
    initAffixTags(routes: RouteLocationNormalized[]) {
      routes.forEach(route => {
        if (route.meta?.affix) {
          this.addTag(route)
        }
      })
    },

    /**
     * 添加标签
     */
    addTag(route: RouteLocationNormalized): TagView | undefined {
      // 忽略没有名称的路由
      if (!route.name) return

      // 检查是否已存在
      const isExist = this.visitedTags.some(tag => tag.path === route.path)
      if (isExist) return

      // 创建标签
      const tag: TagView = {
        path: route.path,
        name: route.name as string,
        title: (route.meta?.title as string) || route.name as string,
        fullPath: route.fullPath,
        query: route.query as Record<string, any>,
        affix: route.meta?.affix as boolean,
        icon: route.meta?.icon as string,
      }
      

      this.visitedTags.push(tag)

      // 添加到缓存
      if (route.meta?.noCache !== true) {
        this.cachedTags.push(route.name as string)
      }

      return tag
    },

    /**
     * 关闭标签
     */
    closeTag(path: string): TagView | undefined {
      // 不能关闭固定标签
      const tag = this.visitedTags.find(t => t.path === path)
      if (tag?.affix) return

      // 从列表中移除
      const index = this.visitedTags.findIndex(t => t.path === path)
      if (index > -1) {
        this.visitedTags.splice(index, 1)
      }

      // 从缓存中移除
      const cacheIndex = this.cachedTags.indexOf(tag?.name || '')
      if (cacheIndex > -1) {
        this.cachedTags.splice(cacheIndex, 1)
      }

      // 返回下一个标签
      return this.visitedTags[index] || this.visitedTags[index - 1]
    },

    /**
     * 关闭其他标签
     */
    closeOtherTags(path: string): void {
      this.visitedTags = this.visitedTags.filter(tag => tag.path === path || tag.affix)
      this.cachedTags = this.visitedTags.map(tag => tag.name)
    },

    /**
     * 关闭左侧标签
     */
    closeLeftTags(path: string): void {
      const index = this.visitedTags.findIndex(tag => tag.path === path)
      if (index > -1) {
        this.visitedTags = this.visitedTags.filter((tag, i) => i >= index || tag.affix)
        this.cachedTags = this.visitedTags.map(tag => tag.name)
      }
    },

    /**
     * 关闭右侧标签
     */
    closeRightTags(path: string): void {
      const index = this.visitedTags.findIndex(tag => tag.path === path)
      if (index > -1) {
        this.visitedTags = this.visitedTags.filter((tag, i) => i <= index || tag.affix)
        this.cachedTags = this.visitedTags.map(tag => tag.name)
      }
    },

    /**
     * 关闭所有标签
     */
    closeAllTags(): TagView | undefined {
      this.visitedTags = this.visitedTags.filter(tag => tag.affix)
      this.cachedTags = this.visitedTags.map(tag => tag.name)
      return this.visitedTags[0]
    },

    /**
     * 更新标签标题
     */
    updateTagTitle(path: string, title: string): void {
      const tag = this.visitedTags.find(t => t.path === path)
      if (tag) {
        tag.title = title
      }
    },

    /**
     * 移动标签（拖拽排序）
     */
    moveTag(fromIndex: number, toIndex: number): void {
      const tag = this.visitedTags.splice(fromIndex, 1)[0]
      this.visitedTags.splice(toIndex, 0, tag)
    },
  },

  persist: true,
})

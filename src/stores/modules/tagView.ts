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
    initAffixTags(routes: RouteLocationNormalized[]): void {
      routes.forEach(route => {
        if (route.meta?.affix) {
          this.addTag(route)
        }
      })
    },

    addTag(route: RouteLocationNormalized): TagView | undefined {
      if (!route.name) return

      const isExist = this.visitedTags.some(tag => tag.path === route.path)
      if (isExist) return

      const tag: TagView = {
        path: route.path,
        name: route.name as string,
        title: (route.meta?.title as string) || route.name as string,
        fullPath: route.fullPath,
        query: route.query as Record<string, any>,
        affix: route.meta?.affix as boolean,
        icon: route.meta?.icon as string
      }  

      this.visitedTags.push(tag)

      if (route.meta?.noCache !== true) {
        this.cachedTags.push(route.name as string)
      }

      return tag
    },

    closeTag(path: string): TagView | undefined {
      const tag = this.visitedTags.find(t => t.path === path)
      if (tag?.affix) return

      const index = this.visitedTags.findIndex(t => t.path === path)
      if (index > -1) {
        this.visitedTags.splice(index, 1)
      }

      const cacheIndex = this.cachedTags.indexOf(tag?.name || '')
      if (cacheIndex > -1) {
        this.cachedTags.splice(cacheIndex, 1)
      }

      return this.visitedTags[index] || this.visitedTags[index - 1]
    },

    closeOtherTags(path: string): void {
      this.visitedTags = this.visitedTags.filter(tag => tag.path === path || tag.affix)
      this.cachedTags = this.visitedTags.map(tag => tag.name)
    },

    closeLeftTags(path: string): void {
      const index = this.visitedTags.findIndex(tag => tag.path === path)
      if (index > -1) {
        this.visitedTags = this.visitedTags.filter((tag, i) => i >= index || tag.affix)
        this.cachedTags = this.visitedTags.map(tag => tag.name)
      }
    },

    closeRightTags(path: string): void {
      const index = this.visitedTags.findIndex(tag => tag.path === path)
      if (index > -1) {
        this.visitedTags = this.visitedTags.filter((tag, i) => i <= index || tag.affix)
        this.cachedTags = this.visitedTags.map(tag => tag.name)
      }
    },

    closeAllTags(): TagView | undefined {
      this.visitedTags = this.visitedTags.filter(tag => tag.affix)
      this.cachedTags = this.visitedTags.map(tag => tag.name)
      return this.visitedTags[0]
    },

    updateTagTitle(path: string, title: string): void {
      const tag = this.visitedTags.find(t => t.path === path)
      if (tag) {
        tag.title = title
      }
    },

    moveTag(fromIndex: number, toIndex: number): void {
      const tag = this.visitedTags.splice(fromIndex, 1)[0]
      this.visitedTags.splice(toIndex, 0, tag)
    },
  },

  persist: true
})

import type { Directive } from 'vue'
import { useUserStore } from '@/stores'

const hasWildcardPermission = (permissions: string[]): boolean => {
  return permissions.includes('*')
}

export const hasPermission = (permission: string): boolean => {
  const userStore = useUserStore()
  const permissions = userStore.getPermissions
  if (!permission) return true
  return hasWildcardPermission(permissions) || permissions.includes(permission)
}

export const hasAnyPermission = (permissionList: string[]): boolean => {
  const userStore = useUserStore()
  const permissions = userStore.getPermissions
  if (!permissionList.length) return true
  return hasWildcardPermission(permissions) || permissionList.some((item) => permissions.includes(item))
}

const resolvePermissionList = (value: string | string[] | undefined): string[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export const permissionDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const permissionList = resolvePermissionList(binding.value)
    if (!hasAnyPermission(permissionList)) {
      el.remove()
    }
  }
}

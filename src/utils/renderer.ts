import { NThing, NIcon, NAvatar, NText, NFlex, NButton } from 'naive-ui'  
import { RobotFilled } from '@vicons/antd'
import { Logout } from '@vicons/carbon'
import { useUserStore } from '@/stores/modules/user'
import { globalDialog, globalMessage } from '@/utils/naive'
import router from '@/router'
import type { VNode, Component } from 'vue'

/**
 * 渲染图标
 * @param {Component} icon - 图标组件
 * @returns {Function} 图标渲染函数
 */
export function renderIcon(icon: Component, options: Record<string, any> = { size: 18 }): () => VNode {
  return () => h(NIcon, options, { default: () => h(icon) })
}

/**
 * 渲染用户下拉菜单的自定义头部
 * @returns {VNode} 自定义头部节点
 */
export function renderUserDropdownHeader(): VNode {
  const userStore = useUserStore()
  
  return h(
    NThing,
    { 
      style: 'padding: 10px;'
    },
    {
      avatar: () => h(NAvatar, { 
        size: 36,
        style: 'color: white; backgroundColor: orange;',   
      }, () => h(NIcon, { size: 40 }, { default: () => h(RobotFilled)})),
      header: () => h(
        NText,
        null,
        () => userStore.getUsername
      ),
      description: () => h(
        NText,
        { depth: 3 },
        () => userStore.getEmail
      )
    } 
  )
}
  
/**
 * 渲染用户下拉菜单的自定义尾部
 * @returns {VNode} 自定义尾部节点
 */
export function renderUserDropdownFooter(): VNode {
  const userStore = useUserStore()
  
  return h(
    NFlex,
    {
      justify: 'center',
      align: 'center',
      style: 'padding-top: 5px;'
    },
    () => h(
        NButton,
        { strong: true, secondary: true, type: 'error', onClick: () => {   
          globalDialog.warning({
            title: '提示',
            content: '您确定要退出登录吗',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              userStore.logout()
              globalMessage.success('退出登录成功')
              router.push('/auth/login')
            }, 
          })
        }},
        () => [
          h(NIcon, { size: 16, class: 'mr-1' }, { default: () => h(Logout) }),
          h('span', null, '退出登录')
        ]
      )
  )
}

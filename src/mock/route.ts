/**
 * 路由相关Mock数据
 * 用于模拟菜单接口
 */
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/menu',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取菜单成功',
        data: [ 
          {
            name: 'Content',
            path: '/content',
            meta: {
              title: '内容管理',
              icon: 'Document'
            },
            children: [
              {
                name: 'Articles',
                path: '/content/articles',
                meta: {
                  title: '文章管理', 
                }
              },
              {
                name: 'Categories', 
                path: '/content/categories',
                meta: {
                  title: '分类管理',
                }
              }
            ]
          }, 
          {
            name: 'Settings',
            path: '/settings',
            meta: {
              icon: 'Settings',
              title: '系统设置',
            },
            children: [
              {
                name: 'Basic', 
                path: '/settings/basic',
                meta: {
                  title: '基本设置',
                }
              },
              {
                name: 'Permissions', 
                path: '/settings/permissions',
                meta: {
                  title: '权限管理',
                }
              },
              {
                name: 'Logs', 
                path: '/settings/logs',
                meta: {
                  title: '日志管理',
                }
              }
            ]
          }
        ]
      }
    }
  }
] as MockMethod[]

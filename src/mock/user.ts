/**
 * 用户相关Mock数据
 * 用于模拟用户登录、获取用户信息和登出接口
 */
import type { MockMethod } from 'vite-plugin-mock';

/**
 * Mock方法配置数组
 */
export default [
  {
    url: '/api/login', // 登录接口
    method: 'post', // 请求方法
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body;
      // 模拟超级管理员账号登录
      if (username === 'superman' && password === '123456') {
        return {
          code: 200, // 成功状态码
          message: '登录成功', // 成功消息
          data: {
            token: 'mock-token-' + Date.now(), // 模拟token
            refreshToken: 'mock-refresh-token-' + Date.now(),
            userInfo: {
              id: 1,
              username: 'superman',
              nickname: '超级管理员',
              avatar:
                'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20avatar%20of%20a%20system%20administrator&size=256x256',
              email: 'superman@example.com',
              phone: '13800138000',
              roles: ['super_admin'],
              permissions: ['*'],
            },
          },
        };
      } else {
        // 登录失败
        return {
          code: 401, // 未授权状态码
          message: '用户名或密码错误', // 错误消息
        };
      }
    },
  },
  {
    url: '/api/refresh-token',
    method: 'post',
    response: ({ body }: { body: { refreshToken?: string } }) => {
      if (!body?.refreshToken || !body.refreshToken.startsWith('mock-refresh-token-')) {
        return {
          code: 401,
          message: 'refresh token 无效',
        };
      }

      return {
        code: 200,
        message: '刷新成功',
        data: {
          token: 'mock-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
        },
      };
    },
  },
  {
    url: '/api/user/info', // 获取用户信息接口
    method: 'get', // 请求方法
    response: () => {
      // 模拟返回用户信息
      return {
        code: 200, // 成功状态码
        message: '获取用户信息成功', // 成功消息
        data: {
          id: 1,
          username: 'superman',
          name: '超级管理员',
          avatar:
            'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20avatar%20of%20a%20system%20administrator&size=256x256',
          email: 'superman@example.com',
          phone: '13800138000',
          roles: ['super_admin'], // 角色
          permissions: ['*'], // 权限
          lastLoginTime: new Date().toISOString(), // 最后登录时间
          createTime: '2024-01-01T00:00:00.000Z', // 创建时间
        },
      };
    },
  },
  {
    url: '/api/logout', // 登出接口
    method: 'post', // 请求方法
    response: () => {
      // 模拟登出成功
      return {
        code: 200, // 成功状态码
        message: '登出成功', // 成功消息
      };
    },
  },
] as MockMethod[];

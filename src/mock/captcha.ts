/**
 * 验证码相关Mock数据
 * 用于模拟获取验证码接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { generateCaptcha } from '../utils/captcha'

const captchaStore = new Map<string, string>()

export default [
  {
    url: '/api/captcha',
    method: 'get',
    response: () => {
      const captcha = generateCaptcha(4)
      captchaStore.set(captcha.captchaId, captcha.captchaCode)
      
      return {
        code: 200,
        message: '获取验证码成功',
        data: {
          captchaId: captcha.captchaId,
          image: captcha.image,
        }
      }
    }
  },
  {
    url: '/api/captcha/verify',
    method: 'post',
    response: ({ body }: { body: { captchaId: string; captchaCode: string } }) => {
      const { captchaId, captchaCode } = body
      const storedCode = captchaStore.get(captchaId)
      
      if (!storedCode) {
        return {
          code: 400,
          message: '验证码已过期，请重新获取'
        }
      }
      
      if (storedCode.toUpperCase() === captchaCode.toUpperCase()) {
        captchaStore.delete(captchaId)
        return {
          code: 200,
          message: '验证码正确'
        }
      }
      
      return {
        code: 400,
        message: '验证码错误'
      }
    }
  }
] as MockMethod[]

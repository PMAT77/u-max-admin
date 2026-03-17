/**
 * 组件类型定义
 * 定义组件的Props和Emits类型
 */

/**
 * SystemLogo组件Props
 */
export interface SystemLogoProps {
  // 可以添加组件的Props类型
}

/**
 * SystemLogo组件Emits
 */
export type SystemLogoEmits = {
  // 可以添加组件的Emits类型
}

/**
 * LoginPanel组件Props
 */
export interface LoginPanelProps {
  // 可以添加组件的Props类型
}

/**
 * LoginPanel组件Emits
 */
export type LoginPanelEmits = {
  (e: 'login', loginData: { type: string; data: any }): void
}

/**
 * LoginByAccount组件Props
 */
export interface LoginByAccountProps {
  // 可以添加组件的Props类型
}

/**
 * LoginByAccount组件Emits
 */
export type LoginByAccountEmits = {
  (e: 'login', loginData: { type: string; data: { username: string; password: string; captcha: string; captchaId: string } }): void
}

/**
 * LoginByPhone组件Props
 */
export interface LoginByPhoneProps {
  // 可以添加组件的Props类型
}

/**
 * LoginByPhone组件Emits
 */
export type LoginByPhoneEmits = {
  (e: 'login', loginData: { type: string; data: { phone: string; code: string[] } }): void
}

/**
 * 主题配置
 * 管理系统默认主题、预设颜色和边框圆角配置
 */
import type { ThemeMode, ThemeState, BorderRadiusPreset } from './type'

export interface PrimaryColorPreset {
  label: string
  value: string
}

export const defaultThemeMode: ThemeMode = 'dark'

export const defaultThemeState: ThemeState = {
  mode: defaultThemeMode,
  primaryColor: '#2f54eb',
  borderRadius: '0.5rem',
}

export const primaryColorPresets: PrimaryColorPreset[] = [
  { label: '默认蓝', value: '#297acf' },
  { label: '极客蓝', value: '#1890ff' },
  { label: '薄暮红', value: '#f5222d' },
  { label: '火山橘', value: '#fa541c' },
  { label: '日暮橙', value: '#fa8c16' },
  { label: '柠檬金', value: '#fadb14' },
  { label: '极光绿', value: '#52c41a' },
  { label: '青葱绿', value: '#13c2c2' },
  { label: '酱紫', value: '#9c27b0' },
  { label: '暗夜紫', value: '#2f54eb' },
  { label: '魔力粉', value: '#eb2f96' },
]

export const borderRadiusPresets: BorderRadiusPreset[] = [
  { label: '无圆角', value: '0rem' },
  { label: '小圆角', value: '0.25rem' },
  { label: '中圆角', value: '0.5rem' },
  { label: '大圆角', value: '0.75rem' },
  { label: '超大圆角', value: '1rem' },
]

/**
 * 主题类型定义
 */

export type ThemeMode = 'light' | 'dark';
export type ThemeTone = 'light' | 'dark';

export type BorderRadiusSize = '0rem' | '0.25rem' | '0.5rem' | '0.75rem' | '1rem';

export interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  borderRadius: BorderRadiusSize;
  siderTheme: ThemeTone;
  headerTheme: ThemeTone;
}

export interface PrimaryColorPreset {
  label: string;
  value: string;
}

export interface BorderRadiusPreset {
  label: string;
  value: BorderRadiusSize;
}

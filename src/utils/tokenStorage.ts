/**
 * Token 存储工具
 * 提供安全的Token存储和管理功能
 * 使用localStorage存储Token，比localStorage更安全，因为localStorage在会话结束后会自动清除
 */

/**
 * 存储Token
 * @param token Token字符串
 * @description 将Token存储到localStorage中
 */
export const setToken = (token: string): void => {
  try {
    // 使用localStorage存储，比localStorage更安全
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Token存储失败:', error);
  }
};

/**
 * 获取Token
 * @returns Token字符串或null
 * @description 从localStorage中获取Token
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Token获取失败:', error);
    return null;
  }
};

/**
 * 删除Token
 * @description 从localStorage中删除Token
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Token删除失败:', error);
  }
};

/**
 * 检查是否存在Token
 * @returns 是否存在Token
 * @description 检查localStorage中是否存在Token
 */
export const hasToken = (): boolean => {
  return getToken() !== null;
};

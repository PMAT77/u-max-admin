/**
 * Token 存储工具
 * 提供安全的Token存储和管理功能
 * 使用sessionStorage存储Token，比localStorage更安全，因为sessionStorage在会话结束后会自动清除
 */

/**
 * 存储Token
 * @param token Token字符串
 * @description 将Token存储到sessionStorage中
 */
export const setToken = (token: string): void => {
  try {
    // 使用sessionStorage存储，比localStorage更安全
    sessionStorage.setItem('token', token);
  } catch (error) {
    console.error('Token存储失败:', error);
  }
};

/**
 * 获取Token
 * @returns Token字符串或null
 * @description 从sessionStorage中获取Token
 */
export const getToken = (): string | null => {
  try {
    return sessionStorage.getItem('token');
  } catch (error) {
    console.error('Token获取失败:', error);
    return null;
  }
};

/**
 * 删除Token
 * @description 从sessionStorage中删除Token
 */
export const removeToken = (): void => {
  try {
    sessionStorage.removeItem('token');
  } catch (error) {
    console.error('Token删除失败:', error);
  }
};

/**
 * 检查是否存在Token
 * @returns 是否存在Token
 * @description 检查sessionStorage中是否存在Token
 */
export const hasToken = (): boolean => {
  return getToken() !== null;
};

/**
 * 路由相关API
 * 提供菜单获取等功能
 */
import service from './index';

/**
 * 菜单选项接口
 */
export interface MenuOption {
  label: string;
  key: string;
  icon?: any;
  children?: MenuOption[];
}

/**
 * 菜单API对象
 */
export const menuApi = {
  /**
   * 获取菜单列表
   * @returns {Promise<any>} 菜单响应
   */
  getMenu: (): Promise<any> => {
    return service.get('/menu');
  },
};

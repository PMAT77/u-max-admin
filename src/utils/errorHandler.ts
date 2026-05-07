/**
 * 错误处理工具
 * 提供统一的错误处理机制
 * 支持API错误、验证错误、网络错误等多种错误类型的处理
 */

import { useMessage } from 'naive-ui';

/**
 * 错误类型
 * @description 定义了不同类型的错误，用于错误处理的分类
 */
export type ErrorType = 'api' | 'validation' | 'network' | 'unknown';

/**
 * 错误信息接口
 * @description 定义了错误处理函数返回的错误信息结构
 */
export interface ErrorInfo {
  type: ErrorType;
  message: string;
  code?: number;
  details?: any;
}

/**
 * 处理API错误
 * @param error 错误对象
 * @returns 错误信息
 * @description 处理API请求过程中出现的错误，包括服务器返回错误状态码、网络错误等
 */
export const handleApiError = (error: any): ErrorInfo => {
  const message = useMessage();

  if (error.response) {
    // 服务器返回错误状态码
    const status = error.response.status;
    const data = error.response.data;

    let errorMessage = '请求失败';

    switch (status) {
      case 400:
        errorMessage = data.message || '请求参数错误';
        break;
      case 401:
        errorMessage = '未授权，请重新登录';
        // 可以在这里添加跳转到登录页的逻辑
        break;
      case 403:
        errorMessage = '权限不足';
        break;
      case 404:
        errorMessage = '请求的资源不存在';
        break;
      case 500:
        errorMessage = '服务器内部错误';
        break;
      default:
        errorMessage = data.message || `请求失败 (${status})`;
    }

    message.error(errorMessage);

    return {
      type: 'api',
      message: errorMessage,
      code: status,
      details: data,
    };
  } else if (error.request) {
    // 请求已发出但没有收到响应
    const errorMessage = '网络错误，无法连接到服务器';
    message.error(errorMessage);

    return {
      type: 'network',
      message: errorMessage,
    };
  } else {
    // 请求配置出错
    const errorMessage = error.message || '未知错误';
    message.error(errorMessage);

    return {
      type: 'unknown',
      message: errorMessage,
    };
  }
};

/**
 * 处理验证错误
 * @param error 错误对象
 * @returns 错误信息
 * @description 处理表单验证等场景的错误
 */
export const handleValidationError = (error: any): ErrorInfo => {
  const message = useMessage();
  const errorMessage = error.message || '验证失败';

  message.error(errorMessage);

  return {
    type: 'validation',
    message: errorMessage,
    details: error,
  };
};

/**
 * 全局错误处理
 * @param error 错误对象
 * @param type 错误类型
 * @returns 错误信息
 * @description 根据错误类型调用对应的错误处理函数
 * @example
 * // 处理API错误
 * try {
 *   await api.request()
 * } catch (error) {
 *   handleError(error, 'api')
 * }
 *
 * // 处理验证错误
 * try {
 *   validateForm()
 * } catch (error) {
 *   handleError(error, 'validation')
 * }
 */
export const handleError = (error: any, type: ErrorType = 'unknown'): ErrorInfo => {
  switch (type) {
    case 'api':
      return handleApiError(error);
    case 'validation':
      return handleValidationError(error);
    default:
      const message = useMessage();
      const errorMessage = error.message || '未知错误';
      message.error(errorMessage);

      return {
        type: 'unknown',
        message: errorMessage,
      };
  }
};

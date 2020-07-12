/*
 * @Overview:   Const
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 16:10
 * @Mark:       //
 */

/**
 * 是否为测试环境
 * @return {boolean}
 */
export const IS_DEV = ["development", "develop", "dev"].includes(
  process.env.NODE_ENV
);

/**
 * 是否为生产环境
 * @return {boolean}
 */
export const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

/**
 * 是否在IOS中
 * @return {boolean}
 */
export const IS_IOS = /(iphone|ipad|ipod|ios)/i.test(
  navigator.userAgent.toLowerCase()
);

/**
 * 是否在Android中
 * @return {boolean}
 */
export const IS_ANDROID = /(android|linux)/i.test(
  navigator.userAgent.toLowerCase()
);

/**
 * 是否在微信中
 * @return {boolean}
 */
export const IS_WX = /micromessenger/.test(
  window.navigator.userAgent.toLowerCase()
);

/**
 * 是否在微信小程序中
 * @return {boolean}
 */
export const IS_WX_MINI_PROGRAM = /miniprogram/.test(
  (window.__wxjs_environment || navigator.userAgent).toLowerCase()
);

/*
 * @Overview:   validate
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 11:20
 * @Mark:       //
 */

/**
 * @description 是否为测试环境
 * @return {boolean}
 */
export const IS_DEV = ["development", "develop", "dev"].includes(
  process.env.NODE_ENV
);

/**
 * @description 是否为生产环境
 * @return {boolean}
 */
export const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

/**
 * @description 是否在IOS中
 * @return {boolean}
 */
export const IS_IOS = /(iphone|ipad|ipod|ios)/i.test(
  navigator.userAgent.toLowerCase()
);

/**
 * @description 是否在Android中
 * @return {boolean}
 */
export const IS_ANDROID = /(android|linux)/i.test(
  navigator.userAgent.toLowerCase()
);

/**
 * @description 是否在微信中
 * @return {boolean}
 */
export const IS_WX = /micromessenger/.test(
  window.navigator.userAgent.toLowerCase()
);

/**
 * @description 是否在微信小程序中
 * @return {boolean}
 */
export const IS_WX_MINI_PROGRAM = /miniprogram/.test(
  navigator.userAgent.toLowerCase()
);

/**
 * @description 判断对象是否为空
 * @param obj {Object} 判断对象参数
 * @returns {boolean}
 */
export const isEmptyObj = obj => {
  return JSON.stringify(obj) === "{}" || obj === null || obj === undefined;
};

/**
 * @description 判断数组是否为空
 * @param arr {Array} 判断数组参数
 * @return {boolean}
 */
export const isEmptyArray = arr => !arr.length;

/**
 * @description 判断是否是超链接
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isHttps = str => {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(str);
};

/**
 * @description 校验密码是否小于6位
 * @param str {String} 处理的字符串
 * @returns {boolean}
 */
export const isPassword = str => {
  return str.length >= 6;
};

/**
 * @description 判断是否是合法的手机号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isMobile = str => {
  const reg = /^1\d{10}$/;
  return reg.test(str);
};

/**
 * @description 判断是否是合法的邮箱
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isEmail = str => {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return reg.test(str);
};

/**
 * @description 判断是否是合法的省份证号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isIdCardNo = str => {
  const reg = /^([0-9]){7,18}([xX])?$/;
  return reg.test(str);
};

/**
 * @description 判断是否是合法的微信号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isWeChatNo = str => {
  const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
  return reg.test(str);
};

/**
 * @description 判断是否为空
 * @param str {String} 处理的字符串
 * @returns {boolean}
 */
export const isBlank = str => {
  return (
    str == null ||
    false ||
    str === "" ||
    str.trim() === "" ||
    str.toLocaleLowerCase().trim() === "null"
  );
};

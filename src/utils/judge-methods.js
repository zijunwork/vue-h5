/*
 * @Overview:   Judge-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 14:02
 * @Mark:       //
 */

/**
 * 判断对象是否为空
 * @param obj {Object} 判断对象参数
 * @returns {boolean}
 */
export const isEmptyObj = obj => {
  return JSON.stringify(obj) === "{}" || obj === null || obj === undefined;
};

/**
 * 判断数组是否为空
 * @param arr {Array} 判断数组参数
 * @return {boolean}
 */
export const isEmptyArray = arr => !arr.length;

/**
 * 检测空格、回车、换行、空白
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isBlank = str => {
  const reg = /^\s*$/;
  return reg.test(str);
};

/**
 * 判断是否是超链接
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isHttps = str => {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(str);
};

/**
 * 判断是否是合法的省份证号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isIdCardNo = str => {
  const reg = /^([0-9]){7,18}([xX])?$/;
  return reg.test(str);
};

/**
 * 判断是否是合法的手机号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isMobile = str => {
  const reg = /^1\d{10}$/;
  return reg.test(str);
};

/**
 * 判断是否是合法的邮箱
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isEmail = str => {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return reg.test(str);
};

/**
 * 判断是否是合法的微信号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
export const isWeChatNo = str => {
  const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
  return reg.test(str);
};

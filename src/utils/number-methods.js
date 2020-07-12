/*
 * @Overview:   Number-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 15:20
 * @Mark:       //
 */
import { removeAllSpace } from "./string-methods";

/**
 * 四舍五入
 * @param number {number} 处理的数字
 * @param digit {number} 需要保留的小数位数
 * @return {number}
 */
export const getMathRound = (number = 0, digit = 2) => {
  const exponent = Math.pow(10, digit);
  return Math.round(number * exponent) / exponent;
};

/**
 * 取两个数之间的随机数
 * @param min {number} 范围最小值(包此值)
 * @param max {number} 范围最大值(含此值)
 * @return {number} 随机数
 * @example (1,7) => 1/2/3/4/5/6/7
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * 格式化手机号为 3-4-4结构
 * @param v {string | number} 输入连续字符或数字
 * @return {string}
 */
export const formatPhoneNum = v => {
  const _v = removeAllSpace(v);
  if (isNaN(_v)) {
    return _v;
  } else {
    if (_v.length >= 3 && _v.length <= 7) {
      const FIRST_PART = _v.substr(0, 3);
      const SECOND_PART = _v.substr(3);
      v = FIRST_PART + " " + SECOND_PART;
    } else if (_v.length > 7) {
      const FIRST_PART = _v.substr(0, 3);
      const SECOND_PART = _v.substr(3, 4);
      const THIRD_PART = _v.substr(7);
      v = FIRST_PART + " " + SECOND_PART + " " + THIRD_PART;
    }
    return v;
  }
};

/**
 * 强制保留n位小数
 * @param value {string | number} 需要处理的数
 * @param n {number} 需要保留的小数位数
 * @return {string | number}
 */
export const returnFloat = (value, n) => {
  let v = Math.round(parseFloat(value) * 100) / 100;
  let xsd = v.toString().split(".");
  if (xsd.length === 1) {
    v = v.toString() + "." + "0".repeat(n);
    return v;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < n) {
      v = v.toString() + "0";
    }
    return v;
  }
};

/**
 * 金钱“，”格式处理，保留n位小数
 * @param s {string | number} 需要处理的数
 * @param n {number} 需要保留的小数位数
 * @return {string} 5,000.00
 */
export const formatMoney = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";
  let l = s
    .split(".")[0]
    .split("")
    .reverse();
  let r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
  }
  return (
    t
      .split("")
      .reverse()
      .join("") +
    "." +
    r
  );
};

/**
 * 百分比格式处理，保留n位小数
 * @param value {string | number} 需要处理的数
 * @param n {number} 需要保留的小数位数, 默认保留2位小数
 * @return {string} 20.00%
 */
export const fPercent = (value, n = 2) => {
  let number = (Number(value) * 100).toFixed(n);
  return `${number}%`;
};

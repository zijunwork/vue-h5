/*
 * @Overview:   Optimize-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 16:07
 * @Mark:       //
 */

/**
 * 防抖
 * @param delay {number} 等待时间
 * @param fn {Function} 需执行函数
 */
export const debounce = (delay, fn) => {
  let timer;
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

/**
 * 节流
 * @param delay {number} 计划好的执行间隔
 * @param fn {Function} 需执行函数
 */
export const throttled = (delay, fn) => {
  let lastCall = 0;
  return function(...args) {
    const NOW = new Date().getTime();
    if (NOW - lastCall < delay) {
      return;
    }
    lastCall = NOW;
    return fn(...args);
  };
};

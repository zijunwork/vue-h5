/*
 * @Overview:   common-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 11:32
 * @Mark:       常用方法推荐使用 lodash.js (已集成)
 *              常用时间方法推荐使用 day.js (已集成)
 */

/*********************************** String **************************************/

/**
 * @description 获取文件后缀名
 * @param filePath {string} file地址
 * @example https://baidu.com/file/123.mp4
 * @return {Object} 文件后缀 mp4
 */
export const getFileType = filePath => {
  let startIndex = filePath.lastIndexOf(".");
  if (startIndex !== -1) {
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
  } else {
    return "";
  }
};

/**
 * @description 解析url参数，转换为参数对象模式
 * @param url {string} url地址 default: window.location.href
 * @example ?id=12345&a=b
 * @return {Object} 转换之后的对象 {id:12345, a:b}
 */
export const parseQueryString = url => {
  url = !url ? window.location.href : url;
  if (url.indexOf("?") === -1) {
    return {};
  }
  let search =
    url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
  if (search === "") {
    return {};
  }
  search = search.split("&");
  let query = {};
  for (let i = 0; i < search.length; i++) {
    let pair = search[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

/*********************************** Number **************************************/

/**
 * @description 格式化手机号为 3-4-4结构
 * @param v {string | number} 输入连续字符或数字
 * @return {string}
 */
export const formatPhoneNum = v => {
  const removeAllSpace = v => v.replace(/\s+/g, "");
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
 * @description 金钱“，”格式处理，保留n位小数
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
 * @description 强制保留n位小数
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

/*********************************** Date **************************************/

/**
 * @description 倒计时计算年，天，时，分，秒
 * @param targetTime {number | string} 目标时间（将来的设定时间）
 * @param startTime {number | string} 开始时间（一般为现在时间）
 * @return {{years: *, days: *, hours: *, minutes: *, seconds: *}} 返回对象
 */
export const returnLeftTime = (targetTime, startTime) => {
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return String(i);
  }
  let currTime = startTime || new Date().getTime();
  let leftTime = Number(targetTime) - Number(currTime);
  if (leftTime >= 0) {
    let years = parseInt(String(leftTime / 1000 / 60 / 60 / 24 / 365), 10);
    let days = parseInt(String(leftTime / 1000 / 60 / 60 / 24), 10);
    let hours = parseInt(String((leftTime / 1000 / 60 / 60) % 24), 10);
    let minutes = parseInt(String((leftTime / 1000 / 60) % 60), 10);
    let seconds = parseInt(String((leftTime / 1000) % 60), 10);
    return {
      years: checkTime(years),
      days: checkTime(days),
      hours: checkTime(hours),
      minutes: checkTime(minutes),
      seconds: checkTime(seconds)
    };
  }
};

/**
 * @description 获取当前日期的N个月/天前后的日期
 * @param months {number} N月，+N 表示N月之后; -N 表示N月之前
 * @param days {number} N日， +N 表示N天之后; -N 表示N天之前
 * @param isZero {boolean} 是否需要补零 true(默认) 需要;
 * @param joinSign {string} 日期连接符号 ‘-’(默认)
 * @return {string} 输出需求格式
 */
export const getFewMonthAgoOrAfterDate = (
  months = 0,
  days = 0,
  isZero = true,
  joinSign = "-"
) => {
  let dt = new Date();
  dt.setMonth(dt.getMonth() + months, dt.getDate() + days);
  let Year = dt.getFullYear();
  let Month = dt.getMonth() + 1;
  let Day = dt.getDate();
  if (isZero) {
    Month = Month < 10 ? "0" + Month : Month;
    Day = Day < 10 ? "0" + Day : Day;
  }
  return `${Year}${joinSign}${Month}${joinSign}${Day}`;
};

/**
 * @description 是否为闰年
 * @return {boolean} 输出需求格式
 */
export const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/*********************************** Browser **************************************/

/**
 * @description 获取客户端类型
 * @returns {{isQQBrowser: boolean, isQZone: boolean, isOriginalChrome: (boolean|boolean), isWeibo: boolean, isQQ: boolean, isSafari: (boolean|boolean), isApp: boolean, isAndroid: boolean, isWeChat: boolean, isIos: boolean}}
 */
export function getBrowser() {
  const ua = window.navigator.userAgent || "";
  const isAndroid = /android/i.test(ua);
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isWeChat = /micromessenger\/([\d.]+)/i.test(ua);
  const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
  const isQQ = /qq\/([\d.]+)/i.test(ua);
  const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);
  const isQZone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
  const isOriginalChrome =
    /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid;
  const isSafari =
    /safari\/([\d.]+)$/i.test(ua) &&
    isIos &&
    ua.indexOf("Crios") < 0 &&
    ua.indexOf("Mozilla") === 0;
  const isApp =
    ua.indexOf("platform=ios") > -1 || ua.indexOf("platform=android") > -1;
  return {
    isAndroid,
    isIos,
    isWeChat,
    isWeibo,
    isQQ,
    isQQBrowser,
    isQZone,
    isOriginalChrome,
    isSafari,
    isApp
  };
}

/*********************************** Common **************************************/

/**
 * @description 开启/关闭 VConsole
 * @param value {boolean} 开关
 */
export const switchVConsole = value => {
  let vConsoleEl = document.querySelector("#__vconsole");
  if (vConsoleEl) {
    if (value) {
      process.env.NODE_ENV === "development" &&
      vConsoleEl &&
      (vConsoleEl.style.display = "block");
    } else {
      process.env.NODE_ENV === "development" &&
      vConsoleEl &&
      (vConsoleEl.style.display = "none");
    }
  }
};

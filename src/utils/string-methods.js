/*
 * @Overview:   String-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 15:19
 * @Mark:       //
 */

/**
 * 字符串去除所有html标签
 * @param str {string} 需要处理的字符串
 * @return {*}
 */
export const removeHtmlTag = str => {
  let reg = /<\/?.+?\/?>/g;
  return str.replace(reg, "");
};

/**
 * 清除字符前后空格
 * @param str {string} 需要处理的字符串
 * @return {*}
 */
export const clearSpace = str => str.replace(/(^\s*)|(\s*)$/g, "");

/**
 * 移除所有空格
 * @param v {string} 需要处理的字符串
 * @return {*} 返回正确的字符串
 */
export const removeAllSpace = v => v.replace(/\s+/g, "");

/**
 * 移除所有超链接
 * @param html {string} html字符串
 * @return {*} 返回移除超链接之后的字符串
 */
export const removeAllHyperLink = html => {
  const reg = new RegExp(/<a[^>]*href=['"]([^"]*)['"].*?[^>]*>(.*?)<\/a>/gi);
  return reg.test(html) ? html.replace(reg, "") : html;
};

/**
 * 替换文本中所有换行(\n)为<br/>
 * @param str {string} 需要处理的字符串
 * @return {*} 替换之后的字符串
 */
export const replaceAllLineBreakWithBr = str => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, "<br/>") : str;
};

/**
 * 清除内容中 \n | \\n
 * @param str {string} 需要处理的字符串
 * @return {*} 清除之后的字符串
 */
export const removeAllLineBreak = str => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, "") : str;
};

/**
 * 去除字符串中<br/>
 * @param str {string} 需要处理的字符串
 * @return {*} 去除之后的字符串
 */
export const removeBr = str => {
  const reg = new RegExp(/<br\s*\\?\/?>/gi);
  return reg.test(str) ? str.replace(reg, "") : str;
};

/**
 * 获取文件后缀名
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
 * 解析url参数，转换为参数对象模式
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

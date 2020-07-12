/*
 * @Overview:   Device-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 15:18
 * @Mark:       //
 */

/**
 * 获取设备机型
 */
export const browserType = () => {
  let userAgent = navigator.userAgent;
  let isOpera = userAgent.indexOf("Opera") > -1;
  let isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera;
  let isEdge = userAgent.indexOf("Edge") > -1;
  let isFF = userAgent.indexOf("Firefox") > -1;
  let isSafari =
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1;
  let isChrome =
    userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;

  let res = "";
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion === 7) {
      res = "IE7";
    } else if (fIEVersion === 8) {
      res = "IE8";
    } else if (fIEVersion === 9) {
      res = "IE9";
    } else if (fIEVersion === 10) {
      res = "IE10";
    } else if (fIEVersion === 11) {
      res = "IE11";
    } else {
      res = "IE";
    }
  }
  isOpera && (res = "Opera");
  isEdge && (res = "Edge");
  isFF && (res = "FF");
  isSafari && (res = "Safari");
  isChrome && (res = "Chrome");
  return res;
};

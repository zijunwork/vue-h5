/*
 * @Overview:   index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 15:58
 * @Mark:       //
 */

import {IS_PROD} from "utils/validate";

let module = {
  app: {},
  route: {
    home: {
      title: "首页"
    },
    settings: {
      title: "系统设置"
    }
  },
  request: {
    loadingText: "加载中...",
    unknownNetworkError: ["网络错误", "网络超时", "未知异常"],
    errorCodeMsg: {
      e400: "请求错误",
      e401: "未授权，请登录",
      e403: "拒绝访问",
      e404: "请求地址出错",
      e408: "请求超时",
      e500: "服务器内部错误",
      e501: "服务未实现",
      e502: "网关错误",
      e503: "服务不可用",
      e504: "网关超时",
      e505: "HTTP版本不受支持"
    }
  }
};

let languageFiles = IS_PROD
  ? require.context("./modules", false, /^((?!exclude).)*\.js$/)
  : require.context("./modules", false, /\.js$/);
languageFiles.keys().forEach(name => {
  module = {...module, ...languageFiles(name).default};
});

export default module;

/*
 * @Overview:   index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 15:59
 * @Mark:       //
 */

import {IS_PROD} from "utils/validate";

let module = {
  app: {},
  route: {
    home: {
      title: "首頁"
    },
    settings: {
      title: "系統設置"
    },
    request: {
      loadingText: "加載中...",
      unknownNetworkError: ["網絡錯誤", "網絡超時", "未知異常"],
      errorCodeMsg: {
        e400: "請求錯誤",
        e401: "未授權，請登錄",
        e403: "拒絕訪問",
        e404: "請求地址出錯",
        e408: "請求超時",
        e500: "服務器內部錯誤",
        e501: "服務未實現",
        e502: "網關錯誤",
        e503: "服務不可用",
        e504: "網關超時",
        e505: "HTTP版本不受支持"
      }
    }
  }
};

let languageFiles = IS_PROD
  ? require.context("./modules", false, /^((?!exclude).)*\.js$/)
  : require.context("./modules", false, /\.js$/);
languageFiles.keys().forEach(name => {
  module = { ...module, ...languageFiles(name).default };
});

export default module;

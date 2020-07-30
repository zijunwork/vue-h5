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
    title: {
      name: "首页"
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

/*
 * @Overview:   第三方库公共引入
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/28 10:24
 * @Mark:       //
 */
import Vue from "vue";
import store from "store/index";
import { IS_WX, IS_WX_MINI_PROGRAM } from "@/utils/validate";
import "@/router/router-hook";
import "@/assets/icons/index";
import "@/assets/iconfont/iconfont";
import "amfe-flexible";
import "styles/index.less";
import "utils/init-events";
import settings from "../settings";
import apis from "../api";
import wxShare from "utils/wx-share";

Vue.prototype.$settings = settings;
Vue.prototype.$apis = apis;
(IS_WX || IS_WX_MINI_PROGRAM) && (Vue.prototype.$wxShare = wxShare);

if (
  process.env.NODE_ENV === "development" &&
  store.getters["settings/openVConsole"]
) {
  const VConsole = require("vconsole");
  new VConsole();
}

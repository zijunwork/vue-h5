/*
 * @Overview:   index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 13:57
 * @Mark:       //
 */

import Vue from "vue";
import VueI18n from "vue-i18n";
import { Locale } from "vant";
import enUSVant from "vant/lib/locale/lang/en-US";
import zhCNVant from "vant/lib/locale/lang/zh-CN";
import zhHKVant from "vant/lib/locale/lang/zh-HK";
import enUS from "./en-US";
import zhCN from "./zh-CN";
import zhHK from "./zh-HK";

Vue.use(VueI18n);

const messages = {
  "zh-CN": {
    ...zhCN,
    ...zhCNVant
  },
  "zh-HK": {
    ...zhHK,
    ...zhHKVant
  },
  "en-US": {
    ...enUS,
    ...enUSVant
  }
};
const settingData =
  localStorage.getItem("settingsData") &&
  JSON.parse(localStorage.getItem("settingsData"));
const LANG = (settingData && settingData.lang) || "zh-CN";
const i18n = new VueI18n({
  locale: LANG,
  messages
});

const vantLocales = lang => {
  switch (lang) {
    case "en-US":
      Locale.use(lang, enUSVant);
      break;
    case "zh-HK":
      Locale.use(lang, zhHKVant);
      break;
    default:
      Locale.use(lang, zhCNVant);
  }
};
vantLocales(i18n.locale);

export default i18n;

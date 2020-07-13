import Vue from "vue";
import App from "./App.vue";
import "./assets/iconfont/iconfont";
import "./registerServiceWorker";
import router from "./router";
import "./router/router-hook";
import "./assets/icons/index";
import store from "store";
import "amfe-flexible";
import "styles/index.less";
import "utils/init-events";
import settings from "./settings";

Vue.prototype.$settings = settings;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development" && settings.openVConsole) {
  const VConsole = require("vconsole");
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import "styles/index.less";
import "./utils/init-events";
import settings from "./settings";
import VConsole from "vconsole";
Vue.prototype.$settings = settings;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development" && settings.openVConsole) {
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

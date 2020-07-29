/*
 * @Overview:   Router-hook
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 17:29
 * @Mark:       //
 */

import router from "./index";
import store from "@/store";

router.beforeEach((to, from, next) => {
  // 给页面路径信息时间节点信息
  !to.meta.t && (to.meta.t = new Date().getTime().toString());
  // 页面标题赋值
  const title = to.meta.title;
  title && (document.title = title);
  // 路由跳转，取消上一个路由的所有请求
  store.commit("axios/CLEAR_AXIOS_PROMISE_CANCEL_ARR");
  next();
});

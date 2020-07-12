/*
 * @Overview:   Router-hook
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 17:29
 * @Mark:       //
 */

import router from "./index";

router.beforeEach((to, from, next) => {
  !to.meta.t && (to.meta.t = new Date().getTime().toString());
  next();
});

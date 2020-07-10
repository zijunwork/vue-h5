/*
 * @Overview:   Store entry file
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/8 15:59
 * @Mark:       //
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default new Vuex.Store({
  modules
});

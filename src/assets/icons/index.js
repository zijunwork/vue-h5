/*
 * @Overview:   Svg index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/13 14:28
 * @Mark:       //
 */

import Vue from "vue";
import SvgIcon from "components/SvgIcon.vue";

Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

/*
 * @Overview:   index
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/14 20:13
 * @Mark:       //
 */
import { IS_PROD } from "utils/const";

let apiFiles = IS_PROD
  ? require.context("./modules", true, /^((?!exclude).)*\.js$/)
  : require.context("./modules", false, /\.js$/);
let apiModules = apiFiles
  .keys()
  .map(apiName => apiFiles(apiName).default || apiFiles(apiName));
const apis = apiModules.reduce((prev, curr) => Object.assign(prev, curr), {});
export default apis;

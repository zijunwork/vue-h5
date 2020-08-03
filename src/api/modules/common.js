/*
 * @Overview:   common
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/8/3 10:55
 * @Mark:       //
 */

import request from "../../utils/request";

export default {
  getWXConfig(data) {
    return request({
      url: "",
      method: "get",
      data
    });
  }
};

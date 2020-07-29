/*
 * @Overview:   demo
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/14 20:15
 * @Mark:       1. config中可配置所有axios中所有的option项
 *              2. config中可覆写url/methods参数，权重最大
 *              3. hideRequestLoading可隐藏请求加载的loading（request.js中可修改）,默认开启
 *              4. 单独请求关闭hideRequestLoading：可在直接写在request参数也可以写在config参数中
 *              5. 批量上传：headers: { "Content-Type": "multipart/form-data"} 在直接写在request参数也可以写在config参数中
 */

import request from "../../utils/request";

export default {
  mockRequest(data) {
    return request({
      url: "/getJoke",
      method: "get",
      data
    });
  }
};

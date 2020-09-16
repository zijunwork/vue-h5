/*
 * @Overview:   Request package
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/15 9:40
 * @Mark:       //
 */

import axios from "axios";
import store from "@/store";
import router from "@/router";
import qs from "qs";
import { Dialog, Toast } from "vant";
import i18n from "@/lang";

/*========================================================
Request基本常量,可根据实际业务修改
========================================================*/
// token/Authorization/"" 名称，store和storage中存储名为token
const TOKEN_NAME = "";
const POST_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=UTF-8";

/*========================================================
实例化Axios(默认配置, 在具体的单个请求中可独立配置覆盖此默认设置)
========================================================*/
const Axios = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": POST_CONTENT_TYPE
  }
});

/*========================================================
默认Toast设置-单例模式Toast
========================================================*/
const DEFAULT_TOAST_LOADING_OPTIONS = {
  forbidClick: true,
  loadingType: "spinner",
  duration: 0,
  message: i18n.t("request.loadingText")
};

// 显示Toast,支持自定义Options
const showLoading = TOAST_OPTIONS => {
  Toast.loading(TOAST_OPTIONS || DEFAULT_TOAST_LOADING_OPTIONS);
};

// 关闭Toast
const hiddenLoading = () => {
  Toast.clear();
};

// 取消重复请求
const removeCommonPending = config => {
  const cancelArr = store.getters["axios/axiosPromiseCancel"];
  if (cancelArr.length) {
    for (let i = 0, len = cancelArr.length; i < len; i++) {
      if (cancelArr[i].u === `${config.url}&${config.method}`) {
        store.commit("axios/CLEAR_COMMON_AXIOS_PROMISE_CANCEL", i);
      }
    }
  }
};

/*========================================================
处理Code错误
* 可根据公司code规则和具体业务修改，比如重新登录等
========================================================*/
function handleCodeError(code, data, msg) {
  Dialog.close();
  console.log({ code });
  console.log({ data });
  console.log({ msg });
  // 以下为Demo示例
  if (code === 401) {
    Dialog.alert({
      // message: "请重新登录"
    }).then(() => {
      router.push({ name: "userLogin" });
    });
  } else {
    Toast.fail(msg);
  }
}

/*========================================================
状态码（Status）的错误处理，提示
========================================================*/
const ERROR_MESSAGE = [
  { code: 400, msg: i18n.t("request.errorCodeMsg.e400") },
  { code: 401, msg: i18n.t("request.errorCodeMsg.e401") },
  { code: 403, msg: i18n.t("request.errorCodeMsg.e403") },
  { code: 404, msg: i18n.t("request.errorCodeMsg.e404") },
  { code: 408, msg: i18n.t("request.errorCodeMsg.e408") },
  { code: 500, msg: i18n.t("request.errorCodeMsg.e500") },
  { code: 501, msg: i18n.t("request.errorCodeMsg.e501") },
  { code: 502, msg: i18n.t("request.errorCodeMsg.e502") },
  { code: 503, msg: i18n.t("request.errorCodeMsg.e503") },
  { code: 504, msg: i18n.t("request.errorCodeMsg.e504") },
  { code: 505, msg: i18n.t("request.errorCodeMsg.e505") }
];

/*========================================================
统一处理未知状态码（Status）错误
========================================================*/
function handleUnknownNetworkError(message) {
  let msg;
  if (message === "Network Error") {
    msg = i18n.t("request.unknownNetworkError[0]");
  } else if (message.includes("timeout")) {
    msg = i18n.t("request.unknownNetworkError[1]");
  } else {
    msg = i18n.t("request.unknownNetworkError[2]");
  }
  Toast.fail(msg);
}

/*========================================================
请求拦截
========================================================*/
Axios.interceptors.request.use(
  config => {
    console.log({ config });
    // 取消重复请求
    removeCommonPending(config);
    // 发起请求时保存页面请求
    config.cancelToken = new axios.CancelToken(cancel => {
      store.commit("axios/SET_AXIOS_PROMISE_CANCEL_ARR", {
        u: `${config.url}&${config.method}`,
        f: cancel
      });
    });
    // 加载请求loading
    !config.hideRequestLoading && showLoading();
    // 请求token处理
    const token = store.getters["user/token"];
    if (token && TOKEN_NAME) {
      let requestToken;
      switch (TOKEN_NAME) {
        case "Authorization":
          requestToken = `Bearer ${token}`;
          break;
        default:
          requestToken = token;
      }
      config.headers[TOKEN_NAME] = requestToken;
    }
    // post请求参数序列化
    if (config.headers["Content-Type"] === POST_CONTENT_TYPE) {
      config.data && (config.data = qs.stringify(config.data));
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/*========================================================
响应拦截（后端错误码code处理+网络状态码status处理）
========================================================*/
Axios.interceptors.response.use(
  response => {
    removeCommonPending(response.config);
    // status为200,返回数据处理
    hiddenLoading();
    const { code, data, msg } = response.data;
    const nCode = Number(code);
    if (nCode === 0 || nCode === 200) {
      return data;
    } else {
      handleCodeError(nCode, data, msg);
      return Promise.reject(msg);
    }
  },
  error => {
    // 终结promise链
    if (Axios.isCancel(error)) {
      return new Promise(() => {});
    }
    // 请求所得到的响应的状态码超出了2xx | 请求完全得不到响应
    hiddenLoading();
    if (error.response) {
      const { status } = error.response;
      const msg = ERROR_MESSAGE.find(e => e.code === status).msg || "";
      msg ? Toast.fail(msg) : handleUnknownNetworkError(error.message, status);
    } else {
      handleUnknownNetworkError(error.message);
    }
    return Promise.reject(error);
  }
);

/*========================================================
定义请求方法（基本配置+自定义配置）
* 允许自定义配置覆盖基本配置
========================================================*/
const request = params => {
  const { url, method, data, hideRequestLoading, headers, ...config } = params;
  const options = {
    url: config.url || url,
    method: config.method || method,
    [(config.method && config.method.toLowerCase()) ||
    method.toLowerCase() === "get"
      ? "params"
      : "data"]: data,
    hideRequestLoading: config.hideRequestLoading || hideRequestLoading,
    headers: config.headers || headers,
    ...config
  };
  return new Promise((resolve, reject) => {
    Axios(options)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default request;

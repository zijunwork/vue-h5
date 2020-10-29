/*
 * @Overview:   微信分享SDK封装
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/8/3 10:35
 * @Mark:       //
 */

import wx from "weixin-js-sdk";
import commonApi from "../api/modules/common";
import { IS_IOS } from "../utils/validate";

// 后端返回的微信配置字段名称
const WX_CONFIG_NAME = "wx_config";

// 设置默认的分享信息
const DEFAULT_SHARE_DATA = {
  title: "默认标题",
  desc: "默认描述",
  link: location.href,
  imgUrl: "/public/icons/android-chrome-192x192.png",
  success: () => {
    console.log("分享成功");
  },
  cancel: () => {
    console.log("分享取消");
  }
};

const DEFAULT_API_LIST = [
  "onMenuShareTimeline",
  "onMenuShareAppMessage",
  "updateAppMessageShareData",
  "updateTimelineShareData",
  "hideMenuItems",
  "showMenuItems",
  "closeWindow",
  "hideOptionMenu",
  "showOptionMenu",
  "hideAllNonBaseMenuItem",
  "showAllNonBaseMenuItem"
];

// 默认分享需要隐藏的平台
const DEFAULT_HIDE_MENU = [
  "menuItem:share:qq",
  "menuItem:share:weiboApp",
  "menuItem:share:facebook",
  "menuItem:share:QZone"
];

// 默认分享的平台
const DEFAULT_SHOW_MENU = [
  "menuItem:share:appMessage",
  "menuItem:share:timeline",
  "menuItem:favorite"
];

const wxShare = (shareData = DEFAULT_SHARE_DATA, options) => {
  // 兼容ios和android微信分享
  // IOS：每次切换路由，SPA的url是不会变的，发起签名请求的url参数必须是当前页面的url(就是最初进入页面时的url)
  // Android：每次切换路由，SPA的url是会变的，发起签名请求的url参数必须是当前页面的url(不是最初进入页面时的)
  const url = IS_IOS
    ? localStorage.getItem("firstHref")
    : location.href.split("#")[0];
  // 先获取localStorage中的微信配置，如果没有，再接口获取
  const WX_CONFIG = localStorage.wxConfig && JSON.parse(localStorage.wxConfig);
  if (WX_CONFIG && WX_CONFIG.url === url) {
    handleWXShare(WX_CONFIG);
  } else {
    commonApi
      .getWXConfig({ url })
      .then(res => {
        localStorage.setItem("wxConfig", JSON.stringify(res[WX_CONFIG_NAME]));
        handleWXShare(WX_CONFIG);
      })
      .catch(err => {
        console.log({ err });
      });
  }

  function handleWXShare(config) {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: DEFAULT_API_LIST
    });

    wx.ready(() => {
      if (options && options.hideMenu) {
        wx.hideOptionMenu();
      } else if (options && options.showMenu) {
        wx.showOptionMenu();
      }

      wx.showMenuItems({
        menuList: (options && options.showItems) || DEFAULT_SHOW_MENU
      });
      wx.hideMenuItems({
        menuList: (options && options.hideItems) || DEFAULT_HIDE_MENU
      });

      const data = {
        title: shareData.title || DEFAULT_SHARE_DATA.title,
        desc: shareData.desc || DEFAULT_SHARE_DATA.desc,
        link: shareData.link || DEFAULT_SHARE_DATA.link,
        imgUrl: shareData.imgUrl || DEFAULT_SHARE_DATA.imgUrl,
        success: function() {
          setTimeout(() => {
            shareData.success() || DEFAULT_SHARE_DATA.success();
          }, 500);
        },
        cancel: shareData.cancel || DEFAULT_SHARE_DATA.cancel
      };

      wx.onMenuShareTimeline(data);
      wx.onMenuShareAppMessage(data);
    });

    wx.error(err => {
      console.log(`分享失败: ${err}`);
    });
  }
};

export default wxShare;

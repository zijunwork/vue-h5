/*
 * @Overview:   configs
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/8 16:11
 * @Mark:       //
 */

const [
  SET_TRANS_DIRECTION,
  SET_OPEN_PAGE_TRANS,
  SET_OPEN_VCONSOLE,
  SET_FIXED_NAV_BAR,
  SET_LANG
] = [
  "SET_TRANS_DIRECTION",
  "SET_OPEN_PAGE_TRANS",
  "SET_OPEN_VCONSOLE",
  "SET_FIXED_NAV_BAR",
  "SET_LANG"
];
import defaultSettings from "../../settings";

const getTransDirection = () => {
  let res = "";
  switch (defaultSettings.transDirection) {
    case "slide":
      res = "slide-left";
      break;
    case "fade":
      res = "fade";
      break;
    default:
      res = "slide-left";
  }
  return res;
};

const setLocalData = (attribute, value) => {
  let localData = JSON.parse(localStorage.getItem("settingsData") || {});
  localData[attribute] = value;
  localStorage.setItem("settingsData", JSON.stringify(localData));
};

export default {
  namespaced: true,

  state: {
    openPageTrans: null,
    transDirection: "",
    openVConsole: null,
    fixedNavBar: null,
    lang: ""
  },

  mutations: {
    [SET_OPEN_PAGE_TRANS](state, value) {
      state.openPageTrans = value;
      setLocalData("openPageTrans", value);
    },
    [SET_TRANS_DIRECTION](state, direction) {
      state.transDirection = direction;
      setLocalData("transDirection", direction);
    },
    [SET_OPEN_VCONSOLE](state, value) {
      state.openVConsole = value;
      setLocalData("openVConsole", value);
    },
    [SET_FIXED_NAV_BAR](state, value) {
      state.fixedNavBar = value;
      setLocalData("fixedNavBar", value);
    },
    [SET_LANG](state, value) {
      state.lang = value;
      setLocalData("lang", value);
    }
  },

  actions: {},

  getters: {
    openPageTrans(state) {
      if (typeof state.openPageTrans === "boolean") {
        return state.openPageTrans;
      } else {
        const localOpenPageTrans =
          localStorage.getItem("settingsData") &&
          JSON.parse(localStorage.getItem("settingsData")).openPageTrans;
        if (typeof localOpenPageTrans === "boolean") {
          return localOpenPageTrans;
        } else {
          return defaultSettings.openPageTrans;
        }
      }
    },
    transDirection(state) {
      return (
        state.transDirection ||
        (localStorage.getItem("settingsData") &&
          JSON.parse(localStorage.getItem("settingsData")).transDirection) ||
        getTransDirection()
      );
    },
    openVConsole(state) {
      if (typeof state.openVConsole === "boolean") {
        return state.openVConsole;
      } else {
        const localOpenVConsole =
          localStorage.getItem("settingsData") &&
          JSON.parse(localStorage.getItem("settingsData")).openVConsole;
        if (typeof localOpenVConsole === "boolean") {
          return localOpenVConsole;
        } else {
          return defaultSettings.openVConsole;
        }
      }
    },
    fixedNavBar(state) {
      if (typeof state.fixedNavBar === "boolean") {
        return state.fixedNavBar;
      } else {
        const localFixedNavBar =
          localStorage.getItem("settingsData") &&
          JSON.parse(localStorage.getItem("settingsData")).fixedNavBar;
        if (typeof localFixedNavBar === "boolean") {
          return localFixedNavBar;
        } else {
          return defaultSettings.fixedNavBar;
        }
      }
    },
    lang(state) {
      return (
        state.lang ||
        (localStorage.getItem("settingsData") &&
          JSON.parse(localStorage.getItem("settingsData")).lang) ||
        defaultSettings.lang ||
        "zh-CN"
      );
    }
  }
};

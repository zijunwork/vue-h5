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
  SET_FIXED_NAV_BAR
] = [
  "SET_TRANS_DIRECTION",
  "SET_OPEN_PAGE_TRANS",
  "SET_OPEN_VCONSOLE",
  "SET_FIXED_NAV_BAR"
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
      break;
  }
  return res;
};
const setLocalData = () => {
  localStorage.setItem("settingsData", JSON.stringify(defaultSettings));
};

export default {
  namespaced: true,

  state: {
    openPageTrans: null,
    transDirection: "",
    openVConsole: null,
    fixedNavBar: null
  },

  mutations: {
    [SET_OPEN_PAGE_TRANS](state, value) {
      state.openPageTrans = value;
      defaultSettings.openPageTrans = value;
      setLocalData();
    },
    [SET_TRANS_DIRECTION](state, direction) {
      state.transDirection = direction;
      defaultSettings.transDirection = direction;
      setLocalData();
    },
    [SET_OPEN_VCONSOLE](state, value) {
      state.openVConsole = value;
      defaultSettings.openVConsole = value;
      setLocalData();
    },
    [SET_FIXED_NAV_BAR](state, value) {
      state.fixedNavBar = value;
      defaultSettings.fixedNavBar = value;
      setLocalData();
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
    }
  }
};

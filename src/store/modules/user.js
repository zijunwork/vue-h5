/*
 * @Overview:   user
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/27 15:46
 * @Mark:       //
 */

const [SET_TOKEN, LOGOUT, SET_USER_INFO] = [
  "SET_TOKEN",
  "LOGOUT",
  "SET_USER_INFO"
];

export default {
  namespaced: true,

  state: {
    userInfo: null,
    token: null
  },

  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    [SET_USER_INFO](state, info = {}) {
      state.userInfo = info;
      localStorage.setItem("userInfo", JSON.stringify(info));
    },
    [LOGOUT](state) {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    }
  },

  actions: {
    async loginSaveAsync({ commit }, { token, info }) {
      commit("SET_TOKEN", token);
      commit("SET_USER_INFO", info);
    },
    async logoutSaveAsync({ commit }) {
      commit("LOGOUT");
    }
  },

  getters: {
    userInfo(state) {
      return (
        state.userInfo || JSON.parse(localStorage.getItem("userInfo") || null)
      );
    },
    token(state) {
      return state.token || JSON.parse(localStorage.getItem("token") || null);
    }
  }
};

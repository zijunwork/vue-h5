/*
 * @Overview:   axios
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/29 9:42
 * @Mark:       //
 */

const [
  SET_AXIOS_PROMISE_CANCEL_ARR,
  CLEAR_AXIOS_PROMISE_CANCEL_ARR,
  CLEAR_COMMON_AXIOS_PROMISE_CANCEL
] = [
  "SET_AXIOS_PROMISE_CANCEL_ARR",
  "CLEAR_AXIOS_PROMISE_CANCEL_ARR",
  "CLEAR_COMMON_AXIOS_PROMISE_CANCEL"
];

export default {
  namespaced: true,

  state: {
    axiosPromiseCancel: []
  },

  mutations: {
    [SET_AXIOS_PROMISE_CANCEL_ARR](state, cancel) {
      state.axiosPromiseCancel.push(cancel);
    },
    [CLEAR_AXIOS_PROMISE_CANCEL_ARR](state) {
      if (state.axiosPromiseCancel.length !== 0) {
        state.axiosPromiseCancel.forEach(item => {
          item && item.f();
        });
        state.axiosPromiseCancel = [];
      }
    },
    [CLEAR_COMMON_AXIOS_PROMISE_CANCEL](state, index) {
      state.axiosPromiseCancel[index].f();
      state.axiosPromiseCancel.splice(index, 1);
    }
  },

  actions: {},

  getters: {
    axiosPromiseCancel(state) {
      return state.axiosPromiseCancel;
    }
  }
};

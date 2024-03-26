// initial state: 存储的用户状态信息
// actions，用于执行支持异步操作，并调用 mutation 对状态进行更改
// mutations，定义方法用于对状态变量进行增删改 (尽可能保持同步)
// 外层可以传递参数以改变内部状态
import { StoreOptions } from "vuex";
import AUTH_ENUM from "@/auth/authEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "Please Login",
      userRole: AUTH_ENUM.NOT_LOGIN,
    },
  }),

  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 后期加入远程登录
      commit("updateUser", payload);
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;

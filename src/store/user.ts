// initial state: 存储的用户状态信息
// actions，用于执行支持异步操作，并调用 mutation 对状态进行更改
// mutations，定义方法用于对状态变量进行增删改 (尽可能保持同步)
// 外层可以传递参数以改变内部状态
import { StoreOptions } from "vuex";
import AUTH_ENUM from "@/auth/authEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "Please Login",
    },
  }),

  actions: {
    async getLoginUser({ commit, state }, payload) {
      const result = await UserControllerService.getLoginUserUsingGet();
      // 通过远程后端获得登录信息
      // 返回状态码正常
      if (result.code === 0) {
        commit("updateUser", result.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AUTH_ENUM.NOT_LOGIN,
        });
      }
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;

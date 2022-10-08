import { logout } from "@/apis/user";
import { Message } from "element-ui";
export default {
  state: {
    isLogin: false,
    userInfo: null,
    userMenus: null, // 用户路由菜单
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getUserMenus(state) {
      return state.userMenus;
    },
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload;
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload;
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload;
    },
  },
  // 异步的行为放在action里面
  actions: {
    async doLogout({ commit, dispatch }, payload) {
      let [res, err] = await logout();
      if (err) {
        return Message.error("退出失败！！！");
      }
      // 如果是异步action,也可以使用await
      commit("changeIsLogin", false);
      commit("changeUserInfo", null);
      commit("changeUserMenus", null);
      // 清空本地存储
      window.sessionStorage.setItem("token", "");
    },
  },
};

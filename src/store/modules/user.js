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
};

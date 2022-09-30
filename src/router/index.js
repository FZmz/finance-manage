import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { whiteUrlList } from "@/config/conf";
import { checkLogin } from "@/utils";
import store from "@/store";
import Axios from "axios";
import { pretty } from "@/utils/request";
import Layout from "@/layouts/Layout";
Vue.use(VueRouter);
// 先存储默认底层的push
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  // this:路由实例对象

  // 判断用户有没有传后面两个可选参数
  if (resolve || reject) {
    return originPush.call(this, location, resolve, reject);
  } else {
    // 用户只传了第一个参数
    /* 
    默认底层： catch()方法代码  throw err : 抛出异常
    吞掉报错原理： 重写catch()方法,把默认底层的 throw err给去掉，就不会抛出异常
    */
    return originPush.call(this, location).catch((err) => {
      //  throw err
    });
  }
};
const constantRouter = [
  //实时加载
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    // 懒加载
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes: constantRouter,
});
function asyncRoutesHandler(routes) {
  return routes.map(r => {
    if (r.component === 'Layout') {
      r.component = Layout;
    } else {
      const filePath = r.component;
      r.component = () => import(`../views/${filePath}.vue`)
    }
    if (r.children) {
      r.children = asyncRoutesHandler(r.children);
    }
    return r;
  })


}
async function loadMenus(next, to) {
  let [res, err] = await pretty(Axios.get('http://localhost:8080/menus.json', {
    responseType: 'json'
  }));
  if (err) {
    throw new Error('加载动态菜单出错' + err.message);
  }
  let asyncRoutes = asyncRoutesHandler(res.data);

  // router.addRoutes(asyncRoutes); // 这个方法废弃了

  asyncRoutes.forEach(r => {
    router.addRoute(r);
  })
  // 保存用户菜单 => 生成左侧动态菜单栏
  store.commit('user/changeUserMenus', res.data); // 不需要存储组件函数,基本的一些描述字符串即可
  next({ ...to, replace: true }); // 替换当前访问的路径,不会有多余上一页的箭头

}

router.beforeEach((to, from, next) => {
  // 1. login/register 需要验证吗?  => 白名单  放行
  if (whiteUrlList.includes(to.path)) {
    return next();
  }
  let userInfo = checkLogin();
  if (userInfo) {
    // 判断是否是刷新  vuex东西就没了
    // vuex内用户数据是否存在
    if (!store.getters["user/getUserInfo"]) {
      store.commit("user/changeUserInfo", {
        username: userInfo.account,
      });
      store.commit("user/changeIsLogin", true);
      console.log(store.getters["user/getIsLogin"]);
    }

    // 刷新导致路由没有了 动态菜单
    if (!store.getters["user/getUserMenus"]) {
      // 没有路由给你看, 加载路由
      return loadMenus(next, to);
    } else {
      return next(); // 有菜单
    }
    // 2. 非白名单 =>  2.1 是否登录 => 如果登录了 => 2.2token中解码获取\
    // 2.3 登录了, 角色菜单有没有????(动态路由)
  } else {
    // 3. 如果没有登录 => 去login登录    http://localhost:8080/list?id=1
    next("/login?redirect=" + to.path);
  }
});
export default router;

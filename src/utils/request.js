import router from "@/router";
import axios from "axios";
import { Loading, Message, Notification } from "element-ui";
export const req = axios.create({
  baseURL: "/api",
});
let loadingInstance;
// 原本是实例request.interceptors,但是由于menus的特殊性，不能进拦截器，处理603
// 所以，选择使用全局拦截器... 实际开发，不会有这个问题 menus 和 其他接口是在一起的
req.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("token");
    loadingInstance = Loading.service({ fullscreen: true });
    if (token) {
      // 挂载到请求头中
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    // 针对系统异常的处理 也可以做错误日志收集
    return Promise.reject(err);
  }
);
req.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      loadingInstance.close();
    }, 1000);
    // 保存token
    const token = response?.data?.data?.token;
    if (token) {
      window.sessionStorage.setItem("token", token);
    }
    // 603 代表token失效 跳转到权限不足页面
    if (response?.data?.code === 603) {
      //token失效
      Notification.error({
        title: "错误",
        message: "token失效,请重新登录",
      });
      // 替换到401页面
      router.replace("/401");
    }
    return response;
  },
  (err) => {
    Message.error(err.Message);
    // 针对系统异常的处理 也可以做错误日志收集
    return Promise.reject(err);
  }
);

export const pretty = function (promise) {
  return promise
    .then((data) => {
      return [data, undefined];
    })
    .catch((err) => {
      return [undefined, err];
    });
};

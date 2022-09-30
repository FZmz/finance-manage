import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/normalize.css';
import Axios from 'axios';
// 和代理做标识的对应，baseUrl
Axios.defaults.baseURL = '/api'
Vue.prototype.$ajax = Axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

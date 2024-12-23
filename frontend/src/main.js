/*
 * @Author: 吴伟 15711376175@163.com
 * @Date: 2024-12-02 15:23:46
 * @LastEditors: 吴伟 15711376175@163.com
 * @LastEditTime: 2024-12-24 00:48:13
 * @FilePath: /12-19-1（33）/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/reset.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import './mock'
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 配置axios
axios.defaults.timeout = 5000; // 超时时间
axios.defaults.baseURL = ''; // 如果有基础URL可以在这里配置

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          router.push('/login');
          break;
        default:
          ElementUI.Message.error('网络错误');
      }
    }
    return Promise.reject(error);
  }
);

// 全局注册axios
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

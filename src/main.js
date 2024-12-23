
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

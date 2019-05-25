import Vue from 'vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';

// 主入口
import App from './App';

// 样式引入
import './styles/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import './assets/css/global.css'
import './assets/css/iconfont.css'
import axios from 'axios'
import * as echarts from 'echarts'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 请求基准路径的配置
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到原型
Vue.prototype.$axios = axios

//将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

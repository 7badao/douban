import Vue from 'vue'
import App from './App'
// 导入封装的promise
import request from '@/utils/utils'
Vue.prototype.$request = request

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

import Vue from 'vue'
import App from './App'
import api from './api/'
import global from './components/global'
import store from './pages/counter/store'

Vue.prototype.api = api
Vue.prototype.global = global
Vue.prototype.store = store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

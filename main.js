import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import '@/static/fonts/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store: store
})
app.$mount()

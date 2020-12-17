import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		carts: uni.getStorageSync('carts') || []
	},
	mutations: {
		addToCarts(state, good) {
			var currentGood = state.carts.find(item => {
				if (item.alias == good.alias) {
					return item;
				}
			})
			if (currentGood) {
				currentGood.buynum += good.buynum
			} else {
				state.carts.push(good)
			}
			uni.setStorageSync('carts', state.carts)
		},
		changeCarts(state, newgood) {
			var currentGood = state.carts.find(item => {
				if (item.alias == newgood.alias) {
					return item;
				}
			})
			if (currentGood) {
				currentGood.buynum = newgood.buynum
			} else {
				state.carts.push(newgood)
			}
			uni.setStorageSync('carts', state.carts)
		},
		insteadcarts(state, payload) {
			uni.setStorageSync('carts', state.carts)
			console.log("保存成功")
		}
	},
	actions: {}
})
export default store

<template>
	<view>
		<view class="empty" v-show="show">
			<image src="../../static/icon/cart.png" class="empty_bg"></image>
			<text class="none">购物车还是空的</text>
			<text class="go">赶紧买点宝贝慰劳下自己吧</text>
			<input type="button" value="去逛逛" @click="gofirst" />
		</view>

		<view class="shop" v-for="(item,index) in carts" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item>
					<checkbox class="check" ref="checkbox" functionType="page" :checked="pageChecked" @pageClick="changeBoxFromPage(index)"></checkbox>
					<view class="carts">
						<text class=" title" @click="itemClick(index)">{{item.title}}</text>
						<text class="price" @click="itemClick(index)">￥{{item.sellprice}}</text>
						<image :src="item.img" class="pic" @click="itemClick(index)"></image>
						<view class="change">
							<text class="less" @click="reduce(index)">-</text>
							<text class="num">{{item.buynum}}</text>
							<text class="more" @click="plus(index)">+</text>
						</view>
					</view>
					<template v-slot:right>
						<view class="slot-button"><text class="slot-button-text" @click="swipeClick(index)">删除</text></view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>

		</view>
		<view>
			<goodlist :goods="goods"></goodlist>
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view v-if="flag" class="account">
			<view class="left">
				<checkbox class="checkall" ref="checkboxall" functionType="page" :checked="pageChecked" @pageClick="changeBoxall"></checkbox>
				<text class="all">全选</text>
			</view>
			<text class="and">合计：￥{{sellprice}}</text>
			<input type="button" value="结算" class="jiesuan" />
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue"
	import goodlist from "@/components/goodslist/goodslist.vue"
	import checkbox from "@/components/checkbox/checkbox.vue"
	import uniLoadMore from "@/components/uni-ui/uni-load-more/uni-load-more.vue"
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		myRequestGet
	} from "@/utils/zgrequest.js"
	export default {
		data() {
			return {
				pageChecked: false,
				show: "",
				good: {},
				goods: [],
				newgood: {},
				checkedList: [],
				flag: false,
				alias: "",
				account: 0,
				n: "",
				p: "",
				pageindex: 1,
				num: "",
				img: "",
				newcarts: [],
				tags: [
					"63qeicqw",
					"p8s449xh",
					"8rtak5n5",
					"n56z1hy61",
					"481x6cbp",
					"3bxno8e61",
					"04yblbhe1",
					"qnp9b1k3",
					"jdmsmq861",
					"rwablbw3",
					"c7lu9fz3",
					"jg2dsyjl",
					"2tnrf49a",
					"0hrft5ym"
				],
				randomnum: "",
				buynum: [],
				sellprice: 0
			}
		},
		methods: {
			...mapMutations({
				addToCarts: "addToCarts",
				changeCarts: "changeCarts",
				insteadcarts: "insteadcarts"
			}),
			gofirst() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			itemClick(index) {
				uni.navigateTo({
					url: "/pages/detail/detail?alias=" + this.carts[index].alias + "&price=" + this.carts[index].sellprice
				})
			},
			swipeClick(index) {
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: res => {
						this.sellprice -= this.carts[index].sellprice * this.carts[index].buynum
						if (res.confirm) {
							this.carts.splice(index, 1);
							console.log(this.sellprice)
							this.insteadcarts({
								step: index
							})
							if (this.carts.length == 0) {
								this.show = true
							}




						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			changeBoxFromPage(index) {
				if (this.$refs.checkbox[index].checked) {
					var price = this.carts[index].sellprice * this.carts[index].buynum
					this.sellprice -= price
					console.log(this.sellprice, '11111111111')
				} else {
					var price = this.carts[index].sellprice * this.carts[index].buynum
					this.sellprice += price
					console.log(this.sellprice, '2222222222')
				}
				if (this.$refs.checkbox[index].checked) {
					this.$refs.checkbox[index].checked = this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						if (this.$refs.checkbox[i].checked) {
							this.flag = true
							this.$refs.checkboxall.checked = false
							break
						} else {
							this.flag = false
						}
					}

				} else {
					this.$refs.checkbox[index].checked = !this.pageChecked





					this.flag = true
					if (this.carts.length == 1) {
						this.$refs.checkboxall.checked = !this.pageChecked
					}
					for (var i = 0; i < this.carts.length; i++) {
						if (!this.$refs.checkbox[i].checked) {
							this.$refs.checkboxall.checked = false
							break
						} else {
							this.$refs.checkboxall.checked = true
						}
					}
				}
			},
			changeBoxall() {
				if (!this.$refs.checkboxall.checked) {
					this.$refs.checkboxall.checked = !this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						this.$refs.checkbox[i].checked = true
						this.sellprice += this.carts[i].sellprice * this.carts[i].buynum
					}

				} else {
					this.$refs.checkboxall.checked = this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						this.$refs.checkbox[i].checked = false
					}
					this.sellprice = 0
					this.flag = false

				}

			},
			reduce(index) {
				if (this.carts[index].buynum === 0) {
					uni.showToast({
						title: "数量已为空！",
						duration: 2000
					})
				} else {
					this.num = this.carts[index].buynum - 1
					var good = {
						alias: this.carts[index].alias,
						sellprice: this.carts[index].sellprice,
						buynum: this.num,
						title: this.carts[index].title,
						img: this.carts[index].img
					}
					this.carts[index] = { ...good
					}
					var newgood = { ...this.carts[index]
					}
					this.changeCarts(newgood, index)
				}
				console.log(newgood, "99999999999999999999999999999")
				if (this.$refs.checkbox[index].checked) {
					this.sellprice = this.sellprice - parseInt(this.carts[index].sellprice)
					console.log(this.sellprice)
				}
			},
			plus(index) {
				this.num = this.carts[index].buynum + 1
				var good = {
					alias: this.carts[index].alias,
					sellprice: this.carts[index].sellprice,
					buynum: this.num,
					title: this.carts[index].title,
					img: this.carts[index].img
				}
				this.carts[index] = { ...good
				}
				var newgood = { ...this.carts[index]
				}
				this.changeCarts(newgood, index)
				console.log(newgood, "zzzzzzzzzzzzzzzzzzzzzzz")
				// console.log(this.carts[index])
				if (this.$refs.checkbox[index].checked) {
					this.sellprice = this.sellprice + parseInt(this.carts[index].sellprice)
					console.log(this.sellprice)
				}

			},
			async getProducts() {
				var randomnum = parseInt(Math.random() * 14)
				console.log(randomnum, "nnnnnnnnnnnnnnnnnnnnnn")
				let result = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?kdt_id=10056586&alias=" + this.tags[randomnum])
				console.log(result, "rrrrrrrrrrrrrr")
				if (result.code === 0) {
					this.goods = [...this.goods, ...result.data.list];
				}
				console.log(this.goods, 'xxxxxxxxxxxxxxxxxxxxxxxxx')
			},
			async judge() {
				if (this.carts.length == 0) {
					this.show = true
				} else {
					this.show = false
				}

			}
		},
		computed: {
			...mapState({
				carts: "carts"
			})
		},
		onShow() {
			this.judge()
		},
		onLoad() {
			this.getProducts()
			// this.judge()
			// console.log(this.carts[0].checked,"aaaaaaaaaaaaa")
		},
		onReachBottom() {
			this.pageindex++;
			if (this.pageindex <= 3) {
				this.getProducts();
			} else {
				//没有更多数据了
				this.flag = true;
			}
		},
		mounted() {

		},
		components: {
			checkbox,
			goodlist,
			uniLoadMore,
			uniSwipeAction,
			uniSwipeActionItem
		}
	}
</script>

<style lang="scss" scoped>
	.empty {
		width: 100%;
		height: 620rpx;
		position: relative;

		.empty_bg {
			width: 120px;
			height: 120px;
			position: absolute;
			left: 50%;
			margin-left: -60px;
			top: 100px;
		}

		.none {
			color: grey;
			font-size: 17px;
			position: absolute;
			top: 240px;
			width: 120px;
			left: 50%;
			margin-left: -60px;
		}

		.go {
			color: grey;
			width: 192px;
			left: 50%;
			position: absolute;
			margin-left: -96px;
			top: 270px;
		}

		input {
			border-radius: 10px;
			border: 1px solid #76A28C;
			color: #76A28C;
			text-align: center;
			height: 40px;
			line-height: 40px;
			position: absolute;
			width: 100px !important;
			top: 310px !important;
			left: 50% !important;
			margin-left: -50px !important;
		}
	}

	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}

	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}



	.account {
		width: 750rpx;
		height: 140rpx;
		position: fixed;
		bottom: 0;
		background-color: yellow;
		display: flex;

		.left {
			width: 180rpx;
			height: 140rpx;
			position: absolute;
			left: 0;
		}

		.checkall {
			width: 44rpx;
			height: 44rpx;
			position: absolute;
			left: 20rpx;
			top: 50%;
			margin-top: -22rpx;
		}

		.all {
			width: 80rpx;
			line-height: 140rpx;
			position: absolute;
			left: 90rpx;
			font-size: 40rpx;
		}

		.and {
			font-weight: bold;
			font-size: 40rpx;
			position: absolute;
			bottom: 44rpx;
			right: 200rpx;
			flex: 1;
		}


		.jiesuan {
			width: 180rpx;
			height: 140rpx;
			position: absolute;
			right: 0;
			bottom: 0;
			line-height: 140rpx;
			font-size: 40rpx;
			color: red;
			background-color: black;
			text-align: center;
		}
	}

	.shop {
		width: 750rpx;
		height: 240rpx;
		position: relative;

		.check {
			width: 44rpx;
			height: 44rpx;
			position: absolute;
			left: 10rpx;
			top: 50%;
			margin-top: -22rpx;
		}

		.carts {
			width: 680rpx;
			height: 200rpx;
			position: relative;
			margin: 40rpx 70rpx 0;
			border-bottom: 1px solid grey;

			.change {
				width: 170rpx;
				height: 42rpx;
				position: absolute;
				bottom: 22rpx;
				right: 15rpx;
				display: flex;

				.num {
					flex: 1;
					text-align: center;
					line-height: 42rpx;
				}

				.less {
					width: 42rpx;
					heihgt: 42rpx;
					background-color: rgb(229, 229, 231);
					position: absolute;
					bottom: 0;
					left: 0;
					text-align: center;
					line-height: 42rpx;
				}

				.more {
					width: 42rpx;
					heihgt: 42rpx;
					background-color: rgb(229, 229, 231);
					position: absolute;
					bottom: 0;
					right: 0;
					text-align: center;
					line-height: 42rpx;
				}
			}



			.title {
				font-size: 28rpx;
				position: absolute;
				top: 0;
				left: 212rpx;
				width: 420rpx;
			}

			.price {
				color: green;
				font-size: 34rpx;
				position: absolute;
				bottom: 22rpx;
				left: 212rpx;
			}

			.pic {
				width: 180rpx;
				height: 180rpx;
				position: absolute;
				top: 0;
				left: 0;
			}


		}
	}
</style>

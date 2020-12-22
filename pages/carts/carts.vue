<template>
	<view>
		<view class="empty" v-show="show">
			<image src="../../static/icon/cart.png" class="empty_bg"></image>
			<text class="none">购物车还是空的</text>
			<text class="go">赶紧买点宝贝慰劳下自己吧</text>
			<button @click="gofirst">去逛逛</button>
		</view>
		<view class="manage" v-if="manageflag">
			<view class="manage_left">
				<image class="manage_img" src="https://img.yzcdn.cn/upload_files/2020/09/22/FmYr_eJgC0TeZ7zIjRvEIj76UkHW.jpg" mode="aspectFill"></image>
				<text>花花万物旗舰店</text>
			</view>
			<text class="manage_right" @click="manage_del">管理</text>
		</view>
		<view class="shop" v-for="(item,index) in carts" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item>
					<checkbox class="check" :checked="carts[index].checked" functionType="page" @click="changeBoxFromPage(item,index)"></checkbox>
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
		<view v-if="delflag" class="account">
			<view class="left">
				<text class="all" :class="checkall?'checkall2':'checkall'" functionType="page" @pageClick="changeBoxall">全选</text>
			</view>
			<button class="jiesuan" @click="deletecheck">删除</button>
		</view>
		<view v-if="accountflag" class="account">
			<view class="left">
				<!-- <checkbox class="checkall" functionType="page"  @pageClick="changeBoxall"></checkbox> -->
				<text :class="checkall?'checkall2':'checkall'" functionType="page" @click="changeBoxall">全选</text>
			</view>
			<text class="and">合计：￥{{account}}</text>
			<button class="jiesuan" @click="gopay">结算</button>
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
				show: "",
				good: {},
				goods: [],
				pageChecked: false,
				delflag: false,
				checkall: false,
				newgood: {},
				flag: false,
				accountflag: false,
				alias: "",
				account: 0,
				manageflag: "",
				accountflag: false,
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
				randomnum: ""
			}
		},
		methods: {
			...mapMutations({
				addToCarts: "addToCarts",
				changeCarts: "changeCarts",
				insteadcarts: "insteadcarts",
				addToShop: "addToShop",
				insteadshop: "insteadshop"
			}),
			manage_del() {
				this.accountflag = false
				this.delflag = true
				this.judgecheck()
				this.changeBoxall()
			},
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

			//#ifdef H5
			changeBoxFromPage(item, index) {
				if (this.carts[index].checked) {
					this.carts[index].checked = false
					this.shop.splice(0, this.shop.length)
					this.insteadshop({
						step: index
					})
					this.checkall = this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						if (this.carts[i].checked) {
							this.accountflag = true
							break
						} else {
							this.accountflag = false
						}
					}
					this.getAccount()
					this.getShoplist()
				} else {
					this.carts[index].checked = true
					this.accountflag = true
					if (this.carts.length == 1) {
						this.accountflag = true
						this.checkall = true
						console.log("全选应该变红,,,,单选触发")
						this.getAccount()
					} else {

						for (var i = 0; i < this.carts.length; i++) {
							if (!this.carts[i].checked) {
								this.checkall = this.pageChecked
								break
							} else {
								this.checkall = !this.pageChecked
							}
						}

					}

				}

				this.getAccount()
				this.getShoplist()
			},
			//#endif
			swipeClick(index) {
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: res => {
						if (res.confirm) {
							if (this.carts[index].checked) {
								for (var i = 0; i < this.carts.length; i++) {
									for (var j = 0; j < this.shop.length; j++) {
										if (this.shop[j].alias == this.carts[i].alias) {
											this.shop.splice(j, 1)
											this.insteadshop({
												step: 0
											})
										}
									}
								}

							}
							this.carts.splice(index, 1)
							this.insteadcarts({
								step: index
							})

							if (this.carts.length.toString() == 0) {
								this.show = true
								this.accountflag = false
								this.manageflag = false
							}
							this.getAccount()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			changeBoxFromPage(item, index) {

				if (this.carts[index].checked) {
					this.carts[index].checked = false
					this.shop.splice(0, this.shop.length)
					this.insteadshop({
						step: index
					})
					this.checkall = this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						if (this.carts[i].checked) {
							this.accountflag = true
							break
						} else {
							this.accountflag = false
						}
					}
					this.getAccount()
					this.getShoplist()
				} else {
					this.carts[index].checked = true
					this.accountflag = true
					if (this.carts.length == 1) {
						this.accountflag = true
						this.checkall = true
						console.log("全选应该变红,,,,单选触发")
						this.getAccount()
					} else {

						for (var i = 0; i < this.carts.length; i++) {
							if (!this.carts[i].checked) {
								this.checkall = this.pageChecked
								break
							} else {
								this.checkall = !this.pageChecked
							}
						}

					}

				}

				this.getAccount()
				this.getShoplist()
			},
			deletecheck() {
				this.getShoplist()
				for (var i = 0; i < this.carts.length; i++) {
					for (var j = 0; j < this.shop.length; j++) {
						if (this.shop[j].alias == this.carts[i].alias) {
							this.carts.splice(i, 1)
							this.insteadcarts({
								step: i
							})
						}
					}
				}
				this.shop.splice(0, this.shop.length)
				this.insteadshop({
					step: 0
				})
				if (this.carts.length == 0) {
					this.show = true
					this.manageflag = false
				}
				this.delflag = false
				this.accountflag = false
				this.judgecheck()
			},

			changeBoxall() {
				if (!this.checkall) {
					this.checkall = !this.pageChecked
					for (var i = 0; i < this.carts.length; i++) {
						this.carts[i].checked = !this.pageChecked
					}
					this.getAccount()
					this.getShoplist()
				} else {
					this.checkall = false
					for (var i = 0; i < this.carts.length; i++) {
						this.carts[i].checked = false
					}
					this.account = 0
					this.accountflag = false
					this.shop.splice(0, this.shop.length)
					this.insteadshop({
						step: 0
					})
				}
			},

			reduce(index) {
				if (this.carts[index].buynum === 1) {
					uni.showToast({
						title: "该宝贝不能减少了呦~",
						duration: 2000,
						icon: "none"
					})
				} else {
					this.num = this.carts[index].buynum - 1
					var good = {
						alias: this.carts[index].alias,
						sellprice: this.carts[index].sellprice,
						buynum: this.num,
						title: this.carts[index].title,
						img: this.carts[index].img,
						checked: this.carts[index].checked
					}
					this.carts[index] = { ...good
					}
					var newgood = { ...this.carts[index]
					}
					this.changeCarts(newgood)
					this.getAccount()
					this.getShoplist()
				}

			},
			plus(index) {
				this.num = this.carts[index].buynum + 1
				var good = {
					alias: this.carts[index].alias,
					sellprice: this.carts[index].sellprice,
					buynum: this.num,
					title: this.carts[index].title,
					img: this.carts[index].img,
					checked: this.carts[index].checked
				}
				this.carts[index] = { ...good
				}
				var newgood = { ...this.carts[index]
				}
				this.changeCarts(newgood)
				this.getAccount()
				this.getShoplist()
			},
			gopay() {
				uni.navigateTo({
					url: "/pages/pay/pay"
				})
			},
			async getProducts() {
				var randomnum = parseInt(Math.random() * 14)
				let result = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?kdt_id=10056586&alias=" + this.tags[randomnum])
				if (result.code === 0) {
					this.goods = [...this.goods, ...result.data.list];
				}
			},
			async judge() {
				if (this.carts.length == 0) {
					this.show = true
					this.manageflag = false
				} else {
					this.show = false
					this.manageflag = true
				}
			},
			async judgecheck() {
				for (var i = 0; i < this.carts.length; i++) {
					if (!this.carts[i].checked) {
						this.checkall = this.pageChecked
						break
					} else {
						this.checkall = !this.pageChecked
					}
				}
			},
			async getAccount() {
				let total = 0
				if (this.carts.length == 1) {
					if (this.carts[0].checked) {
						this.checkall = true
						console.log("全选应该变红，，，，函数触发的")
						total = this.carts[0].sellprice * this.carts[0].buynum
					} else {
						this.checkall = false
						this.accountflag = false
						total = 0
					}
				} else if (this.carts.length > 1) {
					for (var z = 0; z < this.carts.length; z++) {
						if (this.carts[z].checked) {
							total += this.carts[z].sellprice * this.carts[z].buynum
						}
					}
				} else if (this.carts.length == 0) {
					total = 0
				}

				this.account = total
			},


			async getShoplist() {
				if (this.carts.length == 0) {
					this.shop = []
				} else if (this.carts.length > 0) {
					for (var z = 0; z < this.carts.length; z++) {
						if (this.carts[z].checked) {
							var shoplist = {
								alias: this.carts[z].alias,
								sellprice: this.carts[z].sellprice,
								buynum: this.carts[z].buynum,
								title: this.carts[z].title,
								img: this.carts[z].img,
								checked: this.carts[z].checked
							}
							this.addToShop(shoplist)
						}
					}
				}
				console.log(this.shop, "这是要结算的商品")
			}
		},
		computed: {
			...mapState({
				carts: "carts",
				shop: "shop"
			})
		},
		onShow() {
			this.judge()
			this.account = 0
			this.accountflag = false
			this.delflag = false
			this.getProducts()
			this.getShoplist()
			this.shop.splice(0, this.shop.length)
			this.insteadshop({
				step: 0
			})
			for (var i = 0; i < this.carts.length; i++) {
				this.carts[i].checked = false
			}
		},
		onLoad() {
			this.getProducts()
			this.judge()
		},
		onReachBottom() {
			this.pageindex++;
			if (this.pageindex <= 3) {
				this.getProducts();
			} else {
				//没有更多数据了
				this.flag = true
			}
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
	.manage {
		position: relative;
		top: 0;
		width: 750rpx;
		height: 50px;
		overflow: hidden;

		.manage_left {
			float: left;
			top: 0;
			left: 0;

			.manage_img {
				width: 30px;
				height: 30px;
				position: absolute;
				top: 15px;
				left: 15px;
			}

			text {
				line-height: 60px;
				margin-left: 57px;
			}
		}

		.manage_right {
			float: right;
			right: 0;
			top: 0;
			line-height: 60px;
			margin-right: 30px;
			color: orange;
		}
	}

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

		button {
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
			outline: none;
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
		background-color: rgb(255, 250, 232);
		display: flex;
		z-index: 9999999;

		.left {
			width: 180rpx;
			height: 140rpx;
			position: absolute;
			left: 0;
		}

		.checkall2 {
			width: 80rpx;
			height: 44rpx;
			position: absolute;
			left: 20rpx;
			top: 50%;
			margin-top: -22rpx;
			color: red;
		}

		.checkall {
			width: 80rpx;
			height: 44rpx;
			position: absolute;
			left: 20rpx;
			top: 50%;
			margin-top: -22rpx;
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
			color: white;
			background-color: orangered;
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

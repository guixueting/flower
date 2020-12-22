<template>
	<view class="home">
		<scroll-view scroll-y>
			<swiper :autoplay="true" :interval="2000" circular>
				<swiper-item v-for="item in (message.goodsData&&message.goodsData.goods.pictures)" :key="item.id">
					<image :src="item.url" @click="previewImg(item.url)" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="price">
				<view class="flowerPrice">￥{{price}}</view>
				<view class="text">
					<view class="mess">
						{{message.goodsData&&message.goodsData.goods.title}}
					</view>
					<button @click="open" class="share">分享</button>
					<view class="share1">
						<uni-popup ref="popup" type="bottom">
							<view>
								<view>
									<uni-popup-share @select="select"></uni-popup-share>
								</view>
							</view>
						</uni-popup>
					</view>
				</view>
			</view>
			<view class="postPrice">
				<view>运费</view>
				<view>{{message.goodsData&&message.goodsData.delivery.express&&message.goodsData.delivery.express.desc}}</view>
			</view>
			<view class="server">
				<uni-list :border="false">
					<uni-list-item title="服务  收货后结算  线下门店  快递请求" showArrow button clickable="true">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="flower">
				<view class="flowertop">
					<image src="https://img.yzcdn.cn/upload_files/2020/09/22/FmYr_eJgC0TeZ7zIjRvEIj76UkHW.jpg" mode="aspectFill"
					 @click="toIndex"></image>
					<view class="shopName">花花万物</view>
					<view @click="toIndex" class="goIndex">进店逛逛</view>
				</view>
				<view class="flowerbottom">
					<uni-list :border="false">
						<uni-list-item title="线下门店" showArrow></uni-list-item>
					</uni-list>
				</view>
			</view>
			<view class="content">
				<!-- #ifdef MP-WEIXIN|H5 -->
				<rich-text :nodes="content"></rich-text>
				<!-- #endif -->

				<!-- #ifdef MP-ALIPAY -->
				<rich-text :nodes="htmlNodes"></rich-text>
				<!-- #endif -->
			</view>

		</scroll-view>
		<view class="goods_nav">
			<view class="num">
				{{num}}
			</view>
			<uni-goods-nav :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniGoodsNav from '@/components/uni-ui/uni-goods-nav/uni-goods-nav.vue'
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import {
		formatRichText
	} from "@/utils/format.js"
	import parse from '@/utils/htmlparser.js';
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				message: [],
				content: "",
				htmlNodes: "",
				shoplist: {},
				alias: "",
				num: "",
				price: "",
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onShow() {
			if (this.num < 6) {
				this.num = this.carts.length.toString()
			} else {
				this.num = "5+"
			}

			console.log(this.num, "这是购物车长度")
		},
		onLoad(options) {
			this.alias = options.alias
			this.price = options.price
			console.log(this.price)
			this.getmessage()
			this.getcontent()
			if (this.num < 6) {
				this.num = this.carts.length.toString()
			} else {
				this.num = "5+"
			}
		},
		methods: {
			...mapMutations({
				addToCarts: 'addToCarts',
				addToShop: "addToShop",

			}),
			toIndex() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			openPopup() {
				this.$refs.popupp.open()
			},
			open() {
				this.$refs.popup.open()
			},
			async getmessage() {
				let result = await myRequestGet("/wscgoods/weapp/detail.json?alias=" + this.alias)
				this.message = result.data
			},
			async getcontent() {
				let result1 = await myRequestGet("/wscshop/goods/showcase-components.json?alias=" + this.alias +
					"&kdt_id=10056586")
				this.content = formatRichText(result1.data.components[0].content ? result1.data.components[0].content : result1.data
					.components[
						1].content)
				// this.content = formatRichText(result1.data.components[0].content)
				//#ifdef MP-ALIPAY
				this.htmlNodes = parse(this.content)
				//#endif

			},
			previewImg(current) {
				const urls = this.message.goodsData.goods.pictures.map(item => {
					return item.url
				})
				uni.previewImage({
					current,
					urls
				})
			},

			onClick(e) {
				if (e.index == 0) {

					//跳转到店铺
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					//跳转到购物车
					uni.reLaunch({
						url: "/pages/carts/carts"
					})
				}

			},
			buttonClick(e) {
				if (e.index == 0) {
					//加入购物车
					var good = {
						alias: this.alias,
						sellprice: this.price,
						buynum: 1,
						title: this.message.goodsData.goods.title,
						img: this.message.goodsData.goods.pictures[0].url
					}
					this.addToCarts(good)
					if (this.num == 0) {
						this.num = 1
					}
					for (var i = 0; i < this.carts.length; i++) {
						if (this.carts[i].alias == good.alias) {
							console.log("添加的商品已经存在了")
							break
						} else {
							if (this.num < 6) {
								this.num = this.carts.length
							} else {
								this.num = "5+"
								console.log("加太多了显示不完")
							}

						}
					}
					uni.showToast({
						title: "添加成功！",
						duration: 2000
					})
				} else {
					var shoplist = {
						alias: this.alias,
						sellprice: this.price,
						buynum: 1,
						title: this.message.goodsData.goods.title,
						img: this.message.goodsData.goods.pictures[0].url
					}
					this.addToShop(shoplist)
					this.addToCarts(shoplist)
					uni.navigateTo({
						url: "/pages/pay/pay"
					})
				}
			},

			closePopup() {
				this.$refs.popup.close()
			},
			close() {
				this.$refs.popup.close()
			}
		},
		components: {
			uniList,
			uniListItem,
			uniGoodsNav,
			uniPopup,
			uniPopupShare,
			uniPopupMessage,
		},
		computed: {
			...mapState({
				carts: "carts",
				shop: "shop"
			})
		},
	}
</script>

<style lang="scss">
	.home {
		swiper {
			height: 740rpx;

			image {
				width: 750rpx;
				height: 750rpx;
			}
		}

		.price {
			background-color: white;
			padding-top: 20rpx;
			height: 170rpx;

			.flowerPrice {
				font-weight: 600;
				margin-left: 30rpx;
				margin-bottom: 15rpx;
				font-size: 20px;
				color: #65C4AA;
			}

			.text {
				display: flex;
				margin-left: 40rpx;
				font-size: 15px;

				.mess {
					width: 600rpx;
				}

				.share {
					margin-right: -20rpx;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 26rpx;
					text-align: center;
					border-radius: 16rpx;

				}
			}

		}

		.postPrice {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			background-color: white;
			height: 86rpx;
			padding-left: 30rpx;
			margin-top: 20rpx;

			view {
				margin-right: 20rpx;
				font-size: 14px;
			}
		}

		.server {
			margin-top: 20rpx;
		}

		,
		.flower {
			height: 200rpx;
			margin-top: 20rpx;
			background-color: white;

			.flowertop {
				display: flex;
				position: relative;

				image {
					height: 100rpx;
					width: 100rpx;
					margin-top: 40rpx;
					margin-left: 40rpx;
				}

				.shopName {
					margin-top: 70rpx;
					margin-left: 20rpx;
				}

				.goIndex {
					background-color: #ffffff;
					width: 130rpx;
					text-align: center;
					height: 50rpx;
					font-size: 12px;
					border-radius: 10px;
					color: #65c4aa;
					border: 1px solid #65c4aa;
					line-height: 50rpx;
					margin-top: 70rpx;
					position: absolute;
					right: 30rpx;
				}

			}

			.flowerbottom {
				margin-top: 20rpx;
			}

		}

		.content {
			margin-top: 80rpx;
			padding-bottom: 80rpx;
		}

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;

			.num {
				font-weight: bold;
				font-size: 15px;
				z-index: 9999999;
				width: 17px !important;
				height: 17px !important;
				color: red !important;
				position: absolute !important;
				top: 2px !important;
				left: 83px !important;
				text-align: center !important;
				line-height: 15px !important;
			}
		}
	}
</style>

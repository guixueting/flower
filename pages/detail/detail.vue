<template>
	<view class="home">
		<scroll-view scroll-y>
			<swiper :autoplay="true" :interval="2000" circular>
				<swiper-item v-for="item in message.goodsData.goods.pictures" :key="item.id">
					<image :src="item.url" @click="previewImg(item.url)" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="price">
				<view class="flowerPrice">￥{{price}}</view>
				<view class="text">
					<view class="mess">
						{{message.goodsData.goods.title}}
					</view>
					<button @click="open" class="share">分享</button>
					<view class="share1">
						<uni-popup ref="popup" type="center">
							<view style="background-color: rgb(248,248,248);width: 65vh; display: flex; flex-direction:column; text-align: center; height: 29vh; position: absolute; left: -375rpx; bottom: -50vh;">
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">推荐好物</uni-popup-share>
								</view>
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">发送给朋友</uni-popup-share>
								</view>
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">生成海报</uni-popup-share>
								</view>
								<view @click="closePopup" style="background-color: white; height: 7vh;margin-top: 1vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">取消</uni-popup-share>
								</view>
							</view>
						</uni-popup>
					</view>
				</view>
			</view>
			<view class="postPrice">
				<view>运费</view>
				<view>{{message.goodsData.delivery.express.desc}}</view>
			</view>
			<view class="server">
				<uni-list :border="false">
					<uni-list-item title="服务  收货后结算  线下门店  快递请求" showArrow button clickable="true" @click="openPopup">
						<uni-popup ref="popupp" type="center">
							<view style="background-color: rgb(248,248,248);width: 65vh; display: flex; flex-direction:column; text-align: center; height: 29vh; position: absolute; left: -375rpx; bottom: -50vh;">
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">推荐好物</uni-popup-share>
								</view>
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">发送给朋友</uni-popup-share>
								</view>
								<view style="background-color: white; border-bottom: 1px solid rgb(246,246,246); height: 7vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">生成海报</uni-popup-share>
								</view>
								<view style="background-color: white; height: 7vh;margin-top: 1vh; line-height: 7vh; flex: 1;">
									<uni-popup-share @select="select">取消</uni-popup-share>
								</view>
							</view>
						</uni-popup>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="flower">
				<view class="flowertop">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608130768368&di=5df7a20ad66f99bfa2b82d78db904883&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F11%2F20170811002726_eJXmY.thumb.700_0.jpeg"
					 @click="toIndex" mode="scaleToFill"></image>
					<view class="shopName">花花万物</view>
					<button @click="toIndex">进店逛逛</button>
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
			<uni-goods-nav :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
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
				content: {},
				htmlNodes: [],
				alias: "",
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
						color: '#fff',
						info:0
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.alias = options.alias,
				this.price = options.price
			console.log(this.price)
			this.getmessage(),
				this.getcontent()
		},
		methods: {
			...mapMutations({
				addToCarts: 'addToCarts'
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
				this.content = formatRichText(result1.data.components[0].content ? result1.data.components[0].content : result1.data.components[
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
						url: ""
					})
				} else {
					//跳转到购物车
					uni.switchTab({
						url: "/pages/carts/carts"
					})
				}

			},
			buttonClick(e) {
				if (e.index == 0) {
					this.options[1].info++
					     uni.showToast({
					      title: `${e.content.text}成功`,
					      icon: 'success',
					      position:'center'
					     })
					     
					    
					//加入购物车
					var good = {
						alias: this.alias,
						sellprice: this.price,
						buynum: 1,
						title: this.message.goodsData.goods.title,
						img: this.message.goodsData.goods.pictures[0].url
					}
					this.addToCarts(good)
					console.log(good, "gggggggggggg")
				} else {
					uni.showToast({
					 title: '此功能尚未开通',
					 icon: 'loading',
					})
					uni.navigateTo({
						url: ""
					})
				}
				console.log(good.img, "6666666666666666666666666666666")
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
			uniPopupMessage,
			uniPopupDialog
		}
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

				button {
					height: 50rpx;
					font-size: 15px;
					border-radius: 20px;
					color: #B6E3D7;
					border: 1px solid #B6E3D7;
					line-height: 50rpx;
					margin-top: 70rpx;
					margin-right: 20rpx;
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
		}
	}
</style>

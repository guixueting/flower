<template>
	<view class="content">
		<view class="shaddow" v-if="payflag">
			<view class="bg"></view>
			<view class="paymoney">
				<image @click="close" src="@/static/icon/cha.png" mode=""></image>
				<text class="big">￥{{account}}</text>
				<view class="phone">
					<text class="left">支付账号</text>
					<text class="right">182******76</text>
				</view>
				<view>
					<text class="left">付款方式</text>
					<text class="right">余额</text>
				</view>
				<button class="btn" @tap="show = true" type="default">立即付款</button>
				<passkeyborad :show="show" @close="closekey" :account="account"></passkeyborad>
			</view>
		</view>
		<view class="pay">
			<text class="and">合计：￥{{account}}</text>
			<button class="submit" @click="submit">提交订单</button>
		</view>
		<view class="address">
			<image class="icon" src="@/static/icon/address.png"></image>
			<view class="msg">
				<view class="mymsg">
					<text class="name">老于</text>
					<text class="tel">18356454785</text>
				</view>
				<image src="@/static/icon/you.png" @tap="popup_bottom()"></image>
				<text class="place">{{address}}</text>
				<text class="replace">收货不便时，可选择代存服务</text>
			</view>
			<!-- <button class="popup-btn" @tap="popup_bottom()">请选择收货地址</button> -->
			<linkAddress ref="linkAddress" :height="height" @confirmCallback="confirmCallback()">
			</linkAddress>
		</view>
		<view class="shop" v-for="(item,index) in shop" :key="index">
			<view class="carts">
				<text class=" cartstitle">{{item.title}}</text>
				<text class="price">￥{{item.sellprice}}</text>
				<image :src="item.img" class="pic"></image>
				<view class="change">
					<text class="num">x{{item.buynum}}</text>
				</view>
			</view>
			<view class="other">
				<view>
					<text class="left">配送方式</text>
					<text class="right">快递免邮</text>
					<image src="@/static/icon/you.png" mode=""></image>
				</view>
				<view>
					<text class="left">运费险</text>
					<text class="right">卖家赠送</text>
					<image src="@/static/icon/you.png" mode=""></image>
				</view>
				<view>
					<text class="left">开具发票</text>
					<text class="right">本次不开具发票</text>
					<image src="@/static/icon/you.png" mode=""></image>
				</view>
				<view>
					<text class="left">订单备注</text>
					
				</view>
				<view class="account">
					<text class="left1">小计：</text>
					<text class="right1">￥{{item.sellprice*item.buynum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	import linkAddress from '../../components/xuan-linkAddress/xuan-linkAddress.vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			linkAddress,
			passkeyborad
		},
		computed: {
			...mapState({
				shop: "shop"
			})
		},
		data() {
			return {
				height: '500px',
				address: '安徽省合肥市瑶海区',
				payflag: false,
				show: false,
				account: 0
			}
		},

		onShow() {
			this.getaccount()
			console.log(this.shop, "这是支付页面的商品")
		},
		methods: {
			async getaccount() {
				for (var i = 0; i < this.shop.length; i++) {
					this.account += this.shop[i].sellprice * this.shop[i].buynum
				}
			},
			closekey() {
				this.show = false
			},
			close() {
				// this.payflag = false
				uni.showModal({
					title: '提示',
					content: '是否放弃本次付款',
					success: res => {
						if (res.confirm) {
							this.payflag = false
						} else if (res.cancel) {

						}
					}
				});
			},
			submit() {
				this.payflag = true
			},
			//点击弹出弹窗
			popup_bottom: function() {
				this.height = '550rpx';
				//显示
				this.show_popup();

			},
			//显示弹窗
			show_popup: function() {
				this.$refs.linkAddress.show();
			},
			//回掉
			confirmCallback: function() {
				let ads = this.$store.state.user_address;
				this.address = ads.province + ads.city + ads.district;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: rgb(248, 248, 248) !important;
		height: auto !important;
		position: relative;

		&:last-child {
			margin-bottom: 70px;
		}

		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}

		.text-area {
			display: flex;
			justify-content: center;
		}

		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}

		.shaddow {
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 999;

			.bg {
				position: fixed;
				background-color: black;
				width: 100%;
				height: 100%;
				opacity: 0.6;
				z-index: 111;
			}

			.paymoney {
				width: 750rpx;
				height: 845rpx;
				position: fixed;
				background-color: white;
				bottom: 0;
				z-index: 9999;

				image {
					width: 25px;
					height: 25px;
					position: absolute;
					top: 6px;
					left: 6px;
				}

				.big {
					font-size: 35px;
					font-weight: bold;
					width: 200px;
					height: 100px;
					line-height: 100px;
					position: absolute;
					left: 50%;
					width: 200px;
					margin-left: -100px;
					top: 35px;
					text-align: center;
				}

				.phone {
					margin-top: 125px;
				}

				view {
					width: 750rpx;
					height: 80rpx;
					position: relative;

					.left {
						position: absolute;
						left: 15px;
						line-height: 50rpx;
					}

					.right {
						position: absolute;
						right: 25px;
						line-height: 50rpx;

					}
				}

				.btn {
					width: 750rpx;
					color: white;
					height: 100rpx;
					line-height: 100rpx;
					position: absolute;
					text-align: center;
					bottom: 60rpx;
					background-color: blue;
				}

			}

		}

		.pay {
			width: 750rpx;
			height: 140rpx;
			position: fixed;
			bottom: 0;
			background-color: rgb(255, 250, 232);
			z-index: 99;

			.and {
				font-weight: bold;
				font-size: 40rpx;
				position: absolute;
				bottom: 44rpx;
				left: 15px;
			}

			.submit {
				width: 264rpx;
				height: 90rpx;
				position: absolute;
				border-radius: 40px;
				right: 12px;
				bottom: 10px;
				line-height: 90rpx;
				font-size: 40rpx;
				color: white;
				background-color: orangered;
				text-align: center;
			}
		}

		.shop {
			width: 640rpx;
			height: 540rpx;
			position: relative;
			border-radius: 10px;
			background-color: white;
			margin: 10px auto;

			/* #ifdef H5 */
			.other {
				width: 640rpx;
				height: 50rpx;

				.account {
					position: absolute !important;
					margin-top: 15px;
					width: auto !important;
					right: 10px !important;

					.left1 {
						width: 48px;
						line-height: 50rpx;
					}

					.right1 {
						line-height: 50rpx;
						color: red;
						
						input {
							color: grey;
							margin-top:-30px ;
						}
					}
				}

				view {
					width: 640rpx;
					height: 50rpx;
					margin-top: 15rpx;
					position: relative;

					.left {
						position: absolute;
						left: 15px;
						line-height: 50rpx;
					}

					.right {
						position: absolute;
						right: 30px;
						line-height: 50rpx;

						input {
							font-size: 15px;
							color: grey;
						}
					}

					image {
						position: absolute;
						right: 7px;
						top: 4px;
						width: 20px;
						height: 20px;
					}
				}
			}


			/* #endif */
			.other {
				width: 640rpx;
				height: 50rpx;

				.account {
					position: absolute !important;
					width: auto !important;
					right: 10px !important;

					.left1 {
						width: 48px;
						line-height: 50rpx;
					}

					.right1 {
						line-height: 50rpx;
						color: red;
					}
				}

				view {
					width: 640rpx;
					height: 50rpx;
					margin-top: 15rpx;
					position: relative;

					.left {
						position: absolute;
						left: 15px;
						line-height: 50rpx;
					}

					.right {
						position: absolute;
						right: 30px;
						line-height: 50rpx;

						input {
							color: grey;
						}
					}

					image {
						position: absolute;
						right: 7px;
						top: 4px;
						width: 20px;
						height: 20px;
					}
				}
			}

			.carts {
				width: 680rpx;
				height: 200rpx;
				position: relative;
				margin: 30rpx 60rpx 0;

				.change {
					width: 170rpx;
					height: 42rpx;
					position: absolute;
					bottom: 50rpx;
					right: 74rpx;
					display: flex;

					.num {
						flex: 1;
						text-align: center;
						line-height: 42rpx;
					}
				}

				.cartstitle {
					font-size: 28rpx;
					position: absolute;
					top: 12px;
					left: 113rpx;
					width: 470rpx;
				}

				.price {
					font-size: 34rpx;
					position: absolute;
					bottom: 22rpx;
					left: 110rpx;
					bottom: 50rpx;
				}

				.pic {
					width: 120rpx;
					height: 120rpx;
					position: absolute;
					top: 14px;
					left: -16px;
				}


			}
		}

		.address {
			position: absolute;
			top: 10px;
			position: relative !important;
			width: 320px !important;
			height: 110px !important;
			border-radius: 10px !important;
			background-color: white;
			left: 50%;
			margin-left: -160px;
			margin-bottom: 25px;

			.msg {
				width: 270px;
				height: 95px;
				position: absolute;
				left: 55px;
				top: 10px;
				font-size: 13px;

				image {
					width: 25px;
					height: 25px;
					position: absolute;
					right: 15px;
					top: 37px;
				}

				.replace {
					position: absolute;
					bottom: 15px;
					left: 14px;
					color: orangered;
				}

				.mymsg {
					width: 230px;
					position: absolute;
					top: 10px;
					left: 14px;

					.tel {
						margin-left: 15px;
						color: grey;
					}

				}

				.place {
					width: 210px;
					height: 45px;
					position: absolute;
					bottom: 26px;
					left: 14px;
					letter-spacing: 2px;
					line-height: 45px;
				}
			}

			.icon {
				width: 35px !important;
				height: 35px !important;
				position: absolute !important;
				left: 15px !important;
				top: 35px !important;
			}

			.popup-btn {
				color: grey !important;
				width: 200px !important;
				height: 45px !important;
				text-align: center;
				line-height: 45px !important;
				position: absolute;
				top: 30px;
				left: 60px;
			}
		}
	}
</style>

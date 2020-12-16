<template>
	<view class="hot_shop">
		<view class="shop_list">
			<view class="shop_item">
				<swiper indicator-dots :autoplay="true" :interval="2000" circular>
					<swiper-item v-for="item in shops1" :key='item'>
						<image :src="item" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="word1">
					<text class="name">北京府中环店</text>
					<text class="address iconfont">
						&#xe601;中国街999号中环东座
					</text>
					<text class="time iconfont">
						&#xe63b;周一至周日 11:00-22:00
					</text>
				</view>
			</view>
			<view class="shop_item">
				<swiper indicator-dots :autoplay="true" :interval="2000" circular>
					<swiper-item v-for="item in shops2" :key='item'>
						<image :src="item" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="word1">
					<text class="name">太阳店</text>
					<text class="address iconfont">
						&#xe601;朝阳北路666号太阳城
					</text>
					<text class="time iconfont">
						&#xe63b;周一至周日 11:00-22:00
					</text>
				</view>
			</view>
			<view class="shop_item">
				<swiper indicator-dots :autoplay="true" :interval="2000" circular>
					<swiper-item v-for="item in shops3" :key='item'>
						<image :src="item" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="word1">
					<text class="name">中国环贸店</text>
					<text class="address iconfont">
						&#xe601;建国门外大街888号国贸商城中区
					</text>
					<text class="time iconfont">
						&#xe63b;周一至周日 11:00-22:00
					</text>
				</view>
			</view>
			<view class="shop_item">
				<swiper indicator-dots :autoplay="true" :interval="2000" circular>
					<swiper-item v-for="item in shops4" :key='item'>
						<image :src="item" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="word1">
					<text class="name">卓悦店</text>
					<text class="address iconfont">
						&#xe601;深南大道333号One Avenue
					</text>
					<text class="time iconfont">
						&#xe63b;周一至周日 11:00-22:00
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/iconfont/iconfont.css'
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				shops1: [],
				shops2: [],
				shops3: [],
				shops4: [],
			}
		},
		onLoad() {
			this.getShops1();
			this.getShops2();
			this.getShops3();
			this.getShops4();
		},
		methods: {
			async getShops1() {
				const result = await myRequestGet(
					"/wscshop/weapp/feature_detail.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&alias=h2knlXzmCr&show_ad=true&check_multistore=true&check_chainstore=true&async_components=goods%2Cump_limitdiscount&adaptor_components=text%2Ctitle%2Cstore%2Csearch%2Cfeature_video_search%2Ccoupon%2Ccube_v3%2Cnotice%2Cgroupon%2Cpoints_goods%2Cgoods%2Cgoods_recommend%2Ctag_list_top%2Ctag_list_left%2Cump_seckill", {
						pageindex: this.pageindex
					});
				this.shops1 = result.data.components[2].store.images;
			},
			async getShops2() {
				const result = await myRequestGet(
					"/wscshop/weapp/feature_detail.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&alias=h2knlXzmCr&show_ad=true&check_multistore=true&check_chainstore=true&async_components=goods%2Cump_limitdiscount&adaptor_components=text%2Ctitle%2Cstore%2Csearch%2Cfeature_video_search%2Ccoupon%2Ccube_v3%2Cnotice%2Cgroupon%2Cpoints_goods%2Cgoods%2Cgoods_recommend%2Ctag_list_top%2Ctag_list_left%2Cump_seckill"
				);
				this.shops2 = result.data.components[4].store.images;
			},
			async getShops3() {
				const result = await myRequestGet(
					"/wscshop/weapp/feature_detail.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&alias=h2knlXzmCr&show_ad=true&check_multistore=true&check_chainstore=true&async_components=goods%2Cump_limitdiscount&adaptor_components=text%2Ctitle%2Cstore%2Csearch%2Cfeature_video_search%2Ccoupon%2Ccube_v3%2Cnotice%2Cgroupon%2Cpoints_goods%2Cgoods%2Cgoods_recommend%2Ctag_list_top%2Ctag_list_left%2Cump_seckill"
				);
				this.shops3 = result.data.components[6].store.images;
			},
			async getShops4() {
				const result = await myRequestGet(
					"/wscshop/weapp/feature_detail.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&alias=h2knlXzmCr&show_ad=true&check_multistore=true&check_chainstore=true&async_components=goods%2Cump_limitdiscount&adaptor_components=text%2Ctitle%2Cstore%2Csearch%2Cfeature_video_search%2Ccoupon%2Ccube_v3%2Cnotice%2Cgroupon%2Cpoints_goods%2Cgoods%2Cgoods_recommend%2Ctag_list_top%2Ctag_list_left%2Cump_seckill"
				);
				this.shops4 = result.data.components[8].store.images;
			},
		},
		onPullDownRefresh() {
			this.pageindex = 1;
			this.flag = false;
			this.shops1 = [];
			this.getShops().then(() => {
				uni.stopPullDownRefresh()
			});
		},
	}
</script>

<style lang="scss">
	.hot_shop {
		background: #eee;

		.shop_list {
			display: flex;
			padding: 0 15rpx;
			flex-wrap: wrap;

			.shop_item {
				width: 750rpx;
				margin-bottom: 15rpx;
				background: #fff;
				padding: 10px;
				box-sizing: border-box;

				/*#ifdef MP-WEIXIN/H5*/
				swiper {
					height: 320rpx;

					swiper-item {
						image {
							width: 100%;
							height: 320rpx;

						}
					}
				}

				/*#endif*/
				/*#ifdef MP-ALIPAY*/
				swiper {
					height: 320rpx;
					width: 100%;

					swiper-item {
						image {
							height: 320rpx;
							width: 100%;
						}
					}
				}

				/*#endif*/

				.word1 {
					width: 270px;
					margin-left: 10px;

					.name {
						margin-top: 40px;
						padding-bottom: 10px;
						font-size: 48rpx;
						display: block;
						border-bottom: 1px solid #C0C0C0;
					}

					.address {
						padding-top: 10px;
						padding-bottom: 10px;
						font-size: 32rpx;
						display: block;
						border-bottom: 1px solid #C0C0C0;
					}

					.time {
						padding-top: 10px;
						padding-bottom: 10px;
						font-size: 32rpx;
						display: block;
					}
				}
			}
		}
	}
</style>

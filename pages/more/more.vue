<template>
	<view class="content">
		<!-- :style="{position:headerPosition,top:headerTop}" -->
		<view class="navbar">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
			上新	
			</view>
		</view>


		<view class="goods-list">
			<view v-for="(item, index) in arr" :key="index" class="goods-item" @click="Todetail(index)">
				<view class="image-wrapper">
					<!-- <image :src="item.imageUrl"></image> -->
					<view class="img" :style="{backgroundImage: 'url('+ item.imageUrl +')'}"></view>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {myRequestGet} from '@/utils/zgrequest.js'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				list6: [],
				list7: [],
				list8: [],
				list9: [],
				list10: [],
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'more',
				filterIndex: 0,
				cateId: 0,
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				// goodsList: []
				goods: [],
				arr: [],
				flag: true,
				copy: [],
				page: 1,
				lflag: false,
				alias: ''
			};
		},

		onLoad(options) {
			//console.log(options, "1111111")
			this.alias = options.alias
			this.getProducts();

		},
		// onPageScroll(e) {
		// 	//兼容iOS端下拉时顶部漂移
		// 	if (e.scrollTop >= 0) {
		// 		this.headerPosition = "fixed";
		// 	} else {
		// 		this.headerPosition = "absolute";
		// 	}
		// },
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
		},
		methods: {
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}

			},
			async getProducts() {
				// let result = await myRequestGet(
				// 	`/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=00b0f54fc6496c4e87ca324d5051eb&alias=omeofall&pageSize=18&page=1&order_by=&offline_id=0&json=1&isShowPeriod=1`
				// );
				// // this.goods = result.data.list;
				// this.arr = [...result.data.list];
				// console.log(this.arr, "ssssssssssss");
				
				
				let result1 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=6&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list1 = result1.data.list;
				//console.log(this.list1[0].imageUrl);
				let result2 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=2&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list2 = result2.data.list;
				//console.log(this.list2[0].imageUrl);
				
				
				
				let result3 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=1&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list3 = result3.data.list;
				//console.log(this.list3[0].imageUrl);
				
				
				let result4 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=3&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list4 = result4.data.list;
				//console.log(this.list4[0].imageUrl);
				
				
				let result5 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=5&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list5 = result5.data.list;
				//console.log(this.list5[0].imageUrl);
				
				
				let result6 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=4&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list6 = result6.data.list;
				//console.log(this.list6[0].imageUrl);
				
				
				let result7 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=7&order_by=&offline_id=0&json=1&isShowPeriod=1"
				
				);
				this.list7 = result7.data.list;
				//console.log(this.list7[0].imageUrl);
				
				let result8 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=9&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list8 = result8.data.list;
				//console.log(this.list8[0].imageUrl);
				
				
				let result9 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&alias=omeofall&pageSize=18&page=8&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list9 = result9.data.list;
				//console.log(this.list9[0].imageUrl);
				
				
				
				let result10 = await myRequestGet(
					"/wscshop/goods/goodsByTagAlias.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&alias=omeofall&pageSize=18&page=10&order_by=&offline_id=0&json=1&isShowPeriod=1"
				);
				this.list10 = result10.data.list;
				//console.log(this.list10[0].imageUrl);
				
				
				this.arr = [...this.list3, ...this.list4, ...this.list8, ...this.list6,...this.list1, ...this.list2, ...this.list5,  ...this.list7, ...this.list9, ...this.list10]
					
			 },
			Todetail(index) {
				uni.navigateTo({
					url: "/pages/detail/detail?alias=" + this.arr[index].alias + "&price=" + this.arr[index].price
				})
			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex === index && index !== 2) {
					return;
				}
				this.filterIndex = index;
				if (index == 0) {
					this.getProducts();
				}
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
					var arrCopy = this.arr

					function compare(key) {
						return function(value1, value2) {
							var val1 = value1.price;
							var val2 = value2.price;
							return val1 - val2;
						}
					}
					if (this.flag == true) {
						arrCopy.sort(compare('price'));
						this.arr = arrCopy;
						console.log("升");
					}
					if (this.flag == false) {
						arrCopy.reverse();
						this.arr = arrCopy;
						console.log("降");

					}
					this.flag = !this.flag;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
			},
		},

	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		// position: fixed;
		// left: 0;
		// top: var(--window-top);
		// display: flex;
		// width: 100%;
		// height: 80upx;
		// background: #fff;
		// box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		// z-index: 10;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		 display: flex;
		 background-color: #fff;
		justify-content: space-around;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		color:#797979;
		 position: fixed;
		 /* #ifndef H5 */
		 top: 0;
		 /* #endif */
		 
		  /* #ifdef H5 */
		 z-index: 2;
		 margin-top: -100rpx;
		  /* #endif */
		

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 360upx;
			border-radius: 3px;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
				opacity: 1;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
			}
		}

		.title {
			width: 300rpx;
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.clamp {
			// text-overflow: clip;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			// font-weight: 550;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				// font-weight: 550;
				font-size: 38upx;
			}
		}
	}
</style>


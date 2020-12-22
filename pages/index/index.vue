<template>
	<view class="home">
		<swiper indicator-dots :autoplay="true" :interval="5000" circular>
			<swiper-item v-for="(item,index) in swipers" :key="item.link_id">
				<image :src="item.image_url" @click="swipersClick(index)"></image>
			</swiper-item>
		</swiper>
		<image :src="img1" mode="widthFix"></image>




		<view class="l1" v-for="(item,index) in list1" :key="item.link_id" @click="list1Click(index)">
			<image :src="item.image_url" mode="widthFix"></image>
		</view>
		<view class="l2" v-for="(item,index) in list2" :key="item.link_id" @click="list2Click(index)">
			<image :src="item.image_url" mode="widthFix"></image>
		</view>


		<image :src="img2" mode="widthFix"></image>





		<!-- #ifdef H5 -->
		<waterfallsFlow :list="arr" @imageClick="imageClick">
			<template v-slot:default="item">
				<view class="goods_item">
					<view class="tit">
						<text>{{item.title}}</text>
					</view>
					<view class="sub_title">
						<text>{{item.sub_title}}</text>
					</view>
					<view class="price">
						<text>¥{{item.price}}</text>
					</view>
				</view>
			</template>
		</waterfallsFlow>
		<!-- #endif -->





		<!-- #ifdef MP-WEIXIN -->
		<waterfallsFlow ref="waterfallsFlow" :list="arr" @imageClick="imageClick">
			<view class="goods_item" v-for="(item, index) of arr" :key="index" slot="slot{{index}}">
				<view class="tit">
					<text>{{item.title}}</text>
				</view>
				<view class="sub_title">
					<text>{{item.sub_title}}</text>
				</view>
				<view class="price">
					<text>¥{{item.price}}</text>
				</view>
			</view>
		</waterfallsFlow>
		<!-- #endif -->



		<!-- #ifdef  MP-ALIPAY -->
		<view class="goods_list">
			<view class="goods_item" v-for="item in arr" :key="item.id" @click="itemClick(item)">
				<image :src="item.image_url" mode="widthFix"></image>
				<view class="tit">
					<text>{{item.title}}</text>
				</view>
				<view class="sub_title">
					<text>{{item.sub_title}}</text>
				</view>
				<view class="price">
					<text>¥{{item.price}}</text>
				</view>
			</view>
		</view>
		<!-- #endif -->


		<button class="more" @click="goMore">查看更多</button>
	</view>
</template>
<script>
	//#ifndef  MP-ALIPAY 
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	//#endif

	import uniGrid from "@/components/uni-ui/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-ui/uni-grid-item/uni-grid-item.vue"
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue"
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				swipers: [],
				img1: "",
				img2: "",
				list1: [],
				list2: [],
				goods: [],
				goods1: [],
				goods2: [],
				arr: [],
				price: "",
				arr1: [],
				arr2: [],
				priceArr: []
			}
		},
		components: {
			uniGrid,
			uniGridItem,
			//#ifndef  MP-ALIPAY 
			waterfallsFlow
			//#endif
		},
		onPullDownRefresh() {
			// this.$refs.waterfallsFlow.refresh();
			this.getProducts().then(() => {
				uni.stopPullDownRefresh()
			})


		},
		onLoad() {
			this.getSwipers();
			this.getProducts();
		},
		methods: {
			async getSwipers() {
				let result = await myRequestGet(
					"/wscshop/weapp/homepage_detail.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=149a09b93a90072d40f6bfdb220b3d&platform=2&show_ad=true&check_multistore=true&async_components=goods%2Cump_limitdiscount&adaptor_components=text%2Ctitle%2Cstore%2Csearch%2Cfeature_video_search%2Ccoupon%2Ccube_v3%2Cnotice%2Cgroupon%2Cpoints_goods%2Cgoods%2Cgoods_recommend%2Ctag_list_top%2Ctag_list_left%2Cump_seckill"
				);
				this.swipers = result.data.components[1].sub_entry;
				// console.log(this.swipers);
				this.img1 = result.data.components[2].sub_entry[0].image_url;
				//console.log(this.lujin);
				this.list1 = result.data.components[3].items;
				// console.log(this.list1)
				this.list2 = result.data.components[4].items;


				// console.log(this.list2[0].image_url)
				this.img2 = result.data.components[5].sub_entry[0].image_url;
				// this.goods = result.data.components[6].goodsList;
				// console.log(this.goods);
			},
			async getProducts() {
				let result = await myRequestGet(
					"/wscshop/showcase/goodsList.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=149a09b93a90072d40f6bfdb220b3d&tagId=61971791&page=1&pageSize=10&goodsIds=&goodsFrom=1&kdtId=10056586&offlineId=0&goodsNumber=30&isShowPeriod=1/2346384796"
				);
				this.goods = result.data.list;
				let result1 = await myRequestGet(
					"/wscshop/showcase/goodsList.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=4d97706cd5aa6e7e58253810c1a19e&tagId=61971791&page=3&pageSize=10&goodsIds=&goodsFrom=1&kdtId=10056586&offlineId=0&goodsNumber=30&isShowPeriod=1"
				);
				this.goods1 = result1.data.list;
				let result2 = await myRequestGet(
					"/wscshop/showcase/goodsList.json?app_id=wx988cb9521c950d63&kdt_id=10056586&access_token=dfa09e471f40d2e73f4009833f4b91&tagId=61971791&page=2&pageSize=10&goodsIds=&goodsFrom=1&kdtId=10056586&offlineId=0&goodsNumber=30&isShowPeriod=1"
				);
				this.goods2 = result2.data.list;
				this.arr = [...this.goods, ...this.goods2, ...this.goods1];
				this.priceArr = [this.arr[0].price, this.arr[11].price, 0, this.arr[5].price, this.arr[21].price];
				for (var i = 0; i < this.swipers.length; i++) {
					var obji = {
						price: "",
						arr1: [],
					}
					this.price = this.priceArr[i],
						obji.price = this.price,
						obji.arr1 = this.swipers[i],
						this.arr2.push(obji)
				}
				console.log(this.arr2)
				//console.log(this.arr[26].alias)
			},
			goMore(item) {
				uni.navigateTo({
					url: "/pages/moregood/moregood"
				})
			},
			swipersClick(index) {
				console.log(this.arr2[index].arr1);
				// console.log(index)
				if (index != 2) {
					uni.navigateTo({
						url: "/pages/detail/detail?alias=" + this.arr2[index].arr1.alias + "&price=" + this.arr2[index].price
					})
				} else {
					uni.navigateTo({
						url: "/pages/list/list?alias=c7lu9fz3",
					})
				}

			},
			list1Click(index) {
				console.log(this.list1[index].alias, "sssssssssssssssss");
				uni.navigateTo({
					url: "/pages/list/list?alias=" + this.list1[index].alias
				})
			},
			list2Click(index) {
				console.log(this.list2[index].alias, "111111111111111111111");
				uni.navigateTo({
					url: "/pages/list/list?alias=" + this.list2[index].alias
				})
			},
			itemClick(item) {
				console.log("1111111111111111111111111", item);
				uni.navigateTo({
					url: "/pages/detail/detail?alias=" + item.alias + "&price=" + item.price
				})
			},

			imageClick(item) {
				console.log(item, "99999999999999999999999999999999999999")
				uni.navigateTo({
					url: "/pages/detail/detail?alias=" + item.alias + "&price=" + item.price
				})
			},

			goMore() {
				uni.navigateTo({
					url: "/pages/more/more"
				})
			}
		}
	}
</script>
<style lang="scss">
	.home {
		background-color: #F9F9F9;

		swiper {
			height: 750rpx;
			background: #F9F9F9;

			swiper-item {
				image {
					width: 750rpx;
					height: 740rpx;
				}
			}
		}

		image {
			width: 750rpx;
		}

		.l1,
		.l2 {
			image {
				display: inline-block;
				float: left;
				width: 375rpx;
			}

		}


		/* #ifdef H5 */
		/deep/.goods_item {
			width: 345rpx;
			margin-bottom: 5rpx;
			//background: #fff; 
			background-color: white;
			padding: 10rpx;
			box-sizing: border-box;

			/deep/.tit {
				width: 100%;
				height: 70rpx;
				font-weight: 800;
				font-size: 13px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			/deep/.sub_title {
				margin-top: 14rpx;
				font-weight: 400;
				font-size: 12px;
				color: grey;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			/deep/.price {
				color: #74CAB2;
				margin-top: 14px;
				font-weight: 700;
			}
		}

		/* #endif */

		/* #ifdef MP-ALIPAY */
		.goods_list {
			display: flex;
			padding: 0 15rpx;
			overflow: hidden;
			flex-wrap: wrap;
			background-color: #F9F9F9;

			.goods_item {
				width: 345rpx;
				margin-bottom: 5rpx;
				margin-left: 15rpx;
				//background: #fff;
				background-color: white;
				padding: 10rpx;
				box-sizing: border-box;

				image {
					border-top-left-radius: 5%;
					border-top-right-radius: 5%;
					width: 100%;
					margin: 0 auto;
				}

				.tit {
					width: 100%;
					height: 80rpx;
					font-weight: 800;
					font-size: 13px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.sub_title {
					margin-top: 14rpx;
					font-weight: 400;
					font-size: 12px;
					color: grey;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.price {
					color: #74CAB2;
					margin-top: 14px;
					font-weight: 700;
				}
			}
		}

		/* #endif */

		/* #ifdef MP-WEIXIN*/
		.goods_item {
			width: 345rpx;
			margin-bottom: 5rpx;
			//background: #fff;
			background-color: white;
			padding: 10rpx;
			box-sizing: border-box;

			.tit {
				width: 100%;
				height: 75rpx;
				font-weight: 800;
				font-size: 13px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.sub_title {
				margin-top: 14rpx;
				font-weight: 400;
				font-size: 12px;
				color: grey;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.price {
				color: #74CAB2;
				margin-top: 14px;
				font-weight: 700;
			}
		}

		/* #endif */

		.more {
			width: 720rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: #FFFFFF;
			color: #999999;
			font-size: 15px;
			margin: 12rpx auto;
		}
	}
</style>

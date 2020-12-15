<template>
	<view class="pics">
		<scroll-view scroll-y class="left">
			<view @click="changeActive(index)" v-for="(item,index) in cates" :key="index" :class="index===active?'active':''">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y :scroll-into-view="clickId" :scroll-with-animation="true" @scroll="scroll_detail"
		 @scrolltolower="scroll_bottom">
			<view class="item" v-for="(item,index) in arr" :key="index">
				<text class="labelTitle" :id="'id'+index">{{item.title}}</text>
				<view class="card" v-for="(item1,index1) in item.arr1" :key="index1">
					<image :src="item1.image_url"></image>
					<view>
						<text class="text_title">{{item1.title}}</text>
						<text class="sell_point">{{item1.sell_point}}</text>
						<text class="activity_price">￥{{item1.activity_price}}</text>
					</view>
				</view>

				<!-- <text>{{item.title}}</text> -->
			</view>
			<!-- <text v-if="secondData.length === 0">暂无数据</text> -->
		</scroll-view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				//左边分类数据
				cates: [],
				//当前激活的分类
				active: 0,
				//分类详情数据
				secondData: [],
				clickId: "",
				toplist: [],
				title: "",
				arr: []
			}
		},
		onLoad() {
			this.getPicsCate()
		},
		methods: {
			async getPicsCate() {
				const result = await myRequestGet("/wscshop/weapp/feature_detail.json?alias=IVIUobcC7Z")
				this.cates = result.data.components[2].sub_entry
				this.rightData(this.cates)
			},
			async rightData(item) {
				for (var i = 0; i < this.cates.length; i++) {
					var obji = {
						title: "1",
						arr1: []
					}
					var res = await myRequestGet("/wscshop/goods/goodsByTagAlias.json?kdt_id=10056586&alias=" + item[i].alias +
						"&pageSize=" + item[i].goods_num_display)
					this.title = item[i].title;
					obji.title = this.title;
					obji.arr1 = res.data.list;
					this.arr.push(obji);
					this.secondData = [...this.secondData, ...res.data.list];

				}

			},
			//切换
			changeActive(index) {
				this.active = index;
				//利用uniapp组件的配置信息。
				this.clickId = 'id' + index;
				//解决最后一个 ***来回*** 问题 (由于点击左侧导航，右侧锚点位置信息变化，此时滚动事件也随之滚动。)
				uni.setStorageSync("resolve", "last");
				setTimeout(() => {
					uni.clearStorageSync("resolve")
				}, 400);
			},
			//滚动过程
			scroll_detail(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				if (!uni.getStorageSync("resolve")) {
					this.get_node_details(options);
				};
			},
			//获取节点信息
			get_node_details(options) {
				const query = uni.createSelectorQuery().in(this); //获得实例
				//获取多个节点方式
				query.selectAll(".labelTitle").boundingClientRect(data => {
					//console.log(data); //得到class类名为  selectAll的数组集合
					this.toplist = data.map(item => {
						return Math.ceil(item.top);
					});
					this.async_detail_msg(options);
				}).exec();
			},
			async_detail_msg(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				let top_page = options.detail.scrollTop + this.toplist[0];

				for (let i = 0; i < this.toplist.length; i++) {
					let node1 = this.toplist[i];
					let node2 = this.toplist[i + 1];
					if (node2 && top_page >= node1 && top_page < node2) {
						this.active = i;
						break;
					} else if (node2 && top_page === node2) {
						this.active = i + 1;
						break;
					}
				}
			},
			//滚动到底部
			scroll_bottom(options) {
				setTimeout(() => {
					this.active = 13;
				}, 100)
			},
		}
	}
</script>

<style lang="scss">
	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 150rpx;
			height: 1280rpx;

			view {
				padding: 28rpx 20rpx;
				color: rgb(136, 136, 136);
				font-size: 12px;
				background-color: rgb(248, 248, 248);
			}

			.active {
				padding-left: 16rpx;
				background-color: rgb(255, 255, 255);
				border-left: 4rpx solid rgb(101, 196, 170);
				color: black;
				font-weight: 600;
			}
		}

		.right {
			height: 1280rpx;
			width: 600rpx;
			color: rgb(83, 83, 83);
			font-size: 27rpx;

			.list-title {
				font-size: 22rpx;
				color: rgb(157, 157, 157);
				margin: 20rpx;
			}

			.item {
				.labelTitle{
					margin-left: 18rpx;
					
					font-size: 24rpx;
					color: rgb(153,153,153);
				}
				.card {
					width: 100%;
					display: flex;
					margin: 20rpx 0;
					image {
						margin-left: 14rpx;
						border-radius: 14rpx;
						width: 200rpx;
						height: 200rpx;
					}

					view {
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 18rpx;
						position: relative;

						.text_title {}

						.sell_point {
							margin-top: 10rpx;
							font-size: 22rpx;
							color: rgb(167, 167, 167);
						}

						.activity_price {
							color: rgb(101, 192, 170);
							position: absolute;
							bottom: 0;
						}
					}
				}
			}
		}
	}
</style>

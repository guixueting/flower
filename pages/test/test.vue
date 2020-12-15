<template>
	<view class="pics">
		<scroll-view scroll-y class="left">
			<view @click="leftClickHandle(index,item)" v-for="(item,index) in cates" :key="item.id" :class="active===index?'active':''">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y :scroll-into-view="clickId" :scroll-with-animation="true" @scroll="scroll"
		 @scrolltolower="scrolltolower">
			<view class="item" v-for="item in secondData" :key="item.id">
				<view class="card">
					<image :src="item.image_url"></image>
					<view>
						<text class="title">{{item.title}}</text>
						<text class="sell_point">{{item.sell_point}}</text>
						<text class="activity_price">￥{{item.activity_price}}</text>
					</view>
				</view>

				<!-- <text>{{item.title}}</text> -->
			</view>
			<!-- <text v-if="secondData.length === 0">暂无数据</text> -->
		</scroll-view>
	</view>
</template>

<script>
	import uniCard from "@/components/uni-ui/uni-card/uni-card.vue"
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
				isLeftClick: false,
				clickId: ""
			}
		},
		onLoad() {
			this.getPicsCate()
			this.getNodesInfo()
		},
		methods: {
			//获取分类数据
			async getPicsCate() {
				const result = await myRequestGet("/wscshop/weapp/feature_detail.json?alias=IVIUobcC7Z")
				this.cates = result.data.components[2].sub_entry
				// console.log(result)
				this.rightData(this.cates)
				// this.leftClickHandle(this.active, this.cates[this.active])
			},
			async rightData(item) {
				for (var i = 0; i < this.cates.length; i++) {
					var res = await myRequestGet("/wscshop/goods/goodsByTagAlias.json?kdt_id=10056586&alias=" + item[i].alias+"&pageSize=" + item[i].goods_num_display)
					this.secondData = [...this.secondData,...res.data.list]
				}
				console.log(this.secondData)
			},
			leftClickHandle(i,item) {
				this.clickId = "po" + i;
				this.active = i;
				this.isLeftClick = true;
				// const res = await myRequestGet("/wscshop/goods/goodsByTagAlias.json?kdt_id=10056586&alias=" + item.alias +
				// 	"&pageSize=" + item.goods_num_display)
				// this.secondData = res.data.list
			},
			scroll(e){
				if(this.isLeftClick){
					this.isLeftClick=false;
					return;
				}
				// console.log(e)
				let scrollTop = e.target.scrollTop;
				for(let i=0;i<this.secondData.length;i++){
					let h1 = this.secondData[i];
					let h2 = this.secondData[i+1];
					if(scrollTop>h1&&scrollTop<h2){
						this.active = i;
					}
				}
			},
			// 滚动到底部
			scrolltolower(){
				setTimeout(()=>{
					this.active = 13;
				},80)
			},
			getNodesInfo(){
				//小程序没有doucument和window对象(undefined)
				const query =uni.createSelectorQuery().in(this);
				query.selectAll(".title").boundingClientRect().exec(res=>{
					let nodes = res[0];
					let arr = [];
					nodes.map(item=>{
						arr.push(item.top);
					})
					this.secondData = arr;
				})
				
			}

		},
		components: {
			uniCard
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

						.title {}

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

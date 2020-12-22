<template>
	<view class="">
		<view>
			<uni-search-bar placeholder="搜索商品" @confirm="search" ref='search_ref' @cancel='cancel1'></uni-search-bar>
		</view>
		<view class="card" v-for="(item,index) in newArr" :key="index" @click="navagateTo(index,item)" v-if="show">
			<image :src="item.image_url" mode="aspectFill"></image>
			<view class="content">
				<text class="text_title">{{item.title}}</text>
				<text class="sell_point">{{item.sell_point}}</text>
				<text class="activity_price">￥{{item.activity_price}}</text>
			</view>
		</view>
		<view v-if="nomore" class="noMore">
			<view>没有找到你想要的商品</view>
			<view>换个搜索词试试</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				secondData: [],
				newArr: [],
				show: false,
				nomore:false
			}
		},
		onLoad(options) {
			this.secondData = JSON.parse(decodeURIComponent(options.secondData))
		},
		methods: {
			search() {
				this.newArr = []
				for (var i = 0; i < this.secondData.length; i++) {
					for (var j = 0; j < this.secondData[i].arr1.length; j++) {
						var str = this.secondData[i].arr1[j].title;
						if (str.indexOf(this.$refs.search_ref.searchVal) !== -1) {
							this.newArr.push(this.secondData[i].arr1[j])
						}
					}
				}
				this.show = true
				if(this.newArr.length == 0){
					this.nomore = true
				}else{
					this.nomore = false
				}
			},
			navagateTo(i, item) {
				uni.navigateTo({
					url: "/pages/detail/detail?alias=" + item.alias + "&price=" + item.price
				})
			},
			cancel1(){
				this.show = false
			}

		},
		components: {
			uniSearchBar
		}
	}
</script>

<style lang="scss">
	.card {
		display: flex;
		margin: 20rpx 0;


		image {
			margin-left: 14rpx;
			border-radius: 14rpx;
			width: 200rpx;
			height: 200rpx;
		}



		.content {
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
	.noMore{
		text-align: center;
		margin-top: 400rpx;
		color: #666;
	}
</style>

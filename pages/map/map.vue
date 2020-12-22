<template>
	<view class="map">
		<map class="map1" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 120.37138,
				latitude: 31.48795,
				scale: 13,
				markers: [{
					longitude: 120.37138,
					latitude: 31.48795,
					iconPath: '../../static/icon/地图新版.png',
					width: 30,
					height: 30
				}]
			}
		},
	}
</script>

<style lang="scss">
	.map {
		.map1 {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>

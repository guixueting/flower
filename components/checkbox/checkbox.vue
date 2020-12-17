<template>
	<view
		class="jiuai-check-box"
		:style="{ border: borderStyle, width: checkBoxSize + 'rpx', height: checkBoxSize + 'rpx', 'line-height': checkBoxSize + 'rpx','border-radius':borderRadius+'rpx'}"
		@click="clickChecked"
	>
		<view :class="['jiuai-check-icon', 'iconfont', 'icon-xuanzhong', isChecked ? 'active' : '']" :style="{ color: color, 'font-size': fontSize + 'rpx' }"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataChecked: null
		};
	},
	props: {
		value: '', //这里会被带到@change事件的e.detail.value上
		domId: '', //这里会被带到@change事件的e.detail.domId上
		checkBoxSize: {
			//外框大小（宽和高）单位rpx
			type: Number,
			default: 44
		},
		borderStyle: {
			//外框样式
			type: String,
			default: '1px solid grey'
		},
		borderRadius: {
			//外框样式
			type: Number,
			default: 6
		},
		fontSize: {
			//里面icon大小
			type: Number,
			default: 44
		},
		disabled: {
			//是否禁止选中
			type: Boolean,
			default: false
		},
		checked: {
			//默认是否选中
			type: Boolean,
			default: false
		},
		color: {
			//里面icon的颜色
			type: String,
			default: '#007aff'
		},
		functionType: {
			//里面icon的颜色
			type: String,
			default: 'default'
		}
	},
	methods: {
		clickChecked() {
			//切换选中状态事件
			if(this.functionType=='page'){
				this.$emit('pageClick', {
					detail: {
						value: this.value, //外部传进来的value
						domId:this.domId||null
					}
				});
			}else if(this.functionType=='default'){
				if (this.disabled) {
					this.$emit('disabledCallback', {
						detail: {
							value: this.value, //外部传进来的value
							domId:this.domId||null
						}
					});
				} else {
					if (this.checked && this.dataChecked == null) {
						this.changeToFlase();
					} else {
						if (this.dataChecked) {
							this.changeToFlase();
						} else {
							this.changeTotrue();
						}
					}
				}
			}
		},
		changeTotrue() {
			//切换为选中状态，外部组件可以用js调用此方法修改选中状态
			this.dataChecked = true;
			this.emitFather();
		},
		changeToFlase() {
			//切换为取消状态，外部组件可以用js调用此方法修改选中状态
			this.dataChecked = false;
			this.emitFather();
		},
		emitFather() {
			//告知父页面切换了选中状态
			this.$emit('change', {
				detail: {
					value: this.value, //外部传进来的value
					checked: this.isChecked, //当前的选中状态
					domId:this.domId||null
				}
			});
		}
	},
	computed: {
		isChecked() {
			if (this.dataChecked != null) {
				return this.dataChecked;
			} else {
				return this.checked;
			}
		}
	}
};
</script>

<style lang="scss">
	/* 
	这里的icon使用iconfont来做成的，具体对勾可以在阿里巴巴矢量图标库中更换 
	阿里巴巴矢量图标库↓↓↓↓↓↓↓↓
	https://www.iconfont.cn
	uniapp中使用字体图标↓↓↓↓↓↓↓↓
	https://uniapp.dcloud.io/frame?id=%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87
	 */
@font-face {
	font-family: 'iconfont';
	src: url('https://at.alicdn.com/t/font_1436714_gz0bwdt261o.eot?t=1569480027812'); /* IE9 */
	src: url('https://at.alicdn.com/t/font_1436714_gz0bwdt261o.eot?t=1569480027812#iefix') format('embedded-opentype'),
		/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJwAAsAAAAABiQAAAIkAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAosSQE2AiQDCAsGAAQgBYRtBzMbcgXInpo8KVKJjaUIYHobMHZDiIf/9mv3zZ81QZNqJIpmlUzidAuJBLFRMqHgoe/GXOZhKCdURu7Z7dWI1JMvJC2nl6YdKHZ6RsyiMJtwy3m/+oaY+ZLt81xObwIdyPxA53rNSWNNmjSAenFAge6BUWQFFHLD2AUv8DGBujEdjb3T6xmsyuxVgbiPAgdWC1FZZoWqUG44mMWbkmp6SR/Aa/T9+DOKVZJSwW45vDvxYf+TU1I89B7cBoQYAR0vocAKkInTxuy+lmBcSz3bNgWO1Rh86vUCjziqU7C/zq5vghGYCz55KwVI8FiU4fak54nys88zutnb+AF35/P6/uIc9mG0+Eo/2q+C/27e11m72sjg491EjmyYH1RX9AU/QB04kA2t7U5ZUxvHk/KO2+rq6MHBfn9TbUNnK4aqoQn+itEMhaoZMrMrKGlYRVnVJuqWnR1vGKBaItew5BUgdL0haXtHoeuTzOwvSob9o6wbLdSdx8CFDXMRre8qOUY+uncYeZKz67X1uHFCQZU6mtdG/IK0jBI47A3KhTPKSZfYUtbByIyRVTI8Bc9RmgoWKjF51gvNinG/z01v6nmSwbpdijgM8SHXHRTxiBwHk8165fMTJFBJObSjr65cIKoUzY6GegYDyDNTPqjvUV4p1QIjxjDElMigUzCPpFICFc3zYsRjesIJ6cJY3xnFQ0297S3Z352COtuewtlRqD1UTn4fSh4AAAAA')
			format('woff2'),
		url('https://at.alicdn.com/t/font_1436714_gz0bwdt261o.woff?t=1569480027812') format('woff'),
		url('https://at.alicdn.com/t/font_1436714_gz0bwdt261o.ttf?t=1569480027812') format('truetype'),
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url('https://at.alicdn.com/t/font_1436714_gz0bwdt261o.svg?t=1569480027812#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-xuanzhong:before {
	content: '\e610';
}

.jiuai-check-box {
	display: inline-block;
	text-align: center;
}

.jiuai-check-icon {
	opacity: 0;
	&.active {
		opacity: 1;
	}
}
</style>

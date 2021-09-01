<template>
	<view v-show="show" class="main">
		<view class="rect-shadow" :style="{'width':width+'px','height':height+'px','left':left+'px',top:top+'px'}"></view>
		<view class="show-message" :style="{'top': (height+top+20) +'px'}">{{showMessage}}</view>
		<view class="cover-wrap" @tap="click"></view>
	</view>
</template>

<script>
	export default {
		name: "h-guide",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			left: {
				ype: [Number, String],
				default: ''
			},
			top: {
				type: [Number, String],
				default: ''
			},
			width: {
				ype: [Number, String],
				default: ''
			},
			height: {
				type: [Number, String],
				default: ''
			},
			showMessage: {
				ype: String,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		watch: {
			show(n) {}
		},
		computed: {

		},
		methods: {
			click() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	.main {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.rect-shadow {
		position: absolute;
		border-radius: 10px;
		box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.5);
		pointer-events: none;
	}
	.show-message {
		position: absolute;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		width: 80%;
		left: 10%;
		text-align: center;
		pointer-events: none;
	}
	.cover-wrap {
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		position: absolute;
	}
</style>

<template>
	<view class="container">
		<view class="title" >
			<text>欢迎使用该系统</text>
		</view>
		<view class="tips">
			<text>以下将展示该系统的功能</text>
		</view>
		<view class="guide-box">
			<view class="single-box" v-for="(item,index) in entryInfos"   :id="index" @tap="handleEntry">
				<image class="icon" :src="item.icon" mode="aspectFit" role="img"></image>
				<view class="label">{{item.title}}</view>
				<view class="desc">{{item.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				entryInfos:[{
					icon:'/static/images/write.png',
					title:'录入数据',
					desc:'记录植株数据',
					navigateTo:'../add-plant/add-plant'
				},{
					icon:'/static/images/look.png',
					title:'查看数据',
					desc:'查看已经录入的数据',
					navigateTo:'../add/add'
				},{
					icon:'/static/images/view.png',
					title:'数据可视化',
					desc:'对数据进行可视化',
					navigateTo:'../'
				}]
			}
		},
		methods: {
			handleEntry:function(e) {
				let url = this.entryInfos[e.currentTarget.id].navigateTo;
				uni.navigateTo({
					url:url
				});
			}
		}
	}
</script>

<style>
.container {
	background-image: url("https://pic1.zhimg.com/80/v2-e7afe53861b75f78692a5e32f5967f93_720w.jpg");
	background-color: #333;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
}
.container .title{
	color: #FFFFFF;
	padding-top: 65rpx;
	padding-bottom: 40rpx;
	line-height: 60rpx;
}
.tips {
	color: #FFFFFF;
	font-size: 12px;
	text-align: center;
}

.guide-box{
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	padding: 100rpx 5vw;
}

.single-box {
	width: 35vw;
	height: 33vw;
	background-color: rgba(0,0,0,0.55);
	text-align: center;
	vertical-align: top;
	margin: 5vw;
	margin-bottom: 60rpx;
}

.icon {
	display: block;
	width: 72rpx;
	height: 72rpx;
	margin: 20px auto 0;
}

.label {
	display: block;
	margin-top: 2px;
	color: #CFE4FF;
	font-size: 28rpx;
	white-space: nowrap;
}
.desc {
	display: block;
	margin-top: 2px;
	color: #CFE4FF;
	font-size: 28rpx;
	white-space: nowrap;
}
</style>

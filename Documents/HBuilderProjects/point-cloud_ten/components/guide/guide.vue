<template>
	<view v-if="show" class="guide-wrap">
		<view class="guide-shadow" :style="{'width':(guideArray[currentIndex].width?guideArray[currentIndex].width:(width+10))+'px','height':(height+10)+'px','left':(left-5)+'px',top:(top-5)+'px','border-radius': guideArray[currentIndex].radius?guideArray[currentIndex].radius+'px':'' }"></view>
	    <template v-if="guideArray[currentIndex].type=='left'">
			<view class="guide-messgae-left" :style="{'top':(guideArray[currentIndex].Mtop?guideArray[currentIndex].Mtop:(top+height+10))+'px','left':(guideArray[currentIndex].Mleft?guideArray[currentIndex].Mleft:left)+'px'}">
				<image style="width: 32px;height: 57px;" src="@/static/guide_left.png"></image>
				<view class="guide-messgae-content" :style="{'margin-left':guideArray[currentIndex].Cleft+'px'}">{{guideArray[currentIndex].guideMessage}}</view>
			</view>
		</template>
		<template v-if="guideArray[currentIndex].type=='right'">
			<view class="guide-messgae-left" :style="{'top':(guideArray[currentIndex].Mtop?guideArray[currentIndex].Mtop:(top+height+10))+'px','left':(guideArray[currentIndex].Mleft?guideArray[currentIndex].Mleft:left)+'px'}">
				<image style="width: 32px;height: 57px;" src="@/static/guide_right.png"></image>
				<view class="guide-messgae-content" :style="{'margin-left':guideArray[currentIndex].Cleft+'px'}">{{guideArray[currentIndex].guideMessage}}</view>
			</view>
		</template>
		<image src="@/static/guide_btn.png" class="guide-btn" :style="{'top':(guideArray[currentIndex].Btop?guideArray[currentIndex].Btop:(imagesHeight+top+height))+'px'}" @click="click"></image>
	</view>
</template>

<script>
	export default {
		name:"guide2",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			left: {
				type: [Number, String],
				default: ''
			},
			top: {
				type: [Number, String],
				default: ''
			},
			width: {
				type: [Number, String],
				default: ''
			},
			height: {
				type: [Number, String],
				default: ''
			},
			currentIndex: {
				type: Number,
				default: 0
			},
			guideArray: {
				type: Array,
				default:()=>{
					return []
				}
			}
		},
		data() {
			return {
				imagesHeight:120
			};
		},
		methods:{
			click() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
.guide-wrap{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
}
.guide-shadow{
	border: 1px dashed #FFFFFF;
	position: absolute;
	border-radius: 6px;
	box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.5);
	pointer-events: none;
}
.guide-messgae-left{
	border: 0px dashed #FFFFFF;
	position: absolute;
	max-width: 50%;
}
.guide-messgae-content{
	pointer-events: none;
	color: #fff;
	font-weight: 400;
	font-size: 14px;
	line-height: 1.4;
}
.guide-btn{
	position: absolute;
	width: 120px;
	height: 42px;
	left: 50%;
	transform: translateX(-60px);
}
</style>

<template>
	<view>
		<div class="banner">
		  <div class="tiaoguo"  @click="gotoindex()" @c> 
			<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0067959d-50f5-4427-98c5-49b16e3acf4a/e61a9709-0b87-478e-b5a0-90ce508282ce.jpg" alt="">
		  </div>
		  <div class="item">
		    <img :src="dataList[currentIndex]">
		  </div>
		  <div class="page" v-if="this.dataList.length > 1">
		    <ul>
		      <li @click="gotoPage(prevIndex)">&lt;</li>
		      <li v-for="(item,index) in dataList" @click="gotoPage(index)" :class="{'current':currentIndex == index}">  {{index+1}}</li>
		      <li @click="gotoPage(nextIndex)">&gt;</li>
		    </ul>
		  </div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  dataList:["https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0067959d-50f5-4427-98c5-49b16e3acf4a/8a94ef77-5475-4f77-87bd-8b4272623603.png","https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0067959d-50f5-4427-98c5-49b16e3acf4a/46a02ebd-0790-4adf-91db-db991c23673f.png"],
				  currentIndex: 0,   //默认显示图片
				  timer: null    //定时器
			}
		},
		methods: {
			  gotoPage(index) {
			    this.currentIndex = index;
			  },
			  //定时器
			  runInv() {
			    this.timer = setInterval(() => {
			      this.gotoPage(this.nextIndex)
			    }, 1000)
			  },
			  gotoindex(){
				uni.navigateTo({
					url: '../show/show',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			  }
		},
		computed: {
		  //上一张
		  prevIndex() {
		    if(this.currentIndex == 0) {
		      return this.dataList.length - 1;
		    }else{
		      return this.currentIndex - 1;
		    }
		  },
		  //下一张
		  nextIndex() {
		    if(this.currentIndex == this.dataList.length - 1) {
		      return 0;
		    }else {
		      return this.currentIndex + 1;
		    }
		  }
		},

	}
</script>

<style>
* {
        margin: 0;
        padding: 0;
    }
    ul li {
        list-style: none;
        float: left;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: rgba(255,255,255,.8);
        font-size: 14px;
    }
    .banner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        margin-top: 60px;
    }
    .banner img {
        width: 100%;
        display: block;
    }
    .banner .page {
        background: rgba(0,0,0,.5);
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
    }
    .banner .page ul {
        float: right;
    }
    .current {
        color: #ff6700;
    }
	.item{
		width:735rpx
	}
	.tiaoguo{
		color: #333333;
		width: 100rpx;
		position: absolute;
		margin-left: 630rpx;
	}
</style>

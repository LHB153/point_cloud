<template>

		<view>
			<view class="progress-box">
				<progress :percent=percent show-info stroke-width="3" />
			</view>

			<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="imgurl"   :getone="false"  :where="`ID == ${item.ID} && data == '${item.data}'`">
				<view v-if="error">{{error.message}}</view>
				<view v-else>
					<view class="" >第一步、上传本地图片</view>
					<button class="box"  v-if="`${item1.mark}` == 0"  @click="commit">点击上传本地照片图片</button>
					<view class=""  v-if="`${item1.mark}` == 0" id="guild001"style="margin-top: 3px; height: 33px;"></view>	
					<button class="box" v-if="`${item1.mark}` == 1"  @click="">已成功上传照片</button>
					<button class="box"  v-if="`${item1.mark}` == 1"  @click="lookpic(`${item}`)">查看已上传的图片</button>
					
					<view class="step" >第二步、上传本地图片后，对图片进行算法运算</view>
					
						<button class="box"  @click="updateFn(`${item1}`)">点击进行算法计算</button>
						<view class="" id="guild002"style="margin-top: 3px; height: 33px;">					</view>
	<!-- 				<block v-for="item in data" :key="item._id">
						<view class="">{{item.imgname}}</view>
						<image :src="item.imgurl" mode=""></image>
					</block> -->
					
				</view>
				<view v-else-if="loading">正在加载...</view>
			</unicloud-db>
			
			<guide :show="showGuide"
					:guideArray="guideArray" 
					:width="GWidth" 
					:height="GHeight" 
					:left="GLeft" 
					:top="GTop" 
					:currentIndex="currentGuideIndex" 
					@click="nextGuideHandle">
			</guide>
		</view>


</template>
<script src="https://cdn.bootcss.com/vue-resource/1.5.0/vue-resource.js"></script>
<script>
export default {
	data() {
		return {
			'percent':0,
			'url':'',
			'a':0,
			'pics_href':[],  //存储目的照片的链接
			'pics_name':[],   //存储目的照片的名字
			'pics_name_1':[],   //存储目的照片的名字
			item:{ 			  //用来上传图片
				"ID":235211,
				"data":'2021-8-1',  //日期，这里有点乱 没事了
				"imgurl":"",
				'imgname':"",
			},
			item1:{   //原来的链接的数据
				"_id":"",
				"ID":0,
				"data":"",
				"tall":"",
				"width":"",
				"mark":0
			},
			name:'',
			num:0,//计数
			showGuide:false,
			GWidth:"",
			GHeight:"",
			GLeft:"",
			GTop:"",
			currentGuideIndex:0,
			guideArray:[{
				guideID:"guild001",
				guideMessage:"将植株的照片拍摄后,保存在指定的文件夹下,点击上传本地植株照片",
				width:"400",//文字宽度
				type:"left",
				Mleft:"130",//提示框距离左边的距离
				Mtop:"",//提示框距离上边的距离
				Cleft:"",//提示框文字距离左边框的距离
				Btop:"280",//确认按钮距离上边的距离
			},{
				guideID:"guild002",
				guideMessage:"上传图片后,点击进行算法测量",
				width:"400",//文字宽度
				type:"left",
				Mleft:"130",//提示框距离左边的距离
				Mtop:"",//提示框距离上边的距离
				Cleft:"",//提示框文字距离左边框的距离
				Btop:"",//确认按钮距离上边的距离
			}]
		}
	},
	onReachBottom() { //滚动到底翻页
	  this.$refs.udb.loadMore()
	},

	methods: {
		/**
		 * 初始化指引页
		 */
		initGuideFun(currentGuideIndex){
			this.$nextTick(()=>{
				if(currentGuideIndex>=this.guideArray.length){
					this.showGuide=false
					return;
				}
				this.showGuide=true
				//根据布局信息显示引导框位置
				let ID="#"+this.guideArray[currentGuideIndex].guideID
				const query = uni.createSelectorQuery().in(this);
				query.select(ID).boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					this.GWidth = data.width;
					this.GHeight = data.height;
					this.GLeft = data.left;
					this.GTop = data.top;
				}).exec();
			})
		},
		/**
		 * 指引页确认按钮
		 */
		nextGuideHandle(){
			console.log("ok")
			if(this.currentGuideIndex>=this.guideArray.length){
				this.showGuide=false
				return;
			}
			this.currentGuideIndex+=1;
			this.initGuideFun(this.currentGuideIndex);
		},
		
		///////////////////////////////////////
		updateFn(item){
			if(this.item1.mark == 0){
				alert('请上传照片后再进行')
			}
			else{
				uni.navigateTo({
					url: '../update/update?item='+JSON.stringify(this.item1),
					success: res => {
						console.log('res')
						console.log(this.item.ID)
					},
					fail: () => {},
					complete: () => {}
				});
			}

		},
		lookpic(item){
			uni.navigateTo({
				url: '../pic_all/pic_all?item='+JSON.stringify(this.item),
				success: res => {

				},
				fail: () => {},
				complete: () => {}
			});
		},
		commit(){
			this.url = 'https://www.gdxy.asia:8443/pic/' + this.item.ID + '/'+this.item.data+'/';
			const that = this
			console.log(this.item)
			uni.showLoading({
				title:'正在扫描本地图片'
			});
			uni.request({
				url : 'https://www.gdxy.asia:8443/pic/' + this.item.ID + '/'+this.item.data+'/',
				method: 'GET',	
				success: res => {
					let reg = /tt>.*\.jpg/g  //提取出所需要的照片地址
					let pics_before = res.data.match(reg)
					//用来获取所有照片和名字
					console.log(pics_before)
					uni.hideLoading();
					if(pics_before == undefined)
					{
						alert('系统没有检测到拍照图片，请进行拍照后保存在指定文件夹下')
					}
					else{
						alert('找到'+Number(pics_before['length']) +'张照片，点击确定进行上传');
						this.num = Number(pics_before['length']);
						uni.showLoading({
							title:'上传图片中 '+0+'/'+this.num
						});
						for(var i = 0; i < Number(pics_before['length']);i++)
						{	

							let rep = pics_before[i].replace('tt>','')
							let href = this.url + rep
							this.pics_href[i] = href
							this.pics_name[i] = rep 
						}
						this.up_img(this.pics_href,this.pics_name,0); //开始上传图片
					}

				},
				fail: res => {
				}
			});
		},
		// 递归上传
		// imgPaths 待上传的所有图片路径数组
		// currentIndx 当前要上传的图片数组下标，从0开始
		up_img(pics_href,pics_name,currentIndx){
			var that = this
			// var path = '123/'+pics_name[currentIndx]
			var path = this.item.ID+'/'+this.item.data+'/'+pics_name[currentIndx]
			console.log('路径: '+path)
			console.log('当前图片路径: '+pics_href[currentIndx])
			uniCloud.uploadFile({
				filePath: pics_href[currentIndx],//当前图片路径
				cloudPath:path,//文件夹名
				success: (res1) => {
						uni.showLoading({
							title:'上传图片中 '+(currentIndx+1)+'/'+this.num
						});
					   console.log('第'+(currentIndx+1)+'图片上传成功')

					   this.item.imgname= pics_name[currentIndx];
					   uniCloud.getTempFileURL({
					   	fileList:[res1.fileID]
					   })
					   .then(res=>{
					   	 this.item.imgurl = res.fileList[0].download_url; //由于是腾讯云所以需要这样子来获取链接
						 
						 this.percent = parseInt((currentIndx+ 1)/pics_href.length * 100)
						 if(currentIndx < pics_href.length-1){
						   //继续 上传下一张图片
						   //这里要使用uniCloud而不是uni
						   console.log(this.item); 
							const db = uniCloud.database();
						   db.collection('imgurl').add(this.item).then(e=>{
							
							});
							that.up_img(pics_href,pics_name,currentIndx+1)
						 }
						 else{
						   //继续 上传下一张图片
						   //这里要使用uniCloud而不是uni
						   console.log(this.item); 
							const db = uniCloud.database();
							delete this.item.name
						   db.collection('imgurl').add(this.item).then(e=>{
							
							});
							//接下来进行标志mark
							this.item1.mark = 1 //表示传递成功
							let item1 = {...this.item1}
							console.log(item1); 
							delete item1._id
							db.collection('growData').doc(this.item1._id).update(item1).then(e=>{
								console.log(e); 
							});
						   console.log('上传成功'+(currentIndx+1)+'上传成功')
						   uni.hideLoading();
						   alert('上传成功了，总共上传了 '+pics_href.length + '张图片')
						   
						  //不用使用跳转，上传图片后对数据进行查询即可
						  //  uni.navigateTo({
								// url: '../show/show',
								// success: res => {},
								// fail: () => {},
								// complete: () => {}
						  //  });
 
							//console.log(this.item1._id)
						}
					   })

				  },
				fail: () => {console.log('第'+(currentIndx+1)+'图片上传失败！！！')},
				complete: (res) => {

				}
			})
		}
	},
	onLoad({item}) {
		console.log(item)
		if(item != undefined)
		{		var tem = JSON.parse(item)
				this.item1 = JSON.parse(item)
				this.item.ID = tem.ID
				this.item.data = tem.data
				//console.log(this.item1._id)
				console.log(this.item)  //打印出传递的参数
		}
	},
	onShow() {
		this.initGuideFun(this.currentGuideIndex);
	}
}
</script>

<style lang="scss" scoped>
.tip{
	width: 400rpx;
	
}
.box{
	margin-top: 20rpx;
}
.step{
	margin-top: 20rpx;
}
.refund-wrap{
		display: flex;
		flex-direction: column;
		.refund-box{
			width: 91.47%;
			margin:12px auto;
			display: flex;
			flex-direction: column;
		}
	}
	// 退款金额
	.refund-money{
		display: flex;
		flex-direction: column;
		.refund-money-title{
			width: 100px;
			font-size:15px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
		.refund-money-con{
			width: 100%;
			background: #252841;
			border: 1px solid #575B79;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			.refund-money-conItem{
				width:95.33%;
				display: flex;
				flex-direction: row;
				margin:12.5px auto;
				.refund-money-lf{
					width: 50%;
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
				.refund-money-rg{
					width: 50%;
					text-align: end;
					.refund-money-rg1{
						font-size: 16px;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #F15251;
						margin-right: 10px;
					}
					.refund-money-rg2{
						font-size: 12px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						text-decoration: line-through;
						color: #999999;
					}
				}
			}
			
		}
	}
    //退款说明
	.matchDetail-introduce{
		display: flex;
		flex-direction: column;
		.matchDetail-introduce-title{
			font-size:15px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
		.matchDetail-introduce-con{
			width: 100%;
			background: #252841;
			border: 1px solid #575B79;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			padding-top: 12.5px;
			.matchDetail-introduce-item{
				width:95.33%;
				margin: auto;
				display: flex;
				flex-direction: column;
				margin-bottom: 12.5px;
			}
			
			.matchDetail-introduce-itemtitle{
				flex: 1;
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				position: relative;
				.point{
					position: absolute;
					top: -3px;
				}
				.matchDetail-introduce-itemtitletxt{
					padding-left: 10px;
				}
			}
			.matchDetail-introduce-itemsubtitle{
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 6.5px;
			}
		}
		
	}
	.refund-reason{
		display: flex;
		flex-direction: column;
		.refund-reason-title{
			font-size:15px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
		.refund-reason-con{
			width: 100%;
			background: #252841;
			box-shadow: 0px 2.5px 9px 0px rgba(0, 0, 0, 0.21);
			border: 1px solid #575B79;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			
			.textarea{
				width:95.33%;
				margin:11px auto;
				height: 135px;
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			.placeholderclass{
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
		}
		
	}
	
	.matchDetail-footer{
		position: fixed;
		height: 65px;
		bottom: 0;
		left: 0;
		right: 0;
		background: #0A0E1D;
		box-shadow: 0px -3px 13px 0px rgba(255, 255, 255, 0.05);
		z-index: 2;
		display: flex;
		.submit-btn{
			width: 100%;
			height: 44px;
			background: linear-gradient(0deg, #F65555 0%, #E54848 100%);
			border-radius: 22px;
			font-size: 18px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFEFA;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 10px 27.5px;
		}
		.form-disabled{
			background: #1B202F;
			width:100%;
			height: 44px;
			border-radius: 22px;
			font-size: 18px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #82838F;
			margin: 10px 27.5px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>

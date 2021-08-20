<template>
	<view>
		<view class="progress-box">
			<progress :percent=percent show-info stroke-width="3" />
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="imgurl"   :getone="false"  :where="`ID == ${item.ID} && data == '${item.data}'`">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<button  @click="commit">上传图片</button>
				<block v-for="item in data" :key="item._id">
					<view class="">{{item.imgname}}</view>
					<image :src="item.imgurl" mode=""></image>
				</block>
				
			</view>
			<view v-else-if="loading">正在加载...</view>
		</unicloud-db>
	</view>
		</block>
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
				"ID":132124,
				"data":'2021-8-1',  //日期，这里有点乱 没事了
				"imgurl":"",
				'imgname':"",
			}  
		}
	},
	onReachBottom() { //滚动到底翻页
	  this.$refs.udb.loadMore()
	},

	methods: {
		commit(){
			this.url = 'https://www.gdxy.asia:8443/pic/' + this.item.ID + '/'+this.item.data+'/';
			const that = this
			console.log(this.item)
			uni.request({
				url : 'https://www.gdxy.asia:8443/pic/' + this.item.ID + '/'+this.item.data+'/',
				method: 'GET',	
				success: res => {
					let reg = /tt>.*\.jpg/g  //提取出所需要的照片地址
					let pics_before = res.data.match(reg)
					//用来获取所有照片和名字
					for(var i = 0; i < Number(pics_before['length']);i++)
					{	
						let rep = pics_before[i].replace('tt>','')
						let href = this.url + rep
						this.pics_href[i] = href
						this.pics_name[i] = rep 
					}
					this.up_img(this.pics_href,this.pics_name,0); //开始上传图片
				},
			});
		},
		// 递归上传
		// imgPaths 待上传的所有图片路径数组
		// currentIndx 当前要上传的图片数组下标，从0开始
		up_img(pics_href,pics_name,currentIndx){
			var that = this
			uniCloud.uploadFile({
				filePath: pics_href[currentIndx],//当前图片路径
				cloudPath:pics_name[currentIndx],//文件夹名
				success: (res1) => {
					   console.log('第'+(currentIndx+1)+'图片上传成功')
					   this.item.imgname= pics_name[currentIndx];
					   this.item.imgurl = res1.fileID;
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
						   db.collection('imgurl').add(this.item).then(e=>{
						   	
						    });
						   console.log('上传成功'+(currentIndx+1)+'上传成功')
						   alert('上传成功了，总共上传了 '+pics_href.length + '张图片')
					   }
				  },
				fail: () => {console.log('第'+(currentIndx+1)+'图片上传失败！！！')},
				complete: (res) => {

				}
			})
		}
	},
	onLoad({item}) {
		if(item != undefined)
		{		var tem = JSON.parse(item)
				this.item.ID = tem.ID
				this.item.data = tem.data
				console.log(this.item)  //打印出传递的参数
		}
	},
}
</script>

<style>

</style>

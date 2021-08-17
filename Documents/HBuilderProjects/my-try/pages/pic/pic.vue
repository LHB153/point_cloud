<template>
	<view>
		<button  @click="commit">上传图片</button>
		<block v-for="(item,index) in pics_href" :key="index">
			<view class="">{{index}}</view>
			<image :src="item" mode=""></image>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			'a':0,
			'url':'https://www.gdxy.asia:8443/pic/132124/2021-8-1/',
			'pics_href':[],  //存储目的照片的链接
			'pics_name':[],   //存储目的照片的名字
			item:{ 			  //用来上传图片
				"ID":132124,
				"data":'2021-8-1',  //日期，这里有点乱
				"imgurl":"",
				'imgname':""
			}  
		}
	},
	methods: {
		commit(){
			uni.request({
				url: 'https://www.gdxy.asia:8443/pic/132124/2021-8-1/',
				method: 'GET',	
				data: {}, 
				success: res => {
				let reg = /tt>.*\.jpg/g  //提取出所需要的照片地址
				let pics_before = res.data.match(reg)
				
					for(var i = 0; i < Number(pics_before['length']);i++)
					{	
						console.log(i)
						var rep = pics_before[i].replace('tt>','')
						var href = this.url + rep
						console.log(href)  //提取出每一个照片
						this.pics_href[i] = href
						this.pics_name[i] = rep 
						this.item.imgname= this.pics_name[i];
				//		console.log(this.pics_href[i])
					}
					for(var i = 0; i < Number(pics_before['length']);i++)
					{
						//console.log(this.pics_href[0])
						//这里要使用uniCloud而不是uni
						uniCloud.uploadFile({
							filePath:this.pics_href[i],//当前图片路径
							cloudPath:this.pics_name[i],//文件夹名
							success: (res1) => {
							       //console.log(res1.fileID);
								   console.log('success')
								   this.item.imgurl = res1.fileID;
								   
								   const db = uniCloud.database();
								   db.collection('imgurl').add(this.item).then(e=>{
								  // 	console.log(e); 
								   });
							  }
						})
					 
					}
					alert('上传成功了，总共上传了 '+pics_before['length'] + '张图片')
				},
				fail: () => {console.log(123)},
				complete: () => {}
			});
		}
	},
	onLoad:function(){
		

	}
}
</script>

<style>

</style>

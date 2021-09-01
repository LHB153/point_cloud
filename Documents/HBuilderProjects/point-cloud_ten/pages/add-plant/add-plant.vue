<template>
	<view>
		<uni-easyinput  v-model.number="item.ID" placeholder="植株编号ID" />
		<uni-easyinput  v-model="item.name" placeholder="植株名字" />
		<uni-easyinput  v-model="item.data" placeholder="记录的日期[例如 2021-8-1]" />
		<uni-easyinput  v-model="item.tall_cal" placeholder="植株实际长度(可不填)" />
		<uni-easyinput  v-model="item.width_cal" placeholder="植株实际宽度(可不填)" />
		<uni-group >
			<uni-file-picker  class="pic_limit" @success="success"     @select="select"  ref="files" limit="1" title="选择植株的照片"></uni-file-picker>
		</uni-group>
		<button type="default" @click="submit" >提交</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				item:{
					"ID":0,
					"name":"",
					"iconurl":"",
					"data":'',
					"tall_cal":"",
					"width_cal":"",
					"mark":""
				}
			}
		},
		methods:{

			upload(){
				this.$refs.files.upload()
			},
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 上传成功
			success(e){
			    console.log('上传成功'),
			//	console.log(e)
			//	console.log(e.tempFilePaths[0])
				this.item.iconurl = e.tempFilePaths[0]
				//console.log(this.iconurl)
				uniCloud.getTempFileURL({
					fileList:[this.item.iconurl]
				})
				.then(res=>{
					this.item.iconurl = res.fileList[0].download_url; //由于是腾讯云所以需要这样子来获取链接
				})
			},
			submit(){
				const db = uniCloud.database();
				uni.showLoading({
					title:'上传记录中'
				});
				db.collection('class').add(this.item).then(e=>{
					console.log(e); 
					uni.hideLoading()
					uni.navigateTo({
						url: '../pic/pic?item='+JSON.stringify(this.item)+'&name='+decodeURIComponent(this.item.name),
					})
				});

			},
		}
	}
</script>

<style>
	.pic_limit{
		width: 1000upx;
	}
</style>

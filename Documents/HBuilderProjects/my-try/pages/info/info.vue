<template>
	<view>
		
		<view class="title">{{name}}</view>
		<button class="add" @click="add">点击添加记录</button>
		<!--data表示拿到的数据-->
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :where="`ID ==${ID}`" collection="growData">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" @longpress.native="rmItem(item._id)" @click="updateFn(item)"  :key="item._id" :title="'记录日期：'+ item.data + ' '+(item.mark == 1 ?'已上传照片 ':'未上传照片 ')"   :note="'算法计算得出的高度：'+item.tall + 'cm 宽度：' + item.width +'cm'" link >
						
					</uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
		
	</view>
</template>

<script>
	const db = uniCloud.database();
	const collection = db.collection('growData')
	export default{
		data(){
			return {
				res:'hello',
				ID: 1,
				name:"植株1",
				mark:'未记录'
			}
		},
		onLoad:function(e){
			console.log(e);
			this.ID = e.ID;
			this.name = decodeURIComponent(e.name);
			console.log(e);
			
		},
		methods:{
			updateFn(item){
				uni.navigateTo({
					url: '../pic/pic?item='+JSON.stringify(item)+'&name='+decodeURIComponent(this.name),
			//		url: '../update/update?item='+JSON.stringify(item),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			add(){
				uni.navigateTo({
					url:'../add/add?ID='+this.ID+'&name='+decodeURIComponent(this.name)
				})
			},
			rmItem(id){
				this.$refs.udb.remove(id)
			}
		}
	}
</script>

<style>
.title
{
	text-align: center;
}
.add{
	color: #007AFF;
	text-align: center;
}
</style>

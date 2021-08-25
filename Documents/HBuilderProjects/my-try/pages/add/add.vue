<template>
	<view>
		<uni-easyinput  v-model.number="item.ID" placeholder="植株的编号ID" />
		<uni-easyinput  v-model="item.data" placeholder="记录的日期[例如 2021-8-1]" />
<!-- 		<uni-easyinput  v-model="item.tall" placeholder="算法计算的高度(cm)" />
		<uni-easyinput  v-model="item.width" placeholder="算法计算的宽度(cm)" /> -->
		<button type="default" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				item:{
					"ID":0,
					"data":"",
					"tall":"",
					"width":"",
					"mark":0
				},
				name:''
			}
		},
		onLoad:function(e) {
			this.item.ID = Number(e.ID);
			console.log(this.ID)
			this.name = decodeURIComponent(e.name)
		},
		methods:{
			submit(){
				const db = uniCloud.database();
				uni.showLoading({
					title:'上传记录中'
				});
				db.collection('growData').add(this.item).then(e=>{
					console.log(e);
					uni.hideLoading()
					 uni.navigateTo({
					 	url:'../info/info?ID='+this.item.ID+'&name='+decodeURIComponent(this.name),
					 })
				});

			}
		}
	}
</script>

<style>
</style>

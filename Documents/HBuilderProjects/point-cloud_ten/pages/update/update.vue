<template>
	<view>
		<uni-easyinput  v-model.number="item.ID" placeholder="植株的编号ID" />
		<uni-easyinput  v-model="item.data" placeholder="记录的日期[例如 2021-8-1]" />
		<uni-easyinput  v-model="item.tall_cal" placeholder="实际的高度(cm)" />
		<uni-easyinput  v-model="item.width_cal" placeholder="实际的宽度(cm)" />
		<uni-easyinput  v-model="item.tall" placeholder="算法计算的高度(cm)" />
		<uni-easyinput  v-model="item.width" placeholder="算法计算的宽度(cm)" />
		<button type="default" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				item:{
					"_id":"",
					"ID":0,
					"data":"",
					"tall":"",
					"width":"",
					"tall_cal":"",
					"width_cal":"",
					"width":"",
					"mark":0
				},
				name:""
			}
		},
		onLoad({item}) {
			 const db = uniCloud.database()
			 this.item = JSON.parse(item)
			  // 使用`jql`查询list表内`name`字段值为`hello-uni-app`的记录
			  db.collection('class')
				.where('ID =='+this.item.ID)
				.get()
				.then((res)=>{
					console.log(res)
					console.log(res.result.data[0].name)
					this.name = res.result.data[0].name; //提取名字
				  // res 为数据库查询结果
				}).catch((err)=>{
				  // err.message 错误信息
				  // err.code 错误码
				})
			console.log('this.item')
		},
		methods:{
			submit(){
				const db = uniCloud.database();
				let item = {...this.item}
				console.log(this.item)
				delete item._id
				db.collection('class').doc(this.item._id).update(item).then(e=>{
					console.log(e); 
				});
				success:{
					uni.navigateTo({
						// url:'../info/info?ID='+this.item.ID + "&name="+decodeURIComponent(this.name),
						url:'../tabel/tabel?item='+JSON.stringify(this.item),	
					})
				}
			}
		}
	}
</script>

<style>
</style>

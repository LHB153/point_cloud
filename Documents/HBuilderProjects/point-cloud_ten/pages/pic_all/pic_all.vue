<template>
	<view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="imgurl"   :getone="false"  :where="`ID == ${item.ID} && data == '${item.data}'`">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<block v-for="item in data" :key="item._id">
					<view class="">{{item.imgname}}</view>
					<image :src="item.imgurl" mode=""></image>
				</block>
			</view>
			<view v-else-if="loading">正在加载...</view>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{ 			  //用来上传图片
					"ID":132124,
					"data":'2021-8-1',  //日期，这里有点乱 没事了
					"imgurl":"",
					'imgname':"",
				}
			}
		},
		methods: {
			
		},
		onReachBottom() { //滚动到底翻页
		  this.$refs.udb.loadMore()
		},
		onLoad({item}) {
			this.item = JSON.parse(item)
		}
	}
</script>

<style>

</style>

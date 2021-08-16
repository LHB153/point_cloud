<template>
	<view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			'a':0,
			'url':'http://43.130.10.114:8080/pic/132124/2021-8-1/',
			'pics_href':[]
		}
	},
	methods: {
		
	},
	onLoad:function(){
		uni.request({
			url: 'http://43.130.10.114:8080/pic/132124/2021-8-1/',
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
					console.log(href)
					this.pics_href[i] = href
					console.log(this.pics_href[i])
				}
			},
			fail: () => {},
			complete: () => {}
		});
	}
}
</script>

<style>

</style>

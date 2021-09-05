<template>
	<view>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="class"   :getone="false" >
			<view v-if="error">{{error.message}}</view>
			<view v-else>

				<h3 class="title">植株详细数据</h3>
				<div class="button">
					<button type="button"  @click='bcexcel' class="el-button el-button--primary">
						<span>导出excel</span>
					</button>
				</div>

				<tr >
				  <th style="margin-right: 30px; width: 60px;border-style: solid;border: 1px solid" class="th">序号</th>
				  <th  style="margin-right: 30px; width:90px;border-style: solid;border: 1px solid">植株名字</th>
				  <th style="margin-right: 30px; width: 90px;border-style: solid;border: 1px solid">植株ID</th>
				  <th style="margin-right: 30px; width: 90px;border-style: solid;border: 1px solid">记录日期</th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid">实际长度</th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid">实际宽度</th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid">算法长度</th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid">算法宽度</th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid"></th>
				  <th style="margin-right: 30px; width: 45px;border-style: solid;border: 1px solid"></th>
				</tr>
				<tr v-for="(item,index) in data" :key="item._id">
					<td style="margin-top: 3px; height: 33px;text-align: center;border-style: solid;border: 1px solid">{{index+1}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.name}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.ID}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.data}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.tall_cal}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.width_cal}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.tall}}</td>
					<td style="text-align: center;border-style: solid;border: 1px solid">{{item.width}}</td>
					
					<td style="text-align: center;border-style: solid;border: 1px solid;vertical-align:middle;color: #fff;background-color: #409eff;border-color: #2C405A;"  @click='chgdata(item)'>修改</td>
					<td style="text-align: center;border-style: solid;border: 1px solid;vertical-align:middle;color:#fff;background-color: #409eff;border-color: #2C405A;"  @click='rmItem(item._id)'>删除</td>

				</tr>

			</view>
			
			<view v-else-if="loading">正在加载...</view>
		</unicloud-db>
<!-- <div>
  {{ message }}
  <table >
    <tr>
      <th>序号</th>
      <th v-for="key in orderBy" >
        {{tableTh[key].title}}
      </th>
    </tr>
    <tr v-for="(tr,i) in dataList">
      <td>{{i+1}}</td>
      <td v-for="key in orderBy" v-bind:align="tableTh[key].align">
        {{tr[key]}}
      </td>
    </tr>
  </table>
</div> -->
<!-- 		<div>
		  {{ message }}
		  <table class="table_default1" >
		    <tr>
		      <th>序号</th>
		      <th v-for="th in tableTh" >
		        {{th.title}}
		      </th>
		    </tr>
		    <tr v-for="(tr,index) in dataList">
		      <td>{{index+1}}</td>
		      <td v-for="td in tr" >
		        {{td}}
		      </td>
		    </tr>
		  </table>
		</div> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				luj:'',
				      message: '植株数据',
				      orderBy: ["c1", "c2"], //可以控制字段的先后顺序，想调整列的先后顺序，改这个数组就行，可以做个性化设置
				      tableTh: {//表头的描述信息
				        c1: {
				          title: "植株名字", //还可以增加其他描述，比如width等
				          align: "left"
				        },
				        c2: {
				          title: "植株ID",
				          align: "left"
				        },
						c3: {
						  title: "记录日期",
						  align: "left"
						}
				      },
				      dataList: [
				        {
				          //数据包，字段名作为关键字，便于列的调整先后顺序
				          c1: "度娘2",
				          c2: "123123123"
				        },
				        {
				          c1: "企鹅2",
				          c2: "7897899787"
				        },
				        {
				          c1: "阿里爸爸2",
				          c2: "456456456"
				        }
				      ],
					  item:{
					  	"_id":"",
					  	"ID":0,
					  	"data":"",
					  	"tall":"",
					  	"width":"",
						"tall_cal":"",
						"width_cal":"",
					  	"mark":0
					  },
				    }

		},
		onLoad({item}) {
			this.item = JSON.parse(item)
		}
		,
		methods: {
			bcexcel(){
				uni.showLoading({
					title: '导出中',
					mask: false
				});
				uniCloud.callFunction({
					name:'chb-excel-demo'
				})
				.then(res => {
					var url = res.result.url //下载地址

					uni.hideLoading()
					window.open(url)
					// const downloadTask = uni.downloadFile({
					// 	url:'https://7463-tcb-ngfyecghba4a15-9dfapf9362545-1307211428.tcb.qcloud.la/导出结果_1630747771796.xlsx',
					// 	filePath:''
					// 	header:{'Access-Control-Expose-Headers':'Content-Disposition','content-type':'applicationjson'},
					// 	success:(res)=>{
					// 		if(res.statusCode === 200) {
					// 			console.log(res)
					// 		}
					// 	}
					// })
					
					// downloadTask.onProgressUpdate(function(res){
					// 	console.log('下载进度'+res.progress)
					// 	console.log('已经下载的数据长度'+res.totalBytesWritten)
					// 	console.log('预期需要下载的数据总长度'+res.totalBytesExpectedToWrite)
					// })
				})
			},
			chgdata(item){
				uni.navigateTo({
					url: '../update/update?item='+JSON.stringify(item),
					success: res => {
						console.log('res')
						console.log(item.ID)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			rmItem(id){  //删除数据
				this.$refs.udb.remove(id)
			}
		}
	}
</script>

<style>
.th {
	margin: 20;
}
.title {
		


}
.el-button--primary {
	color: #fff;
	background-color: #409eff;
	border-color: #409eff;
	width: 120rpx;
	height: 60rpx;
	font-size: 5pt;
	margin-bottom: 3rpx;
	position: flexed;
	margin-left: 0rpx;
	text-align: center;
}

</style>

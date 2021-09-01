<template>
	<view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="class"   :getone="false" >
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<tr >
				  <th style="margin-right: 30px; width: 60px;" class="th">序号</th>
				  <th  style="margin-right: 30px; width:90px;">植株名字</th>
				  <th style="margin-right: 30px; width: 90px;">植株ID</th>
				  <th style="margin-right: 30px; width: 90px;">记录日期</th>
				  <th style="margin-right: 30px; width: 45px;">实际长度</th>
				  <th style="margin-right: 30px; width: 45px;">实际宽度</th>
				  <th style="margin-right: 30px; width: 45px;">算法宽度</th>
				  <th style="margin-right: 30px; width: 45px;">算法宽度</th>
				</tr>
				<tr v-for="(item,index) in data" :key="item._id">
					<td style="margin-top: 3px; height: 33px;text-align: center;">{{index+1}}</td>
					<td style="text-align: center;">{{item.name}}</td>
					<td style="text-align: center;">{{item.ID}}</td>
					<td style="text-align: center;">{{item.data}}</td>
					<td style="text-align: center;">{{item.tall_cal}}</td>
					<td style="text-align: center;">{{item.width_cal}}</td>
					<td style="text-align: center;">{{item.tall}}</td>
					<td style="text-align: center;">{{item.width}}</td>
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
				      ]
				    }

		},
		methods: {
			
		}
	}
</script>

<style>
.th {
	margin: 20;
}
</style>

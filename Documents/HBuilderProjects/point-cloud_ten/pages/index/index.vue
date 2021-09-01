<template>
	<view class="content">
		<view class="login">
			<view class="login-top">登录</view>
			<view class="login-center clearfix">
				<view class="login-center-img"><image src="/static/name.png"/></view>
				<view class="login-center-input">
					<input type="text" placeholder="请输入您的用户名" v-model="userName" />
				</view>
			</view>
			<view class="login-center clearfix">
				<view class="login-center-img"><image src="/static/password.png" /></view>
				<view class="login-center-input">
					<input type="text" placeholder="请输入您的密码" v-model="password" />
				</view>
			</view>
			<view class="login-button" @click="login">登录</view>
		</view>
	</view>
<!-- 	<div>
		
		<div class="login_form"> -->
			<!--v-model 表示会将输入的数据传给变量userName-->
<!-- 			<input type="text" placeholder="用户名" v-model="userName">
			<input type="text" placeholder="密码" v-model="password">
			<button type="primary" @click="login">提交</button>
		</div>
		
	</div> -->
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello world',
				userName:'',
				password:'',
				isBtnLoading:false
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				if(this.userName == 'admin' && this.password == "123456")
				{
					this.$router.push({
					path:'/pages/function/function',
					})
				}
				else alert("请重新输入");
			}
		}
	}
</script>

<style>
*{
	box-sizing: content-box;
}
.clearfix:after{
	visibility: hidden;
	display: block;
	font-size: 0;
	content: ' ';
	clear: both;
	height: 0;
}
.cli {
	clear: both;
	font-size: 0;
	height: 0;
	overflow: hidden;
	display: block;
}
.lclear{
	clear: left;
	font-size: 0;
	height: 0;
	overflow: hidden;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.content{
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: hidden;
}
.login{
	width: 350px;
	border-radius: 5px;
	height: 500px;
	background: white;
}
.login-top {
	font-size: 24px;
	margin-top: 100px;
	padding-left: 40px;
	box-sizing: border-box;
	color: #333333;
	margin-bottom: 50px;
}
.login-center {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40px;
	margin-bottom: 30px;
}
.login-center-img {
	width: 40rpx;
	height: 40rpx;
	float: left;
	margin-top: 5px;
}

.login-center-img >image{
	width: 100%;
	height: 100%;
}
.login-center-input {
	float: left;
	width: 230px;
	margin-left: 15px;
	height: 30px;
	position: relative;
}
.login-center-input input {
	z-index: 2;
	transition: all 0.5s;
	padding-left: 10px;
	color: #333333;
	width: 100%;
	height: 30px;
	border: 0;
	border-bottom: 1px solid #cccccc;
	border-top: 1px solid #FFFFFF;
	border-left: 1px solid #FFFFFF;
	border-right: 1px solid #FFFFFF;
	box-sizing: border-box;
	outline: none;
	position: relative;
}
.login-center-input input:focus {
	border: 1px solid dodgerblue;
}
.login-center-input-text {
	background:white;
	padding: 0 5px;
	position: absolute;
	z-index: 0;
	opacity: 0;
	height: 20px;
	top: 50%;
	margin-top: -10px;
	font-size: 14px;
	left: 5px;
	color: dodgerblue;
	line-height: 20px;
}
.login-center-input input:focus ~ .login-center-input-text {
	top: 0;
	z-index: 3;
	opacity: 1;
	margin-top: -15px;
}
.login-button {
	cursor: pointer;
	width: 250px;
	text-align: center;
	height: 40px;
	line-height: 40px;
	background-color: dodgerblue;
	border-radius: 5px;
	margin: 0 auto;
	margin-top: 50px;
	color: white;
}
</style>


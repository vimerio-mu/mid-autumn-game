<template>
	<view class="container">
		<image src="../../static/moon3.png" class="backgournd" mode="widthFix"></image>
		<image src="../../static/logo/01.png" class="logo"></image>
		<view >
			<image src="../../static/popup/login.png" class="loginInputBg"></image>
			<input type="text" :value="username" placeholder="请点击输入你的工号" class="loginInput" @input="changeValue"/>
			<view v-if="username.length === 0">
				<image src="../../static/button/unable.png" v-if="username.length === 0" class="loginbtn"></image>
				<text class="text unable">开始造月</text>
			</view>
			<view v-if="username.length !== 0">
				<image src="../../static/button/able.png" class="loginbtn"></image>
				<button @click="login" class="loginbtnHide"></button>
				<text class="text able">开始造月</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: ''
			}
		},
		methods: {
			changeValue(e) {
				this.username = e.target.value;
			},
			login() {
				const vm = this
				uni.request({
					url:'http://10.20.147.32:8523/activity/identity/check/' + vm.username,
					success: function(res) {
						let code = res.data.code
							if(code === 500) {
								alert('用户不存在！')
							}else {
								uni.navigateTo({
									url: `/pages/index/index?username=${vm.username}`
								});
							}
						},
					fail: function(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		position: fixed;
		height: 100%;
		width: 100%;
	}
	.backgournd {
		position: absolute;
		width: 750rpx;
		height: 100%;
	}
	.logo {
		height: 180rpx;
		width: 688rpx;
		position: absolute;
		top: 150rpx;
		left: 38rpx;
	}
	.loginInputBg {
		height: 306rpx;
		width: 654rpx;
		position: absolute;
		bottom: 328rpx;
		left: 48rpx;
	}
	.loginInput {
		border: none;
		background-color: transparent;
		color: #FFFFFF;
		position: absolute;
		width: 654rpx;
		bottom: 500rpx;
		left: 48rpx;
		text-align:center;
		vertical-align:middel;
	}
	.loginbtn {
		width: 352rpx;
		height: 82rpx;
		position: absolute;
		bottom: 350rpx;
		left: 198rpx;
	}
	.loginbtnHide {
		background-color: transparent;
		border: none;
		width: 352rpx;
		height: 82rpx;
		position: absolute;
		bottom: 350rpx;
		left: 198rpx;
		z-index: 3;
	}
	.text {
		font-size: 56rpx;
		z-index: 2;
		position: absolute;
		bottom: 356rpx;
		left: 270rpx;
		font-family: YouSheBiaoTiHei;
	}
	.unable {
		color: #82838E;
	}
	.able {
		color: #FFFFFF;
	}
</style>

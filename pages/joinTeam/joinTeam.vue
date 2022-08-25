<template>
 	<view>
 		<image src="../../static/moon3.png" class="backgournd" mode="widthFix"></image>
 		<image src="../../static/logo/02.png" class="logo"></image>
 		<text class="textTitle">登陆你心仪的月球</text>
 		<image src="../../static/popup/teamName.png" class="teamNameBg"></image>
 		<input type="text" :value="teamName" 
 		placeholder="请点击输入月球名称，字符上限10" placeholder-class="input-placeholder"
 		maxlength=10
 		class="teamInput" @input="changeValue"/>
 		<view v-if="teamName.length === 0">
 			<image src="../../static/button/unable.png" class="teamNamebtn"></image>
 			<text class="text unable">登陆月球</text>
 		</view>
 		<view v-if="teamName.length !== 0">
 			<image src="../../static/button/able.png" class="teamNamebtn"></image>
 			<button @click="createTeam" class="teamNamebtnHide"></button>
 			<text class="text able">登陆月球</text>
 		</view>
 		<uni-popup ref="popupSuccess">
 			<view class="popup">
 				<image src="../../static/popup/popup.png" class="popupBg"></image>
 				<text class="title">组队成功</text>
 				<view class="popText success">
 					<text>
 						组队成功
 						开始编写你们的日志吧
 					</text>
 				</view>
 				<image src="../../static/button/btn.png" class="BtnBg"></image>
 				<button class="btn" @click="openDiaryPage">去写日记</button>
 			</view>
 		</uni-popup>
 		<uni-popup ref="popupError">
 			<view class="popup">
 				<image src="../../static/popup/popup.png" class="popupBg"></image>
 				<text class="title">组队失败</text>
 				<view class="popText fail">
 					<text>
 						该月球不存在
 						组队失败
 					</text>
 				</view>
 				<image src="../../static/button/btn.png" class="BtnBg"></image>
 				<button class="btn" @click="closeErrorPopup">返回</button>
 			</view>
 		</uni-popup>
 		<view style="padding-top: 210rpx;">
 			<RulePopup></RulePopup>
 		</view>
 	</view>
 </template>
 
 <script>
 	export default {
 		data() {
 			return {
 				teamName: '',
 				username: '',
				teamId:''
 			}
 		},
 		onLoad(options) {
 			this.username = options.username;
 		},
 		methods: {
 			changeValue(e) {
 				this.teamName = e.target.value;
 			},
 			createTeam() {
 				const vm = this
				uni.request({
					url:`http://10.20.147.32:8523/activity/team?teamName=${vm.teamName}`,
					success: function(res) {
						if(res.data.code===500){
							let code = res.data.code
							vm.$refs.popupError.open('center')
						}else {
							vm.teamId = res.data.data.teamId
							vm.$refs.popupSuccess.open('center')
						}
					}
				})
 			},
 			openDiaryPage() {
 				uni.navigateTo({
 					// 将teamName传给之后的页面
 					url:  `/pages/memberDiary/memberDiary?username=${this.username}&teamName=${this.teamName}&teamId=${this.teamId}`,
 				});
 				this.$refs.popupSuccess.close()
 			},
 			closeErrorPopup() {
 				this.$refs.popupError.close()
 			}
 		}
 	}
 </script>
 
 <style scoped>
 	.backgournd {
 		position: absolute;
 		width: 750rpx;
 		height: 100%;
 	}
 	.logo {
 		height: 310rpx;
 		width: 688rpx;
 		position: absolute;
 		top: 54rpx;
 		left: 38rpx;
 	}
 	.textTitle {
 		font-size: 56rpx;
 		z-index: 2;
 		position: absolute;
 		top: 244rpx;
 		left: 176rpx;
 		color: #fff;
 		font-family: YouSheBiaoTiHei;
 		background: linear-gradient(122deg, #FFFFFF 0%, #DCEBFF 100%);
 		-webkit-background-clip: text;
 		-webkit-text-fill-color: transparent;
 	}
 	.popup {
 		width: 654rpx;
 		height: 448rpx;
 		line-height: 40rpx;
 	}
 	.popupBg {
 		position: absolute;
 		z-index: -1;
 		width: 654rpx;
 		height: 448rpx;
 	}
 	.title {
 		position: absolute;
 		top: 20rpx;
 		left: 226upx;
 		font-size: 56upx;
 		color: #fff;
 		font-family: "YouSheBiaoTiHei";
 	}
 	.popText {
 		text-align: center;
 		font-size: 28rpx;
 		color: #fff;
 		font-family: PingFangSC-Regular, PingFang SC;
 	}
 	.success {
 		position: absolute;
 		bottom: 224rpx;
 		left: 172rpx;
 		height: 80rpx;
 	}
 	.fail {
 		position: absolute;
 		bottom: 224rpx;
 		left: 230rpx;
 		height: 80rpx;
 	}
 	.BtnBg {
 		width: 240rpx;
 		height: 88rpx;
 		position: absolute;
 		bottom: 72rpx;
 		left: 208rpx;
 	}
 	.btn {
 		background-color: transparent;
 		border: none;
 		width: 240rpx;
 		height: 88rpx;
 		position: absolute;
 		bottom: 72rpx;
 		left: 208rpx;
 		color: #fff;
 		line-height: 88rpx;
 		font-family: PingFangSC-Regular, PingFang SC;
 	}
 	.teamNameBg {
 		width: 654rpx;
 		height: 468rpx;
 		position: absolute;
 		bottom: 96rpx;
 		left: 48rpx;
 	}
 	.teamInput {
 		border: none;
 		background-color: transparent;
 		color: #FFFFFF;
 		position: absolute;
 		width: 654rpx;
 		bottom: 340rpx;
 		left: 48rpx;
 		text-align:center;
 		font-family: "YouSheBiaoTiHei";
 		font-size: 56rpx;
 	}
 	/deep/.input-placeholder {
 		font-size: 28rpx;
 		font-family: PingFangSC-Semibold, PingFang SC;
 		font-weight: 600;
 		color: #FFFFFF;
 		opacity: 0.53;
 		line-height: 40px;
 	}
 	.teamNamebtn {
 		height: 82rpx;
 		width: 352rpx;
 		position: absolute;
 		bottom: 114rpx;
 		left: 198rpx;
 	}
 	.teamNamebtnHide {
 		height: 82rpx;
 		width: 352rpx;
 		position: absolute;
 		bottom: 114rpx;
 		left: 198rpx;
 		background-color: transparent;
 		border: none;
 		z-index: 3;
 	}
 	.text {
 		position: absolute;
 		bottom: 122rpx;
 		left: 274rpx;
 		font-family: "YouSheBiaoTiHei";
 		font-size: 56rpx;
 		line-height: 72rpx;
 	}
 	.unable {
 		color: #82838E;
 	}
 	.able {
 		color: #FFFFFF;
 	}
 </style>
 
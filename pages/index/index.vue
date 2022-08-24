<template>
	<view>
		<image src="../../static/indexBg.png" class="backgournd" ref="test"></image>
		<view class="bottom">
			<image src="../../static/IndBtnBg.png" class="indBtnBg"></image>
			<image src="../../static/button/recover.png" class="indBtnImg"></image>
			<button class="indBtn" @click="openCardPopup"></button>
		</view>
<!-- 		<image src="../../static/button/rule.png" class="ruleBtnImg"></image>
		<button class="ruleBtn" @click="openRulePopup"></button> -->
		<image src="../../static/button/info.png" class="infoBtnImg"></image>
		<button class="infoBtn"></button>
		<RulePopup></RulePopup>
<!-- 		<uni-popup ref="rule" type="center">
			<image src="../../static/popup/rulePopup.png" class="popupImg"></image>
			<scroll-view scroll-y="true" class="popup">
				<view class="popText">
					<text class="title">游戏规则</text>
					<text>
						1、输入框1：“创造一个属于你们的月球吧”：+提交按钮
						3、输入框3：“请与成员开启“太空日记”接龙吧”：（提示框内容：你的日记至少要有一个”月“字哟”）+提交按钮
						1、队长点击“完成组队”后身份不匹配时，所有成员显示弹框页面：“身份不匹配，请重新组队“ 
					</text>
					<text class="title">奖项设置</text>
					<text>
						2、关闭弹窗按钮（可返回完成组队前环节，可继续邀请组员加入，重新点击完成组队）
						4、文案：茫茫太空，点亮一颗专属月球，记录你们的探险旅程，邂逅一场华丽的月球星空吧。
						</text>
				</view>
				<image src="../../static/button/btn.png" class="confirmBtnImg"></image>
				<button class="confirmBtn" @click="closeRulePopup">确认</button>
			</scroll-view>
		</uni-popup> -->
		<view class="test" v-if="openCard">
			<view class="identityCard">
				<image src="../../static/button/close.png" class="closeBtnBg"></image>
				<button @click="closeCardPopup" class="closeBtn"></button>
				<image src="../../static/button/btn.png" class="recevieBtnBg"></image>
				<button @click="toCardPage" class="recevieBtn">收下身份牌</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '27288',
				name:'',
				identify: 0,
				openCard: false
			}
		},
		onLoad() {	
			var that = this
			// 获取用户工号
			// dd.getAuthCode({
			//     success:function(res){
			//         /*{
			//             authCode: 'hYLK98jkf0m' //string authCode
			//         }*/
			// 		uni.request({
			// 			url:'http://10.20.147.32:8523/dd/login/' + res.authCode,
			// 			success: function(res) {
			// 				that.username = res.userid
			// 			},
			// 			fail: function(e) {
			// 				console.log(e)
			// 			}
			// 		})
			//     },
			//     fail:function(err){
			// 		console.log(err)
			//     }
			// });
			// 获取用户工号
			
			// 判断用户是否已经获取了身份牌，如果获取了直接跳转到card页面
			// uni.request({
			// 	url:'http://10.20.147.32:8523/activity/identity/extract/' + this.username,
			// 	success: function(res) {
			// 		let code = res.data.code
			// 		if(code === 500) {
			// 			uni.navigateTo({
			// 				url: `/pages/card/card?username=${that.username}`,
			// 			});
			// 		}else {
			// 			that.identify = res.data.data.cardId
			// 		}
			// 	},
			// 	fail: function(e) {
			// 		console.log(e)
			// 	}
			// })
			// 判断用户是否已经获取了身份牌，如果获取了直接跳转到card页面
		},
		methods: {
			openInfoPage() {
				uni.navigateTo({
					url: '/pages/info/info',
				});
			},
			openCardPopup() {
				// this.$refs.card.open('center');
				this.openCard = true
			},
			closeCardPopup() {
				this.openCard = false
			},
			toCardPage() {
				uni.navigateTo({
					url: `/pages/card/card?username=${this.username}`,
				});
				this.openCard = false
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
	.indBtnBg {
		position: absolute;
		bottom: 0;
		height: 272rpx;
		width: 100%;
	}
	.indBtnImg {
		position: absolute;
		bottom: 122rpx;
		width: 474rpx;
		height: 186rpx;
		left: 138rpx;
	}
	.indBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		bottom: 122rpx;
		width: 474rpx;
		height: 186rpx;
		left: 138rpx;
	}
	.infoBtnImg {
		position: absolute;
		left: 48rpx;
		top: 80rpx;
		width: 128rpx;
		height: 134rpx;
	}
	.infoBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		left: 48rpx;
		top: 80rpx;
		width: 128rpx;
		height: 134rpx;
	}
	.identityCard {
		width: 550rpx;
		height: 900rpx;
		background-color: transparent;
		/* animation: border 2s infinite; */
	}
	.closeBtnBg {
		position: absolute;
		top: 0;
		right: 0;
		height: 56upx;
		width: 56upx;
	}
	.closeBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		top: 0;
		right: 0;
		height: 56upx;
		width: 56upx;
	}
	.recevieBtnBg {
		position: absolute;
		width: 328upx;
		height: 88upx;
		bottom: 0;
		left: 111upx;
	}
	.recevieBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		position: absolute;
		width: 328upx;
		height: 88upx;
		bottom: 0;
		left: 111upx;
		color: #fff;
		font-size: 44upx;
		line-height: 88rpx;
		letter-spacing: 5rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.test {
		position: absolute;
		top: 200upx;
		left: 100upx;
		width: 550rpx;
		height: 900rpx;
		animation: popin 0.5s ease-out;
	}
	/* 发光 */
	@keyframes border {
		from {
		-webkit-box-shadow: 0 0 50px rgb(50, 97, 224);
		}
		50% {
		-webkit-box-shadow: 0 0 50px rgb(255, 252, 96);
		}
		to {
		-webkit-box-shadow: 0 0 50px rgb(50, 97, 224);
		}
	}
	@keyframes popin {
		from {
			transform: scale(0.1) rotateY(0deg);
		}
		to {
			transform: scale(1) rotateY(720deg);
		}
	}
</style>

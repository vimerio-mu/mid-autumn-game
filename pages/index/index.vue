<template>
	<view class="container">
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
		<view class="blackBg" v-if="openCard">
			<view class="identityCard">
				<image src="../../static/button/close.png" class="closeBtnBg"></image>
				<button @click="closeCardPopup" class="closeBtn"></button>
				<image :src='identityImg' mode="widthFix" class="indPopup"></image>
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
				openCard: false,
				identityImg: ''
			}
		},
		onLoad(options) {	
			var vm = this
			// 获取用户工号
			// #ifdef H5
			vm.username = options.username
			// #endif
			// #ifdef MP-ALIPAY
			dd.getAuthCode({
			    success:function(res){
			        /*{
			            authCode: 'hYLK98jkf0m' //string authCode
			        }*/
					console.log('authcode',res.authCode)
					uni.request({
						url:'http://10.20.147.32:8523/dd/login/' + res.authCode,
						success: function(res) {
							vm.username = res.data.userid
							console.log('res',res)
							},
						fail: function(e) {
							console.log(e)
						}
					})
			    },
			    fail:function(err){
					console.log(err)
			    }
			});
			// #endif	
			// 判断用户是否已经获取了身份牌，如果获取了直接跳转到card页面
			uni.request({
				url:'http://10.20.147.32:8523/activity/identity/extract/' + this.username,
				success: function(res) {
					let code = res.data.code
					if(code === 500) {
						uni.navigateTo({
							url: `/pages/card/card?username=${vm.username}`,
						});
					}else {
						vm.identify = res.data.data.cardId
					}
				},
				fail: function(e) {
					console.log(e)
				}
			})
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
				uni.request({
					url: `http://10.20.147.32:8523/activity/identity/${this.username}`,
					method: 'GET',
					data: {},
					success: res => {
						if(res.data.code===200){
							this.cardId = res.data.data.cardId;
							this.employeeName = res.data.data.employeeName;
							switch (this.cardId){
								case 1:
									this.identityImg = '../../static/identity/1card.png';
									break;
								case 2:
									this.identityImg = '../../static/identity/2card.png';
									break;
								case 3:
									this.identityImg = '../../static/identity/3card.png';
									break; 
								default:
									break;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
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
		position: absolute;
		top: 244rpx;
		left: 100rpx;
		width: 550rpx;
		height: 900rpx;
		animation: popin 0.5s ease-out;
		background-color: transparent;
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
	.indPopup {
		position: absolute;
		top: 100rpx;
		left: 29rpx;
		height: 634rpx;
		width: 492rpx;
		animation: border 2s infinite;
	}
	.blackBg {
		position: absolute;
		background-color: rgba(0,0,0,0.53);
		width: 750rpx;
		height: 100%;
	}
	/* 发光 */
	@keyframes border {
		from {
		filter: drop-shadow(0px 0px 30px rgb(50, 97, 224));
		}
		50% {
		filter: drop-shadow(0px 0px 30px rgb(255, 252, 96));
		}
		to {
		filter: drop-shadow(0px 0px 30px rgb(50, 97, 224));
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

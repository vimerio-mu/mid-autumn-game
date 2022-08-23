<template>
	<!-- 抽取身份牌后个人页面 -->
	<view>
		<image class="bgImg" src="../../static/test.png" mode="aspectFill"></image>
		<image src="../../static/button/info.png" class="infoBtnImg"></image>
		<button class="infoBtn"></button>
		<RulePopup></RulePopup>
		<image @click="toHistory" class="historyBtnBg" src="../../static/button/history.png"></image>
		<button class="historyBtn" @click="toHistory"></button>
		<view class="identityCard">
			<image class="identityCardImg" :src="cardImg"></image>
			<text class="identityText">{{employeeName}} {{username}}</text>
		</view>
		<image @click="toCreateTeam" class="btnImg joinBtn" src="../../static/button/create.png"></image>
		<image @click="toJoinTeam" class="btnImg createBtn" src="../../static/button/join.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',	// 工号
				employeeName:'',
				cardImg:'',
				cardId:'',
			}
		},
		methods: {
			// 跳转到身份介绍页面
			toIdentitiesInfo(){
				uni.navigateTo({
					url:'/pages/identitiesInfo/identitiesInfo',
				})
			},
			// 跳转到发起组队页面
			toCreateTeam(){
				uni.navigateTo({
					url: `/pages/createTeam/createTeam?username=${this.username}`,
				});
			},
			// 跳转到参与组队页面
			toJoinTeam(){
				uni.navigateTo({
					url: `/pages/joinTeam/joinTeam?username=${this.username}`,
				});
			},
			// 跳转到造月历史页面
			toHistory(){
				uni.navigateTo({
					url: `/pages/history/history?username=${this.username}`,
				});
			}
		},
		onLoad(options) {
			// 获取用户信息
			this.username = options.username;
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
								this.cardImg = '../../static/identity/1.png';
								break;
							case 2:
								this.cardImg = '../../static/identity/2.png';
								break;
							case 3:
								this.cardImg = '../../static/identity/3.png';
								break;
							default:
								break;
						}
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style scoped>
	.bgImg{
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
	.historyBtnBg {
		position: absolute;
		left: 48rpx;
		top: 254rpx;
		width: 128rpx;
		height: 128rpx;
	}
	.historyBtn{
		background-color: transparent;
		border: none;
		position: absolute;
		left: 48rpx;
		top: 254rpx;
		width: 128rpx;
		height: 128rpx;
	}
	.identityCard{
		position: absolute;
		top: 400rpx;
		left: 228rpx;
		right: 228rpx;
		text-align: center;
	}
	.identityCardImg{
		position: relative;
		width: 294rpx;
		height: 88rpx;
	}
	.identityText{
		position: relative;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 34rpx;
		bottom: 42rpx;
	}
	.btnImg{
		width: 308rpx;
		height: 122rpx;
		position: fixed;
		bottom: 96rpx;
	}
	 .joinBtn{
		 left: 48rpx;
	 }
	 .createBtn{
		 right: 48rpx;
	 }
</style>

<template>
	<!-- 抽取身份牌后个人页面 -->
	<view>
		<!-- #ifdef H5 -->
		<image class="bgImg" src="../../static/bg2.png"></image>
		<image class="bgImg" :src="identityImg"></image>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<image class="bgImg" src="../../static/bg2.png" mode="widthFix"></image>
		<image class="bgImg" :src="identityImg" mode="widthFix"></image>
		<!-- #endif -->
		<!-- 身份介绍按钮 -->
		<image src="../../static/button/info.png" class="infoBtnImg"></image>
		<button @click="toInfo" class="infoBtn"></button>
		<!-- 活动规则按钮 -->
		<RulePopup></RulePopup>
		<!-- 造月历史按钮 -->
		<image class="historyBtnBg" src="../../static/button/history.png"></image>
		<button class="historyBtn" @click="toHistory"></button>
		<!-- 身份卡 -->
		<view class="identityCard">
			<image class="identityCardImg" :src="cardTitleImg"></image>
			<text class="identityText">{{employeeName}} {{username}}</text>
		</view>
		<!-- 发起组队 -->
		<image class="btnImg createBtn" src="../../static/button/create.png"></image>
		<button class="btn createBtn" @click="toCreateTeam()"></button>
		<!-- 参与组队 -->
		<image @click="toJoinTeam" class="btnImg joinBtn" src="../../static/button/join.png"></image>
		<button class="btn joinBtn" @click="toJoinTeam()"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',	// 工号
				employeeName:'',
				cardTitleImg:'',
				cardId:'',
				identityImg:'',
			}
		},
		methods: {
			// 跳转到身份介绍页面
			toInfo(){
				uni.navigateTo({
					url:'/pages/info/info',
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
								this.cardTitleImg = '../../static/identity/1.png';
								this.identityImg = '../../static/identity/1bg.png';
								break;
							case 2:
								this.cardTitleImg = '../../static/identity/2.png';
								this.identityImg = '../../static/identity/2bg.png';
								break;
							case 3:
								this.cardTitleImg = '../../static/identity/3.png';
								this.identityImg = '../../static/identity/3bg.png';
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
	.infoBtnImg {
		position: absolute;
		left: 48rpx;
		top: 80rpx;
		width: 128rpx;
		height: 138rpx;
	}
	.infoBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		left: 48rpx;
		top: 80rpx;
		width: 128rpx;
		height: 138rpx;
	}
	.historyBtnBg {
		position: absolute;
		left: 48rpx;
		top: 254rpx;
		width: 128rpx;
		height: 147rpx;
	}
	.historyBtn{
		background-color: transparent;
		border: none;
		position: absolute;
		left: 48rpx;
		top: 254rpx;
		width: 128rpx;
		height: 147rpx;
	}
	.identityCard{
		position: absolute;
		top: 400rpx;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.identityCardImg{
		position: absolute;
		width: 294rpx;
		height: 134rpx;
	}
	.identityText{
		position: absolute;
		height: 34rpx;
		width: 294rpx;
		bottom: 6rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 34rpx;
		text-align: center;
	}
	.btnImg{
		width: 308rpx;
		height: 122rpx;
		position: absolute;
		bottom: 96rpx;
	}
	.createBtn{
		left: 48rpx;
	}
	.joinBtn{
		right: 48rpx;
	}
	.btn{
		position: absolute;
		width: 308rpx;
		height: 122rpx;
		bottom: 96rpx;
		border: none;
		background-color: transparent;
	}
</style>

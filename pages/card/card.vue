<template>
	<!-- 抽取身份牌后个人页面 -->
	<view>
		<image class="bgImg" src="../../static/test.png" mode="aspectFill"></image>
		<image src="../../static/button/rule.png" class="ruleBtnImg"></image>
		<button class="ruleBtn" @click="openRulePopup"></button>
		<image src="../../static/button/info.png" class="infoBtnImg"></image>
		<button class="infoBtn"></button>
		<uni-popup ref="rule" type="center">
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
		</uni-popup>
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
			closeRulePopup() {
				this.$refs.rule.close()
			},
			// 打开活动规则弹窗
			openRulePopup(){
				this.$refs.rule.open('center');
			},
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
	.ruleBtnImg {
		position: absolute;
		right: 0;
		top: 80rpx;
		width: 128rpx;
		height: 134rpx;
	}
	.ruleBtn {
		background-color: transparent;
		border: none;
		position: absolute;
		right: 0;
		top: 80rpx;
		width: 128rpx;
		height: 134rpx;
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
	.popupImg {
		position: absolute;
		z-index: -1;
		width: 654rpx;
		height: 900rpx;
	}
	.popup {
		width: 654rpx;
		height: 900rpx;
		line-height: 40rpx;
	}
	.title {
		display: block;
		color: #DBEDFA;
		font-family: PingFangSC-Regular, PingFang SC;
		line-height: 80rpx;
	}
	.popText {
		margin: 160rpx 92rpx 200rpx 92rpx;
		height: 540rpx;
		overflow: scroll;
		font-size: 28rpx;
		color: #fff;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.confirmBtnImg {
		width: 240rpx;
		height: 88rpx;
		position: absolute;
		bottom: 72rpx;
		left: 208rpx;
	}
	.confirmBtn {
		background-color: transparent;
		border: none;
		width: 240rpx;
		height: 88rpx;
		position: absolute;
		bottom: 72rpx;
		left: 208rpx;
		color: #fff;
		line-height: 88rpx;
		letter-spacing: 5rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.historyBtnBg {
		position: fixed;
		left: 48rpx;
		top: 254rpx;
		width: 128rpx;
		height: 128rpx;
	}
	.historyBtn{
		background-color: transparent;
		border: none;
		position: fixed;
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

<template>
	<view style="position: relative">
	<image src="../../static/button/rule.png" class="ruleBtnImg"></image>
	<button class="ruleBtn" @click="openRulePopup"></button>
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
	</view>
</template>

<script>
	export default {
		name:"RulePopup",
		props: {
			top: Number
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			console.log('rulePopup')
			
		},
		methods: {
			closeRulePopup() {
				this.$refs.rule.close()
			},
			openRulePopup(){
				this.$refs.rule.open('center');
			},
		}
	}
</script>

<style>
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
		/* padding: 160rpx 92rpx 200rpx 92rpx; */
		position: absolute;
		top: 160rpx;
		left: 92rpx;
		right: 92rpx;
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
</style>
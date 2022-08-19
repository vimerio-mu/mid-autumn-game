<template>
	<view>
		<image src="~@/static/抽卡页背景.png" class="backgournd"></image>
		<view class="bottom">
			<image src="~@/static/揭晓身份按钮背景.png" class="indBtnBg"></image>
			<image src="~@/static/按钮/揭晓身份.png" class="indBtnImg"></image>
			<button class="indBtn"></button>
		</view>
		<image src="~@/static/按钮/活动规则.png" class="ruleBtnImg"></image>
		<button class="ruleBtn" @click="openRulePopup"></button>
		<image src="~@/static/按钮/身份介绍.png" class="infoBtnImg"></image>
		<button class="infoBtn"></button>
		<uni-popup ref="rule" type="center">
			<image src="~@/static/弹窗/游戏规则.png" class="popupImg"></image>
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
				<image src="~@/static/按钮/收下身份牌.png" class="confirmBtnImg"></image>
				<button class="confirmBtn" @click="() => {this.$refs.rule.close()}">确认</button>
			</scroll-view>
		</uni-popup>
		<uni-popup ref="card" type="center">
			<view class="popup">
				<image src="../../static/uni.png" mode=""></image>
				<button type="default" @click="toCardPage">收下身份牌</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {	
			dd.getImageInfo({
			      src:'/static/抽卡页背景.png',
			      success:(res)=>{
			        console.log(JSON.stringify(res.path))
			      }
			    })
			console.log(getUrlBase64('/static/抽卡页背景.png'))
			// 获取用户工号
			
			// 获取用户工号
			
			// 判断用户是否已经获取了身份牌，如果获取了直接跳转到card页面
			
			// 判断用户是否已经获取了身份牌，如果获取了直接跳转到card页面
		},
		methods: {
			openRulePopup(){
				this.$refs.rule.open('center');
			},
			openInfoPage() {
				uni.navigateTo({
					url: '/pages/info/info',
				});
			},
			openCardPopup() {
				this.$refs.card.open('center');
			},
			toCardPage() {
				uni.navigateTo({
					url: '/pages/card/card',
				});
				this.$refs.card.close();
			}
		}
	}
</script>

<style>	
	.backgournd {
		z-index: -999;
		width: 750rpx;
		height: 1440rpx;
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
</style>

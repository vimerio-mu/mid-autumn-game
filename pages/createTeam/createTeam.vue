<template>
	<view>
		<image src="../../static/bg.jpeg" mode="" class="banner"></image>
		<input class="input" type="text" :value="teamName" @input="onKeyInput" placeholder="队名输入框"/>
		<text style="display: block;">创造一个属于你们的月球吧</text>
		<text style="display: block;">一旦造月成功，名称将无法修改</text>
		<button type="default" @click="createTeam">队伍创建</button>
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
						该月球已被占领
						组队失败
					</text>
				</view>
				<image src="../../static/button/btn.png" class="BtnBg"></image>
				<button class="btn" @click="() => {this.$refs.popupError.close()}">返回</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamName: ''
			}
		},
		methods: {
			createTeam() {
				if(this.teamName.includes('占用')) {
					this.$refs.popupError.open('center')
				}else {
					this.$refs.popupSuccess.open('center')
				}
			},
			openDiaryPage() {
				uni.navigateTo({
					// 将teamName传给之后的页面
					url: `/pages/leaderDiary/leaderDiary?teamName=${this.teamName}`,
				});
				this.$refs.popupSuccess.close()
			},
			onKeyInput(event) {
				this.teamName = event.target.value
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: "优设标题黑";
		src: url('../../static/优设标题黑.ttf');
	}
	.banner {
		margin: 25upx;
		width: 700upx;
	}
	.input {
		background-color: white;
		margin: 25rpx;
		width: 700rpx;
		height: 100rpx;
		border: 1px solid gray;
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
		font-family: "优设标题黑";
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
		letter-spacing: 5rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
</style>

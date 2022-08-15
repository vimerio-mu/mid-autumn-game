<template>
	<view>
		<image src="../../static/bg.jpeg" mode="" class="banner"></image>
		<input class="input" type="text" :value="teamName" @input="onKeyInput" placeholder="队名输入框"/>
		<text style="display: block;">创造一个属于你们的月球吧</text>
		<text style="display: block;">一旦造月成功，名称将无法修改</text>
		<button type="default" @click="createTeam">队伍创建</button>
		<uni-popup ref="popupSuccess">
			<view class="popup">
				<text style="display: block;">组队成功,你们的队名是{{teamName}}</text>
				<text style="display: block;">开始写你们的日志吧</text>
				<button @click="openDiaryPage">去写日记</button>
			</view>
		</uni-popup>
		<uni-popup ref="popupError">
			<view class="popup">
				<text style="display: block;">该月球已经被占用，造月失败</text>
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
	.banner {
		margin: 25upx;
		width: 700upx;
	}
	.input {
		background-color: white;
		margin: 25upx;
		width: 700upx;
		height: 100upx;
		border: 1px solid gray;
	}
	.popup {
		background-color: white;
	}
</style>

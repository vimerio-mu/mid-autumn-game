<template>
	<view class="container">
		<image src="../../static/moon3.png" class="backgournd"></image>
		<image src="../../static/logo/02.png" class="logo"></image>
		<text class="textTitle">造月历史</text>
		<image src="../../static/historyBg.png" class="historyBg" mode="widthFix"></image>
		<scroll-view scroll-y="true" class="historyContainer">
			<view v-for="(item,index) in list" :key="index" class="row">
				<text class="index">{{index + 1}}</text>
				<view class="textContiner">
					<text class="text">{{item.teamName}}</text>
					<image src="../../static/leader.png" class="leader" v-if="item.isLeader"></image>
				</view>
				<image src="../../static/doing.png" class="statusBg" v-if="item.success === 'N'"></image>
				<button @click="leaderCheck(item)" class="statusBtn" v-if="item.isLeader === true"></button>
				<image src="../../static/finish.png" class="statusBg"  v-if="item.success === 'Y'"></image>
				<button @click="memberCheck(item)" class="statusBtn" v-if="item.isLeader === false"></button>
				<view class="line"></view>
			</view>
			<view style="width: 750px;height: 142px;"></view>
		</scroll-view>
		<view class="bottomContainer">
			<image class="bottom" src="../../static/bottom.png"></image>
			<!-- 刷新 -->
			<image class="reloadImg" src="../../static/button/reload.png"></image>
			<button class="reloadBtn" @click="reload()"></button>
			<text class="reloadText">刷 新</text>
			<!-- 提交 -->
			<image class="backImg" src="../../static/button/able.png"></image>
			<button class="backBtn" @click="back">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				list: []
			}
		},
		onLoad(option) {
			this.username = option.username;
			this.getHistory();
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			getHistory() {
				let vm = this;
				uni.request({
					url:'http://10.20.147.32:8523/activity/team/list/' + this.username,
					success: function(res) {
						if(res.data.code === 200) {
							for(let row of res.data.rows) {
								let item = {};
								item.username = vm.username;
								item.teamName = row.teamName;
								item.teamId = row.teamId;
								item.success = row.success;
								if(row.teamLeader === vm.username) {
									item.isLeader = true
								}else {
									item.isLeader = false
								}
								vm.list.push(item)
							}
						}else {
							console.log(res)
						}
					},
					fail: function(e) {console.log(e)}
				})
			},
			leaderCheck(team) {
				uni.navigateTo({
					url: `/pages/submit/submit?username=${team.username}&teamName=${team.teamName}&teamId=${team.teamId}`,
				});
			},
			memberCheck(team) {
				uni.navigateTo({
					url: `/pages/memberCheck/memberCheck?username=${team.username}&teamName=${team.teamName}&teamId=${team.teamId}`,
				});
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
	.logo {
		height: 310rpx;
		width: 688rpx;
		position: absolute;
		top: 54rpx;
		left: 38rpx;
		z-index: 3;
	}
	.textTitle {
		font-size: 56rpx;
		z-index: 4;
		position: absolute;
		top: 244rpx;
		left: 278rpx;
		color: #fff;
		font-family: YouSheBiaoTiHei;
		background: linear-gradient(122deg, #FFFFFF 0%, #DCEBFF 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.row {
		color: #fff;
		width: 750rpx;
		height: 142rpx;
		position: relative;
		/* border-bottom: #DCEBFF 1px solid; */
	}
	.historyContainer {
		width: 750rpx;
		position: absolute;
		top: 396rpx;
		height: 852rpx;
		z-index: 3;
	}
	.historyBg {
		width: 750rpx;
		position: absolute;
		top: 318rpx;
		height: 400rpx;
		z-index: 2;
	}
	.index {
		position: absolute;
		left: 78rpx;
		top: 50rpx;
	}
	.textContiner {
		position: absolute;
		top: 50rpx;
		left: 140rpx;
	}
	.text {
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.leader {
		margin-left: 8rpx;
		height: 32rpx;
		width: 64rpx;
		display: inline-block;
	}
	.line {
		width: 652rpx;
		height: 2rpx;
		background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #C7C7C7 48%, rgba(255,255,255,0) 100%);
		position: absolute;
		bottom: 0;
	}
	.statusBg {
		position: absolute;
		right: 48rpx;
		bottom: 46rpx;
		width: 120rpx;
		height: 48rpx;
	}
	.statusBtn {
		position: absolute;
		right: 48rpx;
		bottom: 46rpx;
		width: 120rpx;
		height: 48rpx;
		border: none;
		background-color: transparent;
		z-index: 7;
	}
	.bottomContainer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 164rpx;
		z-index: 999;
	}
	.bottom{
		position: absolute;
		bottom: 0%;
		width: 750rpx;
		height: 164rpx;
	}
	.reloadImg{
		position: absolute;
		width: 88rpx;
		height: 84rpx;
		left: 96rpx;
		bottom: 54rpx;
	}
	.reloadBtn{
		position: absolute;
		background-color: transparent;
		border: none;
		width: 88rpx;
		height: 84rpx;
		left: 96rpx;
		bottom: 54rpx;
	}
	.reloadText{
		position: absolute;
		left: 96rpx;
		bottom: 22rpx;
		width: 88rpx;
		height: 28rpx;
		text-align: center;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1A3C65;
		line-height: 28rpx;
	}
	.backImg{
		position: absolute;
		width: 454rpx;
		height: 82rpx;
		bottom: 50rpx;
		right: 96rpx;
	}
	.backBtn{
		position: absolute;
		background-color: transparent;
		border: none;
		width: 454rpx;
		height: 82rpx;
		bottom: 50rpx;
		right: 96rpx;
		font-size: 56rpx;
		font-family: YouSheBiaoTiHei;
		color: #FFFFFF;
		line-height: 72rpx;
		text-shadow: 0rpx 2rpx 8rpx #103780;
		text-align: center;
	}
</style>

<template>
	<!-- 队长提交全队日记页面 -->
	<view>
		<image class="backgournd" src="../../static/moon2.png" mode="aspectFill"></image>
		<image class="title" src="../../static/logo/03.png"></image>
		<text class="titleText">{{teamName}}</text>
		<view style="padding-top: 210rpx;">
			<RulePopup style="z-index: 1;"></RulePopup>
		</view>
		<scroll-view class="container" scroll-y="true">
			<view class="diary" v-for="(diary,index) in diaryList" :key="diary.username">
				<image class="diaryBg" src="../../static/taLeader.png"></image>
				<text class="diaryText">{{diary.word}}</text>
				<!-- 向上 -->
				<image class="upBtnBg" src="../../static/button/up.png"></image>
				<button class="upBtn" :class="{'upBtnDisabled': index===0}" @click="up(index)" :disabled="index === 0"></button>
				<!-- 向下 -->
				<image class="downBtnBg" src="../../static/button/down.png"></image>
				<button class="downBtn" :class="{'downBtnDisabled': index===diaryList.length-1}" @click="down(index)" :disabled="index === diaryList.length-1"></button>
				
				<text class="memberInfo">{{diary.identityName}} {{diary.employeeName}} {{diary.username}}</text>
			</view>
		</scroll-view>
		<image class="bottom" src="../../static/bottom.png"></image>
		<!-- 刷新 -->
		<image class="reloadImg" src="../../static/button/reload.png"></image>
		<button class="reloadBtn" @click="reload()"></button>
		<text class="reloadText">刷 新</text>
		<!-- 提交 -->
		<image class="backImg" src="../../static/button/able.png"></image>
		<button class="backBtn" @click="submit">提交全队日记</button>
		
		<!-- 错误情况 -->
		<uni-popup ref="checkFailed" type="center">
			<view class="popupContainer">
				<image class="popupBg" src="../../static/popup/popup.png"></image>
				<text class="popupTitle">提交失败</text>
				<text class="popupText">{{msg}}</text>
				<image class="btnBg" src="../../static/button/btn.png"></image>
				<button class="btn" @click="$refs.checkFailed.close()">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				teamName:'',
				teamId:0,
				msg:'',
				diaryList:[],
				teamMembers:[],
			}
		},
		methods: {
			getTeamMemberList(){
				uni.request({
					url: `http://10.20.147.32:8523/activity/team/member/list/${this.teamId}`,
					method: 'GET',
					data: {},
					success: res => {
						this.msg = res.data.msg;
						if(res.data.code === 200){
							this.diaryList = res.data.rows;
							for (let i = 0; i < this.diaryList.length; i++) {
								uni.request({
									url: `http://10.20.147.32:8523/activity/identity/${this.diaryList[i].username}`,
									method: 'GET',
									data: {},
									success: res => {
										if(res.data.code === 200){
											this.$set(this.diaryList[i],'cardId',res.data.data.cardId)
											switch (this.diaryList[i].cardId){
												case 1:
													this.$set(this.diaryList[i],'identityName','飞行工程师')
													break;
												case 2:
													this.$set(this.diaryList[i],'identityName','航天驾驶员')
													break;
												case 3:
													this.$set(this.diaryList[i],'identityName','载荷专家')
													break;
												default:
													break;
											}
										}else{
											this.$refs.checkFailed.open()
										}
									},
									fail: (res) => {
										this.msg = res.errMsg;
										this.$refs.checkFailed.open()
									},
								});
							}
						}else{
							this.$refs.checkFailed.open();
						}
					},
					fail: (res) => {
						this.msg = res.errMsg;
						this.$refs.checkFailed.open();
					},
				});
			},
			reload(){
				this.getTeamMemberList();
			},
			up(index){
				let tmp = this.diaryList[index-1]
				this.$set(this.diaryList, index-1, this.diaryList[index])
				this.$set(this.diaryList, index, tmp)
			},
			down(index){
				let tmp = this.diaryList[index+1]
				this.$set(this.diaryList, index+1, this.diaryList[index])
				this.$set(this.diaryList, index, tmp)
			},
			submit(){
				if(this.diaryList.length>0){
					// 提交全队日记（PUT）
					// 小程序不支持PUT请求，采用storage存储排序后的队员信息和拼接后的日记内容
					var completeDiary = '';
					const teamMembers = [];
					for (let diary of this.diaryList) {
						const memberInfo = {identityName: diary.identityName, employeeName: diary.employeeName, username: diary.username}
						teamMembers.push(memberInfo)
						completeDiary += diary.word;
					}
					uni.setStorage({
						key: 'teamMembers',
						data: teamMembers,
					})
					uni.setStorage({
						key: 'diary',
						data: completeDiary,
					})
					// 跳转至分享页面
					uni.navigateTo({
						url: `/pages/share/share?username=${this.username}&teamName=${this.teamName}&teamId=${this.teamId}`,
					});	
					this.$refs.checkFailed.close()
				}else{
					this.msg = '成员列表为空！'
					this.$refs.checkFailed.open()
				}
			}
		},
		onLoad(e) {
			this.username = e.username;
			this.teamName = e.teamName;
			this.teamId = parseInt(e.teamId);
			this.getTeamMemberList();
		}
	}
</script>

<style scoped>
	button{
		border: none;
		background-color: transparent;
	}
	.backgournd{
		position: absolute;
		width: 750rpx;
		height: 100%;
	}
	.title{
		position: absolute;
		width: 720rpx;
		height: 286rpx;
		top: 38rpx;
		left: 22rpx;
	}
	.titleText{
		position: absolute;
		height: 72rpx;
		top: 226rpx;
		left: 50%;
		transform: translate(-50%);
		font-size: 56rpx;
		font-family: YouSheBiaoTiHei;
		color: #FFFFFF;
		line-height: 72rpx;
		text-shadow: 0rpx 2rpx 8rpx #1652AB;
	}
	.container{
		position: fixed;
		width: 750rpx;
		top: 450rpx;
		height: 820rpx;
	}
	.diary{
		position: relative;
		text-align: center;
		width: 654rpx;
		height: 394rpx;
		left: 50%;
		transform: translate(-50%);
		margin: 24rpx 0;
	}
	.diaryBg{
		width: 654rpx;
		height: 394rpx;
	}
	.diaryText{
		position: absolute;
		top: 62rpx;
		left: 68rpx;
		text-align: left;
		width: 410rpx;
		height: 182rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;
	}
	.upBtnBg{
		position: absolute;
		top: 70rpx;
		right: 62rpx;
		width: 56rpx;
		height: 59rpx;
	}
	.upBtn{
		position: absolute;
		top: 70rpx;
		right: 62rpx;
		width: 56rpx;
		height: 59rpx;
	}
	/* #ifdef H5 */
	.upBtn[disabled]{
		border: none;
		background-color: transparent;
	}
	/* #endif */
	.upBtnDisabled{
		border: none;
		background-color: transparent;
	}
	.downBtnBg{
		position: absolute;
		bottom: 140rpx;
		right: 62rpx;
		width: 56rpx;
		height: 59rpx;
	}
	.downBtn{
		position: absolute;
		bottom: 140rpx;
		right: 62rpx;
		width: 56rpx;
		height: 59rpx;
	}
	/* #ifdef H5 */
	.downBtn[disabled]{
		border: none;
		background-color: transparent;
	}
	/* #endif */
	.downBtnDisabled{
		border: none;
		background-color: transparent;
	}
	.memberInfo{
		position: absolute;
		left: 58rpx;
		bottom: 22rpx;
		/* width: 362px; */
		height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #071864;
		line-height: 44rpx;
		text-shadow: 0rpx 2rpx 10rpx #E9F1FF;
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
	.bottom{
		position: absolute;
		bottom: 0%;
		width: 750rpx;
		height: 164rpx;
	}
	.popupContainer{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.popupBg{
		width: 654rpx;
		height: 496rpx;
	}
	.popupTitle{
		position: absolute;
		top: 20rpx;
		font-size: 56rpx;
		font-family: YouSheBiaoTiHei;
		color: #FFFFFF;
		line-height: 72rpx;
		text-shadow: 0rpx 2rpx 8rpx #103780;
	}
	.popupText{
		position: absolute;
		top: 192rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
	}
	.btnBg{
		position: absolute;
		bottom: 80rpx;
		width: 240rpx;
		height: 88rpx;
	}
	.btn{
		position: absolute;
		bottom: 80rpx;
		width: 240rpx;
		height: 88rpx;
		vertical-align: middle;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 88rpx;
	}
</style>

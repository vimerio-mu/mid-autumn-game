<template>
	<view>
		<image class="backgournd" src="../../static/moon2.png"></image>
		<image class="title" src="../../static/logo/03.png"></image>
		<text class="titleText">{{teamName}}</text>
		<view style="padding-top: 210rpx;">
			<RulePopup style="z-index: 1;"></RulePopup>
		</view>
		<image class="diaryPopup" src="../../static/popup/diary.png"></image>
		<textarea class="ta" v-model="diary" @input="onKeyInput" placeholder-class="placeholder" maxlength="255"
			placeholder="点击输入日记，让我们一起发掘时间褶皱中的浪漫，将脑海中的世界描绘出来。（提示：字符上限255）"></textarea>
		<view class="save">
			<image class="saveBtnImg" :style="disabled?'':'display:none;'" src="../../static/button/able.png"></image>
			<image class="saveBtnImg" :style="disabled?'display:none;':''" src="../../static/button/unable.png"></image>
			<button class="saveBtn" :class="{'saveBtnDisabled':!disabled}" @click="saveDiary" :disabled="!disabled">保存日记</button>
		</view>
		<!-- 保存日记成功弹窗 -->
		<uni-popup ref="saveSuccess" type="center">
			<view class="popupContainer">
				<image class="popupBg" src="../../static/popup/popup.png"></image>
				<text class="popupTitle">造月成功</text>
				<text class="popupText">保存并已提交<br>去看看队员日记吧</text>
				<image class="btnBg" src="../../static/button/btn.png"></image>
				<button @click="check()" class="btn">确认</button>
			</view>
		</uni-popup>
		<!-- 保存失败 -->
		<uni-popup ref="saveFailed" type="center">
			<view class="popupContainer">
				<image class="popupBg" src="../../static/popup/popup.png"></image>
				<text class="popupTitle">提交失败</text>
				<text class="popupText">{{msg}}</text>
				<image class="btnBg" src="../../static/button/btn.png"></image>
				<button @click="$refs.saveFailed.close()" class="btn">确认</button>
			</view>
		</uni-popup>
		<view>
			<image class="checkBtnImg" src="../../static/button/second.png"></image>
			<button @click="check()" class="checkBtn">提交全队日记</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				teamName: '',
				teamId:'',
				diary: '',
				msg:'',
			}
		},
		computed: {
			disabled() {
				return this.diary;
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.username = option.username;
			this.teamName = option.teamName; //获取上个页面传递的参数。
			this.teamId = option.teamId;
		},
		methods: {
			onKeyInput(event) {
				this.diary = event.target.value
			},
			saveDiary() {
				// 保存日志到服务器
				uni.request({
					url: 'http://10.20.147.32:8523/activity/team/member',
					method: 'POST',
					data: {
						"teamId": this.teamId,
						"username": this.username,
						"word": this.diary,
					},
					success: res => {
						this.msg = res.data.msg
						if(res.data.code===200){
							// 保存日记成功弹窗
							this.$refs.saveSuccess.open();
						}else{
							this.$refs.saveFailed.open()
						}
					},
					fail: (res) => {
						this.msg = res.errMsg;
						this.$refs.saveFailed.open()
					},
					complete: () => {}
				});
			},
			// 点击提交全队日记按钮跳转到队员日记列表页面
			check() {
				uni.navigateTo({
					url: `/pages/submit/submit?username=${this.username}&teamName=${this.teamName}&teamId=${this.teamId}`,
				});
				this.$refs.saveSuccess.close();
			}
		}
	}
</script>

<style scoped>
	.backgournd{
		position: absolute;
		width: 750rpx;
		height: 100%;
		z-index: -1;
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
		width: 750rpx;
		text-align: center;
		transform: translate(-50%);
		font-size: 56rpx;
		font-family: YouSheBiaoTiHei;
		color: #FFFFFF;
		line-height: 72rpx;
		text-shadow: 0rpx 2rpx 8rpx #1652AB;
		/* -webkit-background-clip: text; */
		/* -webkit-text-fill-color: transparent; */
	}
	.diaryPopup{
		position: absolute;
		width: 654rpx;
		height: 824rpx;
		top: 346rpx;
		left: 50%;
		transform: translate(-50%);
	}
	.checkBtn{
		position: absolute;
		width: 402rpx;
		height: 212rpx;
		right: 48rpx;
		top: 1250rpx;
		background-color: transparent;
		border: none;
		
		height: 58rpx;
		font-size: 44rpx;
		font-family: YouSheBiaoTiHei;
		color: #8A4100;
		line-height: 58rpx;
		text-shadow: 0rpx 2rpx 2rpx rgba(212,166,75,0.74);
	}
	.checkBtnImg{
		position: absolute;
		width: 402rpx;
		height: 212rpx;
		right: 48rpx;
		/* bottom: 136rpx; */
		top: 1132rpx;
	}
	.ta{
		position: absolute;
		top: 442rpx;
		left: 50%;
		transform: translate(-50%);
		width: 470rpx;
		height: 550rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		color: #FFFFFF;
		line-height: 40rpx;
		border: none;
		background-color: transparent;
	}
	/deep/.placeholder{
		font-weight: 600;
		opacity: 0.53;
	}
	.save{
		position: absolute;
		top: 1070rpx;
		width: 352rpx;
		left: 50%;
		transform: translate(-50%);
	}
	.saveBtnImg{
		position: absolute;
		width: 352rpx;
		height: 82rpx;
	}
	.saveBtn{
		position: absolute;
		border: none;
		background-color: transparent;
		width: 352rpx;
		height: 72rpx;
		font-size: 56rpx;
		font-family: YouSheBiaoTiHei;
		line-height: 72rpx;
		color: #FFFFFF;
		text-shadow: 0rpx 2rpx 8rpx #103780;
	}
	.saveBtnDisabled{
		border: none;
		background-color: transparent;
		color: #82838E;
		text-shadow: none;
	}
	/* #ifdef H5 */
	.saveBtn[disabled]{
		border: none;
		background-color: transparent;
		color: #82838E;
		text-shadow: none;
	}
	/* #endif */
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
		border: none;
		background-color: transparent;
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

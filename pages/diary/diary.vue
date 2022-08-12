<template>
	<view>
		<image src="../../static/bg.jpeg" mode="" class="banner"></image>
		<button class="rulesBtn" @click="openRulePopup">活动规则</button>
		<view class="textContainer">
			<text>{{teamName}}</text>
		</view>
		<textarea :value="diary" placeholder="造月日记输入框" @input="onKeyInput"/>
		<button @click="saveDiary">保存日志</button>
		<button @click="submit">提交全队</button>
		<uni-popup ref="rule" type="center">
			<scroll-view scroll-y="true" class="popup">
				<view class="demo">
					很大的游戏介绍1
				</view>
				<view class="demo">
					很大的游戏介绍2
				</view>
				<view class="demo">
					很大的游戏介绍3
				</view>
			</scroll-view>
		</uni-popup>
		<uni-popup ref="noContain" type="center">
			<text>日记中不包含月字，请返回修改</text>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamName: '',
				diary: ''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.teamName = option.teamName; //获取上个页面传递的参数。
		},
		methods: {
			openRulePopup(){
				this.$refs.rule.open('center');
			},
			onKeyInput(event) {
				this.diary = event.target.value
			},
			saveDiary() {
				if(!this.diary.includes(('月'))) {
					this.$refs.noContain.open('center')
				}else {
					// 保存日志到服务器
				}
			},
			submit() {
				uni.navigateTo({
					url: `/pages/submit/submit?teamName=${this.teamName}`,
				});
			}
		}
	}
</script>

<style>
	.banner {
		margin: 25upx;
		width: 700upx;
		height: 200upx;
	}
	.textContainer {
		background-color: #eee;
		margin: 25upx;
		width: 700upx;
		display: flex;    /*设置显示样式**/
		align-items: center;    /**子view垂直居中*/
		vertical-align: center; /**垂直居中*/
		justify-content: center; /**内容居中*/
		flex-direction:row; 
	}
	.rulesBtn {
		border-radius: 25%;
		width: 200upx;
		height: 100upx;
		background-color: dimgray;
		position: absolute;
		top: 50upx;
		right: 30upx;
	}
</style>

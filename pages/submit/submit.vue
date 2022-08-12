<template>
	<view>
		<image src="../../static/bg.jpeg" mode="" class="banner"></image>
		<button class="rulesBtn" @click="openRulePopup">活动规则</button>
		<view class="textContainer">
			<text>{{teamName}}</text>
		</view>
		<view class="diaryContainer" v-for="item in diaryList" :key="item.writer">
			<DiaryInfo 
				:diary="item.diary" 
				:identify="item.identify" 
				:writer="item.writer">
			</DiaryInfo>
		</view>
		<view class="btnGroup">
			<button @click="reload">刷新</button>
			<button @click="toSharePage">提交全队</button>
		</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamName: '',
				diaryList: [
					{
						diary: '日记内容1',
						identify: '身份1',
						writer: '张三',
					},
					{
						diary: '日记内容2',
						identify: '身份2',
						writer: '李四',
					},
					{
						diary: '日记内容3',
						identify: '身份3',
						writer: '王五',
					}
				]
			}
		},
		onLoad: function (option) {
			this.teamName = option.teamName; 
			// 这里需要获取数据
			
			// 这里需要获取数据
		},
		methods: {
			openRulePopup(){
				this.$refs.rule.open('center');
			},
			reload() {
				// 这里重新获取数据
				
				// 这里重新获取数据
			},
			toSharePage() {
				// 这里上传数据
				
				// 这里上传数据
				uni.navigateTo({
					url: `/pages/share/share?teamName=${this.teamName}`,
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
	.btnGroup {
		display: flex;
		width: 500upx;
		height: 100upx;
		position: absolute;
		bottom: 100upx;
		right: 125upx;
	}
	.diaryContainer {
		background-color: aqua;
	}
	.popup {
		border: 1px solid red;
		background-color: #eeeeee;
		height: 200upx;
		width: 500upx;
	}
	.demo {
		height: 200upx;
		background-color: grey;
		border-bottom: 5px solid red;
	}
</style>

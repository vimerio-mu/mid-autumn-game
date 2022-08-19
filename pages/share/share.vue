<template>
	<view>
		<view class="">
			<text style="display: block;">恭喜你们，造月成功</text>
			<text style="display: block;">
				请与队员合影后上传公司论坛后获取抽奖资格
			</text>
		</view>
		<view id="share">
			<view class="textContainer">
				<text>{{teamName}}</text>
			</view>
			<view class="mainContainer">
				<view class="subContainer" v-for="item in teamMembers" :key="item.id">
					<text>{{item.identify}} + {{item.name}}</text>
				</view>
				<view class="subContainer">
					<text>{{diary}}</text>
				</view>
			</view>
		</view>
		<view class="btnGroup">
			<button @click="downloadAsImg">生成长图</button>
			<button @click="toIndex">返回首页</button>
		</view>
	</view>
</template>

<script>
	import domtoimage from 'dom-to-image';
	export default {
		data() {
			return {
				teamName: '',
				diary: '很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记很长的日记',
				teamMembers: [
					{
						identify: '身份1',
						name: '张三',
						id: '46744'
					},
					{
						identify: '身份2',
						name: '李四',
						id: '46745'
					},
					{
						identify: '身份3',
						name: '王五',
						id: '46746'
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
			downloadAsImg() {
				let vm = this
				// 实现元素转图片
				var context = dd.createCanvasContext('firstCanvas')
				context.font = "20upx serif"; // 设置文案大小和字体
				context.fillText("Canvas 详解1", 0, 0);
				context.fillText("Canvas 详解2", 20, 0);
				context.draw()
				context.toTempFilePath({
					success(res) {
						dd.saveImage({
							url:res.tempFilePath,
							success: () => {console.log('save success')},
							fail: (e) => {console.log(e)}
						});
					}
				});
				// 实现元素转图片
			},
			toIndex() {
				uni.navigateTo({
					url: '/pages/index/index',
				});
			}
		}
	}
</script>

<style>
	.mainContainer {
		margin: 25upx;
		width: 700upx;
		background-color: #eee;
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
	.subContainer {
		margin: 25upx;
		width: 650upx;
		background-color: mediumaquamarine;
	}
	.btnGroup {
		display: flex;
		width: 500upx;
		height: 100upx;
		position: absolute;
		bottom: 100upx;
		right: 125upx;
	}
</style>

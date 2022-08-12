<template>
	<view class="container">
		<image :src="src" class="image"></image>
		<view class="textContainer">
			<text class="text">{{info}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"IdentifyInfo",
		props:{
			src:String,
			info:String
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			console.log('IdentifyInfo')
		}
	}
</script>

<style scoped>
	.container {
		padding: 25upx;
		background-color: gray;
		margin-bottom: 25upx;
	}
	.image {
		width: 700upx;
		background-color: white;
	}
	.textContainer {
		display: flex;    /*设置显示样式**/
		align-items: center;    /**子view垂直居中*/
		vertical-align: center; /**垂直居中*/
		justify-content: center; /**内容居中*/
		flex-direction:row; 
		margin-top: 25upx;
		background-color: white;
	}
	.text {
	}
</style>
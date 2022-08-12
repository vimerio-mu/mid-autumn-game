<template>
	<view class="container">
		<view class="textContainer">
			<text>{{diary}}</text>
		</view>
		<text>{{identify}}——{{writer}}</text>
	</view>
</template>

<script>
	export default {
		name:"DiaryInfo",
		props: {
			diary: String,
			writer: String,
			identify: String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.container {
		padding: 10upx;
		background-color: #eee;
	}
	.textContainer {
		background-color: aquamarine;
		display: flex;    /*设置显示样式**/
		align-items: center;    /**子view垂直居中*/
		vertical-align: center; /**垂直居中*/
		justify-content: center; /**内容居中*/
		flex-direction:row; 
	}
</style>
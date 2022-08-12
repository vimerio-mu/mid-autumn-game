<template>
	<view>
		<image src="../../static/bg.jpeg" mode="" class="banner"></image>
		<view v-for="(item,index) in list" :key="index">
			<view class="row">
				<text>{{item.name}}</text>
				<text>{{item.state === 1 ? '进行中' : '已完成'}}</text>
			</view>
		</view>
		<button type="default" @click="back">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name:'队名1',state:1},
					{name:'队名2',state:2},
					{name:'队名3',state:2},
					{name:'队名4',state:1},
					{name:'队名5',state:2},
					{name:'队名6',state:1},
				]
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.banner {
		margin: 25upx;
		width: 700upx;
	}
	.row {
		margin: 25upx;
		width: 700upx;
		height: 50upx;
		background-color: #eee;
	}
</style>

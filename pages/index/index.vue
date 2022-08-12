<template>
	<view >
		<image class="indexBg" :style="'height:'+ screenHeight +'px !important;'" src="../../static/bg.jpeg"></image>
		<button class="inditifyBtn" @click="openCardPopup">点击抽取身份牌</button>
		<button class="rulesBtn" @click="openRulePopup">游戏规则</button>
		<button class="inditifyIfoBtn" @click="openInfoPage">身份介绍</button>
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
		<uni-popup ref="info" type="center">
			<view class="popup">
				<text>身份介绍</text>
				<uni-list>
					<uni-list-item title="1" note="">
						<text>身份1</text>
					</uni-list-item>
					<uni-list-item title="2" note="">
						<text>身份2</text>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
		<uni-popup ref="card" type="center">
			<view class="popup">
				<image src="../../static/uni.png" mode=""></image>
				<button type="default" @click="toCardPage">收下身份牌</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			console.log(this.screenHeight)
		},
		methods: {
			openRulePopup(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.rule.open('center');
			},
			// openInfoPopup(){
			// 	// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			// 	this.$refs.info.open('center');
			// }
			openInfoPage() {
				uni.navigateTo({
					url: '/pages/info/info',
				});
			},
			openCardPopup() {
				this.$refs.card.open('center');
			},
			toCardPage() {
				uni.navigateTo({
					url: '/pages/card/card',
				});
				this.$refs.card.close();
			}
		}
	}
</script>

<style>	
	.indexBg {
		overflow: hidden;
		width: 750upx;
		background-color: #eeeeee;
	}
	.inditifyBtn {
		border-radius: 25%;
		width: 500upx;
		height: 100upx;
		background-color: dimgray;
		position: absolute;
		bottom: 100upx;
		right: 125upx;
	}
	.rulesBtn {
		border-radius: 25%;
		width: 200upx;
		height: 100upx;
		background-color: dimgray;
		position: absolute;
		top: 100upx;
		right: 30upx;
	}
	.inditifyIfoBtn {
		border-radius: 25%;
		width: 200upx;
		height: 100upx;
		background-color: dimgray;
		position: absolute;
		top: 210upx;
		right: 30upx;
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

<template>
	<view>
		<!-- <image src="../../static/bg3.png" class="backgournd" mode="widthFix" ref="test"></image> -->
		<canvas class='canvas' canvas-id="Canvas" id="Canvas" ref="Canvas" :style="{height:height}"></canvas>
		<image src="../../static/bottom.png" class="bottomBg"></image>
		<image src="../../static/button/back.png" class="backBg"></image>
		<button @click="toIndex" class="back"></button>
		<image src="../../static/button/make.png" class="makeBg"></image>
		<button @click="capture" class="make"></button>
	</view>
</template>

<script>
	import domtoimage from 'dom-to-image';
	export default {
		data() {
			return {
				username:'',
				rpx: 0,
				height:'',
				teamName: '',
				diary: '',
				teamMembers: [ ]
			}
		},
		onLoad: async function (option) {
			const vm = this
			// 加载字体
			// #ifdef H5
			const font = new FontFace(
			  "YouSheBiaoTiHei",
			  `url(${require("../../static/YouSheBiaoTiHei.ttf")})`
			);
			await font.load();
			document.fonts.add(font);
			// #endif
			// 获取屏幕高度和宽度，动态设置rpx，避免在canvas的样式中无法使用rpx
			await uni.getSystemInfo({
				success:function(res){
					vm.rpx = (res.windowWidth / 750)
				}
			})
			// 这里获取需要的数据
			vm.username = option.username; 
			vm.teamName = option.teamName; 
			await uni.getStorage({
				key: 'teamMembers',
				success: function (res) {
					for(let i = 0; i < res.data.length; i++) {
						let data = res.data[i]
						vm.teamMembers.push(`${data.identityName}  ${data.employeeName}   ${data.username}`);
						console.log(data);
					}
				}
			});
			await uni.getStorage({
				key: 'diary',
				success: function (res) {
					vm.diary = res.data;
					console.log(res.data);
				}
			});
			// 绘制canvas
			var context = uni.createCanvasContext('Canvas')
			const rpx = this.rpx
			let memberBodyHeight = (48 * vm.teamMembers.length) * rpx
			let diaryBodyHeight = Math.ceil(vm.diary.length / 17) * 40 * rpx
			// 动态设置canvas高度
			vm.height =` ${Math.ceil(1000 * rpx + memberBodyHeight + diaryBodyHeight)}px `
			// 背景
			await context.drawImage(
					'../../static/bg3.png',
					0 * rpx,
					0 * rpx,
					750 * rpx, 1000 * rpx + memberBodyHeight + diaryBodyHeight
				)
			// logo图片
			await context.drawImage(
					'../../static/logo/03.png',
					15 * rpx,
					38 * rpx,
					720 * rpx, 300 * rpx
				)
			// 队名
			// 设置文案大小和字体
			// 设置渐变
			const grd = context.createLinearGradient(0,0,170,170)
			grd.addColorStop(0, '#FFFFFF')
			grd.addColorStop(1, '#DCEBFF')
			context.setFillStyle(grd)
			context.font = `${Math.floor(56 * rpx)}px YouSheBiaoTiHei`
			// 设置队名居中
			context.setTextAlign('center')
			context.fillText(vm.teamName, 375 * rpx, 290 * rpx);
			// 绘制队员框背景上部分
			await context.drawImage(
			 		'../../static/memberTop.png',
			 		48 * rpx,
			 		362 * rpx,
			 		654 * rpx, 142 * rpx
			 	)
			// 设置字体
			context.setFillStyle('#FFFFFF')
			context.font = `${Math.floor(32 * rpx)}px PingFangSC-Medium, PingFang SC`
			context.setTextBaseline('top')
			// 计算MemberBody需要的高度（即teamMembers的个数）
			await context.drawImage(
			 		'../../static/memberBody.png',
			 		48 * rpx,
			 		504 * rpx,
			 		654 * rpx, memberBodyHeight
			 	)
			// for循环绘制队员名
			context.setTextAlign('left')
			let i = 0;
			for(i; i < vm.teamMembers.length; i++) {
				context.fillText(this.teamMembers[i], 176 * rpx, (504 + 48 * i) * rpx);
			}
			// 绘制队员框背景下部分
			await context.drawImage(
			 		'../../static/diaryTop.png',
			 		48 * rpx,
			 		504 * rpx + memberBodyHeight,
			 		654 * rpx, 296 * rpx
			 	)
			// 计算MemberBody需要的高度（即teamMembers的个数）
			await context.drawImage(
					'../../static/diaryBody.png',
					48 * rpx,
					800 * rpx + memberBodyHeight,
					654 * rpx, diaryBodyHeight
				)
			// 设置字体	
			context.font = `${Math.floor(28 * rpx)}px PingFangSC-Semibold, PingFang SC` 
			// 字符分隔为数组
			var arrText = vm.diary.split('');
			var line = '';
			let x = 134 * rpx, y = 800 * rpx + memberBodyHeight
			for (var n = 0; n < arrText.length; n++) {
				var testLine = line + arrText[n];
				if (testLine.length > 18 && n > 0) {
					context.fillText(line, x, y);
					            line = arrText[n];
					            y += 40 * rpx;
				} else {
					line = testLine;
				}
			}
			context.fillText(line, 134 * rpx, y);
			// 绘制日记框背景下部分
			await context.drawImage(
					'../../static/diaryBottom.png',
					48 * rpx,
					800 * rpx + memberBodyHeight + diaryBodyHeight,
					654 * rpx, 148 * rpx
				)
			// 绘制canvas
			await context.draw()
		},
		methods: {
			capture() {
				const vm = this
				// #ifdef MP-ALIPAY
				var context = uni.createCanvasContext('firstCanvas')
				context.toTempFilePath({
					success(res) {
						dd.saveImage({
							url:res.tempFilePath,
							success: () => {console.log('save success')},
							fail: (e) => {console.log(e)}
						});
					}
				});
				// #endif
				// #ifdef H5
				domtoimage.toPng(
					document.getElementById('Canvas'),
				)
				.then(function (dataUrl) {
					var link = document.createElement('a');
					link.download = `${vm.teamName}.png`;
					link.href = dataUrl;
					link.click();
				})
				.catch(function (error) {
					alert('出现错误，无法下载', error);
				})
				// #endif
			},
			toIndex() {
				console.log(this.username)
				uni.navigateTo({
					url: `/pages/card/card?username=${this.username}`
				});
			}
		}
	}
</script>

<style>
	.bottomBg {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 146rpx;
	}
	.backBg {
		position: fixed;
		width: 300rpx;
		height: 100rpx;
		right: 64rpx;
		bottom: 30rpx;
	}
	.back {
		background-color: transparent;
		border: none;
		position: fixed;
		width: 300rpx;
		height: 100rpx;
		right: 64rpx;
		bottom: 30rpx;
	}
	.makeBg {
		position: fixed;
		width: 300rpx;
		height: 100rpx;
		left: 62rpx;
		bottom: 30rpx;
	}
	.make {
		background-color: transparent;
		border: none;
		position: fixed;
		width: 300rpx;
		height: 100rpx;
		left: 62rpx;
		bottom: 30rpx;
	}
	.canvas {
		/* position: fixed; */
		/* height: 2100rpx; */
		width: 750rpx;
	}
</style>

<template>
	<view>
		<view class="select">
		  <canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
		</view>
		<button @click="capture">test</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			capture() {
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
			}
		}
	}
</script>

<style>

</style>

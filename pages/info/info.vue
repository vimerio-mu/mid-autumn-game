<template>
    <view class="content">
		<view v-for="item in list" :key="item.info">
			<IdentifyInfo :src='item.src' :info="item.info">
			</IdentifyInfo> 
		</view>
		<button type="default" @click="back">返回</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list:[
					{src:'/static/c1.png', info:'身份1'},
					{src:'/static/c2.png', info:'身份2'},
					{src:'/static/c3.png', info:'身份3'}
					
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

<style lang="scss" scoped>
    //scoped css只在当前页生效 不影响子组件
    page {background-color: #efeff4;}
    @media (prefers-color-scheme: dark){page {background-color: #000000;} }
    .content {.row{display: flex;flex-direction: row;align-items: center;.icon{width: 30px;border-radius: 6px;margin-right: 13px;}.text{font-size: 13px;}}}
</style>
# 根据原型图的大致设计

## 首页（抽取身份牌）

抛去活动图不谈，整个页面主要就是三个按钮

这三个按钮我尝试了一下，直接absolute写死是最好的

按钮会触发一些弹窗和跳转

触发弹窗是用ref实现的

```vue
<button class="rulesBtn" @click="openRulePopup">游戏规则</button>
<uni-popup ref="rule" type="center">
    <scroll-view scroll-y="true" class="popup">
        <view>
            <view class="demo">
                很大的游戏介绍1
            </view>
            <view class="demo">
                很大的游戏介绍2
            </view>
            <view class="demo">
                很大的游戏介绍3
            </view>

        </view>
    </scroll-view>
</uni-popup>

...
methods: {
    openRulePopup(){
        this.$refs.rule.open('center');
	},
}
```

这里面，如果看原型图的话，规则弹窗是要实现拖动的，可能规则比较长，这就要用到`scroll-view`

抽取身份牌的弹窗需要有一个比较绚丽的css样式，这个具体到时候看设计稿再实现

而身份介绍按钮应该是跳转到另一个界面，

> 关于跳转界面，使用navigator api，只能跳转本地页面，要在pages.json中注册

### 关于首页背景

这里的背景图我想的是应该全屏展示的，手机的宽度是固定的`750upx`但是高度不是，所以这里需要用一下类似媒体查询的方式获取高度然后设置高度写进image的style里

这里需要用到`onLoad`这个生命周期，页面加载完就读取页面高度

```vue
<image class="indexBg" :style="'height:'+ screenHeight +'px !important;'" src="../../static/bg.jpeg"></image>
...
data() {
    return {
    	screenHeight: 0
    }
},
onLoad() {
    this.screenHeight = uni.getSystemInfoSync().windowHeight
    console.log(this.screenHeight)
},
```

### 全部身份牌展示

这里可以封装一个身份牌背景+介绍的组件，然后整个页面实际上就是三个这个组件组成的列表

然后返回按钮就写死返回首页或者navigator的back方法都可以

## 身份牌页面（组队、历史）

这里背景一样全屏展示，图片换成身份牌就可以

然后右上角多了一个造月历史的按钮，跳转到造月历史页面

下面是发起组队和参与组队按钮，分别跳转到对应的组队页面

### 造月历史

这个页面一样很简单，就直接读取后端获取的data数组展示就可以了，简单的封装一个行的组件就可以了

刷新就重新发送请求获取新的数据更改就可以了，返回同上

## 组队页面（队长、队员）

对于队长和队员两种身份，实际上创建/寻找队伍的页面都是类似的

甚至在接口的调用上可能也知识get和post的区别

这里前端可以直接判断月球名符不符合规范，input做一下逻辑判断就可以了

倒是搜索月球我看需求里面有说需要模糊搜索，这个需要考虑如何实现

> **TODO：如何实现模糊搜索**

创建/搜索返回的都是一个弹窗，这个实现方法就和上文所说的一致了，也很简单

## 日志页面

日志页面新的内容就是一个编辑日志的部分

目前看来没有富文本编辑的需求，直接给一个`textarea`就可以了，点击保存按钮的时候先判断有没有“月”字，通过之后post到指定接口即可

## 提交页面

对于这个页面，队长和队员的操作整体类似，只不过队长可以提交全队，也就是一个调用接口post的事情

这个页面同样需要封装一个日志组件，然后用它组成列表

这里有一个需求：**列表项需要可以拖拽排序**，这个应该可以使用插件库里的插件实现，或许可以用这个：https://ext.dcloud.net.cn/plugin?id=1372

> 当然也可以用其他的，甚至是sortable.js自己写
>
> 钉钉小程序端应该是可以使用sortable.js的，本质都是js的runtime

而刷新和返回都是之前实现过的功能，这里就不再提

## 分享页面

这里也是读取数据展示，不过需要实现一个功能：**将页面元素生成图片**

不知道钉钉小程序端可不可以使用html2canvas或者dom2image这样的库，我看应该是可以的，可以参照这个插件的保存功能的实现：https://ext.dcloud.net.cn/plugin?id=5770



至此，整体的功能和一些技术难点基本汾西完毕。18个原型图实际上可以整合成6个阶段：①首页②身份牌③组队④日志⑤提交⑥分享

按照这个交互逻辑实现。
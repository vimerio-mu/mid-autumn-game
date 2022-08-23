# Uni-app的PC端适配方案

## 基本思路

本次项目是一个小游戏，基本就决定了它只适合手机大小的屏幕窗口进行使用，即使屏幕变大了，实际显示区域也不应该有变化。

于是PC端的适配方案就变成了：如何在电脑屏幕上保持手机大小的应用，并且提供一个较为融合不突兀的背景。

uniapp提供了[自定义模板](https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-template)来实现这一个功能：

只需要在根目录下新建一个模板html文件，就可以让应用页面（准确的说，以进去是pages.json中的第一个元素）显示在这个模板页面中。

如果须要定宽高的显示在某个地方，可以使用iframe

## 基本方案

首先在`static`下新建一个目录来存放js和css文件，以及模板html用到的其他静态文件

在模板里面定义一个type为`text/html`的script标签作为模板，然后在里面定义一个iframe

```html
<body>

    <div id="app"></div>

    <!-- uni-app 电脑端兼容模板容器 -->
    <uni-adapt-pc></uni-adapt-pc>
    <!-- uni-app 电脑端兼容模板 -->
    <script type="text/html" id="tpl-adapt-pc">
		<div class="container">
			<div class="iframe">
				<iframe src="mobile-href"></iframe>
        	</div>
        </div>
    </script>
    <!-- uni-app 电脑端浏览兼容脚本文件 -->
    <script type="text/javascript" src="/static/adapt-pc/pc.js"></script>
    <!-- built files will be auto injected -->
</body>
```

在js文件中：获取到模板内容，然后获取到iframe，将当前页面`window.location.href`，即应用页面写入iframe中，再添加一个标志供css文件生效

```js
;(function(){
	// 小于768像素则不执行
	if(window.innerWidth < 768){
		return;
	}
	
	// 获取模板内容
	var tpl = document.querySelector("#tpl-adapt-pc").innerHTML || '';
	// 设置当前链接
	tpl = tpl.replace('mobile-href',window.location.href);
	// 写入模板内容
	document.querySelector("uni-adapt-pc").innerHTML = tpl;
	// 添加PC标识
	document.body.setAttribute("adapt","pc");
})();
```

css文件这里就不做介绍了，可以自己思考实现效果，比如可以引入一个手机外壳作为iframe的背景，模拟手机

```css
body[adapt='pc'] .container .iframe{
	width: 340px;
	height: 690px;
	background-image: url(pc-iPhoneX.png);
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center;
	float: left;
}
```

> 上述参考https://gitee.com/myDarling/uniapp-extend

## 坑1：模板不生效

需要在`manifest.json`中配置h5的模板页面：

```json
"h5" : {
    "template" : "template.h5.html",
}
```

如果你使用的是HbuildX，需要重启项目才会让模板生效

## 坑2：iframe中的this

在iframe中this的指向和想象中的不太一样，比如对于一个popup弹窗，里面有一个按钮可以关闭这个弹窗。这个是通过给弹窗设置ref，然后按钮`@click="() => {this.$refs.XXX.close()}"`来实现关闭的，这是一个箭头函数，我们都知道箭头函数体内的`this`对象，就是定义**该函数时所在的作用域指向的对象**，而不是使用时所在的作用域指向的对象。在小程序中的应用没有任何问题，因为它找到的this就是整个vue实例，但是在iframe中，它找到的this并不是。这应该是渲染流程上的问题，是一个坑，但是我也暂时没明白这个坑是如何出现的。

## 坑3： 定位元素的错位
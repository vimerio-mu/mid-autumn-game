/**
 * uni-app 电脑端浏览兼容脚本
 * 作者：河浪
 * 联系方式：QQ 1846492969，邮箱 helang.love@qq.com
 */

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
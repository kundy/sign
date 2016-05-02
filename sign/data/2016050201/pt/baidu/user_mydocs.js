/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://trade-z.jd.com/funding/mychip.action
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
	console.log("[user_mydocs.js start]"+location.href);
    get_credit();
}




//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll(".right-block .wealth-number a").length>0)
		num = document.querySelectorAll(".right-block .wealth-number a")[0].innerText;

	//通知父页面
	var msg = {type:"BAIDU_WENKU",name:"credit_num",data:num};
	post_parent(msg);
}



function click_btn(obj){
    var evt = document.createEvent("MouseEvents"); 
    evt.initEvent("click", false, false);
    obj.dispatchEvent(evt);    
}


function post_parent(msg){
	var str = JSON.stringify(msg) 
	window.parent.postMessage(str,'*');
}



})();


















































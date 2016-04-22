/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://pingce.jd.com/funding/usercenter.action
 * Author: kundy
 * Date: 2016-04-21
 */




var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
	console.log("[usercenter.action.js start]");
    var msg;
    JD_usercenter_action();
}


function JD_usercenter_action(){
	var chouma_num = $(".chouma_box a b").text();

	//通知父页面筹码数量
	var msg = {type:"JD",name:"chouma_num",data:chouma_num};
	post_parent(msg);

	//延时打开 抢筹码页面
	$(".chouma_box a").attr("target","_self");
	if($(".chouma_box a").length>0){
		setTimeout(function(){
			click_btn($(".chouma_box a")[0])
		},1000)
	}
	
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


















































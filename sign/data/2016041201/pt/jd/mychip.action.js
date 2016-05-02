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
	console.log("[usercenter.action.js start]");
    var msg;
    JD_mychip_action();
}


function JD_mychip_action(){
	//延时打开 抢筹码页面
	$(".chouma_box a").attr("target","_self");
	if($(".banner-container button.btn").length>0)
		click_btn($(".banner-container button.btn")[0])

	
	setTimeout(function(){
		//通知已点击
		var msg = {type:"JD",name:"chouma_click",data:""};
		post_parent(msg);

		
	},2000)
	
	
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


















































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
	console.log("[task_browse_daily.js start]");
    click_sign();
}



//点击签到
function click_sign(){

	if(document.querySelectorAll(".js-signin-btn").length>0){
		click_btn(document.querySelectorAll(".js-signin-btn")[0])
		var msg = {type:"BAIDU_WENKU",name:"sign_click",data:""};
    	post_parent(msg);
	}
	setTimeout(go_credit,1500)
}


//获取积分数量
function go_credit(){

	location.href="http://wenku.baidu.com/user/mydocs";

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


















































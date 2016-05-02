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
	console.log("[jf_earn.js start]");
    var msg;
    get_user_name();
}


function get_user_name(){

	//获取用户名
	var user_name ="";
	var msg;
    if(document.querySelectorAll(".ui-navbar-status-username").length>0){
        user_name=document.querySelectorAll(".ui-navbar-status-username")[0].innerText;

        click_sign();
		setTimeout(get_credit,1500)

    }
    msg = {type:"VIP_QQ",name:"user_name",data:user_name};
    post_parent(msg);
}

//点击签到
function click_sign(){
	if(document.querySelectorAll(".gotoSignIn").length>0){
		click_btn(document.querySelectorAll(".gotoSignIn")[0].parentNode)
		var msg = {type:"VIP_QQ",name:"sign_click",data:""};
    	post_parent(msg);

	}
}


//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll("#myCent").length>0)
		num = document.querySelectorAll("#myCent")[0].innerText;

	//通知父页面
	var msg = {type:"VIP_QQ",name:"credit_num",data:num};
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


















































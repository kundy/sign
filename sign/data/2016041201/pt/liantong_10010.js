/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://iservice.10010.com/e3/signIn/index.html
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,2000);




function init(){
	console.log("[liantong_10010.js start]");
	url_switch();
}



function url_switch(){
	var url = location.href;
	if(url == "http://iservice.10010.com/e3/signIn/index.html"){
		get_user_name();
	}
}



function get_user_name(){

	//获取用户名
	var user_name ="";
	var msg;
    if(document.querySelectorAll("#mobileCome").length>0){
        user_name=document.querySelectorAll("#mobileCome")[0].innerText;
        if(user_name!=""){
        	user_name=user_name.substr(0,user_name.indexOf("，"))
        	click_sign();
        }
    }
    msg = {type:"LIANTONG",name:"user_name",data:user_name};
    post_parent(msg);
}

//点击签到
function click_sign(){
	if(document.querySelectorAll("#signInNow a.msqd").length>0){
		click_btn(document.querySelectorAll("#signInNow a.msqd")[0])
	}
		
	var msg = {type:"LIANTONG",name:"sign_click",data:""};
    post_parent(msg);

    setTimeout(get_credit,2000);

	
}


//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll("#remainCoins").length>0)
		num = document.querySelectorAll("#remainCoins")[0].innerText;

	//通知父页面
	var msg = {type:"LIANTONG",name:"credit_num",data:num};
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


















































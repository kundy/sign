/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://vip.xunlei.com/index.html
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,2000);




function init(){
	console.log("[lifevc.js start]");
	url_switch();
}



function url_switch(){
	var url = location.href;
	console.log(url)
	if(url == "http://events.pingan.com/qiandao/index.html"){
		get_user_name();
	}
}



function get_user_name(){

	//获取用户名
	var user_name ="";
	var msg;
    if(document.querySelectorAll("#header .party_no").length>0){
        user_name=document.querySelectorAll("#header .party_no")[0].innerText;

        if(user_name!="")click_sign();

    }
    console.log(user_name)
    msg = {type:"PINGAN",name:"user_name",data:user_name};
    post_parent(msg);
}

//点击签到
function click_sign(){
	if(document.querySelectorAll(".index_sign_btn").length>0){
		click_btn(document.querySelectorAll(".index_sign_btn")[0])

		
		var msg = {type:"PINGAN",name:"sign_click",data:""};
    	post_parent(msg);

    	setTimeout(get_credit,1500);

	}
}


//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll("#sign-tip span").length>0)
		num = document.querySelectorAll("#sign-tip span")[0].innerText.replace("天","");

	//通知父页面
	var msg = {type:"PINGAN",name:"credit_num",data:num};
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


















































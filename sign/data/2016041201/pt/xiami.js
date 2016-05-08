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
	console.log("[xiami.js start]");
	url_switch();
}



function url_switch(){
	var url = location.href;
	//console.log("url:"+url)
	if(url == "http://www.xiami.com/"){
		get_user_name();
	}
	else if(url == "http://www.xiami.com/account"){
		get_credit();
	}
}



function get_user_name(){

	//获取用户名
	var user_name ="";
	var msg;
    if(document.querySelectorAll("#user .name a").length>0){
        user_name=document.querySelectorAll("#user .name a")[0].innerText;

        click_sign();

    }
    msg = {type:"XIAMI",name:"user_name",data:user_name};
    post_parent(msg);
}

//点击签到
function click_sign(){
	if(document.querySelectorAll("#user .action").length>0){
		click_btn(document.querySelectorAll("#user .action")[0])

		
		var msg = {type:"XIAMI",name:"sign_click",data:""};
    	post_parent(msg);

    	setTimeout(go_account,1500);

	}
}


//去帐户页
function go_account(){
	location.href="http://www.xiami.com/account";
}


//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll("#account_views label").length>0){
		//先清除提示标签
		if(document.querySelectorAll("#account_views .notice").length>0){
			document.querySelectorAll("#account_views .notice")[0].remove();
		}
		for(var i=0;i<document.querySelectorAll("#account_views label").length;i++){
			if(document.querySelectorAll("#account_views label")[i].innerText=="积分："){
				num=document.querySelectorAll("#account_views label")[i].parentNode.innerText.replace("积分：","")
			}
		}
	}

	//通知父页面
	var msg = {type:"XIAMI",name:"credit_num",data:num};
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








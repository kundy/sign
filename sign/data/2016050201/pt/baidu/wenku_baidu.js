/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://wenku.baidu.com/
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
	console.log("[wenku_baidu.js start]");
    get_user_name();
}


function get_user_name(){
	console.log("[wenku_baidu.js get_user_name] ");
	//获取用户名
	var user_name ="";
	var msg;
    if(document.querySelectorAll("#userNameCon").length>0){
        user_name=document.querySelectorAll("#userNameCon")[0].innerText;
	setTimeout(go_daily_page,500)

    }
    msg = {type:"BAIDU_WENKU",name:"user_name",data:user_name};
    post_parent(msg);
}

//点击签到
function go_daily_page(){
	console.log("[wenku_baidu.js go_daily_page] ");
	location.href= "http://wenku.baidu.com/task/browse/daily";
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


















































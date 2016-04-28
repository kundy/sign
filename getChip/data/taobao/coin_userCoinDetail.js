/*
 * Copy Right: tonytony.club
 * Comments: 适用于http://www.etao.com/
 * Author: kundy
 * Date: 2016-04-21
 */




var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){



if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
    console.log("[coin_userCoinDetail.js start]");
    ETAO_get_num()
}





function ETAO_get_num(){

	//获取筹码数量
	var num = 0;

	if(document.querySelectorAll(".my-coin span").length>0)
		num = document.querySelectorAll(".my-coin span")[0].innerText;

	//通知父页面
	var msg = {type:"ETAO",name:"coin_num",data:num};
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


















































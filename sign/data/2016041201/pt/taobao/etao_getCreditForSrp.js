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
    console.log("[etao_getCreditForSrp.js start]");
    ETAO_post_sign()
}





function ETAO_post_sign(){
    var msg = {type:"ETAO",name:"sign_click",data:""};
    post_parent(msg);

    ETAO_go_coin();
}

function ETAO_go_coin(){
    location.href = "https://taojinbi.taobao.com/coin/userCoinDetail.htm";
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








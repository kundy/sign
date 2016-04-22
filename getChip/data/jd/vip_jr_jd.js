/*
 * Copy Right: tonytony.club
 * Comments: 适用于http://vip.jr.jd.com/
 * Author: kundy
 * Date: 2016-04-21
 */




var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
	console.log("[vip_jr_jd.js start]");
    var msg;
    if(document.querySelectorAll("#qian-btn").length>0){
        click_btn(document.querySelectorAll("#qian-btn")[0])
        msg = {type:"JD",name:"vip_jr_jd_click",data:"1"};
    }
    else{
        msg = {type:"JD",name:"vip_jr_jd_click",data:"0"};
    }

    setTimeout(function(){
        post_parent(msg);
    },1000)
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


















































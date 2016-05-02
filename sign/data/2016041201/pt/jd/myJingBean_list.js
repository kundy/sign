/*
 * Copy Right: tonytony.club
 * Comments: 适用于http://bean.jd.com/myJingBean/list
 * Author: kundy
 * Date: 2016-04-21
 */




var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);




function init(){
	console.log("[myJingBean_list.js start]");
    
    //获取京豆数量
    var jd_num ="";
    if(document.querySelectorAll(".user-bean-cont .num").length>0){
        jd_num=document.querySelectorAll(".user-bean-cont .num")[0].innerText;
        
    }
    var msg = {type:"JD",name:"jd_num",data:jd_num};
    post_parent(msg);

}



function post_parent(msg){
	var str = JSON.stringify(msg) 
	window.parent.postMessage(str,'*');
}



})();


















































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
    //获取用户名
    var user_name ="";
    if(document.querySelectorAll("#loginbar .link-user").length>0){
        user_name=document.querySelectorAll("#loginbar .link-user")[0].innerText;
       
    }
    var msg = {type:"JD",name:"user_name",data:user_name};
    post_parent(msg);

    //点击签到
    if(document.querySelectorAll("#qian-btn").length>0){
        click_btn(document.querySelectorAll("#qian-btn")[0])
        msg = {type:"JD",name:"vip_jr_jd_click",data:""};
    }
    else{//没有签到按钮，说明已经签到
        msg = {type:"JD",name:"vip_jr_jd_clicked",data:""};
    }

    setTimeout(function(){
        post_parent(msg);

        //跳转京豆页，获取京豆数量
        location.href = "http://bean.jd.com/myJingBean/list";
    },2000)
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


















































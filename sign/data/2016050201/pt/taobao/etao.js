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
    console.log("[etao.js start]");
    ETAO_test_login()
}



//测试是否登录成功
function ETAO_test_login(){
    var login_info = ""
    if(document.querySelectorAll("#J_MyLogin a").length>0)
        login_info = document.querySelectorAll("#J_MyLogin a")[0].innerText;
    

    // console.log("login_info:"+login_info);
    if( login_info == "登录" ){
        var msg = {type:"ETAO",name:"login",data:""};
        post_parent(msg);
    }
    else{
        var msg = {type:"ETAO",name:"login",data:login_info};
        post_parent(msg);
        ETAO_sign();
    }
}



function ETAO_sign(){
    //模拟点击 获取淘金币
    // if(document.querySelectorAll("#J_SignIn  .ci_receive").length>0)
    //     click_btn(document.querySelectorAll("#J_SignIn .ci_receive")[0])
    //因为是iframe，etao做了检测，会报错，这里直接iframe跳转

    var url = "http://jf.etao.com/ajax/getCreditForSrp.htm?";
    url += "jfSource=27";
    url += "&ua=131UW5TcyMNYQwiAiwZTXFIdUh1SHJOe0BuOG4%3D%7CUm5OcktwTHJOdUt1QHROdSM%3D%7CU2xMHDJ7G2AHYg8hAS8XKwUlC1c2UDxbJV9xJ3E%3D%7CVGhXd1llXGdbZVliXGJXYldsW2ZEfUN7QXpOdE91SnVPdUtxTmA2%7CVWldfS0QMAU%2BBSUZIwMtQiVjACsLMhIuC116G2IdJgEveS8%3D%7CVmNDbUMV%7CV2NDbUMV%7CWGZGFisLNhYqEicZOQA4DDERLRYrFjYKNQg1FSkSLxIyDjIOOmw6%7CWWVYeFYGOAI6ATkZTmBcZV1lXmJXaVxmXGVeKxY0ATsAPgUxCzEEOwE4AT8ANGNNbVEHKX8%3D%7CWmNDEz0TMwg2CioSLRMzCTEJXwk%3D%7CW2JCEjwSMg4wDTYWKB0hAT4BPwRSBA%3D%3D%7CXGREFDoUNGRYZltkRHpBfykJNBQ6FDQLMgc%2FaT8%3D%7CXWRZZER5WWZGekN%2FX2FZY0N7T29VbU1yUmZZeUNjWHhEfSs%3D";
    url += "&_ksTS=1461316341560_"+Math.floor(Math.random()*1000);
    
    location.href = url;

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


















































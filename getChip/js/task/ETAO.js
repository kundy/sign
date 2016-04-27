
(function(){

//初始定义
var NAME='ETAO';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"淘宝-淘金币",
        remark:"淘金币可以在淘宝、天猫上面购买商品直接支付，1淘金币=0.01元",
        remarkUrl:"",
        id:"",
        idUrl:"",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"",
        total:0,//领取的累积数量
        status:1
    }
}



var IFRAME = $("#iframe")[0];






/*一淘 淘金币任务
**********************************************/
function task(fun){
    console.log("[task start]***")
    task.end_cb = fun;
    task.step_check_login();
}
//检查登录
task.step_check_login=function(){
    console.log("[task.step_check_login]")
     //先检查登录态是否正常
    IFRAME.src="http://www.etao.com/";
}

//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    // IFRAME.src = "";
    // task.end_cb();
}




CHIP_DATA[NAME].task = task;


})();
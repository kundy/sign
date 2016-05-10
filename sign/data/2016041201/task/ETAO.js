
(function(){

//初始定义
var NAME='ETAO';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"淘宝-淘金币",
        remark:"淘金币可以进行抽奖、秒杀、兑换超值物品等。100淘金币=￥1.00",
        remarkUrl:"https://taojinbi.bbs.taobao.com/detail.html?postId=2784790",
        id:"",
        idUrl:"http://i.etao.com/level/user_level.html",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"https://taojinbi.taobao.com/coin/userCoinDetail.htm",
        total:0,//领取的累积数量
        visable:1,
        status:1,
        step:0,//状态：0初始值  1准备 2任务进行中 3完成
        task:{}
    }
}



var IFRAME = $("#iframe")[0];



function task(fun){
    console.log("[task start]****** name:"+NAME)
    task.end_cb = fun;
    task.start();

}

//任务开始
task.start=function(){
    console.log("[task.start]***")
    if(CHIP_DATA[NAME].status == 0){
        task.finish();
    }
    else{
        CHIP_DATA[NAME].step = 2;
        task.open_index();
    }
}

//任务超时
task.timeout=function(){
    CHIP_DATA[NAME].step = 3;
}

//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    CHIP_DATA[NAME].step = 3;
    task.end_cb();
}

//检查登录
task.open_index=function(){
    console.log("[task.step_check_login]")
     //先检查登录态是否正常
    IFRAME.src="http://www.etao.com/";
}





CHIP_DATA[NAME].task = task;


})();
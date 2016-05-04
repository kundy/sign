
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
        status:1
    }
}



var IFRAME = $("#iframe")[0];







function task(fun){
    console.log("[task start]****** name:"+NAME)
    task.end_cb = fun;

    if(CHIP_DATA[NAME].status == 0){
        task.finish();
    }
    else{
        task.open_index();
    }

}
//检查登录
task.open_index=function(){
    console.log("[task.step_check_login]")
     //先检查登录态是否正常
    IFRAME.src="http://www.etao.com/";
}

//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}




CHIP_DATA[NAME].task = task;


})();
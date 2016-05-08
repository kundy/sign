(function(){


//初始定义
var NAME='VIP_QQ';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"QQ-积分",
        remark:"QQ会员积分可以兑换游戏礼包、QQ公仔、数码奖品并进行抽奖等",
        remarkUrl:"http://vip.qq.com/jf/earn.html",
        id:"",
        idUrl:"http://vip.qq.com/my/index.html",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://vip.qq.com/jf/earn.html",
        total:0,//领取的累积数量
        status:1,
        visable:1,
        task:{}
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



//打开用户个人中心页
task.open_index=function(){
    console.log("[task.open_index")
    IFRAME.src="http://vip.qq.com/jf/earn.html";
}



//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
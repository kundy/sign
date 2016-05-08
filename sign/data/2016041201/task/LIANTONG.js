(function(){


//初始定义
var NAME='LIANTONG';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"联通-签到",
        remark:"每日签到获得金币，可以兑换奖品",
        remarkUrl:"http://iservice.10010.com/e3/signIn/index.html",
        id:"",
        idUrl:"https://uac.10010.com/cust/userinfo/userInfoInit",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://iservice.10010.com/e3/signIn/index.html",
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
    IFRAME.src="http://iservice.10010.com/e3/signIn/index.html";
}


//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
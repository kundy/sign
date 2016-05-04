(function(){


//初始定义
var NAME='XUNLEI_DAKA';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"迅雷-打卡",
        remark:"每日签到打卡,可以用来兑换迅雷VIP、周边商品，200金豆=1元",
        remarkUrl:"http://vip.xunlei.com/vip_service/mycenter/rule.html",
        id:"",
        idUrl:"http://dynamic.i.xunlei.com/user",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://vip.xunlei.com/index.html",
        total:0,//领取的累积数量
        status:1,
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
    IFRAME.src="http://vip.xunlei.com/index.html";
}


//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
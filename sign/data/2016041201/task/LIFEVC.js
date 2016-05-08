(function(){


//初始定义
var NAME='LIFEVC';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"LIFE-VC",
        remark:"在LIFE-VC签到，可以领取20积分，200积分可抵1元",
        remarkUrl:"http://www.lifevc.com/Home/PointsSystem",
        id:"",
        idUrl:"https://account.lifevc.com/UserCenter",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home",
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
    console.log("[task.open_index]")
    IFRAME.src="http://www.lifevc.com/";
}


//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
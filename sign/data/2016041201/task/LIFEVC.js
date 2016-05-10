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
        step:0,//状态：0初始值  1准备 2任务进行中 3完成
        task:{}
    }
}



var IFRAME = $("#iframe")[0];    



function task(end_cb){
    console.log("[task start]****** name:"+NAME)
    task.end_cb = end_cb;
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
        task.check_login();
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
task.check_login=function(){
    console.log("[task.check_login]")
     //先检查登录态是否正常
    checkUrlredirect("http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home",function(t){
        if(t==1){
            console.log("[TASK_LIFEVC] login ok")
            CHIP_DATA[NAME].auth = 1;
            task.open_index();
        }
        else{
            console.log("[TASK_LIFEVC] login fail")
            CHIP_DATA[NAME].auth = 0;
            task.finish();
        }
    })
}


//打开用户个人中心页
task.open_index=function(){
    console.log("[task.open_index]")
    IFRAME.src="http://www.lifevc.com/";
}



CHIP_DATA[NAME].task = task;


})();
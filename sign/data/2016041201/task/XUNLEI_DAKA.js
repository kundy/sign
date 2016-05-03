(function(){


//初始定义
var NAME='XUNLEI_DAKA';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"迅雷-打卡",
        remark:"每日签到领取1-3积分,可以用来兑换迅雷VIP、周边商品，200金豆=1元",
        remarkUrl:"http://vip.qq.com/jf/earn.html",
        id:"",
        idUrl:"http://vip.qq.com/my/index.html",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://vip.qq.com/jf/earn.html",
        total:0,//领取的累积数量
        status:1,
        task:{}
    }
}



var IFRAME = $("#iframe")[0];    
/*JD任务，签到获取京豆
**********************************************/
function task(fun){
    console.log("[task start]****** name:"+NAME)
    task.end_cb = fun;
    if(CHIP_DATA[NAME].status == 0){
        task.finish();
    }
    else{
        task.open_vip_jr_jd_com();
    }
}



//打开用户个人中心页
task.open_vip_jr_jd_com=function(){
    console.log("[task.open_vip_jr_jd_com")
    IFRAME.src="http://vip.qq.com/jf/earn.html";
}


task.call=function(data){

}

//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
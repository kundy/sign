(function(){


//初始定义
var NAME='JD_JDOU';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"京东-京豆",
        remark:"京豆可直接用于支付京东网站订单，100京豆 = ￥1.00 ",
        remarkUrl:"http://help.jd.com/user/issue/167-330.html",
        id:"",
        idUrl:"http://home.jd.com/",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://bean.jd.com/myJingBean/list",
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
        task.check_login();
    }
}



//检查登录
task.check_login=function(){
    console.log("[task.check_login]")
     //先检查登录态是否正常
    checkUrlredirect("http://home.jd.com/",function(t){
        if(t==1){
            console.log("[TASK_JD_JDOU] login ok")
            CHIP_DATA[NAME].auth = 1;
            task.open_index();
        }
        else{
            console.log("[TASK_JD_JDOU] login fail")
            CHIP_DATA[NAME].auth = 0;
            task.finish();
        }
    })
}
//打开用户个人中心页
task.open_index=function(){
    console.log("[task.open_index")
    IFRAME.src="http://vip.jr.jd.com/";
}



//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
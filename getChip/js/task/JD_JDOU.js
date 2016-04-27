(function(){

    
//初始定义
var NAME='JD_JDOU';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"京东-筹码",
        remark:"京豆筹码可以用来体验最新商品",
        remarkUrl:"",
        id:"",
        idUrl:"",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"",
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
    task.step_check_login();
}



//检查登录
task.step_check_login=function(){
    console.log("[task.step_check_login]")
     //先检查登录态是否正常
    checkUrlredirect("http://home.jd.com/",function(t){
        if(t==1){
            console.log("[TASK_JD_JDOU] login ok")
            CHIP_DATA[NAME].auth = 1;
            task.open_vip_jr_jd_com();
        }
        else{
            console.log("[TASK_JD_JDOU] login fail")
            CHIP_DATA[NAME].auth = 0;
            task.finish();
        }
    })
}
//打开用户个人中心页
task.open_vip_jr_jd_com=function(){
    console.log("[task.open_vip_jr_jd_com")
    IFRAME.src="http://vip.jr.jd.com/";
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
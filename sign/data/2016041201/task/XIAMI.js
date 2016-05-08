(function(){


//初始定义
var NAME='XIAMI';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"虾米-签到",
        remark:"签到获得积分和体验点，积分可以升级，体验点可以下载歌曲购买道具",
        remarkUrl:"http://www.xiami.com/websitehelp?spm=0.0.0.0.7E4AkF#help2_1",
        id:"",
        idUrl:"http://www.xiami.com/",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://www.xiami.com/account",
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
    IFRAME.src="http://www.xiami.com/";
}


//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
(function(){


//初始定义
var NAME='BAIDU_WENKU';
if(!CHIP_DATA[NAME]){
    CHIP_DATA[NAME]={
        name:"百度-下载券",
        remark:"下载券用来下载百度文库中的财富值文档",
        remarkUrl:"http://wenku.baidu.com/portal/browse/help#help/3",
        id:"",
        idUrl:"http://wenku.baidu.com/user/mydocs",
        auth:-1,//是否登录
        today:0,//今天是否抢
        num:-1,//当前筹码数量
        numUrl:"http://wenku.baidu.com/user/mydocs",
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



//打开文库首页
task.open_index=function(){
    console.log("[task.open_index")
    IFRAME.src="http://wenku.baidu.com/";
}



//任务结束
task.finish=function(){
    console.log("[task.finish]***")
    IFRAME.src = "";
    task.end_cb();
}


CHIP_DATA[NAME].task = task;


})();
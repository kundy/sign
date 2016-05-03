/*
 * Copy Right: Tencent ISUX
 * Comments: 任务对象
 * Author: kundy
 * Date: 2016-04-13
 */


(function(){

var TASK = function(){}
var TASK_TIMEOUT_ID;
TASK.list = [];
TASK.init=function(start_cb,end_cb)
{
    TASK.TIMES = 0;//任务执行次数
    TASK.TIME_START = 0;//任务开始时间
    TASK.TIME_END = 0;//任务结束时间
    TASK.TASK_INDEX = 0;//任务序号
    TASK.RUN_FLAG = 0;//任务是否正常执行
    TASK.START_CB = start_cb;//任务开始回调
    TASK.END_CB = end_cb;//任务完成回调
}
TASK.start=function()
{
    console.log("TASK.start")
    if(TASK.RUN_FLAG)return;
    TASK.START_CB();
    TASK.loop();
    TASK.TIME_START = Date.parse(new Date()); 
    TASK.TIME_END = 0;
    TASK.RUN_FLAG = 1;
    //setInterval(TASK.loop , TASK.TASK_INTERVAL);
}

TASK.reg=function(fun)//注册任务
{
    TASK.list.push(fun);
}

TASK.clear=function()//清空任务
{
    TASK.list=[];
}

//循环任务
TASK.loop=function()
{
    if(TASK.TASK_INDEX == TASK.list.length){//所有任务结束
        if(TASK_TIMEOUT_ID)clearTimeout(TASK_TIMEOUT_ID);
        TASK.finish();
    }
    else{

        TASK.list[TASK.TASK_INDEX](function(){//执行任务 ，参数为回调
            setTimeout(function(){//此处注意要异步延迟执行,防止过早回调直接进入下一个任务
                if(TASK_TIMEOUT_ID)clearTimeout(TASK_TIMEOUT_ID);
                TASK.TASK_INDEX++;
                TASK.loop();
            },200)
        });

        //设置超时间
        if(TASK_TIMEOUT_ID)clearTimeout(TASK_TIMEOUT_ID);
        TASK_TIMEOUT_ID = setTimeout(function(){//任务超时
            TASK.list[TASK.TASK_INDEX].end_cb();
        },TASK.TASK_TIMEOUT)
    }
}

//所有任务完成
TASK.finish=function()
{
    console.log("ALL TASK FINISH")
    TASK.RUN_FLAG = 0;
    TASK.TIME_END = Date.parse(new Date()); 
    TASK.TASK_INDEX=0;
    TASK.TIMES++;
    TASK.END_CB();
}

//暂停任务
TASK.puase=function()
{
    TASK.RUN_FLAG = 0;
}

//恢复任务
TASK.resume=function()
{
    TASK.RUN_FLAG = 1;
}


window.TASK = TASK;






})();
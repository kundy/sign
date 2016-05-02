/*
 * Copy Right: Tencent ISUX
 * Comments: 任务对象
 * Author: kundy
 * Date: 2016-04-13
 */


var TASK = function(){}
var TASK_TIMEOUT;
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
    if(TASK.RUN_FLAG)return;
    TASK.START_CB();
    TASK.loop();
    TASK.TIME_START = Date.parse(new Date()); 
    TASK.TIME_END = 0;
    TASK.RUN_FLAG = 1;
    setInterval(TASK.loop , TASK.TASK_INTERVAL);
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
        TASK.finish();
        return;
    }

    TASK.list[TASK.TASK_INDEX](function(){//执行任务 ，参数为回调
        clearTimeout(TASK_TIMEOUT);
        TASK.TASK_INDEX++;
        TASK.loop();
    });

    //设置超时间
    clearTimeout(TASK_TIMEOUT);
    TASK_TIMEOUT = setTimeout(function(){//任务超时
        console.log("[task timeout]")
        TASK.list[TASK.TASK_INDEX].end_cb();
    },TASK.TASK_TIMEOUT)
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


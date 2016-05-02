/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */


var ENV = "DEBUG";
//ENV = "RELEASE";

var TASK_INTERVAL = 24 * 3600 * 1000 / 10; //任务循环，默认一天10次
var SERVER_UPDATE_INTERVAL = 24 * 3600 * 1000 //从服务器上主动更新逻辑数据，默认一天一次
var CHIP_DATA = {};//全局公用数据，需要存localstorage
var TASK_DATA = {TIMES:0,TIME_START:0,TIME_END:0};//全局任务数据，需要存localstorage
var SIGN_SERVER_PREFIX = "https://raw.githubusercontent.com/kundy/sign/master/sign/";

//测试环境本地化
if(ENV=="DEBUG")SIGN_SERVER_PREFIX = "https://localhost/GitHub/sign/";

//此处数据需要在服务器上进行更新
var TASK_LIST=[];
var URL_LIST=[];
var HANDLE_MSG={};
var VERSION = "";



(function(){

$(document).ready(function(){
    console.log("[background.js init]");
    version_init();
    chipdata_init();
    
});




//版本初始化
function version_init(){
    version_update();
    setInterval(version_update,SERVER_UPDATE_INTERVAL);
}


var VERSION_FAILED_TIMES = 0;
//版本 更新数据
function version_update(){
    var version_src = SIGN_SERVER_PREFIX+"sign/data/version.txt?"+Math.floor(Math.random()*1000000);
    getData(version_src,function(t){
        VERSION_FAILED_TIMES=0;
        version_data_load(t);
    },function(){
        //如果加载版本文件失败，1分钟后重新初始化，执行3次，如果继续失败，则5分钟后再重新尝试3次，如果继续失败，则1小时后再重新尝试3次
        if(VERSION_FAILED_TIMES<=2){
            setTimeout(version_update,60*1000*1);
        }
        else if(VERSION_FAILED_TIMES<=5){
            setTimeout(version_update,60*1000*5);
        }
        else if(VERSION_FAILED_TIMES<=8){
            setTimeout(version_update,60*1000*60);
        }
        else{
            console.log("[VERSION INIT] failed,please check network");
        }
        
        VERSION_FAILED_TIMES++;
    })
}


//加载版本数据文件
function version_data_load(t){

    //清理原有任务脚本
    $("script").each(function(index,obj){
        if($(obj).data("version")){
            $(obj).remove();
        }
    })


    VERSION = t;
    var version_data_url = SIGN_SERVER_PREFIX+"sign/data/"+VERSION+"/data.js";
    var body  = document.getElementsByTagName('body')[0]; 
    var script= document.createElement("script"); 
    script.type = "text/javascript"; 
    script.setAttribute("data-version",VERSION);
    script.src= version_data_url; 
    script.onload=function(){
        chipdata_reset();
        task_init();
    }
    body.appendChild(script);
   
}





//数据初始化
function chipdata_init(){
    var CHIP_DATA_TEMP = data_read("CHIP_DATA");
    if(CHIP_DATA_TEMP!=""){
        CHIP_DATA = CHIP_DATA_TEMP;
    }
}


//数据清理，如果任务列表中没有列出的任务，则不显示出来，visable=0;
function chipdata_reset(){
    for(var item in CHIP_DATA){
        CHIP_DATA[item].visable = 0;//先全部重置为0

        for(var task_name in TASK_LIST){
            if(item == TASK_LIST[task_name]){
                CHIP_DATA[item].visable = 1;
            }
        }
    }
}





//任务初始化
function task_init(){
    var TASK_DATA_TEMP = data_read("TASK_DATA");
    if(TASK_DATA_TEMP!=""){
        TASK_DATA = TASK_DATA_TEMP;
    }
    TASK.clear();
    TASK.init(task_start_cb,task_finish_cb);
    TASK.TASK_INTERVAL = TASK_INTERVAL;
    TASK.TASK_TIMEOUT = 30 * 1000 ; //任务超时时间，30秒
    TASK.TIMES = TASK_DATA.TIMES;//任务执行次数
    TASK.TIME_START = TASK_DATA.TIME_START;//任务开始时间
    TASK.TIME_END = TASK_DATA.TIME_END;//任务结束时间

    task_reg();
}

//注册任务
var task_index = 0;
function task_reg(){
    if(task_index == TASK_LIST.length){//所有任务注册并加载后
        task_index=0;
        TASK.start();
        return;
    }
    task_load( TASK_LIST[task_index]   );
    task_index++;
}


//加载任务
function task_load(src){
    var body  = document.getElementsByTagName('body')[0]; 
    var script= document.createElement("script"); 
    script.type = "text/javascript"; 
    script.setAttribute("data-version",VERSION);   
    script.src= SIGN_SERVER_PREFIX+"sign/data/"+VERSION+"/task/"+src+".js"; 
    script.onload=function(){
        TASK.reg(CHIP_DATA[src].task);
        task_reg();
    }
    body.appendChild(script);
}

//设置任务是否运行
function task_set(taskId,t){
    if(CHIP_DATA[taskId]){
        CHIP_DATA[taskId].status = t*1;
    }
    data_save("CHIP_DATA",CHIP_DATA);
    msg_popup("DATA_UPDATE",{});
}


//手动刷新任务
function task_refresh(){
    version_init();
}


//一轮任务开始
function task_start_cb(){
    msg_popup("TASK_START",{});
}


//一轮任务完成
function task_finish_cb(){
    data_save("CHIP_DATA",CHIP_DATA);
    TASK_DATA = {
        TIMES:          TASK.TIMES,
        TIME_START:     TASK.TIME_START,
        TIME_END:       TASK.TIME_END
    };

    data_save("TASK_DATA",TASK_DATA);

    msg_popup("TASK_FINISH",{});
}



//处理url
function handle_url(url){
    for(var i=0;i<URL_LIST.length;i++){
        //第三个参数为1时为精准匹配，为0 时为模糊匹配
        if(URL_LIST[i][2]==1){
            if(url == URL_LIST[i][0]){//精准匹配
                 iframe_insert_script( SIGN_SERVER_PREFIX + "sign/data/"+VERSION+"/pt/"+URL_LIST[i][1] )
            }
        }
        else{
            if(url.indexOf(URL_LIST[i][0]) > -1 ){//模糊匹配
                 iframe_insert_script( SIGN_SERVER_PREFIX + "sign/data/"+VERSION+"/pt/"+URL_LIST[i][1] )
            }
        }
        
    }
}


/*消息处理
*****************************************************************/

//接收iframe消息 
window.addEventListener('message',function(e){
    var data =e.data;
    try{
        var msg = JSON.parse(data);
        if(msg.type == "SIGN_CONTENT_SCRIPT_RUN"){
            if(msg.name == "url"){
                handle_url(msg.data);
            }
        }
        else if(msg && msg.type){
            HANDLE_MSG(msg);
        }

        msg_popup("DATA_UPDATE",{});
    }catch(error){
        console.log(error)
    }
},false);


//发送消息给iFrame
var IFRAME = $("#iframe")[0];
function post_msg(msg){
    var str = JSON.stringify(msg)
    IFRAME.contentWindow.postMessage(str,'*');
}


//与popup通信
function msg_popup(_cmd,_cb){
    chrome.runtime.sendMessage(_cmd, function(response){
        //_cb(response);
    });
}

//接收popup消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'GET_CHIP_DATA'){
        sendResponse(CHIP_DATA);
    }
    else if(message == 'GET_TASK_DATA'){
        sendResponse(TASK_DATA);
    }
    else if(message == 'TASK_REFRESH'){
        task_refresh();   
    }
    else if(message == 'GET_TASK_STATUS'){//任务执行状态
        if(TASK.RUN_FLAG){
            sendResponse(1)
        }
        else{
            sendResponse(0)
        }
        
    }
    else if(message.indexOf("TASK_SET") === 0 ){//任务执行状态
        try{
            var msg_obj = message.split("#");
            task_set(msg_obj[1],msg_obj[2])

        }catch(e){}   
    }
});



//通知content_script插入JS脚本
function iframe_insert_script(js){
    var msg = {type:"SIGN_INSERT_CONTENT",name:"script",data:js};
     post_msg(msg);
}


if(ENV!="DEBUG"){
    console.log=function(){}
}



})()


/*FUNCTIONS
*****************************************************************/

//测试url是否跳转，主要用来验证是否登录成功
function checkUrlredirect(url,cb)
{

    var xhr = new XMLHttpRequest();    
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.timeout = 30*1000;
    // xhr.setRequestHeader("User-Agent","Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)");

    xhr.onload = function() {
        if (xhr.status == 200 ) {
            if(url == xhr.responseURL){
                cb(1);
            }
            else{
                cb(0);
            }
        }
        else{
            // console.warn("Download.fail i:"+ i +　" blobURL:" +blobURL);
            // Download.fail(i);
        }
    }
    xhr.ontimeout  = function(event){
        // console.warn("Download.timeout i:"+ i +　" blobURL:" +blobURL);
　　}
    xhr.onerror = function(e) {
        // console.warn("Download.error i:"+ i +　" blobURL:" +blobURL);
      };
    xhr.send();
}


//获取数据
function getData(url,succCb,failCb)
{
    $.ajax( {  
        url:url,  
        type:'get',  
        dataType:'text',  
        success:function(data) {  
            succCb(data);
        },  
        error : function() {  
            failCb(); 
        }  
    });
}



//数据读写
function data_save(name,data){
    localStorage[name] = JSON.stringify(data);
}

function data_read(name){
    var str = localStorage[name];
    try{
        var msg = JSON.parse(str);
        return msg;
    }
    catch(e){
    }

    return "";
}
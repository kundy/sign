/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */




var CHIP_DATA = {};
var TASK_DATA = {TIMES:0,TIME_START:0,TIME_END:0};
(function(){

var ENV = "DEBUG";
//ENV = "RELEASE";

//任务列表
var TASK_LIST = ['ETAO'];
var TASK_LIST = ['JD_JDOU','JD_CHOUMA','ETAO',"VIP_QQ","BAIDU_WENKU"];


//页面嵌入脚本列表
var URL_LIST = [
    //京东金融
    ["http://vip.jr.jd.com/","data/jd/vip_jr_jd.js"],//京东金融页
    ["http://pingce.jd.com/funding/usercenter.action","data/jd/usercenter.action.js"],//京东金融-我的筹码页
    ["http://trade-z.jd.com/funding/mychip.action","data/jd/mychip.action.js"],//京东金融-签到页

    //京东京豆
    ["http://bean.jd.com/myJingBean/list","data/jd/myJingBean_list.js"],//我的京豆页
    
    //etao-淘金币
    ["http://www.etao.com/","data/taobao/etao.js"],//etao主页
    ["http://jf.etao.com/ajax/getCreditForSrp.htm","data/taobao/etao_getCreditForSrp.js"],//etao签到页
    ["https://taojinbi.taobao.com/coin/userCoinDetail.htm","data/taobao/coin_userCoinDetail.js"],//etao签到页

    //QQ会员-签到获取积分
    ["http://vip.qq.com/jf/earn.html","data/qq/jf_earn.js"],

    //百度文库
    ["http://wenku.baidu.com/","data/baidu/wenku_baidu.js"],
    ["http://wenku.baidu.com/task/browse/daily","data/baidu/task_browse_daily.js"],
    ["http://wenku.baidu.com/user/mydocs","data/baidu/user_mydocs.js"],


]

$(document).ready(function(){
    console.log("[background.js init]");
    chipdata_init();
    task_init();
});


//数据初始化
function chipdata_init(){
    var CHIP_DATA_TEMP = data_read("CHIP_DATA");
    if(CHIP_DATA_TEMP!=""){
        CHIP_DATA = CHIP_DATA_TEMP;
    }
}


//任务初始化
function task_init(){
    var TASK_DATA_TEMP = data_read("TASK_DATA");
    if(TASK_DATA_TEMP!=""){
        TASK_DATA = TASK_DATA_TEMP;
    }

    TASK.init(task_start_cb,task_finish_cb);
    TASK.TASK_INTERVAL = 24 * 3600 * 1000 / 10; //一天循环10次
    TASK.TASK_TIMEOUT = 30 * 1000 ; //任务超时时间，30秒
    TASK.TIMES = TASK_DATA.TIMES;//任务执行次数
    TASK.TIME_START = TASK_DATA.TIME_START;//任务开始时间
    TASK.TIME_END = TASK_DATA.TIME_END;//任务结束时间

    task_reg();
}

//注册任务
var task_index = 0;
function task_reg(){
    if(task_index == TASK_LIST.length){//所有任务结束
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
    script.src= "js/task/"+src+".js"; 
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




//处理消息
function handle_msg(msg){
    // console.log(msg)
    if(msg.type == "HOOK"){
        if(msg.name == "url"){
            handle_url(msg.data);
        }
    }

    else if(msg.type == "JD"){
        if(msg.name == "chouma_num"){//筹码数量
            CHIP_DATA["JD_CHOUMA"].num = msg.data;
        }
        else if(msg.name == "chouma_click"){//筹码按钮点击
            CHIP_DATA["JD_CHOUMA"].today = 1;
            CHIP_DATA["JD_CHOUMA"].task.finish();
        }
        else if(msg.name == "vip_jr_jd_click"){//今天签到成功
            CHIP_DATA["JD_JDOU"].today = 1;
            CHIP_DATA["JD_JDOU"].total++;
            
        }
        else if(msg.name == "vip_jr_jd_clicked"){//今日已签到过
            CHIP_DATA["JD_JDOU"].today = 1;
        }
        else if(msg.name == "user_name"){//用户名
            CHIP_DATA["JD_JDOU"].auth = 1;
            CHIP_DATA["JD_JDOU"].id = msg.data;
            CHIP_DATA["JD_CHOUMA"].auth = 1;
            CHIP_DATA["JD_CHOUMA"].id = msg.data;
        }
        else if(msg.name == "jd_num"){//京豆
            CHIP_DATA["JD_JDOU"].num = msg.data;
            CHIP_DATA["JD_JDOU"].task.finish();
        }
    }

    else if(msg.type == "ETAO"){
        if(msg.name == "login"){
            if(msg.data==""){//未登录
                CHIP_DATA["ETAO"].auth = 0;
                CHIP_DATA["ETAO"].task.finish();
            }
            else{//已登录
                CHIP_DATA["ETAO"].auth = 1;
                CHIP_DATA["ETAO"].id = msg.data;
            }
            
        }
        else if(msg.name == "sign_click"){//签到成功
            CHIP_DATA["ETAO"].today=1;
        }
        else if(msg.name == "coin_num"){//淘金币数量
            CHIP_DATA["ETAO"].num = msg.data;
            CHIP_DATA["ETAO"].task.finish();
        }
    }

    else if(msg.type == "VIP_QQ"){
        if(msg.name == "user_name"){
            if(msg.data==""){//未登录
                CHIP_DATA["VIP_QQ"].auth = 0;
                CHIP_DATA["VIP_QQ"].task.finish();
            }
            else{//已登录
                CHIP_DATA["VIP_QQ"].auth = 1;
                CHIP_DATA["VIP_QQ"].id = msg.data;
            }
            
        }
        else if(msg.name == "sign_click"){//签到成功
            CHIP_DATA["VIP_QQ"].today=1;
        }
        else if(msg.name == "credit_num"){//淘金币数量
            CHIP_DATA["VIP_QQ"].num = msg.data;
            CHIP_DATA["VIP_QQ"].task.finish();
        }
    }

    else if(msg.type == "BAIDU_WENKU"){
        if(msg.name == "user_name"){
            if(msg.data==""){//未登录
                CHIP_DATA["BAIDU_WENKU"].auth = 0;
                CHIP_DATA["BAIDU_WENKU"].task.finish();
            }
            else{//已登录
                CHIP_DATA["BAIDU_WENKU"].auth = 1;
                CHIP_DATA["BAIDU_WENKU"].id = msg.data;
            }
            
        }
        else if(msg.name == "sign_click"){//签到成功
            CHIP_DATA["BAIDU_WENKU"].today=1;
        }
        else if(msg.name == "credit_num"){//淘金币数量
            CHIP_DATA["BAIDU_WENKU"].num = msg.data;
            CHIP_DATA["BAIDU_WENKU"].task.finish();
        }
    }

    msg_popup("DATA_UPDATE",{});
}





//处理url
function handle_url(url){
    for(var i=0;i<URL_LIST.length;i++){
        if(url.indexOf(URL_LIST[i][0]) > -1 ){
             iframe_insert_script( URL_LIST[i][1] )
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
        if(msg && msg.type){
            handle_msg(msg);
        }
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
        TASK.start();   
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
    var msg = {type:"INSERT",name:"script",data:js};
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
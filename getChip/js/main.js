/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */




var CHIP_DATA = {};
(function(){

var ENV = "DEBUG";
//ENV = "RELEASE";

//任务列表
var TASK_LIST = ['JD_JDOU','JD_CHOUMA','ETAO'];


$(document).ready(function(){
    console.log("[background.js init]");
    TASK.init();
    TASK.TASK_INTERVAL = 24 * 3600 * 1000 / 10; //一天循环10次
    TASK.TASK_TIMEOUT = 30 * 1000 ; //任务超时时间，30秒
    task_reg();
});


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

//处理消息
function handle_msg(msg){
    if(msg.type == "HOOK"){
        if(msg.name == "url"){
            handle_url(msg.data);
        }
    }

    else if(msg.type == "JD"){
        if(msg.name == "chouma_num"){
            CHIP_DATA.JD_CHOUMA.num = msg.data;
        }
        else if(msg.name == "chouma_click"){
            CHIP_DATA["JD_CHOUMA"].today = 1;
            CHIP_DATA["JD_CHOUMA"].task.finish();
        }
        else if(msg.name == "vip_jr_jd_click"){
            if(msg.data == "1"){
                CHIP_DATA.JDOU.today = 1;
                CHIP_DATA.JDOU.total++;
                CHIP_DATA["JD_JDOU"].task.finish();
            }
            else{
                CHIP_DATA["JD_JDOU"].task.finish();
            }
            
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
                CHIP_DATA["ETAO"].name = msg.data;
            }
            
        }
        else if(msg.name == "sign_click"){
            CHIP_DATA.JD_CHOUMA.today++;
            CHIP_DATA["JD_JDOU"].task.finish();
        }
    }
}


//处理url
function handle_url(url){
    //京豆页面
    if(url == "http://vip.jr.jd.com/"){
        iframe_insert_script("data/jd/vip_jr_jd.js")
    }
    else if(url == "http://pingce.jd.com/funding/usercenter.action"){
        iframe_insert_script("data/jd/usercenter.action.js")
    }
    else if(url == "http://trade-z.jd.com/funding/mychip.action"){
        iframe_insert_script("data/jd/mychip.action.js")
    }
    else if(url == "http://www.etao.com/"){
        iframe_insert_script("data/taobao/etao.js")
    }
    else if(url.indexOf("http://jf.etao.com/ajax/getCreditForSrp.htm") > -1){
        iframe_insert_script("data/taobao/etao_getCreditForSrp.js")
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


//接收popup消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'GET_CHIP_DATA'){
        sendResponse(CHIP_DATA);
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
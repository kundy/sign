/*
 * Copy Right: Tencent ISUX
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */


const tab_log = function(json_args) {
  var args = JSON.parse(unescape(json_args));
  console[args[0]].apply(console, Array.prototype.slice.call(args, 1));
}

var ENV = "DEBUG";
var PLATFORM_STATUS = {
    JD:{
        name:"",
        auth:0,//是否登录
        today:0,//今天是否抢
        num:0,//当前筹码数量
        total:0//领取的累积数量
    },
    ETAO:{
        name:"",
        auth:0,//是否登录
        today:0,//今天是否抢
        num:0,//当前筹码数量
        total:0//领取的累积数量
    }
};

var IFRAME = $("#iframe")[0];

$(document).ready(function(){
    dataUpdate();
    setTimeout(init,200);
});


function init(){
    console.log("init");
    TASK.init();
    TASK.TASK_INTERVAL = 24 * 3600 * 1000 / 10; //一天循环10次
    task_reg();
    TASK.start();

}

//注册任务
function task_reg(){
    TASK.reg(TASK_JD);
    TASK.reg(TASK_ETAO);
}




//JD任务，获取众筹的筹码，用于体验产品。
function TASK_JD(fun){
    TASK_JD.end_cb = fun;
    TASK_JD.step_check_login();
}
//检查登录
TASK_JD.step_check_login=function(){
    console.log("【TASK_JD.step_check_login】")
     //先检查登录态是否正常
    checkUrlredirect("http://home.jd.com/",function(t){
        if(t==1){
            console.log("JD login ok");
            PLATFORM_STATUS.JD.auth = 1;
            TASK_JD.open_usercenter_action();
        }
        else{
            console.log("JD login fail");
            TASK_JD.finish();
        }
    })
}
//打开用户个人中心页
TASK_JD.open_usercenter_action=function(){
    console.log("【TASK_JD.open_usercenter_action】")
    IFRAME.src="http://pingce.jd.com/funding/usercenter.action";
}

//任务结束
TASK_JD.finish=function(){
    console.log("【TASK_JD.finish】")
    TASK_JD.end_cb();
}



//一淘 淘金币任务
function TASK_ETAO(fun){
    TASK_ETAO.end_cb = fun;
    TASK_ETAO.step_check_login();
}
//检查登录
TASK_ETAO.step_check_login=function(){
    console.log("【TASK_ETAO.step_check_login】")
     //先检查登录态是否正常
    IFRAME.src="http://www.etao.com/";
}

//任务结束
TASK_ETAO.finish=function(){
    console.log("【TASK_JD.finish】")
    TASK_JD.end_cb();
}


//处理消息
function handle_msg(msg){
    if(msg.type == "JD"){
        if(msg.name == "chouma_num"){
            PLATFORM_STATUS.JD.num = msg.data;
        }
        else if(msg.name == "chouma_click"){
            PLATFORM_STATUS.JD.today = 1;
            TASK_JD.finish();
        }
    }

    else if(msg.type == "ETAO"){
        if(msg.name == "login"){
            if(msg.data!=""){//未登录
                PLATFORM_STATUS.ETAO.auth = 0;
                TASK_ETAO.finish();
            }
            else{//已登录
                PLATFORM_STATUS.ETAO.auth = 1;
                PLATFORM_STATUS.ETAO.name = msg.data;
            }
            
        }
        else if(msg.name == "sign_click"){
            PLATFORM_STATUS.JD.today++;
            TASK_ETAO.finish();
        }
    }

}







//接收消息 
window.addEventListener('message',function(e){
    var data =e.data;
    try{
        var msg = JSON.parse(data);
        if(msg && msg.type){
            handle_msg(msg);
        }
    }catch(error){
        console.log("receive error message")
    }
},false);







var extension_id = chrome.i18n.getMessage("@@extension_id");

var replace_data
var replaceBlockUrls = [];

//刷新要监控的数据，以后从服务器上刷新
function dataUpdate(){
    replace_data=[
        {
            "name":"JD",
            "url":"http://pingce.jd.com/js/jquery-1.11.2.min.js",
            "target":"chrome-extension://"+extension_id+"/data/jd/jquery-1.11.2.min.js"
        },
         {
            "name":"JD",
            "url":"http://trade-z.jd.com/js/jquery.pagination/jquery.lazyload.js",
            "target":"chrome-extension://"+extension_id+"/data/jd/jquery.lazyload.js"
        },
         {
            "name":"JD",
            "url":"http://uaction.aliyuncdn.com/js/ua.js",
            "target":"chrome-extension://"+extension_id+"/data/taobao/ua.js"
        }
    ]

    replaceBlockUrls=[];
    for(var i=0;i<replace_data.length;i++){
        replaceBlockUrls.push(replace_data[i]["url"])
    }
    //监控也同时刷新一下
    requestListen();
}




//请求监控
function requestListen(){
    chrome.webRequest.onBeforeRequest.addListener(
        function(details){
            // console.log(details);
            if(details.tabId<0){
                for(var i=0;i<replace_data.length;i++){
                    if(details.url == replace_data[i]["url"]){
                        console.log(details.url)
                        return {redirectUrl: replace_data[i]["target"]};
                    }
                }
            }
            return {redirectUrl: details.url};
        },
        {
            urls: replaceBlockUrls
        },
        [
            "blocking"
        ]
    );
}



//测试url是否跳转，主要用来验证是否登录成功
function checkUrlredirect(url,cb)
{

    var xhr = new XMLHttpRequest();    
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.timeout = 30*1000;
    // xhr.setRequestHeader("User-Agent","Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)");

    xhr.onload = function() {
        console.log(xhr.status)
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




















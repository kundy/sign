/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://vip.xunlei.com/index.html
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,1000);




function init(){
	console.log("[lifevc.js start]");
	url_switch();
}



function url_switch(){
	var url = location.href;
	//console.log(url)
	if(url == "http://www.lifevc.com/"){
		get_user_name();
	}
	else if(url.indexOf("http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home")>-1){
		click_sign();
	}
	else if(url.indexOf("https://account.lifevc.com/UserCenter/MemberContent?type=integral&caller=Home")>-1){
		get_credit();
	}
}




function get_user_name(){

	//获取用户名
	var user_name ="";
	var msg;
	var lvguin = getCookie("lvguin")
	if(lvguin!=""){
		user_name=lvguin;
		setTimeout(open_sign_page,500);
	}

    msg = {type:"LIFEVC",name:"user_name",data:user_name};
    post_parent(msg);
}



function open_sign_page(){
	location.href="http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home"
}

function open_credit_page(){
	location.href="https://account.lifevc.com/UserCenter/MemberContent?type=integral&caller=Home"
}




//点击签到
function click_sign(){
	if(document.querySelectorAll(".signbt").length>0){
		click_btn(document.querySelectorAll(".signbt")[0])

		
		var msg = {type:"LIFEVC",name:"sign_click",data:""};
    	post_parent(msg);

    	setTimeout(open_credit_page,1500);

	}
}


//获取积分数量
function get_credit(){
	var num = 0;

	if(document.querySelectorAll(".uspop_integral_currSituation span").length>0)
		num = document.querySelectorAll(".uspop_integral_currSituation span")[0].innerText;
	//通知父页面
	var msg = {type:"LIFEVC",name:"credit_num",data:num};
	post_parent(msg);
}



function click_btn(obj){
    var evt = document.createEvent("MouseEvents"); 
    evt.initEvent("click", false, false);
    obj.dispatchEvent(evt);    
}


function post_parent(msg){
	var str = JSON.stringify(msg) 
	window.parent.postMessage(str,'*');
}


function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return "";
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



})();


















































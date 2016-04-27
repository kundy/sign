/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */




(function(){



init();


var CHIP_DATA;
function init(){

 	$('.ui.checkbox').checkbox('check');
 	dataUpdate();
 }


function dataUpdate(){
	msg_background("GET_CHIP_DATA",function(data){
		CHIP_DATA = data;
		pageRefresh();
	});
}


function pageRefresh(){

	var html="";
	for(var item in CHIP_DATA){
		console.log(CHIP_DATA[item]);

		//状态初始化
		var themeColor = "black";//主题色设置，初始black
		var iconStyle = "checkmark";//图标
		if(CHIP_DATA[item].auth==-1){//未登录
			themeColor="red"
			iconStyle="warning sign";
		}
		else{
			if(CHIP_DATA[item].today==0){//今天还未签到
				themeColor="wait"
				iconStyle="warning sign";
			}
			else{
				themeColor="green"
				iconStyle="checkmark";
			}
		}


		html+='<div class="ui labeled button item" data-item="'+item+'">';
		html+='		<div class="ui '+themeColor+' button">';
		html+='			<i class="'+iconStyle+' icon"></i>'+CHIP_DATA[item].name;
		html+='		</div>';
		html+='		<a class="ui basic '+themeColor+' left pointing label">';

		if(CHIP_DATA[item].num==-1)html+="-";
		else html+=CHIP_DATA[item].num;

		html+='</a>';
	    html+='</div>';
	}

	$(".chip-list").html(html);

	
	$('.chip-list .item').unbind("click").click(function(){
		var item = $(this).data("item");
		$(".popup .name").text(CHIP_DATA[item].name);
		$(".popup .remark").text(CHIP_DATA[item].remark);
		$(".popup #id").text(CHIP_DATA[item].id);
		$(".popup #num").text(CHIP_DATA[item].num);
	});

	$('.chip-list .item').popup({
		popup : $('.popup'),
		position : 'bottom center',
		on    : 'click'
	});

}



//与background通信
function msg_background(_cmd,_cb){

	chrome.runtime.sendMessage(_cmd, function(response){
	    _cb(response);
	});
}


//响应消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log(message);
});





})();













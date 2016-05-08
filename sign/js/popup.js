/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */




(function(){



init();


var CHIP_DATA;
var TASK_DATA;
function init(){

 	$('button.refresh').click(function(){
 		msg_background("TASK_REFRESH",function(data){

		});
 	});
 	// $('.ui.checkbox').checkbox('check');
 	$('.ui.checkbox').checkbox({
		onChecked: function() {
			console.log("onChecked")
			task_set($(".popup").attr("data-item"),1)
		},
		onUnchecked: function() {
			console.log("onUnchecked")
			task_set($(".popup").attr("data-item"),0)
		}
	});
 	dataUpdate();
 }


function dataUpdate(){
	msg_background("GET_CHIP_DATA",function(data){
		CHIP_DATA = data;
		pageRefresh();
	});

	msg_background("GET_TASK_DATA",function(data){
		TASK_DATA = data;
		taskRefresh();
	});

	msg_background("GET_TASK_STATUS",function(data){
		if(data==0){
			$('button.refresh').removeClass("loading disabled");
		}
		else{
			$('button.refresh').addClass("loading disabled");
		}
	});
}

//设置某个任务
function task_set(taskId,t){
	var obj;
	$.each($(".chip-list .item"),function(index,item){
		if($(item).data("item")==taskId){
			obj=item;
		}
	})

	//通知任务状态更新
	msg_background("TASK_SET#"+taskId+"#"+t,function(data){

	})


	if(t==1 && obj){
		dataUpdate();

	}
	else{
		$(obj).find(".button").attr("class","ui grey button");
		$(obj).find(".label").attr("class","ui basic grey left pointing label");
	}
	

}


//页面刷新
function pageRefresh(){

	var html="";
	for(var item in CHIP_DATA){
		//console.log(CHIP_DATA[item]);

		if(CHIP_DATA[item].visable && CHIP_DATA[item].visable==1){
			
			var themeColor = "black";//主题色设置，初始black
			var iconStyle = "checkmark";//图标

			if(CHIP_DATA[item].status===0){//禁止运行
				themeColor="grey"
				iconStyle="coffee";
			}
			else if(CHIP_DATA[item].auth!=1){//未登录
				themeColor="red"
				iconStyle="warning sign";
			}
			else{
				if(CHIP_DATA[item].today===0){//今天还未签到
					themeColor="teal"
					iconStyle="wait";
				}
				else{//今天已签到
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
	}

	$(".chip-list").html(html);

	
	$('.chip-list .item').unbind("click").click(function(){
		var item = $(this).data("item");

		//数量
		var num = CHIP_DATA[item].num*1;
		if(num<0)num="-";


		//状态
		var status = "";
		if(CHIP_DATA[item].auth!=1){
			var status = '<a target="_blank" href="'+CHIP_DATA[item].idUrl+'" style="color:#f00;font-size:12px;">签到失败，请先登录</a>';
		}
		else if(CHIP_DATA[item].today!=1){
			status = '<span style="color:#f00">今天还未签到</span>';
		}
		else{
			status = '<span style="color:#21BA45">今天已签</span>';
		}

		$('.ui.checkbox').checkbox('set unchecked')
		if(CHIP_DATA[item].status == 1)$('.ui.checkbox').checkbox('set checked')

		$(".popup").attr("data-item",item);
		$(".popup .name").text(CHIP_DATA[item].name);
		$(".popup .remark").text(CHIP_DATA[item].remark);
		$(".popup #id").text(CHIP_DATA[item].id);
		$(".popup #num").text(num);
		$(".popup #status").html(status);


		$(".popup .remark").attr("href",CHIP_DATA[item].remarkUrl);
		$(".popup .id a").attr("href",CHIP_DATA[item].idUrl);
		$(".popup .num a").attr("href",CHIP_DATA[item].numUrl);
	});

	$('.chip-list .item').popup({
		popup : $('.popup'),
		position : 'bottom center',
		on    : 'click'
	});

}

//任务状态刷新
function taskRefresh(){

	var html="";
	var task_times = TASK_DATA.TIMES;
	var task_end = TASK_DATA.TIME_END;

	var task_last_str = "上次执行时间：";
	if(TASK_DATA.TIME_END>0){
		var time_pass = Date.parse(new Date()) - TASK_DATA.TIME_END;
		var time_pass_minutes  = Math.ceil(time_pass /1000 / 60);//距上次执行的分钟
		if(time_pass_minutes < 60)task_last_str+=time_pass_minutes+"分钟前"
		else if(time_pass_minutes < 60*24)task_last_str+= Math.ceil(time_pass_minutes/60) +"小时前"
		else task_last_str+= Math.ceil(time_pass_minutes/60/24) +"天前"
	}
	
	$(".sign-text .num").text(task_times)
	$(".sign-last").text(task_last_str)

}

//与background通信
function msg_background(_cmd,_cb){

	chrome.runtime.sendMessage(_cmd, function(response){
	    _cb(response);
	});
}


//响应消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	//console.log(message);
    if(message == 'DATA_UPDATE'){
    	dataUpdate();
    }

    else if(message == 'TASK_START'){
    	$('button.refresh').addClass("loading disabled");
    }

    else if(message == 'TASK_FINISH'){
    	$('button.refresh').removeClass("loading disabled");
    }
});





})();













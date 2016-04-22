

(function(){


console.log("[getChip] START");



var msg = {type:"HOOK",name:"url",data:location.href};
post_msg(msg);








function insert_script(js){
	if(document.getElementsByTagName('body').length>0){
		var body  = document.getElementsByTagName('body')[0]; 
		var script= document.createElement("script"); 
		script.type = "text/javascript"; 
		script.src= chrome.extension.getURL(js); 
		body.appendChild(script);
		console.log("[getChip insert_script] DONE")
	}
	else{
		console.log("[getChip insert_script] FAIL")
	}
}


//处理消息
function handle_msg(msg){
    if(msg.type == "INSERT"){
        if(msg.name == "script"){
            insert_script(msg.data)
        }

    }
}


function post_msg(msg){
	var str = JSON.stringify(msg)
	window.parent.postMessage(str,'*');
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



})()







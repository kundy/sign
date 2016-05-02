

(function(){


console.log("[CONTENT-SCRIPT] START");



var msg = {type:"SIGN_CONTENT_SCRIPT_RUN",name:"url",data:location.href};
post_msg(msg);


function insert_script(js){
	if(document.getElementsByTagName('body').length>0){
		var body  = document.getElementsByTagName('body')[0]; 
		var script= document.createElement("script"); 
		script.type = "text/javascript"; 
		script.src= js; 
		body.appendChild(script);
		console.log("[CONTENT-SCRIPT insert_script] DONE")
	}
	else{
		console.log("[CONTENT-SCRIPT insert_script] FAIL")
	}
}


//处理消息
function handle_msg(msg){
    if(msg.type == "SIGN_INSERT_CONTENT"){
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







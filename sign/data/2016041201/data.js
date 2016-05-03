/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */


console.log("[LOAD data.js] 2016041201 ");


//任务列表
if(TASK_LIST)TASK_LIST = ["XUNLEI_DAKA"];
//if(TASK_LIST)TASK_LIST = ['JD_JDOU','JD_CHOUMA','ETAO',"VIP_QQ","BAIDU_WENKU"];


//页面嵌入脚本列表
//第三个参数为1时为精准匹配，为0 时为模糊匹配
if(URL_LIST)URL_LIST = [
    //京东金融
    ["http://vip.jr.jd.com/","jd/vip_jr_jd.js",1],//京东金融页
    ["http://pingce.jd.com/funding/usercenter.action","jd/usercenter.action.js",1],//京东金融-我的筹码页
    ["http://trade-z.jd.com/funding/mychip.action","jd/mychip.action.js",1],//京东金融-签到页

    //京东京豆
    ["http://bean.jd.com/myJingBean/list","jd/myJingBean_list.js",1],//我的京豆页
    
    //etao-淘金币
    ["http://www.etao.com/","taobao/etao.js",1],//etao主页
    ["http://jf.etao.com/ajax/getCreditForSrp.htm","taobao/etao_getCreditForSrp.js",0],//etao签到页
    ["https://taojinbi.taobao.com/coin/userCoinDetail.htm","taobao/coin_userCoinDetail.js",1],//etao签到页

    //QQ会员-签到获取积分
    ["http://vip.qq.com/jf/earn.html","qq/jf_earn.js",1],

    //百度文库
    ["http://wenku.baidu.com/","baidu/wenku_baidu.js",1],
    ["http://wenku.baidu.com/task/browse/daily","baidu/task_browse_daily.js",1],
    ["http://wenku.baidu.com/user/mydocs","baidu/user_mydocs.js",1],
]




//处理消息
if(HANDLE_MSG)HANDLE_MSG = function(msg){
    // console.log(msg)
    if(msg.type == "JD"){
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

}

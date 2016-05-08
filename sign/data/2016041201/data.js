/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */


console.log("[LOAD data.js] 2016041201 ");


//任务列表
if(TASK_LIST)TASK_LIST = ["LIFEVC"];
if(TASK_LIST)TASK_LIST = ['JD_JDOU','JD_CHOUMA','ETAO',"VIP_QQ","BAIDU_WENKU","XUNLEI_DAKA","LIANTONG","XIAMI","LIFEVC",];


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

    //迅雷打卡
    ["http://vip.xunlei.com/index.html","xunlei.js",1],

    //联通签到
    ["http://iservice.10010.com/e3/signIn/index.html","liantong_10010.js",1],

    //虾米签到
    ["http://www.xiami.com/","xiami.js",1],
    ["http://www.xiami.com/account","xiami.js",1],

    //平安签到
    ["http://events.pingan.com/qiandao/index.html","pingan.js",1],

    //lifeVC
    ["http://www.lifevc.com/","lifevc.js",1],
    ["http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home","lifevc.js",0],
    ["https://account.lifevc.com/UserCenter/MemberContent?type=integral&caller=Home","lifevc.js",0],
]




//处理消息
if(HANDLE_MSG)HANDLE_MSG = function(msg){
    //console.log(msg)
    switch(msg.type)
    {

        case "JD":
            switch(msg.name)
            {
                case "chouma_num"://筹码数量
                    CHIP_DATA["JD_CHOUMA"].num = msg.data;
                    break;
                case "chouma_click"://筹码按钮点击
                    CHIP_DATA["JD_CHOUMA"].today = 1;
                    CHIP_DATA["JD_CHOUMA"].task.finish();
                    break;
                case "vip_jr_jd_click"://今天签到成功
                    CHIP_DATA["JD_JDOU"].today = 1;
                    CHIP_DATA["JD_JDOU"].total++;
                    break;
                case "vip_jr_jd_clicked"://今日已签到过
                    CHIP_DATA["JD_JDOU"].today = 1;
                    break;
                case "user_name"://用户名
                    CHIP_DATA["JD_JDOU"].auth = 1;
                    CHIP_DATA["JD_JDOU"].id = msg.data;
                    CHIP_DATA["JD_CHOUMA"].auth = 1;
                    CHIP_DATA["JD_CHOUMA"].id = msg.data;
                    break;
                case "jd_num"://京豆
                    CHIP_DATA["JD_JDOU"].num = msg.data;
                    CHIP_DATA["JD_JDOU"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "ETAO":
            switch(msg.name)
            {
                case "login":
                    if(msg.data==""){//未登录
                        CHIP_DATA["ETAO"].auth = 0;
                        CHIP_DATA["ETAO"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["ETAO"].auth = 1;
                        CHIP_DATA["ETAO"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["ETAO"].today=1;
                    break;
                case "coin_num"://淘金币数量
                    CHIP_DATA["ETAO"].num = msg.data;
                    CHIP_DATA["ETAO"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "VIP_QQ":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["VIP_QQ"].auth = 0;
                        CHIP_DATA["VIP_QQ"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["VIP_QQ"].auth = 1;
                        CHIP_DATA["VIP_QQ"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["VIP_QQ"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["VIP_QQ"].num = msg.data;
                    CHIP_DATA["VIP_QQ"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "BAIDU_WENKU":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["BAIDU_WENKU"].auth = 0;
                        CHIP_DATA["BAIDU_WENKU"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["BAIDU_WENKU"].auth = 1;
                        CHIP_DATA["BAIDU_WENKU"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["BAIDU_WENKU"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["BAIDU_WENKU"].num = msg.data;
                    CHIP_DATA["BAIDU_WENKU"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "XUNLEI_DAKA":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["XUNLEI_DAKA"].auth = 0;
                        CHIP_DATA["XUNLEI_DAKA"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["XUNLEI_DAKA"].auth = 1;
                        CHIP_DATA["XUNLEI_DAKA"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["XUNLEI_DAKA"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["XUNLEI_DAKA"].num = msg.data;
                    CHIP_DATA["XUNLEI_DAKA"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "LIANTONG":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["LIANTONG"].auth = 0;
                        CHIP_DATA["LIANTONG"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["LIANTONG"].auth = 1;
                        CHIP_DATA["LIANTONG"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["LIANTONG"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["LIANTONG"].num = msg.data;
                    CHIP_DATA["LIANTONG"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "XIAMI":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["XIAMI"].auth = 0;
                        CHIP_DATA["XIAMI"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["XIAMI"].auth = 1;
                        CHIP_DATA["XIAMI"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["XIAMI"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["XIAMI"].num = msg.data;
                    CHIP_DATA["XIAMI"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "PINGAN":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["PINGAN"].auth = 0;
                        CHIP_DATA["PINGAN"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["PINGAN"].auth = 1;
                        CHIP_DATA["PINGAN"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["PINGAN"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["PINGAN"].num = msg.data;
                    CHIP_DATA["PINGAN"].task.finish();
                    break;
                default:
                    break;
            }
            break;

         case "LIFEVC":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["LIFEVC"].auth = 0;
                        CHIP_DATA["LIFEVC"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["LIFEVC"].auth = 1;
                        CHIP_DATA["LIFEVC"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["LIFEVC"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["LIFEVC"].num = msg.data;
                    CHIP_DATA["LIFEVC"].task.finish();
                    break;
                default:
                    break;
            }
            break;

                
        default:
            break;
    }

    // if(msg.type == "JD"){
    //     if(msg.name == "chouma_num"){//筹码数量
    //         CHIP_DATA["JD_CHOUMA"].num = msg.data;
    //     }
    //     else if(msg.name == "chouma_click"){//筹码按钮点击
    //         CHIP_DATA["JD_CHOUMA"].today = 1;
    //         CHIP_DATA["JD_CHOUMA"].task.finish();
    //     }
    //     else if(msg.name == "vip_jr_jd_click"){//今天签到成功
    //         CHIP_DATA["JD_JDOU"].today = 1;
    //         CHIP_DATA["JD_JDOU"].total++;
            
    //     }
    //     else if(msg.name == "vip_jr_jd_clicked"){//今日已签到过
    //         CHIP_DATA["JD_JDOU"].today = 1;
    //     }
    //     else if(msg.name == "user_name"){//用户名
    //         CHIP_DATA["JD_JDOU"].auth = 1;
    //         CHIP_DATA["JD_JDOU"].id = msg.data;
    //         CHIP_DATA["JD_CHOUMA"].auth = 1;
    //         CHIP_DATA["JD_CHOUMA"].id = msg.data;
    //     }
    //     else if(msg.name == "jd_num"){//京豆
    //         CHIP_DATA["JD_JDOU"].num = msg.data;
    //         CHIP_DATA["JD_JDOU"].task.finish();
    //     }
    // }

    // else if(msg.type == "ETAO"){
    //     if(msg.name == "login"){
    //         if(msg.data==""){//未登录
    //             CHIP_DATA["ETAO"].auth = 0;
    //             CHIP_DATA["ETAO"].task.finish();
    //         }
    //         else{//已登录
    //             CHIP_DATA["ETAO"].auth = 1;
    //             CHIP_DATA["ETAO"].id = msg.data;
    //         }
            
    //     }
    //     else if(msg.name == "sign_click"){//签到成功
    //         CHIP_DATA["ETAO"].today=1;
    //     }
    //     else if(msg.name == "coin_num"){//淘金币数量
    //         CHIP_DATA["ETAO"].num = msg.data;
    //         CHIP_DATA["ETAO"].task.finish();
    //     }
    // }

    // else if(msg.type == "VIP_QQ"){
    //     if(msg.name == "user_name"){
    //         if(msg.data==""){//未登录
    //             CHIP_DATA["VIP_QQ"].auth = 0;
    //             CHIP_DATA["VIP_QQ"].task.finish();
    //         }
    //         else{//已登录
    //             CHIP_DATA["VIP_QQ"].auth = 1;
    //             CHIP_DATA["VIP_QQ"].id = msg.data;
    //         }
            
    //     }
    //     else if(msg.name == "sign_click"){//签到成功
    //         CHIP_DATA["VIP_QQ"].today=1;
    //     }
    //     else if(msg.name == "credit_num"){//淘金币数量
    //         CHIP_DATA["VIP_QQ"].num = msg.data;
    //         CHIP_DATA["VIP_QQ"].task.finish();
    //     }
    // }

    // else if(msg.type == "BAIDU_WENKU"){
    //     if(msg.name == "user_name"){
    //         if(msg.data==""){//未登录
    //             CHIP_DATA["BAIDU_WENKU"].auth = 0;
    //             CHIP_DATA["BAIDU_WENKU"].task.finish();
    //         }
    //         else{//已登录
    //             CHIP_DATA["BAIDU_WENKU"].auth = 1;
    //             CHIP_DATA["BAIDU_WENKU"].id = msg.data;
    //         }
            
    //     }
    //     else if(msg.name == "sign_click"){//签到成功
    //         CHIP_DATA["BAIDU_WENKU"].today=1;
    //     }
    //     else if(msg.name == "credit_num"){//淘金币数量
    //         CHIP_DATA["BAIDU_WENKU"].num = msg.data;
    //         CHIP_DATA["BAIDU_WENKU"].task.finish();
    //     }
    // }

}

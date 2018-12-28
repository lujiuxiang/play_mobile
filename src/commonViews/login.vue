<template>
    <div class="index">
        <div class="login">
            <!-- 头部 开始 -->
            <div class="title">
                <router-link class="iconfont icon-left-arrow" to="/"></router-link>
                <!-- 空标签用来占位 -->
                <span></span>
                <span></span>
                <span class="img">登录</span>
                <span>
                    <router-link to="/">首页</router-link>
                </span>
                <span>
                    <router-link to="register" class="reg">注册</router-link>
                </span>
            </div>
            <!-- 头部 结束 -->

            <div class="con-top">
                <img src="../../static/images/my/headPhoto.jpg" width="100%" alt="">
            </div>
            <!-- 登录框 开始 -->
            <div class="loginContent">
                <p>
                    <i class="iconfont icon-wode"></i>
                    <input ref="user" type="text" placeholder="请输入账号">
                    <i class="iconfont icon-guanbi" @click="closeLogin($event)"></i>
                </p>
                <p>
                    <i class="iconfont icon-mima"></i>
                    <input ref="pass" type="password" placeholder="请输入密码">
                    <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
                </p>
                <mt-button class="btn" @click="loginShow" type="default">立即登录</mt-button>
                <div class="login-bot">
                    <router-link to="" @click.native="textReg">游戏试玩</router-link>
                    <router-link to="forgetPassword">忘记密码</router-link>
                    <router-link to="service">在线客服</router-link>
                </div>
                <div class="gg">
                    <p>友情链接：<a href="http://www.baidu.com" target="_blank">www.baidu.com</a></p>
                </div>
                
            </div>
            <!-- 登录框 结束 -->
            

        </div>
    </div>
</template>

<script>
import Browser from '../js/Browser.js'
import "../iconfont/iconfont.css";
export default {
    name: "login",
    data() {
        return {
            textPopup: false, //试玩弹窗 
        };
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        
        //   登录
        loginShow() {
            let user = this.$refs.user.value;
            let pass = this.$refs.pass.value;
            let that = this;
            let loginInfo = "";
            let info = new Browser(); //判断浏览器设备
            // 获取初始信息
            var app=navigator.appVersion;
            // 根据括号进行分割
            var left=app.indexOf('(');
            var right=app.indexOf(')');
            var str=app.substring(left+1,right); 
            // console.log(str+'裁剪过后的');
            var Str=str.split(";");
            // 手机型号--苹果 iPhone
            var Mobile_Iphone=Str[0];
            // 手机型号--安卓 
            var Mobile_Android=Str[2];
            // 红米手机等特殊型号处理 匹配字符
            var res=/Android/;
            var reslut=res.test(Mobile_Android);
           
            // 根据设备型号判断设备系统
            if(Mobile_Iphone=='iPhone'){
                loginInfo += Mobile_Iphone + Str[1].substring(4,19)
                // alert('访问设备型号'+Mobile_Iphone+'系统版本'+Str[1].substring(4,19));
            }else if(Mobile_Iphone=='Linux'){
                if(reslut){
                    loginInfo += Str[4].substring(0,9) + Str[2]
                    // alert('访问设备型号'+Str[4].substring(0,9)+'系统版本'+Str[2]);
                }else{
                    loginInfo += Mobile_Android.substring(0,9) + Str[1]
                    // alert('访问设备型号'+Mobile_Android.substring(0,9)+'系统版本'+Str[1]);
                }
            }else if(Mobile_Iphone=='iPad'){
                loginInfo += Str[0] + Str[1].substring(4,12)
                // alert('访问设备'+Str[0]+'系统版本'+Str[1].substring(4,12));
            }
            // 浏览器名称 + 版本
            loginInfo += " " + info.browser +" "+ info.version

            that.$post("index/user/userLogin",{
                user: user,
                pass: pass,
                logininfo: loginInfo
            }).then(res=>{
                if(res.code){
                    alert(res.msg)
                    return
                }else{
                    window.sessionStorage.setItem(
                        "login_user",
                        res.sessionid
                    ); //存储登录的用户名的sessionid
                    window.sessionStorage.setItem(
                        "username",
                        res.username
                    ); //存储登录的用户名
                    window.sessionStorage.removeItem("usertype"); //清除试玩账号的usertype
                    window.location.reload();
                }
                
            }).catch(err=>{
                console.log(err);
            })
        },
        // 清空input输入的值
        closeLogin(event) {
            let e = event.currentTarget;
            e.parentNode.children[1].value = "";
        },
        // 点击显示密码/隐藏密码
        passShow(event) {
            let e = event.currentTarget;
            let pass = e.parentNode.children[1];
            if (pass.getAttribute("type") == "password") {
                pass.setAttribute("type", "text");
            } else {
                pass.setAttribute("type", "password");
            }
        },
        // 试玩
        textReg() {
        	window.sessionStorage.setItem("text",true)
        	this.$router.push({ path: "/" });
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 登录窗口 开始 */
/* 顶部回退框 */
.title .iconfont {
    position: absolute;
    left: 0;
    margin-left: 20px;
    line-height: 100px;
    font-size: 36px;
    color: #fff;
    z-index: 99;
}
.title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100px;
    text-align: center;
    transform: translateZ(0);
    background: url("../../static/images/index/titleSearch.png") no-repeat
        center/cover;
}

.title span {
    width: 20%;
    text-align: center;
    font-size: 40px;
    color: #fff;
    line-height: 100px;
    text-align: center;
}
.title .img {
    width: 40%;
}

.title span a {
    padding: 8px 16px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 10px;
}

.title span .reg {
    color: #fff;
    background-color: red;
}

.title .img img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.title span .myBtn {
    background: none;
}

.title span .myBtn i {
    color: #fff;
    vertical-align: middle;
}
.gg{
    text-align: left;
}
.loginContent .gg p{
    margin: 20px 0 120px 0;
    padding: 10px 20px;
    color: #000;
    border-radius: 20px;

}
/* 顶部回退框 */
.con-top {
    margin-top: 100px;
}
/* 登录框 */
.loginContent {
    padding: 0 40px;
    text-align: center;
    font-size: 28px;
}
.loginContent .con-top img {
    width: 100%;
    height: 100%;
}

.loginContent .btn {
    margin: 30px 0;
    width: 100%;
    height: 70px;
    font-size: 30px;
    background-color: #ccb07e;
    color: #fff;
    border-radius: 15px;
}
.loginContent p {
    margin: 30px 0;
    border: 1px solid #ddd;/*no*/
}
.loginContent p input {
    width: 80%;
    height: 1rem;
    text-indent: 5px;
    border: none;
    outline: none;
}
.loginContent p i {
    display: inline-block;
    height: 100%;
    line-height: 70px;
    font-size: 36px;
}
.loginContent .login-bot {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.loginContent .login-bot a {
    flex: 1;
    padding: 20px 0;
}
.loginContent div {
    color: red;
    font-size: 26px;
}
/* 登录窗口 结束 */
</style>

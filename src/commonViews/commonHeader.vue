<template>
    <div>
        <!-- 头部 开始 -->
        <div class="title">
            <span>
                <i @click="popupShow" class="iconfont icon-quanbu"></i>
            </span>
            <span>
                <!-- 登陆之前是试玩按钮 -->
                <router-link v-if="textUser" to="" @click.native="textReg">试玩</router-link>
                <!-- 登陆之后 变成 退出 -->
                <router-link v-else to="" @click.native="loginOut">退出</router-link>
            </span>
            <span class="img">
                <img :src="titleLogo" alt="">
            </span>
            <span>
                <!-- 登陆之前是登录按钮 -->
                <router-link v-if="titleRightShow" to="my">登录</router-link>
                <!-- 登陆之后 变成 余额提示 -->
                <em v-if="!titleRightShow">
                    <b class="iconfont icon-qukuan"></b>{{money}}</em>
            </span>
            <span>
                <!-- 登陆之前是注册按钮 -->
                <router-link v-if="titleRightShow" to="register" class="reg">注册</router-link>
                <!-- 登陆之后 变成 未读消息提示 -->
                <router-link v-if="!titleRightShow" to="memberMsg" class="memberMsg">
                    <i class="iconfont icon-xiaoxi1"></i>
                    <em v-if="noRead > 0">{{noRead}}</em>
                </router-link>
            </span>
        </div>

        <!-- 侧边栏 导航 开始 -->
        <mt-popup v-model="popupActive" position="left" ref="nochange" lockScroll="true">
            <div>
                <ul class="sliderBar">
                    <li class="searchWrap">
                        <!-- 搜索 开始 -->
                        <router-link class="search" to="search">
                            <i class="iconfont icon-search"></i>
                            <span>搜索游戏</span>
                        </router-link>
                        <!-- 搜索 结束 -->
                        <i @click="popupShow" class="iconfont icon-quanbu"></i>
                    </li>
                    <li v-for="(item,index) in slideBar" :key="index">
                        <router-link :to="{name:'listBarGames',query:{index:index,title:item.title,info:item.info}}">
                            <i :class="item.imgurl"></i>
                            {{item.title}}
                            <i class="iconfont icon-youjiantou"></i>
                        </router-link>
                    </li>
                </ul>
                <ul class="sliderBar sliderBar2">
                    <li v-for="(item,index) in slidebar2" :key="index">
                        <router-link :to="item.name">
                            <i :class="item.class"></i>
                            {{item.text}}
                            <i class="iconfont icon-youjiantou"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </mt-popup>
        <!-- 侧边栏 导航 结束 -->
        <!-- 头部搜索框 结束 -->

        <!-- 试玩模式开启 弹窗 -->
        <mt-popup v-model="textPopup" popup-transition="popup-fade" ref="textPop" class="textWrap">
            <div class="textPop">
                <h4>温馨提示</h4>
                <div>
                    <p>您已进入试玩模式，请尽情体验！</p>
                    <mt-button type="default" @click="textPopClose">我知道了</mt-button>
                </div>
            </div>
        </mt-popup>
        <!-- 试玩模式开启 弹窗 -->
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import "../iconfont/iconfont.css";
import axios from "axios";
import {mapActions} from 'vuex'

export default {
    name: "commonHeader",
    data() {
        return {
            // 试玩模式 弹窗显示/隐藏
            textPopup: false,
            // 未登录或者是试玩登录
            textUser: true,
            // 首页右上角登录显示
            titleRightShow: true,
            // 侧边栏的显示与隐藏
            popupActive: false,
            // 侧边栏底部数据
            slidebar2: [
                {
                    name: "activities",
                    class: "iconfont icon-custom-activity",
                    text: "优惠活动"
                },
                {
                    name: "browse",
                    class: "iconfont icon-jiaoya_fuzhi",
                    text: "最近浏览"
                },
                {
                    name: "collect",
                    class: "iconfont icon-shoucang",
                    text: "我的收藏"
                }
            ],
        };
    },
    methods: {
        // 侧边栏的显示与隐藏
        popupShow() {
            this.popupActive = !this.popupActive;
        },
        // 试玩
        textReg() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let usertype = window.sessionStorage.getItem("usertype");

            if (!user) {
                let username = "_text"; //试玩用户名前默认+text
                let pass = "weinisi123"; //所有的试玩账号默认密码
                let x = "0123456789qwertyiuiopasdfghjklzxcvbnm"; //定义随机的字符串+text 发送到后台
                let usertype = 0; //试玩账号的type
                // 用户名+8位字符串
                for (var i = 0; i < 7; i++) {
                    username += x.charAt(
                        Math.ceil(Math.random() * 100000000) % x.length
                    );
                }
                // 如果表单的正则都判断成功 则可以提交axios
                this.$post("index/user/memberAdd",{
                    user: username,
                    pass: pass,
                    usertype: usertype 
                }).then(res=>{
                    if (res == 1) {
                        that.textPopup = true; //试玩开启弹窗
                        // 存储session
                        window.sessionStorage.setItem("username", username);
                        window.sessionStorage.setItem("usertype", usertype);
                        // 跳转到首页
                        that.$router.push({ path: "/" });
                        // 试玩账号登录时 试玩按钮变成退出按钮
                        that.textUser = false;
                    } else {
                        alert("开启试玩模式失败！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                alert("您已登陆！请尽情享用游戏！");
            }
        },
        // 退出试玩模式
        loginOut() {
            let that = this;
        	let r = window.confirm('确定要退出吗？')
        	if(r == true){
        		this.textUser = true;
	            window.sessionStorage.clear();
	            // 清空数据之后 在请求首页的游戏数据
	            let user = window.sessionStorage.getItem("login_user"); //登陆之后账号sessionid
	            let usertype = window.sessionStorage.getItem("usertype"); //试玩账号
                usertype = usertype ? 0 : 1; //试玩账号存在的话 就给后端传0 不存在传1
                // axios 请求 -- 请求退出登录之后的游戏列表 
	            that.handle_indexGames({
                    url: 'game/game/gameMobileSelect',
                    that: this,
                    params: {usertype: usertype, user: user}
                })
        	}
        },
        // 试玩弹窗关闭
        textPopClose() {
            this.textPopup = false;
        },
        ...mapActions([
            "handle_indexGames",
            "handle_getMemberCenter",
            "handle_getNoread",
        ])
    },
    computed: {
        titleLogo() {
            return this.$store.state.titleLogo;
        },
        // 首页右上角总余额
        money() {
            return this.$store.state.MemberCenter.bankBalance[0].money;
        },
        // 首页侧边栏导航
        slideBar() {
            return this.$store.state.slideBar;
        },
        // 首页右上角未读消息
        noRead() {
            return this.$store.state.noRead;
        }
    },
    created() {
        this.realUser = false;
    },
    activated() {
        // 获取用户
        let user = window.sessionStorage.getItem("login_user");
        let username = window.sessionStorage.getItem("username");
        let that = this;
        if (user) {
            // axios 请求---我的账户 余额列表
            this.handle_getMemberCenter({user: user, that: that})
            // axios 请求---未读消息
            this.handle_getNoread({user: user, that: that})

            if (username.indexOf("_text") == -1) {
                this.titleRightShow = false; //注册 登录按钮隐藏
                this.textUser = true; //试玩按钮显示
            } else {
                this.titleRightShow = true; //注册 登录按钮显示
                this.textUser = false; //试玩按钮隐藏
            }
        }
        
        if(window.sessionStorage.getItem('text')){
        	window.sessionStorage.removeItem('text')
        	this.textReg()
        }
    },
    watch:{
        popupActive(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        }
    }   

};
</script>

<style scoped>
/* 顶部搜索框 */

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
    display: inline-block;
    position: relative;
    font-size: 36px;
    color: #fff;
    text-align: center;
}

.title i {
    font-size: 40px;
}

.title .img {
    width: 40%;
    max-height: 100%;
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

.title span em {
    margin-right: -20px;
    font-style: normal;
    font-size: 24px;
}
.title span em b {
    font-weight: normal;
    margin-right: 4px;
    font-size: 30px;
}

/* 顶部搜索框 */

/* 侧边栏导航 开始 */

.searchWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.searchWrap .search > i {
    font-size: 28px;
}
.sliderBar li .search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    height: 70%;
    width: 80%;
    border: 1px solid #919191;/*no*/
    border-radius: 20px;
}

.mint-popup-left {
    margin-top: -1px;
    width: 75%;
    height: 100%;
    overflow-y: scroll;
}

.sliderBar li:nth-of-type(1) {
    padding-right: 30px;
    text-align: right;
}
.sliderBar2 li:nth-of-type(1) {
    padding: 0;
    text-align: left;
}

.sliderBar li {
    height: 95px;
    line-height: 95px;
    border-bottom: 1px solid #ddd;
    font-size: 30px;
}

.sliderBar li a {
    display: inline-block;
    padding: 0 30px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.sliderBar li i {
    margin-right: 6px;
    font-size: 40px;
}
.sliderBar li .icon-youjiantou {
    float: right;
    font-size: 26px;
}
.title .memberMsg {
    background: none;
}
.title .memberMsg i {
    position: relative;
    top: 8px;
    z-index: 1;
    font-size: 50px;
    color: #fff;
}
.title .memberMsg em {
    position: absolute;
    top: 0;
    right: 15px;
    z-index: 5;
    float: right;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: red;
    border-radius: 50%;
}

/* 侧边栏导航 结束 */

/* 试玩弹窗 开始 */
.textWrap {
    width: 70%;
    height: 30%;
    background-color: #fff;
    border-radius: 14px;
    overflow: hidden;
}
.textWrap .textPop {
    height: 100%;
}
.textPop h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    font-size: 30px;
    color: #fff;
    font-weight: normal;
    background-color: #ccb07e;
}
.textPop > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 80%;
}
.textPop p {
    padding: 0 70px;
    width: 100%;
    text-align: center;
    font-size: 30px;
}
.textPop button {
    width: 80%;
    height: 20%;
    border-radius: 20px;
    color: #fff;
    background-color: #ccb07e;
}
/* 试玩弹窗 结束 */
</style>



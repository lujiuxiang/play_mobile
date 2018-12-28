<template>
    <div class="service">
        <div v-if="loginActive">
            <!-- 头部 开始 -->
            <div class="title">
                <span>我的</span>
                <i @click="goBack" class="iconfont icon-left-arrow"></i>
            </div>
            <!-- 头部 结束 -->

            <!-- 用户信息 开始 -->
            <div class="userinfo clearfix">
                <div class="headPhoto">
                    <img :src="titleList.src" alt="">
                </div>
                <div>
                    <!-- 上面登录信息 -->
                    <div class="title-top">
                        <p>
                            <strong>{{titleList.user}}</strong>
                            <span>
                                <i ref="mymoney">余额:{{money}}</i>元
                                <mt-button type="default" @click="shuaxinMoney($event)">刷新</mt-button>
                            </span>
                        </p>
                    </div>
                    <!-- 下面会员升级信息 -->
                    <div class="title-bottom">
                        <mt-progress :value="percent" :bar-height="5">
                            <div class="start" slot="start">{{nowVip}}</div>
                            <div class="end" slot="end">{{nextVip}}</div>
                        </mt-progress>
                        <p>
                            目前已消费
                            <i>{{recharge}}</i>元
                            下一级需要消费
                            <i>{{consume}}</i>元
                        </p>
                    </div>
                </div>
            </div>
            <!-- 用户信息 结束 -->

            <!-- 内容 开始 -->
            <div class="content">
                <!-- 我的列表 -->
                <ul v-for="(item,index) in myList" :key="index">
                    <li v-for="(newitem,newindex) in item" :key="newindex" @click="loginOut($event)">
                        <router-link v-if="newitem.name" :to="newitem.name" ref="out">
                            <i :class="newitem.icon1"></i>
                            <span>{{newitem.text}}</span>
                            <em v-if="newitem.name === 'memberMsg' && noRead">{{noRead}}</em>
                            <i :class="newitem.icon2"></i>
                        </router-link>

                        <a v-else :href="newitem.href" ref="out">
                            <i :class="newitem.icon1"></i>
                            <span>{{newitem.text}}</span>
                            <i :class="newitem.icon2"></i>
                        </a>
                    </li>
                </ul>


            </div>
            <!-- 内容 结束 -->
        </div>

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->
        <login v-if="!loginActive"></login>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import {mapActions} from 'vuex'
import commonfooter from "./../commonViews/commonfooter.vue";
import login from "./../commonViews/login.vue";
import "../iconfont/iconfont.css";
export default {
    name: "my",
    data() {
        return {
            // 头部数据
            titleList: {
                src: require("../../static/images/my/headPhoto.png"),
                user: "加载中",
                VIP: "VIP1",
            },
            // 我的列表
            myList: [
                [
                    {
                        name: "safe",
                        icon1: "iconfont icon-mima",
                        text: "安全中心",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        name: "moneyTransition",
                        icon1: "iconfont icon-eduzhuanhuan",
                        text: "额度转换",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        name: "changePassword",
                        icon1: "iconfont icon-mima",
                        text: "修改登录密码",
                        icon2: "iconfont icon-youjiantou"
                    },
                ],
                [
                    {
                        name: "changeqkpass",
                        icon1: "iconfont icon-mima",
                        text: "修改取款密码",
                        icon2: "iconfont icon-youjiantou"
                    },
                    // {
                    //     name:'changeLEBO',
                    //     icon1:'iconfont icon-mima',
                    //     text:'修改LEBO客户端密码',
                    //     icon2:'iconfont icon-youjiantou',
                    // },
                    {
                        name: "member",
                        icon1: "iconfont icon-zanshi",
                        text: "会员",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        name: "memberMsg",
                        icon1: "iconfont icon-xiaoxi1",
                        text: "会员消息",
                        icon2: "iconfont icon-youjiantou"
                    },
                ],
                [
                    // {
                    //     name:'',
                    //     icon1:'iconfont icon-tongbu',
                    //     text:'同步MG消息',
                    //     icon2:'iconfont icon-youjiantou',
                    // },
                    // {
                    //     name:'gameRecode',
                    //     icon1:'iconfont icon-touzhujilu',
                    //     text:'游戏记录',
                    //     icon2:'iconfont icon-youjiantou',
                    // },
                    {
                        name: "promotion",
                        icon1: "iconfont icon-tuijianhaoyou",
                        text: "我的推广",
                        icon2: "iconfont icon-youjiantou"
                    },
                    // {
                    //     name: "transitionRecode",
                    //     icon1: "iconfont icon-shuye",
                    //     text: "额度转换记录",
                    //     icon2: "iconfont icon-youjiantou"
                    // },
                    {
                        name: "friendRecode",
                        icon1: "iconfont icon-tuijianjilu",
                        text: "推荐记录",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        name: "bettingRecode",
                        icon1: "iconfont icon-touzhujilu1",
                        text: "投注记录",
                        icon2: "iconfont icon-youjiantou"
                    },
                ],
                [
                    {
                        name: "andRecode",
                        icon1: "iconfont icon-huabanfuben",
                        text: "资金记录",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        href: "http://148.72.206.211:802/computer/#/",
                        icon1: "iconfont icon-diannao",
                        text: "转电脑版",
                        icon2: "iconfont icon-youjiantou"
                    },
                    {
                        name: "",
                        icon1: "iconfont icon-tuichu",
                        text: "退出",
                        icon2: "iconfont icon-youjiantou"
                    }
                ]
            ],
            loginActive: false
        };
    },
    components: {
        commonfooter,
        login
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 退出账号
        loginOut(event) {
            let e = event.currentTarget;
            let inner = e.children[0].children[1].innerHTML;
            let user = window.sessionStorage.getItem("login_user");
            if (inner === "退出") {
                this.$post("index/user/Ext",{
                    user: user
                }).then(res=>{
                    window.sessionStorage.clear();
                    window.location.reload();
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        // 我的账户 刷新余额
        shuaxinMoney(event) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let shuaxin = event.currentTarget;
            let mymoney = this.$refs.mymoney;
            shuaxin.setAttribute("disabled", true);
            shuaxin.innerHTML = "30S";
            mymoney.innerHTML = "加载中..";
            // axios 请求
            that.$post("person/index/userinfo",{
                user: user
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                // 刷新之后给对应的余额赋值
                mymoney.innerHTML = res.summoney.money;
            }).catch(err=>{
                console.log(err);
            })
            let mytimer = setInterval(function() {
                shuaxin.innerHTML = parseFloat(shuaxin.innerHTML) - 1 + "S";
                if (parseFloat(shuaxin.innerHTML) === 0) {
                    shuaxin.removeAttribute("disabled");
                    shuaxin.innerHTML = "刷新";
                    clearInterval(mytimer);
                }
            }, 1000);
        },
        ...mapActions([
            "handle_getMemberCenterTitle",
            "handle_getNoread",
            "handle_getMemberCenter"
        ])
    },
    computed: {
        // 首页右上角总余额
        money() {
            return this.$store.state.MemberCenter.bankBalance[0].money
                ? this.$store.state.MemberCenter.bankBalance[0].money
                : 0;
        },
        nowVip() {
            return this.$store.state.MemberCenterTitle.nowVip
                ? this.$store.state.MemberCenterTitle.nowVip
                : 0;
        },
        nextVip() {
            return this.$store.state.MemberCenterTitle.nextVip
                ? this.$store.state.MemberCenterTitle.nextVip
                : 0;
        },
        recharge() {
            return this.$store.state.MemberCenterTitle.recharge
                ? this.$store.state.MemberCenterTitle.recharge
                : 0;
        },
        consume() {
            return this.$store.state.MemberCenterTitle.consume
                ? this.$store.state.MemberCenterTitle.consume
                : 0;
        },
        percent() {
            return this.$store.state.MemberCenterTitle.percent
                ? this.$store.state.MemberCenterTitle.percent
                : 0;
        },
        // 会员消息 未读消息 
        noRead() {
            return this.$store.state.noRead;
        }
    },
    created() {
        this.common.noData(this);
        
        if (
            window.sessionStorage.getItem("login_user") &&
            window.sessionStorage.getItem("username").indexOf("_text") == -1
        ) {
            let user = window.sessionStorage.getItem("login_user");
            let username = window.sessionStorage.getItem("username");
            this.loginActive = true;
            this.titleList.user = username;
            // 请求vuex的数据---我的账户 余额列表
            this.handle_getMemberCenter({ user: user, that: this });
            this.handle_getMemberCenterTitle({ user: user, that: this });
            this.handle_getNoread({ user: user, that: this });
            
        } else {
            this.loginActive = false;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
    font-style: normal;
    font-size: 24px;
}
/* 顶部回退框 */
.title {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100px;
    text-align: center;
    transform: translateZ(0);
    background: url("../../static/images/index/titleSearch.png") no-repeat
        center/cover;
}
.title span {
    font-size: 36px;
    color: #fff;
    line-height: 100px;
    text-align: center;
}
.title i {
    position: absolute;
    left: 30px;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
    z-index: 99;
}
/* 顶部回退框 */

/* 用户数据 */
.userinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    padding: 20px 30px;
    width: 100%;
    box-sizing: border-box;
    background: url(../../static/images/my/bg.jpg) no-repeat center;
}
.userinfo > div {
    float: left;
}
.userinfo > div:nth-of-type(2) {
    width: 70%;
    padding-left: 20px;
}
.userinfo .headPhoto {
    width: 25%;
    border-radius: 50%;
}
.userinfo .headPhoto img {
    width: 100%;
    height: 100%;
}

.title-top {
    color: #000;
    box-sizing: border-box;
}
.title-top p:nth-of-type(1) {
    font-size: 34px;
}
.title-top p:nth-of-type(1) span {
    font-size: 24px;
}

.title-top strong {
    font-size: 46px;
    font-weight: normal;
}
.title-top span {
    display: inline-block;
    min-width: 150px;
}

/* 用户数据 结束 */

/* 下面会员等级信息 */
.title-bottom .start,
.end {
    padding: 6px;
    margin-right: 10px;
}
.end {
    margin-left: 10px;
}
.title-bottom p {
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.4);
}

/* 我的列表 开始 */
.content{
    padding-bottom: 110px;
    background-color: #f5f1f0;
}
.content ul {
    padding-top: 10px;
    padding-bottom: 1px;
    border-bottom: 1px solid #dccec6;
}
.content ul li {
    position: relative;
    padding: 0 30px;
    height: 80px;
    line-height: 80px;
    border-top: 1px solid #dccec6;
    background-color: #fff;
}
.content ul li a {
    position: relative;
    z-index: 999;
    display: inline-block;
    width: 100%;
    height: 100%;
}
.content ul li a i:nth-of-type(1) {
    font-size: 32px;
}
.content ul li a i:nth-of-type(2) {
    float: right;
}
.content ul li em{
    position: absolute;
    top: 25%;
    right: 40px;
    padding: 0 15px;
    height: 50%;
    line-height: 1.8;
    color: #fff;
    font-style: normal;
    background-color: red;
    border-radius: 10px;
}
/* 我的列表 结束 */
</style>

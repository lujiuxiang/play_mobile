<template>
    <div class="activities">
        <!-- 头部搜索框 开始 -->
        <div class="title">
            <span>活动</span>
            <i @touchstart.stop.prevent="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部搜索框 结束 -->

        <!-- 游戏 开始 -->
        <div class="games">
            <div class="nav" v-if="navBar.length">
                <!-- @click事件的index+1是为了和下面的列表的id对应  id千万不要修改 -->
                <mt-button class='navBar' :class="{show: active.substr(active.length-1,1) == index + 1}" ref="navBar" v-for="(item,index) in navBar" @click.native.prevent="active = 'tab-container' +( index+1) + ''" :key="index">
                    <!-- <i :class=item.class></i> -->
                    <span v-text="item.stylename"></span>
                </mt-button>
            </div>

            <!-- 对应的navbar列表 -->
            <div class="page-tab-container">
                <mt-tab-container class="page-tabbar-tab-container" v-model="active">
                    <mt-tab-container-item class="contentWrap" v-for="(item,index) in navBar" :id="item.id" :key="index">
                        <!-- 导航的优惠详情 -->
                        <ul class="activity-bot" ref="topListContent" :key="index" v-if="navBar.length>0">
                            <!-- 详情列表 -->
                            <li v-for="(newitem,newindexBot) in item.sub" :key="newindexBot">
                                <div ref="activeList" class="hd_wrap">
                                    <img v-lazy="newitem.img" :title="newitem.title" width="100%">
                                    <div class="sqhd" @touchstart.stop.prevent="sqhd(newitem.id,$event)"></div>
                                    <!-- 点击时显示的对应的优惠列表 -->
                                    <div class="activity-list clearfix" ref="activityList">
                                        <!-- 优惠列表的gif -->
                                        <div class="gif-bg"></div>
                                        <!-- 详情列表的内容部分 -->
                                        <div class="list-content">
                                            <!-- 内容顶部游戏gif -->
                                            <p class="clearfix">
                                                <img src="../../static/images/activities/list1.gif" alt="">
                                                <img src="../../static/images/activities/list2.gif" alt="">
                                                <img src="../../static/images/activities/list3.gif" alt="">
                                                <img src="../../static/images/activities/list4.gif" alt="">
                                                <img src="../../static/images/activities/list5.gif" alt="">
                                                <img src="../../static/images/activities/list6.gif" alt="">
                                                <img src="../../static/images/activities/list7.gif" alt="">
                                                <img src="../../static/images/activities/list8.gif" alt="">
                                                <img src="../../static/images/activities/list9.gif" alt="">
                                                <img src="../../static/images/activities/list10.gif" alt="">
                                                <img src="../../static/images/activities/list11.gif" alt="">

                                            </p>
                                            <!-- 具体优惠内容 -->
                                            <div class="ruler" v-html="newitem.content"></div>
                                            <!-- 底部gif图片 -->
                                            <p class="clearfix">
                                                <img src="../../static/images/activities/footer.gif" alt="">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!-- 游戏 结束 -->

        <!-- 底部 开始 -->
        <keep-alive>
            <commonfooter></commonfooter>
        </keep-alive>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { Indicator } from "mint-ui";
import axios from "axios";
import {mapActions} from 'vuex'
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "activities",
    data() {
        return {
            // 游戏部分数据
            onoff: false,
            active: "tab-container1"
        };
    },
    components: {
        commonfooter
    },
    computed: {
        navBar() {
            return this.$store.state.activityData.navBar;
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        toggle() {
            this.onoff = !this.onoff;
            let activeList = this.$refs.activeList;
            let activityList = this.$refs.activityList;

            activeList.forEach((item, index) => {
                item.onclick = function() {
                    if (this.children[2].className.indexOf("active") > -1) {
                        this.children[2].classList.remove("active");
                        // console.log('有active');
                    } else {
                        //点击时 所有的都没有active类名 都是none
                        for (let i = 0; i < activeList.length; i++) {
                            activeList[i].children[2].classList.remove(
                                "active"
                            );
                        }
                        //当前点击加上active
                        this.children[2].classList.add("active");
                        // console.log('没有active');
                    }
                };
            });
        },
        sqhd(id,event){
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            event.stopPropagation();
            if(!user){
                alert("请登录之后进行申请")
                return
            }
            // axios 请求 -- 发送申请
            that.$post("person/agent/addActive",{
                user: user,
                id: id
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                if(res == 1){
                    alert("申请成功，请留意会员消息！")
                }else if(res == 2){
                    alert("您已经申请成功，无需申请！")
                }else if(res == 3){
                    alert("正在申请中，请等待结果（留意会员消息）！")
                }else if(res == 4){
                    alert("流水不足，无法申请此活动！")
                }
            }).catch(err=>{
                console.log(err);
                alert("发送失败！")
            })
        },
        ...mapActions([
            "handle_getActivity"
        ])
    },
    mounted() {
        if (!this.navBar) Indicator.open("加载中...");
        this.handle_getActivity({url: "index/index/active", that: this})
    },
    updated() {
        if (this.navBar) {
            this.toggle();
        }
        Indicator.close();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ol {
    list-style: none;
}
.active {
    display: block !important;
}
/* 头部 开始 */
/* 顶部回退框 */

.title {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100px;
    text-align: center;
    transform: translateZ(0);
    background: url("../../static/images/index/titleSearch.png") no-repeat
        center/cover;
}
.title span {
    text-align: center;
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
/* 头部 结束 */

img[lazy="loading"] {
    height: 80px;
}

/* 游戏 开始 */
.games {
    margin-bottom: 120px;
    padding: 0 40px;
    margin-top: 100px;
}
.games .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90px;
    background: none;
    box-shadow: none;
}
.games .nav button {
    margin: 0 5px;
    height: 60px;
    line-height: 60px;
}
.games .nav .navBar {
    flex: none;
}
.games .contentWrap > a {
    display: inline-block;
    position: relative;
    z-index: 2;
    margin: 20px 0;
    width: 100%;
    height: 108px;
}
.games .contentWrap a img {
    width: 100%;
    height: 100%;
}
.games .show {
    background-color: #ccb07e;
    color: #fff;
}

/* 游戏 结束 */
.page-tab-container > ul,
.page-tab-container > ul li,
.page-tab-container > ul li > a img {
    width: 100%;
    height: 100%;
}
/* banner下面游戏 开始 */
.activity-bot {
    width: 100%;
    margin: 0 auto;
}
.activity-bot .activity-list {
    display: none;
    box-sizing: border-box;
    border: 1px solid #d4bb5e;/*no*/
}

.activity-bot .activity-list div li .li-imgbg {
    background-position: 0px -120px;
}
.activity-bot .activity-list div li .li-right {
    float: left;
    margin: 8px;
    color: #fff;
}
.activity-bot .activity-list div li h2 {
    color: #fff;
    font-size: 18px;
    text-align: center;
    font-weight: normal;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    text-align: center;
}
.activity-bot .activity-list div li .li-right .li-imgbg {
    height: 28px;
    width: 170px;
    background-position: -5px -68px;
    text-align: center;
    margin: 5px auto 5px;
}
.activity-bot .activity-list div li div {
    text-align: center;
}
.activity-bot .activity-list div li a {
    display: inline-block;
    width: 128px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #eace64;
    background: linear-gradient(to bottom, #f0da80, #dcaf35);
    color: #171819;
}
.activity-bot .activity-list div li a:hover {
    background: linear-gradient(to bottom, #e8a048, #c8500f);
    color: #fff;
}

/* 头部li 第二个 开始 */

.activity-bot .activity-list div li:nth-of-type(2) .li-wrap em {
    background-position: -189px -68px;
    width: 30px;
    height: 30px;
    margin: 10px 0 0 40px;
}
.activity-bot .activity-list div li:nth-of-type(2) .li-wrap h2 {
    float: left;
    margin: 10px 0 10px 0;
    line-height: 24px;
}
.activity-bot .activity-list div li:nth-of-type(2) a {
    margin: 2px 0;
}
/* 头部li 第二个 结束 */
/* 头部li 第三个 开始 */
.activity-bot .activity-list div li:nth-of-type(3) .li-imgbg {
    background-position: -97px -120px;
    margin-left: 15px;
}
.activity-bot .activity-list div li:nth-of-type(3) .li-right {
    width: 167px;
}
.activity-bot .activity-list div li:nth-of-type(3) .li-right {
    padding-top: 13px;
    text-align-last: left;
    font-size: 13px;
}
.activity-bot .activity-list div li:nth-of-type(3) .li-right i {
    font-style: normal;
    color: #fff29b;
}
/* 头部li 第三个 结束 */

/* git图片 开始 */
.activity-list .gif-bg {
    text-align: center;
    width: 100%;
    height: 44px;
    background: url("../../static/images/activities/top.gif") no-repeat
        center/100% 100%;
}

/* git图片 结束 */
.activity-list .list-content p:nth-of-type(1) {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    background-color: #fff;
}
.activity-list .list-content p img {
    width: 25%;
}
.activity-list .list-content p:nth-of-type(2) img {
    width: 100%;
}
.activity-list .list-content .ruler {
    padding: 30px;
    background-color: #fff;
}

/* banner下面游戏 结束 */

/* 活动申请按钮 */
.hd_wrap{
    position: relative;
}
.hd_wrap .sqhd{
    position: absolute;
    z-index: 10;
    top: 20px;
    right: 0;
    height: 60px;
    width: 70px;
    cursor: pointer;
}
</style>

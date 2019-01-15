<template>
    <div class="index">
        <!-- 头部 开始 -->
        <keep-alive>
            <commonheader></commonheader>
        </keep-alive>
        <!-- 头部 结束 -->
        <!-- banner 开始 -->
        <p class="news">
            <span>
                <img src="../../static/images/index-banner/laba.png" alt="">
            </span>
            <marquee scrollamount="3" scrolldelay="100" direction="left" @click="newsShow">
                <span style="margin-right:40px;" v-for="(item,index) in news" :key="index">{{item.mess}}</span>
            </marquee>
        </p>
        <div class="banner">
            <mt-swipe :auto='3000'>
                <mt-swipe-item v-for="(item,index) in banner" :key="index">
                    <img v-lazy="item.mobileurl" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- banner 结束 -->
        <!-- 中奖名单 开始 -->
        <div class="winners clearfix">
            <p>
                <span>获奖名单</span>
            </p>
            <div id="ulWrap" ref="ul">
                <ul id="demo1" ref="list1">
                    <li v-for="(item,index) in winner_list" :key="index">
                        会员:
                        <i>{{item.user}}</i>
                        在
                        <i>{{item.game}}</i>
                        游戏中奖
                        <i>{{item.price}}</i>
                        元
                    </li>
                </ul>
                <ul ref="list2">
                    <li v-for="(item,index) in winner_list" :key="index">
                        会员:
                        <i>{{item.user}}</i>
                        在
                        <i>{{item.game}}</i>
                        游戏中奖
                        <i>{{item.price}}</i>
                        元
                    </li>
                </ul>
            </div>
        </div>
        <!-- 中奖名单 结束 -->

        <!-- 游戏部分 开始 -->
        <div class="games">
            <div class="nav">
                <!-- 游戏的导航 -->
                <mt-button class='navBar' 
                            :class="{show: active == index}" 
                            ref="navBar" v-for="(item,index) in gList" 
                            @click="goswiper(index)" 
                            :key="index">
                    <i :class=item.imgurl></i>
                    <span v-text="item.title"></span>
                </mt-button>
            </div>
            <!-- 游戏轮播 -->
            <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
                <swiper-slide class="contentWrap" v-for="(item,index) in gList"  :key="index">
                    <div v-if="item.url !== 'false'">
                        <!-- 彩票或棋牌的选项卡 -->
                        <mt-navbar class="page-part" v-model="selected">
                            <mt-tab-item v-for="(newitem,newindex) in item.sub" :key="newindex" :id="newitem.id">
                                <img class="gameImg" v-lazy="newitem.ico" alt="">
                                <span>{{newitem.title}}</span>
                            </mt-tab-item>
                        </mt-navbar>

                        <mt-cell :title="'内容 ' + selected"></mt-cell>
                        <!-- 选项卡对应的内容数据 -->
                        <mt-tab-container v-model="selected">
                            <mt-tab-container-item v-for="(newitem,newindex) in item.sub" :key="newindex" :id="newitem.id">
                                <div class="content" v-for="(gameitem,gameindex) in newitem.game" :key="gameindex">
                                    <p>{{gameitem.online}}人在玩</p>
                                    <div :class="gameitem.hot" ref="gamesShoucang" @touchstart="gtouchstart(gameitem.id,$event,gameitem.collect)" @touchmove="gtouchmove(gameitem.id,$event)" @touchend="gtouchend(gameitem.id,gameitem.platform,gameitem.gamecode,gameitem.moneycode,$event,newindex)">
                                        <img v-lazy="gameitem.src" alt="">
                                        <span>
                                            {{gameitem.gamename}}
                                        </span>
                                        <i class="iconfont icon-youjiantou"></i>
                                        <i :class="{'iconfont': true, 'icon-xin':gameitem.collect == 1 , }"></i>
                                    </div>
                                </div>
                            </mt-tab-container-item>
                        </mt-tab-container>
                    </div>
                    <div v-else>
                        <!-- 除了彩票和棋牌 其他正常显示 -->
                        <div class="content" v-for="(newitem,newindex) in item.sub" :key="newindex">
                            <p>{{newitem.online}}人在玩</p>
                            <div :class="newitem.hot" ref="gamesShoucang" @touchstart="gtouchstart(newitem.id,$event,newitem.collect)" @touchmove="gtouchmove(newitem.id,$event)" @touchend="gtouchend(newitem.id,newitem.platform,newitem.gamecode,newitem.moneycode,$event,newindex)">
                                <img v-lazy="newitem.src" alt="">
                                <span>
                                    {{newitem.gamename}}
                                </span>
                                <i class="iconfont icon-youjiantou"></i>
                                <i :class="{'iconfont': true, 'icon-xin':newitem.collect == 1 , }"></i>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <!--  -->

        </div>

        <!-- 游戏部分 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

        <!-- 最新消息弹窗 开始 -->
        <div class="popup">
            <mt-popup class="pop" v-model="popupShow" popup-transition="popup-fade" lockScroll="true">
                <h4>最新消息
                    <i class="iconfont icon-guanbi1" @click="newsShow"></i>
                </h4>
                <ul class="newMsgPop">
                    <li v-for="(item,index) in news" :key="index">{{item.mess}}</li>
                </ul>
                <p>
                    <mt-button type="default" @click="newsShow">关闭</mt-button>
                </p>
            </mt-popup>
        </div>
        <!-- 最新消息弹窗 结束 -->
    </div>


</template>

<style scoped src="../css/index.css"></style>
<script>
/*组件方式引用*/
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Toast,MessageBox,Indicator,InfiniteScroll,Lazyload } from "mint-ui";
import axios from "axios";
import {mapActions} from 'vuex'
import commonheader from "./../commonViews/commonHeader.vue";
import commonfooter from "./../commonViews/commonfooter.vue";
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。

export default {
    name: "index",
    data() {
        let that = this
        return {
            // 游戏轮播的swiper
            swiperOption: {
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                on:{
                    slideChangeTransitionStart: function() {
                        that.active = this.realIndex;
                    }
                }
            },
            // 游戏部分数据
            active: "0",
            page: [],
            loading: true,
            isShow: true,
            // 首页弹窗内容
            browseArr: [],
            // 游戏列表 用于最近收藏
            gamesShoucang: [],
            gamesClick: 0,
            // 最近收藏的 定时器
            timeout: "",
            popupShow: false,
            // 彩票或视讯默认第一个选项卡被选中
            selected: 1,
            tabIndex: 0,
            // 游戏 在线人数的定时器
            indexGames_timer: null,
            
        };
    },
    components: {
        commonfooter,
        commonheader,
        swiper,
        swiperSlide
    },
    methods: {
        // 跳转游戏
        goin(id, a, b, c, event) {
            let that = this;
            this.common.goin(id, a, b, c, event, that);
        },
        loadMore() {
            let page = parseInt(window.sessionStorage.getItem("page")) + 1;
            window.sessionStorage.setItem("page", page);
            this.loading = true;
            let that = this;
            // that.$post("game/game/gameMobileSelect",{
            //     name: window.sessionStorage.getItem("name"),
            //     page: window.sessionStorage.getItem("page")
            // }).then(res=>{
            //     console.log(res);
            // }).catch(err=>{
            //     console.log(err);
            // })
        },

        // 收藏游戏
        gtouchstart(id, e, collect) {
            let user = window.sessionStorage.getItem("login_user"); //用户名
            let that = this;
            // 清空定时器
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                that.longPress(id, e, collect);
            }, 1000); //长按时间超过1000ms，则执行传入的方法
            return false;
        },

        //真正长按后应该执行的内容
        longPress(id, e, collect) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user"); //登陆之后账户
            let usertype = window.sessionStorage.getItem("usertype"); //试玩账号
            usertype = usertype ? 0 : 1;
            this.timeout = 0;
            // 未登录时 不能进行收藏
            if (!window.sessionStorage.getItem("username")) {
                confirm("请登录之后进行收藏！");
                return;
            }
            // 试玩账号不支持收藏
            if (window.sessionStorage.getItem("usertype")) {
                confirm("试玩账号不支持收藏功能！");
                return;
            }
            if (collect == undefined || collect == 0) {
                // axios请求 -- 收藏后刷新游戏列表
                that.$post("index/method/collect",{
                    userid: user,
                    gameid: id
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res.status == 1) {
                        collect = 1;
                        Toast("已添加至我的收藏！");
                        that.handle_indexGames({
                            url: 'game/game/gameMobileSelect',
                            that: that,
                            params: {usertype: usertype, user: user}
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
                return;
            } else if (collect == 1) {
                //   取消收藏
                that.$post("index/method/deletecollect",{
                    userid: user,
                    gameid: id
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res.status == 1) {
                        Toast("取消收藏成功！");
                        that.handle_indexGames({
                            url: 'game/game/gameMobileSelect',
                            that: that,
                            params: {usertype: usertype, user: user}
                        })
                        collect = 0;
                    } else {
                        Toast("取消收藏失败！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        //手释放，如果在1000毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gtouchend(id, a, b, c, event) {
            let that = this;
            clearTimeout(this.timeout); //清除定时器
            if (this.timeout != 0) {
                // 这里写要执行的内容（尤如onclick事件）
                // 如果按住时间小于1000毫秒 则执行进入游戏的方法
                this.common.goin(id, a, b, c, event, that);
            }

            return false;
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gtouchmove(id, e) {
            // e.preventDefault();

            clearTimeout(this.timeout); //清除定时器
            this.timeout = 0;
        },

        // 中奖轮播
        win_scroll(){
            // 中奖用户加密
            this.winnersScroll();
            // 以下为中奖名单轮播
            let ulWrap = this.$refs.ul;
            let demo1 = this.$refs.list1;
            let demo2 = this.$refs.list2;
            // 定时器
            function run() {
                if (ulWrap.scrollTop >= demo1.offsetHeight) {
                    ulWrap.scrollTop = 0;
                } else {
                    ulWrap.scrollTop++
                }
            }
            window.timer = setInterval(function () { 
                setTimeout(run,0)
            },80);
        },
        // 中奖名单
        winnersScroll() {
            // 中奖人员的账号中间替换为*
            for (let i = 0; i < this.winner_list.length; i++) {
                if (this.winner_list[i].user.length < 9) {
                    let tmp;
                    if(this.winner_list[i].user.length >= 6){
                        tmp = this.winner_list[i].user.substring(
                            2,
                            this.winner_list[i].user.length - 2
                        );
                    }else{
                        tmp = this.winner_list[i].user.substring(
                            2,
                            this.winner_list[i].user.length
                        );
                    }
                    // 开始替换
                    this.winner_list[i].user = this.winner_list[i].user.replace(tmp, "**");
                } else {
                    let tmp = this.winner_list[i].user.substring(
                        3,
                        this.winner_list[i].user.length - 3
                    );
                    this.winner_list[i].user = this.winner_list[i].user.replace(tmp, "***");
                }
            }
        },
        // 最新消息弹出框
        newsShow() {
            this.popupShow = !this.popupShow;
        },
        // 点击按钮 轮播切换
        goswiper(index) {
            this.active = index
            this.$refs.mySwiper.swiper.slideTo(index, 300, false);
        },
        ...mapActions([
            "handle_indexGames"
        ])
        
    },
    computed: {
        news() {
            return this.$store.state.news;
        },
        banner() {
            return this.$store.state.banner;
        },
        gList() {
            return this.$store.state.gList;
        },
        winner_list() {
            return this.$store.state.winner_list;
        }
    },
    created() {
        window.sessionStorage.setItem("popupShow","0");
    },
    mounted() {
        let that = this;
        //禁止页面滑动游戏时 浏览器的默认前进后退事件
        let xStart, xEnd, yStart, yEnd;
        
        document.addEventListener(
            "touchmove",
            function(evt) {
                xEnd = evt.touches[0].pageX;
                yEnd = evt.touches[0].pageY;
                Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd) &&
                    evt.preventDefault();
            },
            { passive: false }
        );

        document.addEventListener(
            "touchstart",
            function(evt) {
                xStart = evt.touches[0].pageX;
                yStart = evt.touches[0].pageY;
            },
            { passive: false }
        );
    },
    updated() {
        Indicator.close();
    },
    activated() {
        // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
        if(this.popupShow == true){
            this.common.afterOpen();
        }else{
            this.common.beforeClose();
        }
        let that = this;
        let user = window.sessionStorage.getItem("login_user"); //登陆之后账号的sessionid
        let usertype = window.sessionStorage.getItem("usertype"); //试玩账号
        usertype = usertype ? 0 : 1; //试玩账号存在的话 就给后端传0 不存在传1
        that.handle_indexGames({
            url: 'game/game/gameMobileSelect',
            that: that,
            params: {usertype: usertype, user: user}
        })
        // 每隔10秒  重新请求游戏数据  让 在线人数变化
        clearInterval(window.timer);
        clearInterval(this.indexGames_timer)
        // setInterval不会清除定时器队列，每重复执行1次都会导致定时器叠加，最终卡死你的网页。
        // 但是setTimeout是自带清除定时器的
        this.indexGames_timer = setInterval(function() {
            setTimeout(function () {
                that.handle_indexGames({
                    url: 'game/game/gameMobileSelect',
                    that: that,
                    params: {usertype: usertype, user: user}
                })
            }, 0)
        }, 10000);
        if(this.winner_list)this.win_scroll()
    },
    watch:{
        popupShow(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        },
        winner_list(val,oldval){
            if(val && val != oldval){
                this.win_scroll()
            }
        }
    },
    deactivated() {
        clearInterval(window.timer);
        clearInterval(this.indexGames_timer)
    }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->



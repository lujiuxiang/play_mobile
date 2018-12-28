
<template>
    <div class="index">
        <!-- 头部 开始 -->
        <div class="title">
            <span>{{title}}</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <div class="titleimg">
            <img src="../../static/images/my/changepassBg.jpg" width="100%" height="100%" alt="">
        </div>
        <!-- content 开始 -->

        <!-- 游戏部分 开始 -->
        <div class="games">
            <!-- 对应的navbar列表 -->
            <div class="page-tab-container">
                <mt-tab-container class="page-tabbar-tab-container">
                    <mt-tab-container-item class="contentWrap" >
                        <!-- 这里做判断 如果gList的url不是字符串‘false’，则代表 此数据有选项卡 需要下面的模板 （彩票或棋牌） -->
                        <div class="page-part" v-if="gList.url !== 'false'">
                            <!-- 彩票或棋牌的选项卡 -->
                            <mt-navbar class="page-part" v-model="selected">
                                <mt-tab-item v-for="(item,index) in gList.sub" :key="index" :id="item.id">
                                    <img class="gameImg" v-lazy="item.ico" alt="">
                                    <span>{{item.title}}</span>
                                </mt-tab-item>
                            </mt-navbar>

                            <mt-cell :title="'内容 ' + selected"></mt-cell>
                            <!-- 选项卡对应的内容数据 -->
                            <mt-tab-container v-model="selected">
                                <mt-tab-container-item v-for="(item,index) in gList.sub" :key="index" :id="item.id">
                                    <div class="content" v-for="(gameitem,gameindex) in item.game" :key="gameindex">
                                        <p>{{gameitem.online}}人在玩</p>
                                        <div :class="gameitem.hot" ref="gamesShoucang" @touchstart="gtouchstart(gameitem.id,$event,gameitem.collect)" @touchmove="gtouchmove(gameitem.id,$event)" @touchend="gtouchend(gameitem.id,gameitem.platform,gameitem.gamecode,gameitem.moneycode,$event,gameindex)">
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
                        <!-- 如果gList的url是字符串‘false’，则代表 此数据没有选项卡 需要下面的模板 （非彩票或非棋牌） -->
                        <div class="content" v-else v-for="(newitem,newindex) in gList.sub" :key="newindex">
                            <p>{{newitem.online}}人在玩</p>
                            <a :class="newitem.hot" ref="gamesShoucang" @touchstart="gtouchstart(newitem.id,$event,newitem.collect)" @touchmove="gtouchmove(newitem.id,$event)" @touchend="gtouchend(newitem.id,newitem.platform,newitem.gamecode,newitem.moneycode,$event,newindex)">
                                <keep-alive>
                                    <img v-lazy="newitem.src" alt="">
                                </keep-alive>
                                <span>
                                    {{newitem.gamename}}
                                </span>
                                <i class="iconfont icon-youjiantou"></i>
                                <i :class="{ 'xin': true, 'iconfont': true, 'icon-xin':newitem.collect == 1 , }"></i>
                            </a>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!-- 游戏部分 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->
    </div>

</template>
<style scoped src="../css/index.css"></style>
<script>
import { Toast ,MessageBox ,Indicator ,InfiniteScroll,Lazyload} from "mint-ui";
import axios from "axios";
import {mapActions} from 'vuex'
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";

export default {
    name: "listBarGames",
    data() {
        return {
            title: "",
            listObj: "",
            // 游戏列表 用于最近收藏
            gameShoucang: [],
            gamesClick: 0,
            isShow: false, //判断有没有数据 没有数据显示没有数据
            // 彩票或视讯默认第一个选项卡被选中
            selected: 1
            //初始化无限加载相关参数
            /*       queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      totalNum: 0,
      pageSize: 20,
      pageNum: 1, */
        };
    },
    components: {
        commonfooter
    },
    created() {
        let that = this;
        this.common.noData(that);
    },
    methods: {
        // 跳转游戏
        goin(id, a, b, c, event) {
            let that = this;
            this.common.goin(id, a, b, c, event, that);
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
            let user = window.sessionStorage.getItem("login_user");
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
                })
            }
            return;
        },
        //手释放，如果在1000毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gtouchend(id, a, b, c, event) {
            clearTimeout(this.timeout); //清除定时器
            if (this.timeout != 0) {
                // 这里写要执行的内容（尤如onclick事件）
                // 如果按住时间小于1000毫秒 则执行进入游戏的方法
                let that = this;
                this.common.goin(id, a, b, c, event, that);
            }

            return false;
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gtouchmove() {
            clearTimeout(this.timeout); //清除定时器
            this.timeout = 0;
        },
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        ...mapActions([
            "handle_indexGames"
        ])
    },
    created() {
        let that = this;
        window.sessionStorage.setItem(
            "listObj",
            JSON.stringify(this.$route.query)
        );
        this.listObj = JSON.parse(window.sessionStorage.getItem("listObj"));
        this.title = this.listObj.title;
        let user = window.sessionStorage.getItem("login_user"); //登陆之后账号
        let usertype = window.sessionStorage.getItem("usertype");
        usertype = usertype ? 0 : 1;
        that.handle_indexGames({
            url: 'game/game/gameMobileSelect',
            that: that,
            params: {usertype: usertype, user: user}
        })
    },
    computed: {
        gList() {
            let index = this.listObj.index;
            // 这里做判断 如果刷新页面数据没有更新进来 就返回false  如果传进来了 就返回数据
            if (this.$store.state.gList) return this.$store.state.gList[index];
            return false;
        }
    },
    mounted() {
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
    watch:{
        active:function (val,oldval) {
            Indicator.open('加载中...');
            let that = this
            let index = val.match(/\d+/ig)[0] - 1
            let info = this.navBar[index].info
            window.sessionStorage.setItem('info',info)
            if(val !== oldval){
                let that = this;
                that.$post("game/game/gameMobileSelect",{
                    info: info
                }).then(res=>{
                    that.gList = res;
                    Indicator.close();
                }).catch(err=>{
                    console.log(err);
                    Indicator.close();
                })
            }
        }
    },
};
</script>
<style scoped>
/* 顶部回退框 */
.title {
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

.titleimg {
    margin-top: 100px;
}

.xin {
    position: absolute;
    bottom: -50px;
    right: 0;
    color: red;
    font-size: 24px;
}

/*阻止默认长按选中文本*/
* {
    /*ios，如果不行可以加一个透明遮罩层*/
    touch-callout: none;

    /*安卓*/
    user-select: none;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->



<template>
    <div class="index">
        <!-- 头部 开始 -->
        <div class="title">
            <span>搜索</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <div class="titleSearch">
            <p class="searchWrap">
                <i class="iconfont icon-search"></i>
                <input ref="search" type="text" placeholder="请输入游戏名字查询">
                <span @click="searchShow($event)">搜素</span>
            </p>
        </div>
        <!-- content 开始 -->

        <!-- 游戏部分 开始 -->
        <div class="games">
            <!-- 对应的navbar列表 -->
            <div class="page-tab-container">
                <mt-tab-container class="page-tabbar-tab-container">
                    <mt-tab-container-item class="contentWrap" v-infinite-scroll="loadMoreShow" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <mt-loadmore :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                            <div class="content" v-for="(newitem,newindex) in gList" :key="newindex">
                                <p>{{newitem.online}}人在玩</p>
                                <a :class="newitem.hot" ref="gamesShoucang" @touchstart="gtouchstart(newitem.id,$event)" @touchmove="gtouchmove(newitem.id,$event)" @touchend="gtouchend(newitem.id,newitem.platform,newitem.gamecode,newitem.moneycode,$event)">
                                    <img v-lazy="newitem.src" alt="">
                                    <span>
                                        {{newitem.gamename}}
                                    </span>
                                    <i class="iconfont icon-youjiantou"></i>
                                </a>
                            </div>
                        </mt-loadmore>

                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
            <!-- <div class="listButton">
                <b @click="goFirst(1,page.platform,page.gamename,page.type)">首页</b>
                <b @click="prevPage(page.page,page.endpage,page.platform,page.gamename,page.type)">上一页</b>
                <span>当前页:<i>{{page.page}}</i></span>
                <b @click="nextPage(page.page,page.endpage,page.platform,page.gamename,page.type)">下一页</b>
                <b @click="goEnd(page.endpage,page.platform,page.gamename,page.type)">尾页</b>
                <span>共<i>{{page.endpage}}</i>页</span>
            </div> -->
        </div>
        <!-- 游戏部分 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>
<style scoped src="../css/index.css"></style>
<script>
import { Toast ,MessageBox ,Indicator ,InfiniteScroll ,Lazyload} from "mint-ui";
import axios from "axios";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";

export default {
    name: "search",
    data() {
        return {
            allLoaded: false,
            gList: [],
            page: "",
            // 游戏列表 用于最近收藏
            gameShoucang: [],
            gamesClick: 0,
            isShow: false //判断有没有数据 没有数据显示没有数据
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
    methods: {
        // 跳转游戏
        goin(id, a, b, c, event) {
            let that = this;
            this.common.goin(id, a, b, c, event, that);
        },
        loadMoreShow() {
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
        gtouchstart(id, e) {
            let user = window.sessionStorage.getItem("login_user"); //用户名
            let that = this;
            // 清空定时器
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                that.longPress(id, e);
            }, 1000); //长按时间超过1000ms，则执行传入的方法
            return false;
        },

        //真正长按后应该执行的内容
        longPress(id, e) {
            e.preventDefault();
            let user = window.sessionStorage.getItem("login_user");
            this.timeout = 0;
            // 未登录时 不能进行收藏
            if (!window.sessionStorage.getItem("login_user")) {
                confirm("请登录之后进行收藏！");
                return;
            }
            // 试玩账号不支持收藏
            if (window.sessionStorage.getItem("usertype")) {
                confirm("试玩账号不支持收藏功能！");
                return;
            }

            let r = confirm("确定收藏此游戏吗？");
            if (r == true) {
                this.$post("index/method/collect",{
                    userid: user,
                    gameid: id
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res.status == 1) {
                        Toast("收藏成功！");
                    } else {
                        Toast("收藏失败！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
            return;
        },
        //手释放，如果在1000毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gtouchend(id, a, b, c, event) {
            event.preventDefault();
            clearTimeout(this.timeout); //清除定时器

            if (this.timeout != 0) {
                // 这里写要执行的内容（尤如onclick事件）
                // 如果按住时间小于1000毫秒 则执行进入游戏的方法
                // 跳转游戏
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
        // 搜索游戏
        searchShow(event) {
            let that = this;
            let input = this.$refs.search;
            if (!input.value) {
                alert("请输入关键字查询！");
                return;
            }
            Indicator.open("查询中..")
            that.$post("game/game/gameSelectOne",{
                gamename: input.value,
                page: ""
            }).then(res=>{
                Indicator.close()
                that.gList = res.glist; //游戏列表
                that.page = res.page; //分页
            }).catch(err=>{
                Indicator.close()
                console.log(err);
            })
        },
        loadBottom() {
            this.$refs.loadmore.onBottomLoaded();
            this.getList();
        },
        getList() {
            let list0 = [];
            for (i = 0; i < p; i++) {
                list0.push({ demo: i });
            }
            p += 10;
            this.list = list0;
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        Indicator.open("加载中...");
        let that = this;
        // 首页 最新消息 游戏列表
        that.$post("game/game/serchone",{})
            .then(res=>{
                that.gList = res
                if (res == []) {
                    that.isShow = false;
                }
                Indicator.close();
            })
            .catch(err=>{
                Indicator.close();
                console.log(err);
            })
    }
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

.titleSearch {
    padding: 10px;
    background-color: #eee;
    margin-top: 100px;
}
.titleSearch > p {
    display: flex;
    align-items: center;
    position: relative;
}
.titleSearch > p i {
    position: absolute;
    top: 15px;
    left: 20px;
}
.titleSearch > p input {
    flex: 2;
    padding: 10px 0;
    border-radius: 10px;
    outline: none;
    text-indent: 60px;
    border: 1px solid #fff;/*no*/
    background-color: #fff;
}
.titleSearch > p span {
    padding: 10px;
    margin-left: 10px;
    border: 1px solid #065f64;/*no*/
    border-radius: 10px;
}

/* 游戏 */
.mint-loadmore {
    width: 100%;
}
div >>> .mint-loadmore-content {
    display: flex;
    flex-wrap: wrap;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->



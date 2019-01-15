<template>
    <div class="gamerecode">
        <!-- 头部 开始 -->
        <div class="title">
            <span>最近收藏</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <!-- 详细列表 -->
            <ul class="recode" v-if="collectArr.length > 0">
                <li ref="list" v-for="(item,index) in collectArr" :key="index">
                    <mt-cell-swipe :right="GetBtn(index,item.gameid)">
                        <p>
                            <img :src="item.src" alt="">
                        </p>
                        <div>
                            <h6>{{item.gamename}}</h6>
                            <i>{{item.aatime}}</i>
                        </div>
                        <div>
                            <h6 class="right">{{item.sstime}}</h6>
                        </div>
                        <a @click="goin(item.gameid,item.platform,item.gamecode,item.moneycode,$event,index)"></a>
                    </mt-cell-swipe>

                </li>
            </ul>
            <ul class="no">
                <li class="no" v-show="!browseLength">
                    暂时没有数据
                </li>
            </ul>
            <p class="tips">tips：右滑游戏可取消收藏~</p>
        </div>
        <!-- content 结束 -->

        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import { CellSwipe, MessageBox, Toast, Indicator } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css";
export default {
    name: "collect",
    data() {
        return {
            // 没有最近收藏时 显示没有数据
            browseLength: false,
            // 头部查询导航显示/隐藏
            popupVisible: false,
            // 最近收藏 列表
            collectArr: [],
            arr: []
        };
    },
    components: {
        commonfooter
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 头部查询导航显示/隐藏
        listShow() {
            this.popupVisible = !this.popupVisible;
        },
        // 跳转游戏
        goin(id, a, b, c, event) {
            let that = this;
            this.common.goin(id, a, b, c, event, that);
        },

        // 取消收藏
        GetBtn(index, gameid) {
            return [
                {
                    content:
                        '<i class= "iconfont icon-shoucang" style="margin-right:3px; font-size:14px;">取消收藏</i>',
                    style: {
                        background: "red",
                        color: "#fff",
                        width: "70px",
                        textAlign: "center"
                    },
                    handler: () => this.handleClick(index, gameid)
                }
            ];
        },
        //   取消收藏事件
        handleClick: function(index, gameid) {
            let user = window.sessionStorage.getItem("login_user");
            let liList = this.$refs.list;
            let that = this;
            let r = confirm("确定要删除此收藏吗？");
            if (r == true) {
                //确认的回调
                Indicator.open("删除中..")
                that.$post("index/method/deletecollect",{
                    userid: user,
                    gameid: gameid
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        Indicator.close()
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res.status == 1) {
                        Toast("取消收藏成功！");
                        that.collectArr.splice(index, 1);
                        if (that.collectArr.length == 0) {
                            that.browseLength = false;
                        }
                    } else {
                        Toast("取消收藏失败！");
                    }
                    Indicator.close()
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        // 开始请求数据
        let user = window.sessionStorage.getItem("login_user");
        let that = this;
        
        this.$post("index/method/collectall",{
            userid: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            if (res.status == 0) {
                Toast("当前没有收藏");
                return;
            }
            that.collectArr = res.data;
            that.$nextTick(function() {
                if (this.collectArr.length > 0) {
                    this.browseLength = true;
                } else {
                    this.browseLength = false;
                }
            });
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })
    },
    beforeRouteEnter(to, from, next) {
        // 未登录时不能查看我的收藏
        if (!window.sessionStorage.getItem("username")) {
            MessageBox({
                title: "提示",
                message: "请登录之后进行收藏！"
            });
            next(false);
            return;
        }

        // 试玩账号不支持我的收藏
        let usertype = window.sessionStorage.getItem("usertype");
        if (usertype) {
            MessageBox({
                title: "提示",
                message: "试玩账号不支持此功能！"
            });
        } else {
            next();
        }
    }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 顶部回退框 */
.title {
    position: fixed;
    top: 0;
    z-index: 99999;
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
.title em {
    position: absolute;
    right: 30px;
    font-style: normal;
    height: 100%;
    font-size: 34px;
    color: #fff;
    line-height: 100px;
}
/* 顶部回退框 */
/* content 开始 */
.content {
    margin-top: 100px;
    margin-bottom: 120px;
}
/* 详细列表 */
.content .recode {
    background-color: #eee;
}
.content .recode li {
    position: relative;
    width: 100%;
    height: 120px;
    line-height: 120px;
    border-bottom: 2px solid #ccc;
}
.content .recode li p {
    margin-right: 10px;
    width: 15%;
    text-align: center;
}
.content .recode li p img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.content .recode li div {
    flex: 3;
}
.content .recode li div:nth-of-type(2){
    flex: 1;
}
.content .recode li h6 {
    margin-bottom: 10px;
    font-size: 28px;
    color: #000;
    font-weight: normal;
}
.content .recode li i {
    color: #919191;
    font-size: 24px;
}

.content .recode li .right {
    text-align: right;
    font-size: 26px;
    margin: 0;
}
.content .recode li a {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
div >>> .mint-cell-wrapper {
    z-index: 1;
    height: 100%;
    background-color: #eee;
}
div >>> .mint-cell-value {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}
div >>> .mint-cell-swipe-button {
    line-height: 120px;
}

/* 分页 */
.page {
    padding-top: 30px;
    text-align: center;
    background-color: #eee;
}
.page p {
    text-align: center;
}
.page i {
    font-style: normal;
}
.page p > span {
    display: inline-block;
    margin: 20px 0;
    width: 40px;
    height: 45px;
    line-height: 45px;
    border: 1px solid #303030;/*no*/
}
/* content 结束 */

/* 没有数据时 */
.no li {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
}
/* tips */
.tips {
    margin-top: 20px;
    color: red;
    text-align: center;
}
</style>

<template>
    <div class="moneyTransition">
        <!-- 头部 开始 -->
        <div class="title">
            <span>会员消息</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <!-- 未读消息 -->
            <div class="msg clearfix">
                <mt-cell-swipe v-for="(item,index) in newMsg" :key="index" :right="GetBtn(newMsg,index,item)">
                    <div class="leftImg">
                        <em></em>
                        <span>
                            <i class="iconfont icon-xiaoxi1"></i>
                        </span>
                    </div>
                    <div class="msgTitle" ref="msg">
                        <p>{{item.mess}}</p>
                        <span>{{item.remark}}</span>
                    </div>
                    <router-link @click.native="markRead(item.id)" :to="{name:'memberMsgInformation',params:{item:item}}"></router-link>
                </mt-cell-swipe>
            </div>
            <!-- 会员消息 已读消息 -->
            <div class="msg clearfix">
                <mt-cell-swipe v-for="(item,index) in memberMsg" :key="index" :right="GetBtn(memberMsg,index,item)">
                    <div class="leftImg">
                        <em class="noBg"></em>
                        <span>
                            <i class="iconfont icon-xiaoxi1"></i>
                        </span>
                    </div>
                    <div class="msgTitle" ref="msg">
                        <p>{{item.mess}}</p>
                        <span>{{item.remark}}</span>
                    </div>
                    <router-link :to="{name:'memberMsgInformation',params:{item:item}}"></router-link>
                </mt-cell-swipe>
            </div>
            <!-- 有消息时显示删除消息 无消息时显示暂无消息 -->
            <div class="noMsg" v-if="newMsg.length <= 0 && memberMsg.length <= 0">暂无消息</div>
            <p class="tips" v-else>tips:消息左滑可删除消息~</p>

        </div>
        <!-- content 结束 -->
        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import { CellSwipe, MessageBox, Indicator ,Toast} from "mint-ui";
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css";
export default {
    name: "memberMsg",
    data() {
        return {
            memberMsg: [],
            page: "",
            newMsg: "" //未读消息
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
        // 取消收藏
        GetBtn(obj, index, item) {
            return [
                {
                    content: "&nbsp&nbsp删除&nbsp&nbsp",
                    style: { background: "red", color: "#fff" },
                    handler: () => this.deleteMsg(obj, index, item)
                }
            ];
        },
        // 删除信息
        deleteMsg(obj, index, item) {
            let user = window.sessionStorage.getItem("login_user");
            //obj 是当前的循环的数组 index是点击删除的数组下标
            obj.splice(index, 1);
            // axios 请求
            this.$post("person/index/messUpdate",{
                user: user,
                id: item.id,
                typed: 2
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                Toast("删除成功")
            }).catch(err=>{
                console.log(err);
                Toast("删除失败，刷新页面恢复消息")
            })
        },
        // 点击未读消息变已读消息
        markRead(id) {
            let user = window.sessionStorage.getItem("login_user");
            this.$post("person/index/messUpdate",{
                user: user,
                typed: 1,
                id: id
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
            }).catch(err=>{
                console.log(err);
                console.log("转换已读消息失败！");
            })
        }
    },
    mounted() {
        Indicator.open("加载中...");
    },
    activated() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        this.common.noData(that);
        // axios 请求
        that.$post("Person",{
            user: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            that.newMsg = res.latestNews.info; //系统消息 未读消息
            that.memberMsg = res.history.info; //系统消息 已读消息
            Indicator.close();
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })
    },
    beforeRouteEnter(to, from, next) {
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
.moneyTransition > .title {
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
.moneyTransition > .title span {
    text-align: center;
    font-size: 36px;
    color: #fff;
    line-height: 100px;
    text-align: center;
}
.moneyTransition > .title i {
    position: absolute;
    left: 30px;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
    z-index: 99;
}
/* 顶部回退框 */
/* content 开始 */
.content {
    margin-top: 100px;
    padding: 20px;
    margin-bottom: 120px;
}
.content >>> .mint-cell-wrapper {
    padding: 0;
}
.content >>> .mint-cell-value {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px 0;
    font-size: 24px;
    border-bottom: 2px solid #ddd;
}
.content >>> .mint-cell-value a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.content .leftImg {
    margin-right: 20px;
}
.content .leftImg em {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #ccb07e;
    border-radius: 50%;
    margin: 0 10px;
    vertical-align: text-top;
}
.content .leftImg .noBg {
    background-color: #fff;
}
.content .leftImg span {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 75px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: #ddd;
}
.content .leftImg span i {
    font-size: 40px;
}
.content .msgTitle {
    width: 50%;
}
.content .msgTitle p {
    padding: 10px 0;
    font-size: 28px;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.content >>> .mint-cell-swipe-button {
    line-height: 110px;
}

.content .tips {
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
    color: red;
}
.noMsg{
    padding: 80px 0;
    text-align: center;
    font-size: 30px;
}
</style>

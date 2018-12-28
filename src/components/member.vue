<template>
    <div class="moneyTransition">
        <!-- 头部 开始 -->
        <div class="title">
            <span>会员</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <dl v-for="(item,index) in classinfo" :key="index">
                <dt>{{item.classed}}</dt>
                <dd>需要消费
                    <i>{{item.money}}</i>元
                </dd>
            </dl>
        </div>
        <!-- content 结束 -->
        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import { Indicator ,MessageBox} from "mint-ui";
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css";
export default {
    name: "member",
    data() {
        return {
            classinfo: [],
        };
    },
    components: {
        commonfooter
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        Indicator.open("加载中...");

        that.$post("Person/index/memberclass",{
            user: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            that.classinfo = res.classinfo.splice(1);
            Indicator.close();
        }).catch(err=>{
            Indicator.close();
            console.log(err);
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
/* content 开始 */
i {
    font-style: normal;
}
.content {
    margin-top: 100px;
    padding: 40px 20px;
    margin-bottom: 120px;
}
.content dl {
    padding: 10px 0;
}
.content dl dt {
    padding: 10px;
    margin-bottom: 20px;
    color: #fff;
    background-color: #ccb07e;
}
.content dl dd {
    padding: 5px 0;
}
/* content 结束 */
</style>

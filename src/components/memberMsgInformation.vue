<template>
    <div class="memberMsgInformation">
        <!-- 头部 开始 -->
        <div class="title">
            <span>会员消息详情</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <h4>{{list.remark}}</h4>
            <p>{{list.mess}}</p>
        </div>
        <!-- content 结束 -->
        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css";
export default {
    name: "memberMsgInfo",
    data() {
        return {
            list: ""
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
    created() {
        let that = this;
        this.common.noData(that);
    },
    activated() {
        // 进入页面 先用上次传的参数
        this.list = JSON.parse(window.sessionStorage.getItem("list"));
        // 如果是页面刷新 就没传参 用的还是上一次的参数（消息）
        if (!this.$route.params.item) return;
        // 如果传了最近参数 把最新的存到session 然后赋值给当前页面
        window.sessionStorage.setItem(
            "list",
            JSON.stringify(this.$route.params.item)
        );
        this.list = JSON.parse(window.sessionStorage.getItem("list"));
    },
    beforeRouteLeave(to, from, next) {
        // 离开当前路由 清除session
        window.sessionStorage.removeItem("list");
        next();
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
.content {
    margin-top: 100px;
    padding: 20px;
    margin-bottom: 120px;
}
h4 {
    margin: 10px 0;
    font-size: 28px;
}
.content p {
    padding: 20px;
    text-indent: 2em;
    font-size: 28px;
}
</style>

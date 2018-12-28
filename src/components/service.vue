<template>
    <div class="service">
        <!-- 头部 开始 -->
        <div class="title">
            <span>客服</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->

        <!-- 内容 开始 -->
        <div class="content">
            <div class="con-top">
                <img src="../../static/images/services/timg.png" alt="">
            </div>
            <span>24小时为您提供最诚挚的服务</span>
            <mt-button class="btn" type="default">
                <a href="http://w1.ttkefu.com/conversationormessage/ourcustomerservice/customerlist/Givemessage.jsp?R5s6eT=24313&t5Ys2R=23503&s2N6eL=23503&tS4wJ7=3001207951&lr=146&fgid=8756&zixun=" target="_blank">开始通话</a>
            </mt-button>
        </div>
        <!-- 内容 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "service",
    data() {
        return {};
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

/* 内容 开始 */
.content {
    text-align: center;
}
.content .con-top {
    padding: 200px 0 100px 0;
    width: 312px;
    height: 312px;
    margin: 0 auto;
    border-radius: 50%;
}
.content .con-top img {
    width: 100%;
    height: 100%;
}
.content span {
    display: block;
    margin-bottom: 50px;
    text-align: center;
}
.content .btn {
    width: 80%;
    height: 70px;
    background-color: #ccb07e;
    border-radius: 15px;
}
.content .btn a{
	display: inline-block;
    position: relative;
    z-index: 1;
	width: 100%;
	height: 100%;
	line-height: 70px;
	color: #fff;
}
/* 内容 结束 */
</style>

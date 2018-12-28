<template>
    <div class="service">
        <!-- 头部 开始 -->
        <div class="title">
            <span>微信转账教程</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->

        <!-- 内容 开始 -->
        <div class="content">
            <ul>
                <li>
                    <p>
                        <i>1</i>点击右上角 + 进入"收付款页面"</p>
                    <img src="../../static/images/weixin/help1.jpg" alt="">
                </li>
                <li>
                    <p>
                        <i>2</i>拖动至最下方，点击"转账到银行卡"</p>
                    <img src="../../static/images/weixin/help2.jpg" alt="">
                </li>
                <li>
                    <p>
                        <i>3</i>填写收款人相关信息，点击"下一步完成支付"</p>
                    <img src="../../static/images/weixin/help3.jpg" alt="">
                </li>
            </ul>
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
    name: "helpWeixin",
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
    margin-top: 100px;
    margin-bottom: 120px;
}
ul {
    padding: 50px 90px;
}
ul p {
    padding: 10px 0;
    text-align: left;
    margin-left: -40px;
}
ul p i {
    padding: 0 10px;
    margin-right: 10px;
    background-color: #ccb07e;
    border-radius: 50%;
    color: #fff;
}
ul li img {
    width: 100%;
}
/* 内容 结束 */
</style>

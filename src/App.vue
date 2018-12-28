<template>
    <div id="app">
        <!-- 首页弹窗 开始 -->
        <keep-alive>
            <div class="popup">
                <mt-popup class="pop" v-model="popupShow" position="left" lockScroll="true">
                    <!-- 规定首页轮播 每隔3秒自动切换 -->
                    <mt-swipe :auto="3000">
                        <mt-swipe-item v-for="(item,index) in popList" :key="index">
                            <ul>
                                <li class="tips">
                                    {{item.title}}
                                </li>
                                <li class="content" style="word-break:break-all; width: 100%;box-sizing:border-box;" v-html="item.content"></li>
                            </ul>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="btn">
                        <mt-button type="default" @click="popupShowFalse">确认</mt-button>
                    </div>
                </mt-popup>
            </div>
        </keep-alive>
        <!-- 首页弹窗 结束 -->

        <!-- 缓存路由 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <!-- 不需要缓存的路由 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import "./js/flex.js";
import {mapActions} from 'vuex'
export default {
    name: "App",
    data() {
        return {
            // 首页弹窗
            popupShow: false,
        };
    },
    methods: {
        // 首页弹窗关闭
        popupShowFalse() {
            this.popupShow = false;
        },

        ...mapActions([
            "handle_getData",
            "handle_indexGames",
            "handle_getAgent"
        ])
    },
    computed: {
        popList() {
            return this.$store.state.popList;
        },
        header_title(){
            window.document.title = this.$store.state.header_title;
            return this.$store.state.header_title
        }
    },
    created(){
        let user = window.sessionStorage.getItem("login_user")
        this.common.noData(this);
        this.handle_getData(); // axios请求 -- 首页banner news 游戏导航     
        if(user){
            // 判断账户是否是代理用户
            this.handle_getAgent({ user: user, that: this });
        }     
    },
    mounted() {
        
        this.popupShow = false;
        // 禁用双指缩放
        // document.documentElement.addEventListener(
        //     "touchstart",
        //     function(event) {
        //         if (event.touches.length > 1) {
        //             event.preventDefault();
        //         }
        //     },
        //     false
        // );
        // 禁用手指双击缩放：
        let lastTouchEnd = 0;
        document.documentElement.addEventListener(
            "touchend",
            function(event) {
                let now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            },
            false
        );
       
    },
    
    watch: {
        // 只有首页有 弹窗广告 并且在登录状态下没有弹窗广告
        $route(to, from) {
            let user = window.sessionStorage.getItem("login_user");
            let popupShow = window.sessionStorage.getItem("popupShow"); //session没有值是显示弹窗 有值就不显示 让弹窗始终保持弹出一次
            if (to.name == "index" && !user && popupShow == 0) {
                this.popupShow = true;
                this.common.afterOpen();
                window.sessionStorage.setItem("popupShow", 1);
            }
            
        },
        popupShow(val,oldval){
             // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        },
        header_title(val,oldval){}
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-size: 24px;
}
a {
    text-decoration: none;
    color: black;
}
i {
    font-style: normal;
}
ul,
ol {
    list-style: none;
}
body {
    min-width: 640px !important;
}
body.dialog-open {
    position: fixed;
    width: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 26px;
    -webkit-overflow-scrolling: touch;   /*这句是为了滑动更顺畅*/
}
/* 禁止ios的Safari浏览器 点击div 或 按住 div 出现阴影问题 */
div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 图片懒加载 样式 开始 */

img[lazy="loading"] {
    width: 100%;
    height: 100%;
    background: url("../static/images/index/loading.gif") no-repeat center;
}

img[lazy="error"] {
    width: 100%;
    height: 100%;
    background: url("../static/images/index/loading.gif") no-repeat center;
}

/* 注册记录用到的类名 */
.h100 {
    height: 100%;
    background: #f5f5f5;
}
/* 注册记录用到的类名 */
.f5 {
    height: 100%;
    background: #f5f5f5;
}
.f5 input {
    background: #f5f5f5;
}
.clearfix::after {
    display: block;
    content: "";
    clear: both;
}
input[type="date"] {
    width: 35%;
}
input[type="date"]::-webkit-clear-button {
    display: none;
}

/* mint-ui样式修改 */
 .mint-msgbox{
    width: 70% !important;
}
.mint-msgbox-header{
    padding: 30px 0 10px !important;
}
.mint-msgbox-title{
    font-size: 32px !important;
}

.mint-msgbox-content{
    padding: 20px 20px 30px !important;
}
.mint-msgbox-message{
    font-size: 28px !important;
}
.mint-msgbox-btns{
    height: 80px !important;
}

.mint-indicator-text,.mint-toast-text{
    font-size: 28px !important;
}


.mint-swipe-indicators .is-active {
    background: #096cb4 !important;
    opacity: 1 !important;
}
.mint-swipe-indicators .mint-swipe-indicator {
    width: 12px !important;
    height: 12px !important;
}
.mint-indicator-wrapper{
    z-index: 99 !important;
}


</style>
<style scoped>
/* 首页弹窗 */
.pop {
    margin-left: 10%;
    width: 80%;
    height: 75%;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
}
.pop .tips {
    padding: 20px 0;
    font-size: 26px;
    text-align: center;
    background-color: #ededed;
    font-weight: bold;
}
.mint-swipe {
    height: 85%;
}
.pop .content {
    padding: 0 20px;
    height: 70%;
}
.pop h3 {
    padding: 10px 0 20px 0;
    font-size: 40px;
    text-align: center;
    color: #ba9e6d;
}
.pop p {
    text-indent: 20px;
    line-height: 1.6;
    font-size: 30px;
}
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #ddd;
    height: 15%;
}
.btn button {
    width: 80%;
    height: 70px;
    border-radius: 14px;
    color: #fff;
    background-color: #ba9e6d;
}

div >>> .mint-swipe-items-wrap {
    overflow-y: scroll;
    height: 95%;
}
</style>


<template>
    <div class="footWrap" v-show="isShow">
        <!-- 底部 开始 -->
        <keep-alive>
            <div class="footer" ref="foot">
                <router-link ref="go" :to="item.name" v-for="(item,index) in footerNav" :key="index">
                    <i :class="item.iconClass"></i>
                    <span>{{item.text}}</span>
                </router-link>
            </div>
        </keep-alive>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import "../iconfont/iconfont.css";
import loginVue from "./login.vue";
export default {
    name: "commonfooter",
    data() {
        return {
            isShow: true,
            height: "",
            newheight: "",
            timer: "",
            // 底部导航
            footerNav: [
                {
                    iconClass: "iconfont icon-WAF-",
                    text: "首页",
                    name: "/"
                },
                {
                    iconClass: "iconfont icon-custom-activity",
                    text: "活动",
                    name: "activities"
                },
                {
                    iconClass: "iconfont icon-kefu",
                    text: "客服",
                    name: "service"
                },
                {
                    iconClass: "iconfont icon-chongzhi",
                    text: "存款",
                    name: "topUp"
                },
                {
                    iconClass: "iconfont icon-tixian",
                    text: "提款",
                    name: "withdrawMoney"
                },
                {
                    iconClass: "iconfont icon-wode",
                    text: "我的",
                    name: "my"
                }
            ],
        };
    },
    mounted() {
        let that = this;
        let winHeight = document.documentElement.clientHeight;
        let hp = 0;//横屏节点
        let sp = 0;//竖屏节点
        // 软键盘窗口弹起检测 如果弹起 隐藏底部导航 收回软键盘 显示底部导航
        window.onresize = function() {
            that.isShow = true; //底部导航显示
            if (Math.abs(window.orientation) === 90) {
                sp = 0;
                // 横屏
                if(hp !== 1){
                    winHeight =  document.documentElement.clientHeight
                }
                hp = 1
            } else {
                // 竖屏
                hp = 0
                if(sp !== 1){
                    winHeight =  document.documentElement.clientHeight < winHeight ? winHeight : document.documentElement.clientHeight;
                }
                sp = 1
            }
            
            let thisHeight = document.documentElement.clientHeight; /*唤起键盘时当前窗口高度*/
            // alert(winHeight +" -" +thisHeight)
            if (winHeight - thisHeight > 180) {
                //窗口发生改变(大),故此时键盘弹出
                //当软键盘弹出，在这里面操作
                that.isShow = false;
            } else {
                //窗口发生改变(小),故此时键盘收起
                //当软键盘收起，在此处操作
                that.isShow = true;
            }

        };


    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 底部 开始 */

.router-link-exact-active {
    color: #ccb07e;
}
.footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    width: 100%;
    height: 100px;
    transform: translateZ(0);
    border-top: 1px solid #ccc;
    background-color: #ffffff;
}
.footer a {
    display: block;
    flex: 1;
    height: 100%;
    text-align: center;
}
.footer a i {
    margin-top: 8px;
    display: block;
    padding: 3px 0;
    font-size: 40px;
}
.footer a span {
    font-size: 24px;
}

/* 底部 结束 */
</style>

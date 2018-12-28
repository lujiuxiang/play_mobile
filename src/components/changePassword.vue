<template>
    <div class="moneyTransition">
        <!-- 头部 开始 -->
        <div class="title">
            <span>修改登陆密码</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部 结束 -->
        <div class="titleimg">
            <img src="../../static/images/my/changepassBg.jpg" width="100%" height="100%" alt="">
        </div>
        <!-- content 开始 -->
        <div class="content">
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password" ref="pass1" class="pass" placeholder="请输入原密码">
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </p>
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password" ref="pass2" class="pass" placeholder="请输入新密码">
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </p>
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password" ref="pass3" class="pass" placeholder="请输入确认密码">
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </p>
            <mt-button type="default" @click="gosubmit">确认</mt-button>
        </div>
        <!-- content 结束 -->
        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import commonfooter from "./../commonViews/commonfooter";
import { MessageBox } from "mint-ui";
import "../iconfont/iconfont.css";
export default {
    name: "changePassword",
    data() {
        return {};
    },
    components: {
        commonfooter
    },
    methods: {
        // 点击显示密码/隐藏密码
        passShow(event) {
            let e = event.currentTarget;
            let pass = e.parentNode.children[1];
            if (pass.getAttribute("type") == "password") {
                pass.setAttribute("type", "text");
            } else {
                pass.setAttribute("type", "password");
            }
        },
        // 提交事件
        gosubmit() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let pass1 = this.$refs.pass1;
            let pass2 = this.$refs.pass2;
            let pass3 = this.$refs.pass3;
            if (pass1.value && pass2.value && pass3.value) {
                if (pass2.value !== pass3.value) {
                    alert("两次密码输入的值不相同，请仔细检查！");
                    return;
                } else if (pass1.value == pass2.value) {
                    alert("新密码不能与旧密码相同！");
                    return;
                }
                that.$post("person/index/passUpdate",{
                    user: user,
                    newpass: pass2.value,
                    oldpass: pass1.value,
                    typed: 1
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res == 0) {
                        alert("修改密码失败！原密码错误！");
                    } else if (res == 1) {
                        alert("修改密码成功！");
                        window.sessionStorage.removeItem("login_user");
                        that.$router.push({ name: "my" });
                    } else if (res == 2) {
                        alert("修改密码失败！新密码与原密码相同！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                MessageBox("提示", "密码输入有误，请重新输入！");
                return;
            }
        },
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
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

.titleimg {
    margin-top: 100px;
}
/* content 开始 */
.content {
    padding: 20px 40px;
    margin-bottom: 120px;
}
.content p {
    margin: 20px 0;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px solid #ddd;
}
.content p input {
    width: 80%;
    height: 80%;
    border: none;
    outline: none;
}
.content p i {
    padding: 0 10px;
    font-size: 38px;
}
.content button {
    margin-top: 60px;
    width: 100%;
    height: 80px;
    font-size: 30px;
    color: #fff;
    border-radius: 10px;
    background-color: #ccb07e;
}
/* content 结束 */
</style>

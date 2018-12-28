<template>
    <div class="register">
        <!-- 头部 开始 -->
        <div class="title">
            <router-link class="iconfont icon-left-arrow" to="/"></router-link>
            <span>忘记密码</span>
            <router-link class="titleright" to="service">联系客服</router-link>
        </div>
        <!-- 头部 结束 -->

        <div class="titleimg">
            <img src="../../static/images/safe/titleimg.jpg" width="100%" height="100%" alt="">
        </div>

        <!-- 内容 开始 -->
        <div class="content">
            <mt-field v-model="user" class="regInput" placeholder="请输入会员账号" :state="state1">
                <i class="iconfont icon-xiaotuziCduan-"></i>
                <span>会员账号：</span>
            </mt-field>
            <mt-field v-model="pass" class="regInput" placeholder="请输入取款密码" type="password" :state="state2">
                <i class="iconfont icon-mima"></i>
                <span>取款密码：</span>
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </mt-field>
            <div class="clearfix last">
                <mt-field v-model="yzm" class="regInput lastinput" min="0" placeholder="四位验证码" type="tel" :state="state3">
                    <i class="iconfont icon-mima"></i>
                    <span>验证码：</span>
                </mt-field>
                <img id="imageId" :src="yzmsrc" @click="yzmShow" alt="( 点选此处产生新验证码 )" align="absmiddle">
            </div>
            <div class="btnWrap">
                <mt-button ref="submit" @click="goSubmit" class="btn" type="default">确认</mt-button>
            </div>
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
    name: "forgetPassword",
    data() {
        return {
            user: "",
            pass: "",
            yzm: "",
            // 会员账号是否符合规则
            Isval1: false,
            state1: "",
            // 取款密码是否符合规则
            Isval2: false,
            state2: "",
            // 验证码是否输入
            Isval3: false,
            state3: "",
            // 验证码路径地址
            yzmsrc:""
        };
    },
    components: {
        commonfooter
    },
    methods: {
        //   忘记密码的正则判断
        regPass() {
            let that = this;
            let regInput = document.getElementsByClassName("mint-field-core");
            // 会员账号
            regInput[0].onblur = function() {
                let val1 = this.value;
                let reg = /^[A-Za-z]{1}[A-Za-z0-9]{5,12}/;
                if (!reg.test(val1) || val1.length < 6 || val1.length > 12) {
                    that.state1 = "error";
                    that.Isval1 = false;
                    return false;
                } else {
                    that.state1 = "success";
                    that.Isval1 = true;
                    return true;
                }
            };
            // 取款密码
            regInput[1].onblur = function() {
                let val2 = this.value;
                let reg2 = /^\d{4}$/;
                if (!reg2.test(val2)) {
                    that.state2 = "error";
                    that.Isval2 = false;
                    return false;
                } else {
                    that.state2 = "success";
                    that.Isval2 = true;
                    return true;
                }
            };

            //验证码
            regInput[2].onblur = function() {
                let val2 = this.value;
                if (val2 == "" || val2 != window.sessionStorage.getItem("yzm")) {
                    that.state3 = "error";
                    that.Isval3 = false;
                    that.yzmShow();
                    return false;
                } else {
                    that.state3 = "success";
                    that.Isval3 = true;
                    return true;
                }
            };
        },
        //   注册的提交按钮
        goSubmit() {
            // 如果表单的正则都判断成功 则可以提交
            if (this.Isval1 && this.Isval2 && this.Isval3) {
                let that = this
                let yzm = window.sessionStorage.getItem("yzm")
                this.submit = true;
                if(this.yzm != yzm){
                    alert("验证码输入不正确，请重新输入!")
                    this.yzmShow()
                    return
                }
                that.$post("person/index/resetPas",{
                    user: that.user,
                    qkpass: that.pass
                }).then(res=>{
                    if(res === -1 ){
                        alert("此账号今日找回次数已达到上限！")
                    }else if(res === 1){
                        that.user = "";
                        that.pass = "";
                        that.yzm = "";
                        alert("找回成功！新密码和用户名相同，请及时修改！")
                    }else if(res === 0){
                        alert("取款密码错误！")
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                window, alert("请检查是否有错误的选项！");
            }
        },
        // 点击显示密码/隐藏密码
        passShow(event) {
            let e = event.currentTarget;
            let pass = e.parentNode.parentNode.children[0];
            if (pass.getAttribute("type") == "password") {
                pass.setAttribute("type", "text");
            } else {
                pass.setAttribute("type", "password");
            }
        },
        // 验证码更换
        yzmShow(){
            let random = Math.floor(Math.random() * 10000);
            this.yzmsrc = "http://148.72.206.211:803/index/yzm/index?id=" + random;
            window.sessionStorage.setItem("yzm", random);
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        this.regPass();
    },
    activated() {
        this.yzmShow()
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 顶部回退框 */
.title .iconfont {
    position: absolute;
    left: 0;
    margin-left: 20px;
    line-height: 100px;
    font-size: 36px;
    color: #fff;
    z-index: 99;
}
.titleright {
    position: absolute;
    right: 0;
    margin-right: 20px;
    color: #fff;
    font-size: 34px;
}
.title {
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    width: 20%;
    text-align: center;
    font-size: 36px;
    color: #fff;
    text-align: center;
}
.title .img {
    width: 40%;
}

.title span a {
    padding: 8px 16px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 10px;
}

.title span .reg {
    color: #fff;
    background-color: red;
}

.title .img img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.title span .myBtn {
    background: none;
}

.title span .myBtn i {
    color: #fff;
    vertical-align: middle;
}

/* 顶部回退框 */
/* 内容 开始 */
.titleimg {
    margin-top: 100px;
}
.content {
    padding: 10px 20px;
    color: #aaa;
    margin-bottom: 120px;
}
.content i {
    height: 80px;
    line-height: 80px;
    font-size: 26px;
    padding-left: 20px;
    box-sizing: border-box;
}
.content .mint-cell {
    margin: 10px 0;
    height: 80px;
    border: 1px solid #ddd;
}
.content .mint-cell >>> .mint-cell-wrapper {
    font-size: 26px;
}
.content .mint-cell >>> .mint-cell-value {
    padding-left: 30%;
    height: 100%;
    font-size: 26px;
}
.content .mint-cell >>> .mint-cell-value input::-webkit-input-placeholder {
    color: #aaa;
}
.content .mint-cell >>> .mint-cell-value input::-ms-input-placeholder {
    color: #aaa;
}
.content .mint-cell >>> .mint-cell-value input::-moz-placeholder {
    color: #aaa;
}
.content .mint-cell >>> .mint-field-other {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: baseline;
    width: 30%;
    height: 100%;
    line-height: 72px;
    font-size: 26px;
}
.content .mint-cell >>> .mint-field-other i {
    height: auto;
    line-height: 1;
    font-size: 30px;
    vertical-align: text-bottom;
}
.content .mint-cell >>> .mint-field-other span {
    vertical-align: text-bottom;
}
.content .mint-cell >>> .mint-field-other .icon-mimaxianshi {
    line-height: 80px;
}
.content .mint-cell >>> .mintui-field-error {
    position: absolute;
    right: 10px;
    top: 26px;
}
.content .mint-cell >>> .mint-field-other .icon-mimaxianshi {
    position: absolute;
    top: -10%;
    left: 275%;
    font-size: 40px;
}

/* 验证码 */
.content .last {
    margin: 0;
    padding: 0;
}
.lastinput {
    float: left;
    width: 65%;
}
.content .lastinput >>> .mint-field-other {
    width: 40%;
}
.content .lastinput >>> .mint-cell-value {
    padding-left: 40%;
}

.last img{
    padding: 10px;
    width: 30%;
    height: 80px;
}

.content .btn {
    float: none;
    width: 100%;
    margin: 20px auto;
    height: 70px;
    background-color: #ccb07e;
    color: #fff;
    border-radius: 10px;
}

/* 显示密码 */
.icon-mimaxianshi {
    position: absolute;
    top: 15%;
    right: 0;
}

/* 内容 结束 */
</style>

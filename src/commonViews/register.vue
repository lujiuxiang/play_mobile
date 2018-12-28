<template>
    <div class="register">
        <!-- 头部 开始 -->
        <div class="title">
            <router-link class="iconfont icon-left-arrow" to="" @click.native="goBack"></router-link>
            <!-- 空标签用来占位 -->
            <span></span>
            <span></span>
            <span class="img">
                <img src="../../static/images/index/titleLogo.png" alt="">
            </span>
            <span>
                <router-link to="my">登录</router-link>
            </span>
            <span>
                <router-link to="register" class="reg">注册</router-link>
            </span>
        </div>
        <!-- 头部 结束 -->

        <div class="titleimg">
            <img src="../../static/images/safe/titleimg.jpg" width="100%" height="100%" alt="">
        </div>

        <!-- 内容 开始 -->
        <div class="content">
            <mt-field placeholder="请输入介绍人或不输入" ref="presenter" :value='introducer' :state="state0">
                <i class="iconfont icon-wode"></i>介绍人：
            </mt-field>
            <mt-field class="regInput" placeholder="字母开头的6-12位字母或数字组合" :state="state1">
                <i class="iconfont icon-xiaotuziCduan-"></i>账号：
            </mt-field>
            <mt-field class="regInput" placeholder="6-12位英文字母或数字组合" type="password" :state="state2">
                <i class="iconfont icon-mima"></i>密码：
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </mt-field>
            <mt-field class="regInput" placeholder="与填写密码一致" type="password" :state="state3">
                <i class="iconfont icon-mima"></i>确认密码：
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </mt-field>
            <mt-field class="regInput" placeholder="请输入真实姓名" type="text" :state="state4">
                <i class="iconfont icon-wode"></i>真实姓名：
            </mt-field>
            <mt-field class="regInput" placeholder="请输入四位数字的取款密码" type="tel" :state="state5">
                <i class="iconfont icon-mima"></i>取款密码：
                <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
            </mt-field>
            <mt-field class="regInput" placeholder="请输入QQ号码" type="tel" :state="state6">
                <i class="iconfont icon-qq"></i>QQ账号：
            </mt-field>
            <mt-field class="regInput" placeholder="请输入电子邮箱" type="text" :state="state7">
                <i class="iconfont icon-touzhujilu"></i>电子邮箱：
            </mt-field>
            <mt-field class="regInput" placeholder="请输入微信号" type="text" :state="state8">
                <i class="iconfont icon-xiaoxi"></i>微信：
            </mt-field>
            <mt-field class="regInput" placeholder="请输入手机号" type="tel" :state="state9">
                <i class="iconfont icon-shouji"></i>手机号：
            </mt-field>
            <div class="clearfix last">
                <mt-field class="regInput lastinput" placeholder="四位验证码" type="tel" :state="state10">
                    <i class="iconfont icon-mima"></i>验证码：
                </mt-field>
                <img id="imageId" :src="yzmsrc" @click="yzmShow" alt="( 点选此处产生新验证码 )" align="absmiddle">
            </div>
            <div>
                <input type="checkbox" id="check" ref="checkbox" class="regInput">
                <label for="check">
                    我同意用户协议
                </label>
                <em @click="changepopupShow">用户协议</em>
            </div>
            <div class="btnWrap">
                <mt-button ref="submit" @click="goSubmit" class="btn" type="default">注册</mt-button>
            </div>
        </div>
        <!-- 内容 结束 -->

        <!-- 开户协议弹窗 开始 -->
        <div class="popup">
            <mt-popup v-model="popupShow" position="left" lockScroll="true">
                <ul class="pop">
                    <li class="tips">
                        用户协议
                    </li>
                    <li class="popcontent">
                        <p>1、本公司只接受年龄已满18岁的客户申请，同时我们保留客户提供其年龄证明的权利。</p>
                        <p>2、在公司进行注册时所提供的全部信息必须准确无误，在使用借记卡或信用卡时，持卡人的姓名必须与在网站上注册时的一致</p>
                        <p>3、在开户后进行一次有效存款，即成为本公司永久有效会员！</p>
                        <p>4、成为本站有效会员后，客户可随时通过电邮、联系在线客服、或在本公司站点上留言、联系客服等方式，随时向本公司提供最新的个人资料。</p>
                        <p>5、本公司如发现个别会员有重复申请账号行为时，本公司有权将这些账户视为一个联合账户。本公司保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。本公司系统严格要求玩家、住址、电邮、电话号码、支付卡/信用卡均为唯一性，任何共享计算机环境 (例如:网吧、其他公共用计算机等)只能够拥有一个会员账号，各项优惠只适用于每位客户在本公司站点唯一的账户。</p>
                        <p>6、本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、投注，均为会员个人行为，本公司不负责、承担任何相关联带责任。</p>
                        <p>7、无论是个人或是团体，如有任何威胁、滥用本公司优惠的行为，本公司将保留权利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。</p>
                        <p>8、所有本公司游戏娱乐站点的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。</p>
                        <p>9、客户一经注册开户，将被视为接受所有颁布在本以公司互联网投注网站上的规则与条例。 并以各种方式辨别客户是否符合资格享有我们的任何优惠。</p>
                        <i>本公司是使用东方集团所提供的在线娱乐软件，如发现个别会员在同系统的多个娱乐城上开设多个会员账户，并进行套利下注,经核实后,本公司将冻结参与的会员账号并将所有下注盈利取消！</i>
                    </li>
                    <li class="btn">
                        <mt-button type="default" @click="changepopupShow">确认</mt-button>
                    </li>
                </ul>
            </mt-popup>
        </div>
        <!-- 开户协议弹窗 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { Popup } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "register",
    data() {
        return {
        	introducer:"", //介绍人
            // 开户协议弹窗
            popupShow: false,
            // 介绍人
            state0: "",
            Isval0: true,
            // 账号是否可使用及是否符合规则
            Isval1: false,
            state1: "",
            // 密码是否可使用及是否符合规则
            Isval2: false,
            state2: "",
            // 确认密码是否正确
            Isval3: false,
            state3: "",
            // 真实姓名是否输入
            Isval4: false,
            state4: "",
            // 取款密码是否正确
            Isval5: false,
            state5: "",
            // QQ账号是否正确
            Isval6: true,
            state6: "",
            // 电子邮箱是否正确
            Isval7: true,
            state7: "",
            //微信账号是否正确
            Isval8: true,
            state8: "",
            // 手机号是否正确
            Isval9: false,
            state9: "",
            // 验证码是否正确
            Isval10: false,
            state10: "",
            // 是否同意用户协议
            Isval11: false,

            // 验证码
            yzmsrc: ""
        };
    },
    components: {
        commonfooter
    },
    methods: {
        //   开户协议 显示/隐藏
        changepopupShow() {
            this.popupShow = !this.popupShow;
        },
        //   验证码
        yzmShow() {
            let random = Math.floor(Math.random() * 10000);
            let yzm = "http://148.72.206.211:803/index/yzm/index?id=" + random;
            this.yzmsrc = yzm;
            window.sessionStorage.setItem("yzm", random);
        },
        //   注册的正则判断
        regPass() {
            let that = this;
            let regInput = document.getElementsByClassName("mint-field-core");

            // 介绍人
            regInput[0].onblur = function() {
                let val0 = this.value;
                if (val0 == "") {
                    that.state0 = "success";
                    that.Isval0 = true;
                    return
                }
                that.$post("index/user/isuser",{
                    user: val0
                }).that(res=>{
                    if (res == 1) {
                        alert(
                            "介绍人不存在，请重新输入！（无介绍人也可注册！）"
                        );
                        that.state0 = "error";
                        that.Isval0 = false;
                        return false;
                    } else if (res == 2) {
                        that.state0 = "success";
                        that.Isval0 = true;
                        return true;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            };
            // 账号
            regInput[1].onblur = function() {
                let val1 = this.value;
                let reg = /^[A-Za-z]{1}[A-Za-z0-9]{5,12}/;

                that.$post("index/user/isuser",{
                    user: val1
                }).then(res=>{
                    if (
                        !reg.test(val1) ||
                        val1.length < 6 ||
                        val1.length > 12
                    ) {
                        that.state1 = "error";
                        that.Isval1 = false;
                        return false;
                    } else if (res == 2) {
                        that.state1 = "error";
                        alert("用户名已被注册！");
                        that.Isval1 = false;
                        return false;
                    } else {
                        that.state1 = "success";
                        that.Isval1 = true;
                        return true;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            };
            // 密码
            regInput[2].onblur = function() {
                let val2 = this.value;
                let reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                if (val2.length < 6) {
                    that.state2 = "error";
                    that.Isval2 = false;
                    return false;
                } else if (!reg2.test(val2) || val2.length > 12) {
                    that.state2 = "error";
                    that.Isval2 = false;
                    return false;
                } else {
                    that.state2 = "success";
                    that.Isval2 = true;
                    return true;
                }
            };
            // 确认密码
            regInput[3].onblur = function() {
                let val2 = regInput[2].value;
                let val3 = this.value;
                if (val3 !== val2) {
                    that.state3 = "error";
                    that.Isval3 = false;
                    return false;
                } else {
                    that.state3 = "success";
                    that.Isval3 = true;
                    return true;
                }
            };

            // 真实姓名
            regInput[4].onblur = function() {
                let val4 = this.value;
                let reg4 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
                if (!reg4.test(val4)) {
                    that.state4 = "error";
                    that.Isval4 = false;
                    return false;
                } else {
                    that.state4 = "success";
                    that.Isval4 = true;
                    return true;
                }
            };
            // 取款密码
            regInput[5].onblur = function() {
                let val5 = this.value;
                let reg5 = /^\d{4}$/;
                if (!reg5.test(val5)) {
                    that.state5 = "error";
                    that.Isval5 = false;
                    return false;
                } else {
                    that.state5 = "success";
                    that.Isval5 = true;
                    return true;
                }
            };
            // QQ账号
            regInput[6].onblur = function() {
                let val6 = this.value;
                let reg6 = /^[1-9][0-9]{4,11}$/;
                if(val6.trim() == ""){
                    that.state6 = "success";
                    return true;
                }else if (!reg6.test(val6)) {
                    that.Isval6 = false;
                    that.state6 = "error";
                    return false;
                } else {
                    that.state6 = "success";
                    return true;
                }
            };
            // 电子邮箱
            regInput[7].onblur = function() {
                let val7 = this.value;
                let reg7 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(val7.trim() == ""){
                    that.state7 = "success";
                    return true;
                }else if (!reg7.test(val7)) {
                    that.Isval7 = false;
                    that.state7 = "error";
                    return false;
                } else {
                    that.state7 = "success";
                    return true;
                }
            };
            // 微信账号
            regInput[8].onblur = function() {
                let val8 = this.value;
                let reg8 = /^[a-zA-Z0-9]([-_a-zA-Z0-9]{5,19})+$/;
                if(val8.trim() == ""){
                    that.state8 = "success";
                    return true;
                }else if (!reg8.test(val8)) {
                    that.Isval8 = false;
                    that.state8 = "error";
                    return false;
                } else {
                    that.state8 = "success";
                    return true;
                }
            };
            // 手机账号
            regInput[9].onblur = function() {
                let val9 = this.value;
                let reg9 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if (!reg9.test(val9)) {
                    that.state9 = "error";
                    that.Isval9 = false;
                    return false;
                } else {
                    that.state9 = "success";
                    that.Isval9 = true;
                    return true;
                }
            };
            // 验证码
            regInput[10].onblur = function() {
                let val10 = this.value;
                let nowyzm = window.sessionStorage.getItem("yzm");
                if (val10 == "" || val10 != nowyzm) {
                    that.state10 = "error";
                    that.Isval10 = false;
                    return false;
                } else {
                    that.state10 = "success";
                    that.Isval10 = true;
                    return true;
                }
            };

            // checkbox
            let checkbox = this.$refs.checkbox;
            let num = 0;
            checkbox.onclick = function() {
                num++;
                if (num % 2 == 1) {
                    that.Isval11 = true;
                } else {
                    that.Isval11 = false;
                }
            };
        },
        //   注册的提交按钮
        goSubmit() {
            let that = this,
                regInput = document.getElementsByClassName("mint-field-core"),
                parentname = regInput[0].value, //介绍人
                user = regInput[1].value, //账户
                pass = regInput[2].value, //密码
                realname = regInput[4].value, //真实姓名
                qkpass = regInput[5].value, //取款密码
                qq = regInput[6].value, //qq
                email = regInput[7].value, //email
                wx = regInput[8].value, //wx
                phone = regInput[9].value, //手机
                yzm = regInput[10].value; //验证码
            // 如果表单的正则都判断成功 则可以提交
            if (
                this.Isval0 &&
                this.Isval1 &&
                this.Isval2 &&
                this.Isval3 &&
                this.Isval4 &&
                this.Isval5 &&
                this.Isval6 &&
                this.Isval7 &&
                this.Isval8 &&
                this.Isval9 &&
                this.Isval10 &&
                this.Isval11
            ) {
                this.submit = true;

                // axios 请求
                that.$post("index/user/memberAdd",{
                    parentname: parentname,
                    user: user,
                    pass: pass,
                    realname: realname,
                    phone: phone,
                    qkpass: qkpass,
                    qq: qq,
                    email: email,
                    wx: wx
                }).then(res=>{
                    if (data == 1) {
                        alert("恭喜您注册成功！");
                        // axios 登录
                        that.$post("index/user/userLogin",{
                            user: user,
                            pass: pass
                        }).then(res=>{
                            if (res) {
                                if (res != 2) {
                                    window.sessionStorage.setItem("login_user",res.sessionid); //存储登录的用户名的sessionid
                                    window.sessionStorage.setItem("username",res.username); //存储登录的用户名
                                    window.sessionStorage.removeItem("usertype"); //清除试玩账号的usertype
                                    that.$router.push({ path: "/" });
                                } else {
                                    window.alert(
                                        "账户已被禁用！请联系管理员！"
                                    );
                                }
                            } else {
                                window.alert(
                                    "用户名或密码不正确，请重新输入！"
                                );
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else if(data == -1){
                        alert("当前ip今日注册已达到上限！")
                    } else if (data == 2) {
                        alert("用户名已存在，请重新输入！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                window.alert("请检查是否有错误的选项！");
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
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
        // 进入页面时 如果有？id= xxx  说明是推荐好友进入的页面 所以自动把推荐人填写上去
        let url = window.location.href;//进入网页的地址
        //获取？之后的内容
        if (url.indexOf("?") != -1) {
            // 把url按照？之后切割成数组，？之后的内容成为数组第一项，然后获取
            let strs = url.split("?")[1];
            // 把获取到的 id=xxx 按照=切割 获取=之后的内容 就是用户名
            this.introducer = strs.split("=")[1]
        }
    },
    mounted() {
    	//如果 进入页面时 介绍人不为空  则介绍人不能被编辑
        if(this.introducer != ''){
            this.$refs.presenter.$el.children[1].children[1].children[0].setAttribute("disabled",true)
            this.$refs.presenter.$el.children[1].children[1].children[0].style.backgroundColor = '#fff'
            this.state0 = 'success'
        }
        // 验证码
        let random = Math.floor(Math.random() * 10000);
        this.yzmsrc = "http://148.72.206.211:803/index/yzm/index?id=" + random;
        window.sessionStorage.setItem("yzm", random);
        this.regPass();
    },
    activated() {
        // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
        if(this.popupShow == true){
            this.common.afterOpen();
        }else{
            this.common.beforeClose();
        }
    },
    watch:{
        popupShow(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        }
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
    font-size: 40px;
    color: #fff;
    line-height: 100px;
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
    line-height: 70px;
    font-size: 26px;
    padding-left: 20px;
    box-sizing: border-box;
}
.content .mint-cell {
    margin: 10px 0;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
}
.content .mint-cell >>> .mint-cell-wrapper {
    font-size: 26px;
}
.content .mint-cell >>> .mint-cell-value {
    padding-left: 30%;
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
    left: 0;
    align-items: baseline;
    width: 30%;
}
.content .mint-cell >>> .mint-field-other i {
    font-size: 36px;
    padding-right: 5px;
}
.content .mint-cell >>> .mint-field-other .icon-mimaxianshi {
    position: absolute;
    right: -208%;
    top: -6%;
    line-height: 80px;
    font-size: 40px;
}

.clearfix > img {
    margin: 20px 0 0 30px;
}

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
.content .last button {
    float: left;
    margin: 10px;
    width: 32%;
    height: 80px;
    background-color: #ccb07e;
    color: #fff;
}

.content div {
    padding-left: 10px;
    margin: 30px 0;
}
.content label {
    vertical-align: middle;
}
.content em {
    vertical-align: middle;
    font-size: 24px;
    color: #ccb07e;
    font-style: normal;
}
.content div input {
    vertical-align: middle;
}
.content .btnWrap {
    text-align: center;
}
.content .btn {
    float: none;
    width: 80%;
    margin: 0 auto;
    height: 70px;
    background-color: #ccb07e;
    color: #fff;
    border-radius: 15px;
}
.content .mint-field .mint-cell-title {
    width: 20%;
    flex: 1;
}
/* 内容 结束 */

/* 开户协议弹窗 */
.mint-popup {
    margin-left: 10%;
    width: 80%;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
}
.pop .tips {
    padding: 20px 0;
    text-align: center;
    background-color: #ddd;
    font-size: 26px;
}
.pop h3 {
    padding: 10px 0 20px 0;
    font-size: 40px;
    text-align: center;
    color: #ba9e6d;
}
.pop p {
    padding: 10px 0;
    text-indent: 20px;
    line-height: 1.6;
    font-size: 30px;
}
.pop li:nth-of-type(4) p {
    color: #944d9a;
}
.pop li:nth-of-type(5) p {
    color: #b0c71f;
}
.pop .btn {
    text-align: center;
}
.pop .btn button {
    margin: 30px 0 40px 0;
    width: 70%;
    height: 60px;
    border-radius: 10px;
    color: #fff;
    background-color: #ba9e6d;
}

.popcontent {
    border: 1px solid #ddd;/*no*/
    padding: 20px;
    border-radius: 10px;
    height: 600px;
    overflow-y: scroll;
}
.popcontent p {
    font-size: 26px;
}
.popcontent i {
    margin-top: 30px;
    color: red;
    text-indent: 20px;
    font-size: 24px;
}
</style>

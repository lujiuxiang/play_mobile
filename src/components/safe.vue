<template>
    <div class="register">
        <!-- 头部 开始 -->
        <div class="title">
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
            <span>安全中心</span>
        </div>
        <!-- 头部 结束 -->
        <div class="titleimg">
            <img src="../../static/images/safe/titleimg.jpg" width="100%" height="100%" alt="">
        </div>

        <!-- 内容 开始 -->
        <div class="content">
            <ul>
                <li>
                    <i class="iconfont icon-xiaotuziCduan-"></i>
                    <span>会员账号：</span>
                    {{user}}
                </li>
                <li>
                    <i class="iconfont icon-wode"></i>
                    <span>真实姓名：</span>
                    {{realname}}
                </li>
                <li>
                    <i class="iconfont icon-yinxingqia"></i>
                    <router-link to="bank">点击绑定银行卡</router-link>
                </li>
                <!-- 银行卡页面 -->
                <li v-for="(newitem,newindex) in bankList" :key="'bank'+newindex">
                    <i class="iconfont icon-yinxingqia"></i>
                    <router-link to="">{{newitem.bankcard}}</router-link>
                    <!-- 判断 是否银行卡的参数有type为1的字段 有就是默认银行卡-->
                    <span class="bankDefault" v-if="newitem.typed == '1'">
                        <i class="moren"></i>
                        <b>默认</b>
                    </span>
                    <!-- 判断 是否银行卡的参数有type为1的字段 没有就不是默认银行卡 -->
                    <span v-else class="bankDefault" @click="changeBankDefault(newitem.id)">
                        <i></i>
                        <b>设为默认</b>
                    </span>
                </li>
                <!-- 支付宝 手机号码 QQ -->
                <li v-for="(item,index) in binging" :key="index">
                    <i :class="item.icon"></i>
                    <input type="text" ref="newList" :placeholder="item.title">
                    <mt-button class="red" type="default" @click="bingingList($event,1,item.ck,index)">绑定</mt-button>
                </li>
            </ul>
            <p class="tips"> ※ 1.银行卡只能绑定三张且不可自行解绑，如需增/删，请联系客服！</p>
            <p class="tips"> ※ 2.其他用户信息一旦绑定不可自行解绑，需联系客服，请仔细核对是否正确！</p>
            <p class="tips"> ※ 3.手机号码必须和银行卡预留号码一致，否则无法绑定银行卡！</p>

        </div>
        <!-- 内容 结束 -->

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "safe",
    data() {
        return {
            // 会员账号
            user: "",
            realname: "",
            bankList: [],
            binging: [
                {
                    icon: "iconfont icon-zhifubao",
                    title: "请输入支付宝账号",
                    ck: "alipaynum"
                },
                {
                    icon: "iconfont icon-shouji",
                    title: "请输入联系电话",
                    ck: "phone"
                },
                {
                    icon: "iconfont icon-qq",
                    title: "请输入QQ",
                    ck: "qq"
                },
                {
                    icon: "iconfont icon-xiaoxi",
                    title: "请输入微信号",
                    ck: "wx"
                },
            ]
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
        // 改变默认银行卡
        changeBankDefault(id) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let r = confirm("确定要把此银行卡更改为默认银行卡？");
            if (r == true) {
                // axios 请求
                that.$post("index/user/updateUser",{
                    user: user,
                    id: id,
                    typed: "3",
                    ck: "typed",
                    cv: "1"
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res === 1) {
                        Toast("更改成功");
                        that.requestData();
                    } else {
                        Toast("更改失败");
                    }
                }).catch(err=>{
                    console.log(err);
                    Toast("更改失败");
                })
            }
        },
        // 绑定事件、 解绑事件
        bingingList(event, typed, ck, index, id) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let e = event.currentTarget.parentNode.children[1]; //当前点击所在的input
            let cv = e.value; //input的内容

            // 银行卡对应的父级li
            // let eBank = event.currentTarget.parentNode

            // 银行卡解绑
            /* if(ck == "bank"){
                    ck = "bankcard"
                    // 是否确定解绑
                    MessageBox.confirm('确定解绑?').then(action => { 
                        if (action == 'confirm') {   
                            $.ajax({
                                url: 'http://148.72.206.211:803/index/user/updateUser',
                                type: 'post',
                                data: {
                                    "user": user,
                                    "ck": ck,
                                    "cv": id
                                },
                                success: function (data) {
                                    data = JSON.parse(data)
                                    if(data == 0){
                                        // 失败
                                        Toast('解绑失败！')
                                    }else if(data  == 1){
                                        Toast('解绑成功！')
                                        eBank.style.display = "none";
                                    }
                                    Indicator.close();
                                },
                                error: function (data) {
                                    console.log(data);
                                    Indicator.close();
                                }
                            });
                        }
                    }).catch(err => {   //取消的回调

                    });
                    return
                } */

            // 支付宝 手机 QQ验证正则
            if (index == 0) {
                let reg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
                if (!reg.test(e.value)) {
                    alert("您输入的账号不符合要求，请重新检查输入！");
                    return;
                }
            } else if (index == 1) {
                let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,2,3,5,6,7,8])|(19[7]))\d{8}$/;
                if (!reg.test(e.value)) {
                    alert("手机号格式有误，请重新检查输入！");
                    return;
                }
            } else if (index == 2) {
                let reg = /^[1-9]\d{4,10}$/;
                if (!reg.test(e.value)) {
                    alert("QQ号格式有误，请重新检查输入！");
                    return;
                }
            }

            // 1是绑定
            if (typed == 1) {
                that.$post("index/user/updateUser",{
                    user: user,
                    typed: typed,
                    ck: ck,
                    cv: cv
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res == 0) {
                        // 失败
                        Toast("绑定失败！");
                    } else if (res == 1) {
                        Toast("绑定成功！");
                        e.setAttribute("disabled", true);
                    }
                    Indicator.close();
                }).catch(err=>{
                    console.log(err);
                    Indicator.close();
                })
            }
            /* else if(typed == 2){
                    // 是否有绑定值 没有无法解绑
                    if(!e.disabled){
                        alert("当前没有绑定，无法解绑！")
                        return
                    }
                    // 是否确定解绑
                    MessageBox.confirm('确定解绑?').then(action => { 
                        if (action == 'confirm') {   
                            $.ajax({
                                url: 'http://148.72.206.211:803/index/user/updateUser',
                                type: 'post',
                                data: {
                                    "user": user,
                                    "typed": typed,
                                    "ck": ck,
                                    "cv": cv
                                },
                                success: function (data) {
                                    data = JSON.parse(data)
                                    if(data == 0){
                                        // 失败
                                        Toast('解绑失败！')
                                    }else if(data  == 1){
                                        Toast('解绑成功！')
                                        e.value = ""
                                        e.removeAttribute("disabled")
                                    }else if(data == 2){
                                        alert("此银行卡已绑定账户！")
                                        return
                                    }
                                    Indicator.close();
                                },
                                error: function (data) {
                                    console.log(data);
                                    Indicator.close();
                                }
                            });
                        }
                    }).catch(err => {   //取消的回调

                    });
                   
                } */
        },
        // 默认请求页面所有的参数
        requestData() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user"); //sessionid
            this.user = window.sessionStorage.getItem("username"); //登录账号
            Indicator.open("加载中...");
            that.$get("index/user/updateUser",{
                user: user
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                that.realname = res.realname; //真实姓名
                that.bankList = res.bankcard; //银行卡
                that.bankList.forEach((item, index) => {
                    var reg = /^(\d{4})\d+(\d{4})$/;
                    item.bankcard = item.bankcard.replace(reg, "$1****$2");
                });

                // 开始渲染
                let newList = that.$refs.newList; //获取支付宝 电话 QQ的输入框
                newList[0].value = res.alipaynum ? res.alipaynum : ""; //支付宝
                newList[1].value = res.phone ? res.phone : ""; //手机号
                newList[2].value = res.qq ? res.qq : ""; //QQ
                newList[3].value = res.wx ? res.wx : ""; //微信

                if (newList[0].value) {
                    // input有内容时，自身不可编辑，并且绑定按钮隐藏
                    newList[0].setAttribute("disabled", true);
                    newList[0].parentNode.children[2].style.display =
                        "none";
                }
                if (newList[1].value) {
                    // input有内容时，自身不可编辑，并且绑定按钮隐藏
                    newList[1].setAttribute("disabled", true);
                    newList[1].parentNode.children[2].style.display =
                        "none";
                }
                if (newList[2].value) {
                    // input有内容时，自身不可编辑，并且绑定按钮隐藏
                    newList[2].setAttribute("disabled", true);
                    newList[2].parentNode.children[2].style.display =
                        "none";
                }
                if (newList[3].value) {
                    // input有内容时，自身不可编辑，并且绑定按钮隐藏
                    newList[3].setAttribute("disabled", true);
                    newList[3].parentNode.children[2].style.display =
                        "none";
                }
                Indicator.close();
            }).catch(err=>{
                console.log(err);
                Indicator.close();
            })
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
        // 默认请求页面所有的参数
        this.requestData();
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
.title i {
    position: absolute;
    left: 30px;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
    z-index: 99;
}
.title span {
    font-size: 36px;
    color: #fff;
    line-height: 100px;
    text-align: center;
}

/* 顶部回退框 */
.titleimg {
    margin-top: 100px;
}
/* 内容 开始 */
.content {
    padding: 20px;
    color: #000;
    margin-bottom: 100px;
}
ul li {
    display: flex;
    align-items: center;
    margin: 20px 0;
    height: 80px;
    border: 1px solid #ddd;
}
ul li i {
    padding: 0 10px;
    font-size: 34px;
}
ul li input {
    border: none;
    outline: none;
    width: 75%;
    height: 92%;
}
ul li a {
    display: inline-block;
    width: 65%;
    height: 80px;
    line-height: 80px;
}
ul li button {
    margin: 0 5px;
    color: #000;
}
.red {
    color: #fff;
    background-color: red;
}

input:disabled {
    background-color: #fff;
}
.tips {
    color: red;
    text-align: left;
}
/* 设置默认银行卡 */
.bankDefault {
    position: relative;
    z-index: 999;
    text-indent: 30px;
}
.bankDefault i {
    display: inline-block;
    margin-right: 4px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid #ccb07e;/*no*/
    vertical-align: middle;
}
.bankDefault b {
    vertical-align: middle;
    font-weight: normal;
}
.moren {
    background-color: #ccb07e;
}
/* 内容 结束 */
</style>

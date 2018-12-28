<template>
    <div class="withdrawMoney">
        <div v-if="loginActive">
            <!-- 头部 开始 -->
            <div class="title">
                <span>提现</span>
                <i @click="goBack" class="iconfont icon-left-arrow"></i>
            </div>
            <!-- 头部 结束 -->

            <!-- 内容 开始 -->
            <div class="content">
                <div class="Money">
                    <div class="m-top">
                        <p>提现到：</p>
                        <div class="t-bot">
                            <!-- 支付宝 -->
                            <div>
                                <input type="radio" name="pay" id="zhifubao">
                                <label for="zhifubao">
                                    <img src="../../static/images/topUp/zhifubao.png" alt="">
                                    <p>
                                        <span style="display:block;">{{zfb}}</span>
                                        <i>24小时内到账</i>
                                    </p>
                                </label>
                            </div>
                            <!-- 微信 -->
                            <!-- <div>
                                <input type="radio" name="pay" id="weixin">
                                <label for="weixin">
                                    <img src="../../static/images/topUp/weixin.png" alt="">
                                    <p>
                                        <span style="display:block;">{{zfb}}</span>
                                        <i>24小时内到账</i>
                                    </p>
                                </label>
                            </div> -->
                            <!-- 银行卡 -->
                            <div class="bankcardWrap" v-for="(item,index) in bankList" :key="index" v-if="item.typed == 1">
                                <label @click="bankListShow">
                                    <img src="../../static/images/topUp/yinlian.png" alt="">
                                    <p>
                                        <span ref="bankMoren" style="display:block;">{{item.bankcard}}</span>
                                        <i>24小时内到账</i>
                                    </p>
                                    <i class="iconfont icon-youjiantou"></i>
                                </label>
                            </div>
                        </div>
                        <mt-popup class="bankListAvtive t-bot" v-model="bankActive" popup-transition="popup-fade">
                            <div v-for="(item,index) in bankList" :key="index">
                                <input type="radio" name="pay" :id="'bank'+index">
                                <label :for="'bank'+index" @click="bankListChange(item.bankcard)">
                                    <img src="../../static/images/topUp/yinlian.png" alt="">
                                    <p>
                                        <span style="display:block;">{{item.bankcard}}</span>
                                        <i>24小时内到账</i>
                                    </p>
                                    <p v-if="item.typed == 1">(默认)</p>
                                </label>
                            </div>
                        </mt-popup>

                        <p>提现金额：</p>
                        <div>
                            <input type="tel" ref="input" @input="changeMoney" placeholder="请输入提现金额">
                        </div>
                        <div class="eyes">
                            <input type="password" ref="inputpass" placeholder="请输入取款密码">
                            <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
                        </div>

                    </div>
                    <div class="m-bot">
                        <p>
                            当前余额：
                            <span ref="balance">{{money.balance}}</span>元
                            <i @click="allWithdrawal">全部提现</i>
                        </p>
                        <p>手续费：
                            <span>{{money.service}}</span>元</p>
                        <!-- <p>行政费：<span>{{money.admin}}</span>元</p>
                        <p>扣除存款优惠费：<span>{{money.discounts}}</span>元</p> -->
                        <p>实际到账：
                            <span>{{money.practical}}</span>元</p>
                        <mt-button type="default" @click="gosubmit">确认</mt-button>
                    </div>
                </div>
            </div>
            <!-- 内容 结束 -->
        </div>

        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { Indicator ,MessageBox} from "mint-ui";
import login from "./../commonViews/login.vue";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "withdrawMone",
    data() {
        return {
            // 支付宝账号
            zfb: "",
            money: {
                balance: "100",
                service: "0",
                // admin:'0',
                // discounts:'0',
                practical: "0"
            },
            loginActive: "true",
            free: "",
            // 银行卡列表
            bankList: [],
            // 银行卡列表的显示与隐藏
            bankActive: false
        };
    },
    components: {
        commonfooter,
        login
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 银行卡列表显示
        bankListShow() {
            this.bankActive = !this.bankActive;
        },
        // 点击改变提现的银行卡
        bankListChange(bankcard) {
            // 获取外层显示的 银行卡号的span
            let bankMoren = this.$refs.bankMoren[0];
            // 把当前点击的银行卡号赋值给外层的银行卡span
            bankMoren.innerHTML = bankcard;
            // 银行卡列表隐藏
            this.bankListShow();
        },
        // 全部提现
        allWithdrawal() {
            //   获取提现的输入框
            let input = this.$refs.input;
            //   获取全部余额
            let balance = this.$refs.balance;
            // 提现的内容 = 全部余额的内容
            input.value = balance.innerHTML;
            // 手续费和实际到账
            this.money.service = parseFloat(input.value * this.free).toFixed(2); //手续费 = 输入的金额 x 倍率
            this.money.practical = parseFloat(
                input.value - this.money.service
            ).toFixed(2); //到账金额 = 输入的金额 - 手续费
        },
        // 点击显示密码/隐藏密码
        passShow(event) {
            let e = event.currentTarget;
            let pass = e.parentNode.children[0];
            if (pass.getAttribute("type") == "password") {
                pass.setAttribute("type", "text");
            } else {
                pass.setAttribute("type", "password");
            }
        },
        //   提现
        gosubmit() {
            // 获取input radio的所有集合
            let that = this;
            let name = document.getElementsByName("pay");
            let user = window.sessionStorage.getItem("login_user"); //用户名
            let zfb = this.alipaynum; //账户
            let money = this.$refs.input.value; //输入金额框
            let pass = this.$refs.inputpass.value; //取款密码
            let pay;
            for (let i = 0; i < name.length; i++) {
                if (name[i].checked == true) {
                    pay = name[i].id;
                }
            }
            if (pay) {
                // 如果所有的值都存在 且不为0 则可以提交
                if (money && money > 0 && pass) {
                    that.$post("Person/index/putForwardAdd",{
                        user: user,
                        pass: pass
                    }).then(res=>{
                        // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                        if (res == -1 || res == -2) {
                            that.common.isOnline(that, res);
                            return;
                        }
                        if (res == 0) {
                            alert("取款密码错误，请重新输入！");
                            return;
                        }
                        // 查看流水 提醒用户
                        that.$post("index/user/tixian",{
                            user: user,
                            money: money
                        }).then(res_2=>{
                            // 弹出手续费信息
                                if(res_2.code != 1){
                                    let next = window.confirm(res_2.mess);
                                    if(next === true){
                                        that.$post("public/alipay/pagepay/zz.php",{
                                            user: user,
                                            money : money,
                                            zh: zfb,
                                            pass: pass,
                                            ip: res_2.ip,
                                            free: res_2.free
                                        }).then(res_3=>{
                                            alert(res_3);
                                        }).catch(err=>{
                                            alert("提现成功")
                                        })
                                    }
                                }else{
                                    that.$post("public/alipay/pagepay/zz.php",{
                                            user: user,
                                            money : money,
                                            zh: zfb,
                                            pass: pass,
                                            ip: res_2.ip,
                                            free: res_2.free
                                        }).then(res_3=>{
                                            alert(res_3);
                                        }).catch(err=>{
                                            alert("提现成功")
                                        })
                                }
                        }).catch(err=>{
                            console.log(err);
                        })

                        
                    }).catch(err=>{
                        console.log(err);
                    })
                } else {
                    MessageBox("提示", "金额或密码有误，请重新输入！");
                    return;
                }
            } else {
                MessageBox("提示", "提现平台有误，请重新选择！");
                return;
            }
        },
        // 提现金额改变 手续费与到账金额改变
        changeMoney() {
            //   获取全部余额
            let balance = this.$refs.balance;
            let input = this.$refs.input; //获取输入金额的input
            // 如果输入的金额 大于 总余额
            if (parseFloat(input.value) > parseFloat(balance.innerHTML)) {
                alert("余额不足！");
                input.value = "";
            }

            this.money.service = parseFloat(input.value * this.free).toFixed(2); //手续费 = 输入的金额 x 倍率
            this.money.practical = parseFloat(
                input.value - this.money.service
            ).toFixed(2); //到账金额 = 输入的金额 - 手续费
        },
        // 默认请求页面所有的参数
        bankListData() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            this.user = user;
            Indicator.open("加载中...");

            that.$get("index/user/updateUser",{
                user: user
            }).then(res=>{
                // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                that.bankList = res.bankcard; //银行卡
                that.bankList.forEach((item, index) => {
                    let bankname = that.bank.bankCardAttribution(
                        item.bankcard
                    ).bankName;

                    var reg = /^(\d{4})\d+(\d{4})$/;
                    item.bankcard = item.bankcard.replace(reg, "$1****$2");
                });
                Indicator.close();
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created() {
        let that = this;
        this.common.noData(that);
        if (window.sessionStorage.getItem("login_user")) {
            let user = window.sessionStorage.getItem("login_user");
            this.loginActive = true;
        } else {
            MessageBox.confirm("请登录之后进行此操作！",'提示',{
            	closeOnClickModal:false
            })
                .then(action => {
                    if (action == "confirm") {
                        //确认的回调
                        this.$router.push({ path: "/my" }); //点击确定跳转到登录的路由
                    }
                })
                .catch(err => {
                    if (err == "cancel") {
                        //取消的回调
                        if (err == "cancel") {
                            //确认的回调
                            this.$router.push({ path: "/" }); //点击确定跳转到登录的路由
                        }
                    }
                });
            this.loginActive = false;
        }
    },
    mounted() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        if (!user) return;
        Indicator.open("加载中...");
        // 获取支付宝账号

        that.$post("Person/index/putForward",{
            user: user
        }).then(res=>{
            // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            // 获取支付宝账号
            that.zfb = res.alipaynum ? res.alipaynum : "(暂无账号)";
            that.money.balance = res.money ? res.money : 0; //获取总余额
            that.free = res.free; //倍率
            that.money.service = 0; //默认手续费为0
            that.money.practical = 0; //默认实际到账为0
            Indicator.close();
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })
        // 获取银行卡
        this.bankListData();
    },
    beforeRouteEnter(to, from, next) {
        let usertype = window.sessionStorage.getItem("usertype");
        if (usertype) {
            MessageBox({
                title: "提示",
                message: "试玩账号不支持此功能！"
            });
        } else {
            document.querySelector("html").classList.add("h100");
            next();
        }
    },
    beforeRouteLeave(to, from, next) {
        document.querySelector("html").classList.remove("h100");
        MessageBox.close(false);
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

/* 内容 开始 */
.content {
    margin-top: 100px;
    text-align: center;
    border: 1px solid transparent;
}

.t-bot {
    margin-bottom: 40px;
    text-align: left;
}
.t-bot div {
    position: relative;
    height: 100px;
    border-bottom: 2px solid #ccc;
}
.t-bot label {
    display: flex;
    align-items: center;
    height: 100%;
}
.t-bot label img {
    width: 60px;
    height: 60px;
}
.t-bot label p {
    padding: 15px 20px;
    height: 100%;
    font-size: 30px;
    box-sizing: border-box;
}
.t-bot label p i {
    font-size: 24px;
}
.t-bot button {
    margin: 40px 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    color: #fff;
    background-color: #ccb07e;
}

/* radio默认样式修改 */
input[type="radio"] + label::before {
    content: "✔"; /*不换行空格*/
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -10px;
    width: 35px;
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border: 1px solid #ccb07e;/*no*/
    border-radius: 50%;
    text-indent: 7px;
    line-height: 40px;
    transform: rotate(-30deg);
}
input[type="radio"]:checked + label::before {
    background-color: #ccb07e;
    background-clip: content-box;
    border-color: snow;
}

input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
/* 银行卡 */
.bankcardWrap .iconfont {
    position: absolute;
    right: 0;
    font-size: 34px;
}
/* 银行卡列表显示 */
.bankListAvtive {
    padding: 10px 20px;
    width: 70%;
    border-radius: 20px;
}
/* 提现金额 */
.Money {
    width: 95%;
    margin: 30px auto;
    padding: 20px 60px;
    background-color: #fff;
    box-sizing: border-box;
}

.Money p {
    text-align: left;
    padding: 10px 0;
}
.Money .m-top input {
    margin: 10px 0;
    width: 100%;
    height: 60px;
    text-indent: 15px;
    border: 1px solid #ddd;/*no*/
    background-color: #fff;
    outline: none;
}
.Money .m-top .eyes {
    position: relative;
}
.Money .m-top .eyes i {
    position: absolute;
    top: 18%;
    right: 2%;
    font-size: 40px;
}
.m-bot {
    margin-top: 40px;
}
.m-bot p {
    padding: 10px 0;
}

.m-bot p i {
    float: right;
}

.m-bot button {
    margin: 40px 0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #fff;
    border-radius: 10px;
    background-color: #ccb07e;
}

/* 内容 结束 */
</style>

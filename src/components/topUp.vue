<template>
    <div class="topUpBox">
        <div v-if="loginActive">
            <!-- 头部 开始 -->
            <div class="title">
                <span>充值</span>
                <i @click="goBack" class="iconfont icon-left-arrow"></i>
            </div>
            <!-- 头部 结束 -->

            <!-- 内容 开始 -->
            <div class="content">
                <div class="topUp">
                    <mt-button type="default" ref="payNav" v-for="(item,index) in payList" :key="index">{{item.title}}</mt-button>
                </div>
                <!-- 每个导航的详细列表 -->
                <div ref="paybox" class="payBox" v-for="(item,index) in payList" :key="index">
                    <!-- 微信充值和支付宝充值 -->
                    <div class="clearfix" v-if="active && index === 0 || index === 1" v-for="(newitem,newindex) in item.sub" :key="newindex" @click="gopay($event,newindex,newitem.src,newitem.class,newitem.tips,newitem.toptext,newitem.bottext)">
                        <p>
                            <img :src="newitem.src" alt="">
                        </p>
                        <div>
                            <i :class="newitem.class">{{newitem.tips}}</i>
                            <span>{{newitem.toptext}}</span>
                            <p v-html="newitem.bottext"></p>
                        </div>
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                    <!-- 银行卡充值 -->
                    <div class="clearfix" style="display: block;" v-else-if="active && index === 2">
                        <div class="bankcard_nav clearfix">
                            <div class="bankcard_title">选择汇款卡号</div>
                            <div>
                                <!-- @click事件的index+1是为了和下面的列表的id对应  id千万不要修改 -->
                                <mt-button class='navBar' 
                                            :class="{bank_title_red: bank_card_nav.substr(bank_card_nav.length-1,1) == newindex + 1}" 
                                            ref="navBar" v-for="(newitem,newindex) in item.sub[0]" 
                                            @click.native.prevent="bank_card_nav = 'tab-container' +( newindex + 1) + ''; bank_card_nav_index = newindex" 
                                            :key="newindex">
                                    <span>{{newitem.k2}}-{{newitem.k1}}</span>
                                </mt-button>
                            </div>
                        </div>

                        <!-- 循环银行卡数组 -->
                        <div class="page-tab-container">
                            <mt-tab-container class="page-tabbar-tab-container" v-model="bank_card_nav">
                                <mt-tab-container-item 
                                        class="bankcard_content" 
                                        v-for="(newitem,newindex) in item.sub[0]" 
                                        :id=' "tab-container"+(newindex + 1) ' 
                                        :key="newindex"
                                        v-if="newindex == bank_card_nav_index">
                                    <div>
                                        <span>持卡人</span>
                                        <i id="bankcard_user" ref="bankcard_username">{{newitem.k1}}</i>
                                        <em class="copy_name" @click="copyMSG('.copy_name')" data-clipboard-action="copy" data-clipboard-target="#bankcard_user">复制</em>
                                    </div>
                                    <div>
                                        <span>银行卡号</span>
                                        <i id="bankcard_card" ref="bankcard_card">{{newitem.k4}}</i>
                                        <em class="copy_idcard" @click="copyMSG('.copy_idcard')" data-clipboard-action="copy" data-clipboard-target="#bankcard_card">复制</em>
                                    </div>
                                    <div>
                                        <span>开户行</span>
                                        <i id="bankcard_addr" ref="bankcard_addr">{{newitem.k3}}</i>
                                        <em class="copy_addr" @click="copyMSG('.copy_addr')" data-clipboard-action="copy" data-clipboard-target="#bankcard_addr">复制</em>
                                    </div>
                                </mt-tab-container-item>
                            </mt-tab-container>
                        </div>

                        <div class="bankcard_content">
                            <!-- 汇款方式 -->
                            <div>
                                <span>汇款方式</span>
                                <i ref="remittance_methods_text" @click.prevent.stop="remiteance_show">{{remittance_methods_text}}</i>
                                <mt-popup v-model="remittance_methods" position="bottom">
                                    <mt-picker ref="picker" :slots="slots" showToolbar value-key="text">
                                         <div class="picker-toolbar-title">
                                            <div class="usi-btn-cancel" @click="remittance_methods = !remittance_methods">取消</div>
                                            <div class="usi-btn-sure" @click="handleConfirm(newindex)">确定</div>
                                        </div>
                                    </mt-picker>
                                </mt-popup>
                            </div>
                            <!-- 选择汇款方式时 需要填写的选项 -->
                            <div v-if="remittance_methods_id === 'ATM_money' || remittance_methods_id === 'ATM_bankcard'">
                                <span>汇款地点</span>
                                <input ref="my_addr" type="text" placeholder="请输入汇款地点">
                            </div>
                            <div v-else-if="remittance_methods_id === 'E_bank'">
                                <span>汇款人姓名</span>
                                <input ref="my_name" type="text" placeholder="请输入汇款人姓名">
                                <strong class="bank_tips">温馨提示：当转账人姓名与上方姓名不符时，请填写正确的转账人姓名以便快速到账。</strong>
                            </div>
                            <div v-else-if="remittance_methods_id === 'other'">
                                <span></span>
                                <input ref="my_otoers_methods" type="text" placeholder="请输入其他汇款方式">
                            </div>
                            <div><span>金额</span><input type="text" ref="bankcard_money" placeholder="最少10元"></div>
                            <mt-button @click="bangCard_submit">提交</mt-button>
                        </div>
                    </div>
                </div>
                <!-- 支付方式维护 中-->
                <ul>
                    <li v-if="!active">
                        <mt-button type="danger" class="danger">该支付方式维护中，请使用其他充值方式！</mt-button>
                    </li>
                </ul>
                <!-- 帮助教程 开始 -->
                <div class="help">
                    <p>帮助教程</p>
                    <div>
                        <router-link to="helpWeixin">1、微信转账到银行卡</router-link>
                        <router-link to="helpZfb">2、支付宝转账到银行卡</router-link>
                    </div>
                </div>
                <!-- 帮助教程 结束 -->

                <!-- 温馨提示 -->
                <div class="tips">
                    <p>温馨提示：</p>
                    <ol>
                        <li>1、如果在一个通道连续支付三次无法成功请换取其他通道</li>
                        <li>2、官方检测
                            <i>【www.yinhe.com】</i>建议利用转账支付功能。如银行卡转账，微信转账等，每月不限时发送神秘礼包！</li>
                        <li>3、当遇到通道存款不稳定时请联系
                            <i>在线客服</i>
                        </li>
                    </ol>
                </div>

                <!-- 支付框 -->
                <form ref="go_pay_form" action="http://148.72.206.211:803/public/alipay/pagepay/pagepay.php" onkeydown="if(event.keyCode==13)return false;" method=post target="_blank" id="form">
                    <div class="pop clearfix">
                        <mt-popup v-model="popupShow" position="bottom" lockScroll="true">
                            <ul class="clearfix">
                                <!-- 支付框 顶部标题 -->
                                <li class="tips clearfix">
                                    <p>
                                        <img :src="titletext.src" alt="">
                                    </p>
                                    <div>
                                        <i :class="titletext.classColor">{{titletext.tips}}</i>
                                        <span>{{titletext.toptext}}</span>
                                    </div>
                                    <i @click="popupShowFalse">x</i>
                                </li>
                                <!-- 付款金额 -->
                                <li v-if="samllMoney">
                                    <span>选择付款金额</span>
                                    <div class="btn">
                                        <mt-button type="default" ref="payMoney" v-for="(item,index) in gopayList" :key="index" @click="stopDefault($event)">{{item.money}}元</mt-button>
                                    </div>
                                    <i>您需要支付：</i>
                                    <input ref="writeMoney" type="tel">元
                                    <em v-html="titletext.bottext"></em>
                                </li>
                                <li v-if="!samllMoney">
                                    <span>选择付款金额</span>
                                    <div class="btn">
                                        <mt-button type="default" ref="payMoney" v-for="(item,index) in gopayListSecond" :key="index" @click="stopDefault($event)">{{item.money}}元</mt-button>
                                    </div>
                                    <i>您需要支付：</i>
                                    <input ref="writeMoney" type="tel">元
                                    <em v-html="titletext.bottext"></em>
                                </li>
                                <!-- 微信的二维码 -->
                                <li>
                                    <input id="WIDbody" ref="WIDbody" name="WIDbody" type="hidden" value="" />
                                    <input id="WIDsubject" ref="WIDsubject" name="WIDsubject" type="hidden" value="" />
                                    <input id="WIDout_trade_no" ref="WIDout_trade_no" name="WIDout_trade_no" type="hidden" value="" />
                                    <input type="hidden" class="layui-input" ref="WIDtotal_amount" id="WIDtotal_amount" name="WIDtotal_amount" placeholder="请输入充值金额">

                                    <!-- 微信的二维码 -->
                                    <p v-if="imgShow" ref="wechat_img" id="img"></p>
                                </li>
                                <li class="go">
                                    <mt-button type="default" @click="gosubmit($event)">立即支付</mt-button>
                                </li>
                            </ul>
                        </mt-popup>
                    </div>
                </form>

            </div>

            <!-- 内容 结束 -->
        </div>

        <!-- <login></login> -->
        <!-- 底部 开始 -->
        <commonfooter></commonfooter>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { MessageBox,Toast } from "mint-ui";
import login from "./../commonViews/login.vue";
import commonfooter from "./../commonViews/commonfooter.vue";
import Clipboard from "clipboard";
import "../iconfont/iconfont.css";
export default {
    name: "topUp",
    data() {
        return {
            active: "true",
            bank_card_nav: "tab-container1",
            bank_card_nav_index : 0,
            remittance_methods: false,
            remittance_methods_text: "请选择汇款方式",
            remittance_methods_id: "",
            slots:[{values: [
                {
                    text: "微信转卡",
                    id: "wechat"
                },
                {
                    text: "支付宝转卡",
                    id: "apply"
                },
                {
                    text: "手机银行转卡",
                    id: "mobile_bank"
                },
                {
                    text: "银行柜台",
                    id: "bank"
                },
                {
                    text: "ATM现金",
                    id: "ATM_money"
                },
                {
                    text: "ATM卡转",
                    id: "ATM_bankcard"
                },
                {
                    text: "网银转账",
                    id: "E_bank"
                },
                {
                    text: "其他（手动输入）",
                    id: "other"
                }
            ]}],

            loginActive: true,
            min_wx_money: "",//最小微信充值金额
            min_zfb_money: "", //最小支付宝充值金额
            payList: [],
            // 支付框 显示 隐藏
            popupShow: false,

            // 支付框大小额切换
            samllMoney: true,
            // 支付框 金额按钮（小额）
            gopayList: [],
            // 支付框 金额按钮(大额)
            gopayListSecond: [
                {
                    money: "20000"
                },
                {
                    money: "18000"
                },
                {
                    money: "15000"
                },
                {
                    money: "13000"
                },
                {
                    money: "11000"
                },
                {
                    money: "10000"
                },
                {
                    money: "9000"
                },
                {
                    money: "8000"
                },
                {
                    money: "6000"
                },
                {
                    money: "4000"
                },
                {
                    money: "3000"
                },
                {
                    money: "2000"
                }
            ],
            // 支付框 头部标题
            titletext: {},
            // 微信二维码显示隐藏
            imgShow: false,
            // 判断当前是支付宝（1） 还是 微信支付（0）
            patterOfPayment: 0
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

        // 充值导航 改变时内容改变
        changeList() {
            let that = this;
            let paynav = this.$refs.payNav; //支付导航
            let paybox = this.$refs.paybox; //支付详细列表
            paynav.forEach((item, index) => {
                // 默认第一个按钮改变颜色 并且显示充值详细列表
                paynav[0].$el.classList.add("color");
                paybox[0].style.display = "block";
                // 按钮点击的时候 改变颜色 并且显示充值详细列表
                item.$el.onclick = function() {
                    for (let i = 0; i < paynav.length; i++) {
                        paynav[i].$el.classList.remove("color");
                        paybox[i].style.display = "none";
                    }
                    this.classList.add("color");
                    paybox[index].style.display = "block";
                    if (that.payList[index].sub.length > 0) {
                        that.active = true;
                    } else {
                        that.active = false;
                    }
                    //支付方式 点击微信 index = 0 支付宝 index = 1
                    that.patterOfPayment = index;
                };
            });
        },
        // 充值导航 点击底部显示支付框
        gopay(event, index, src, classColor, tips, toptext, bottext) {
            let e = event.currentTarget;
            // 让当前支付框的标题 = 点击的那个 标题
            this.popupShow = true;
            this.titletext.src = src;
            this.titletext.classColor = classColor;
            this.titletext.tips = tips;
            this.titletext.toptext = toptext;
            this.titletext.bottext = bottext;
            // 微信二维码
            this.imgShow = false;
            // 获取所有的金额按钮
            let payMoney = this.$refs.payMoney;
            // 获取输入金额的 input框
            let writeMoney = this.$refs.writeMoney;
            // 让所有的金额按钮一开始都没有样式
            for (let i = 0; i < payMoney.length; i++) {
                payMoney[i].$el.classList.remove("green");
            }
            // 点击时给所有的样式清空  当前点击的添加 输入金额框跟随改变
            payMoney.forEach((item, index) => {
                item.$el.onclick = function() {
                    for (let i = 0; i < payMoney.length; i++) {
                        payMoney[i].$el.classList.remove("green");
                    }
                    this.classList.add("green");
                    writeMoney.value = parseFloat(this.children[0].innerHTML);
                };
            });
            // 默认给最后一个添加样式 输入金额框为当前样式的内容
            payMoney[payMoney.length - 1].$el.classList.add("green");

            // 如果index = 0 就是小额
            if (index == 0) {
                this.samllMoney = true;
                // 小额的自动输入金额
                writeMoney.value = this.gopayList[
                    this.gopayListSecond.length - 1
                ].money;
            } else if (index == 1) {
                // 如果 index = 1 就是大额
                this.samllMoney = false;
                // 大额的自动输入金额
                writeMoney.value = this.gopayListSecond[
                    this.gopayListSecond.length - 1
                ].money;
            }
        },
        // 支付框 隐藏
        popupShowFalse() {
            this.popupShow = false;
        },

        // 支付提交按钮
        gosubmit(e) {
            let user = window.sessionStorage.getItem("login_user");
            let index = this.patterOfPayment;
            let writeMoney = this.$refs.writeMoney.value; //金额框
            let min_wx_money = this.min_wx_money;
            let min_zfb_money = this.min_zfb_money;
            let that = this
            e.preventDefault();
            
            if (index == 1) {
                // 支付宝
                if (this.samllMoney == true) {
                    // 小额
                    if (parseFloat(writeMoney) < min_zfb_money) {
                        alert("单笔金额不能小于"+min_zfb_money+"元！");
                        return;
                    } else if (parseFloat(writeMoney) > 2000) {
                        alert("单笔金额不能大于2000元！");
                        return;
                    }
                } else {
                    // 大额
                    if (parseFloat(writeMoney) < 2000) {
                        alert("单笔金额不能小于2000元！");
                        return;
                    } else if (parseFloat(writeMoney) > 20000) {
                        alert("单笔金额不能大于20000元！");
                        return;
                    }
                }

                this.imgShow = false; // 微信二维码隐藏
                user = window.sessionStorage.getItem("username");
                // 跳转支付宝页面
                var t = new Date().getTime();
                that.$refs.WIDsubject.value = "余额充值"
                that.$refs.WIDout_trade_no.value = user + t
                that.$refs.WIDbody.value = user
                that.$refs.WIDtotal_amount.value = writeMoney
                that.$refs.go_pay_form.submit();
                return;
            }
            if (index == 0) {
                // 微信支付
                if (this.samllMoney == true) {
                    // 小额
                    if (parseFloat(writeMoney) < min_wx_money) {
                        alert("单笔金额不能小于"+min_wx_money+"元！");
                        return;
                    } else if (parseFloat(writeMoney) > 2000) {
                        alert("单笔金额不能大于2000元！");
                        return;
                    }
                } else {
                    // 大额
                    if (parseFloat(writeMoney) < 2000) {
                        alert("单笔金额不能小于2000元！");
                        return;
                    } else if (parseFloat(writeMoney) > 20000) {
                        alert("单笔金额不能大于20000元！");
                        return;
                    }
                }
                // axios 请求微信支付图片
                that.$get("public/wxpay/example/native.php",{
                    user: user,
                    money: writeMoney
                }).then(res=>{
                    // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    this.$refs.wechat_img.innerHTML = '<img alt="余额充值" src="http://148.72.206.211:803/public/wxpay/example/qrcode.php?data=' +
                            res +
                            '" style="width:150px;height:150px;"/>'
                }).catch(err=>{
                    console.log(err);
                })
                // 微信二维码显示
                this.imgShow = true;
                return;
            }
        },

        stopDefault(e) {
            e.preventDefault();
        },
        // 银行卡支付 picker选择支付方式弹窗 显示/隐藏 
        remiteance_show(){
            this.remittance_methods = !this.remittance_methods
        },
        // 银行卡支付 picker选择支付方式
        handleConfirm(newindex){
            let my_name = this.$refs.my_name ? this.$refs.my_name[0] : null,
                my_addr = this.$refs.my_addr ? this.$refs.my_addr[0] : null,
                my_otoers_methods = this.$refs.my_otoers_methods ? this.$refs.my_otoers_methods[0] : null;
            this.remittance_methods = !this.remittance_methods
            this.$refs.remittance_methods_text[newindex].innerHTML = this.remittance_methods_text = this.$refs.picker[newindex].getValues()[0].text
            this.$refs.remittance_methods_text[newindex].id = this.remittance_methods_id = this.$refs.picker[newindex].getValues()[0].id

            if(my_name){
                my_name.value = ""
            }
            if(my_addr){
                my_addr.value = ""
            }
            if(my_otoers_methods){
                my_otoers_methods.value = ""
            }
        },
        // 银行卡信息 复制按钮
        copyMSG(classname) {
            let clipboard = new Clipboard(classname);
            clipboard.on("success", e => {
                Toast("复制成功");
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                // 不支持复制
                Toast("复制失败，请手动复制");
                // 释放内存
                clipboard.destroy();
            });
        },
        // 银行卡充值 提交
        bangCard_submit(){
            let r_user = this.$refs.bankcard_username,
                idcard = this.$refs.bankcard_card,
                addr = this.$refs.bankcard_addr,
                method = this.remittance_methods_text,
                my_name = this.$refs.my_name ? this.$refs.my_name[0] : null,
                my_addr = this.$refs.my_addr ? this.$refs.my_addr[0] : null,
                my_otoers_methods = this.$refs.my_otoers_methods ? this.$refs.my_otoers_methods[0] : null,
                money = this.$refs.bankcard_money,
                user = window.sessionStorage.getItem("login_user"),
                remark = "";
                
            if(this.remittance_methods_id == ""){
                Toast("请选择汇款方式")
                return
            }

            if(my_name && my_name.value.trim() == ""){
                Toast("请输入汇款人姓名")
                return
            }else{
                remark += my_name ?  my_name.value : "";
            }
            if(my_addr && my_addr.value.trim() == ""){
                Toast("请输入汇款地点")
                return
            }else{
                remark += my_addr ?  my_addr.value : "";
            }
            if(my_otoers_methods && my_otoers_methods.value.trim() == ""){
                Toast("请输入其他汇款方式")
                return
            }else{
                remark += my_otoers_methods ?  my_otoers_methods.value : "";
            }

            if(money[0].value < 10){
                Toast("金额不能小于10元")
                return
            }

            this.$post("person/index/huiMoney",{
                user: user,
                r_user: r_user[0].innerHTML,
                idcard: idcard[0].innerHTML,
                addr: addr[0].innerHTML,
                method: method,
                money: money[0].value,
                remark: remark
            }).then(res=>{
                Toast(res.msg)
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        let that = this;
        if (window.sessionStorage.getItem("login_user")) {
            let user = window.sessionStorage.getItem("login_user");
            this.loginActive = true;

            that.$post("person/index/minMoney",{
                user: user
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }

                // 最小充值额度
                that.min_wx_money = res.wxlimit; //微信
                that.min_zfb_money = res.zfblimit; //支付宝
                that.payList = [
                    {
                            title: "微信充值",
                            sub: [
                            {
                                src: require("../../static/images/topUp/weixin.png"),
                                tips: "推荐",
                                class: "red",
                                toptext: "小额推荐 30 50 100 200 300 500",
                                bottext:
                                    '单笔限额：<i style="color:red;">'+that.min_wx_money+'</i>元——<i style="color:red;">2000</i>元'
                            },
                            {
                                src: require("../../static/images/topUp/weixin.png"),
                                tips: "大额",
                                class: "color",
                                toptext: "加好友 发红包 成功率100%",
                                bottext:
                                    '单笔限额：<i style="color:red;">2000</i>元——<i style="color:red;">20000</i>元'
                            }
                        ]
                    },
                    {
                        title: "支付宝充值",
                        sub: [
                            {
                                src: require("../../static/images/topUp/zhifubao.png"),
                                tips: "推荐",
                                class: "red",
                                toptext: "小额推荐 30 50 100 200 300 500",
                                bottext:
                                    '单笔限额：<i style="color:red;">'+that.min_zfb_money+'</i>元——<i style="color:red;">2000</i>元'
                            },
                            {
                                src: require("../../static/images/topUp/zhifubao.png"),
                                tips: "大额",
                                class: "color",
                                toptext: "加好友 发红包 成功率100%",
                                bottext:
                                    '单笔限额：<i style="color:red;">2000</i>元——<i style="color:red;">20000</i>元'
                            }
                        ]
                    },
                    {
                        title: "银行卡充值",
                        sub: [
                            res.bank
                        ]
                    },
                    {
                        title: "转账服务",
                        sub: []
                    },
                    {
                        title: "QQ钱包",
                        sub: []
                    },
                    {
                        title: "网银支付",
                        sub: []
                    },
                    {
                        title: "银联扫码",
                        sub: []
                    },
                    {
                        title: "京东扫码",
                        sub: []
                    }
                ];
                that.gopayList = [
                    {
                        money: "2000"
                    },
                    {
                        money: "1800"
                    },
                    {
                        money: "1500"
                    },
                    {
                        money: "1000"
                    },
                    {
                        money: "800"
                    },
                    {
                        money: "500"
                    },
                    {
                        money: "300"
                    },
                    {
                        money: "200"
                    },
                    {
                        money: "100"
                    },
                    {
                        money: "50"
                    },
                    {
                        money: "30"
                    },
                    {
                        money: "10"
                    }
                ];

                // methods全局函数执行
                that.$nextTick(()=>{
                    that.changeList();
                })
            }).catch(err=>{
                console.log(data);
            })
        } else {
            MessageBox.confirm("请登录之后进行此操作！",'提示',{
            	closeOnClickModal:false
            })
                .then(action => {
                    if (action == "confirm") {
                        //确认的回调
                        this.$router.push({ path: "/my" }); //点击确定跳转到登录的路由
                        return;
                    }
                })
                .catch(err => {
                    if (err == "cancel") {
                        //取消的回调
                        this.$router.push({ path: "/" }); //点击确定跳转到登录的路由
                        return;
                    }
                });
            this.loginActive = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        let usertype = window.sessionStorage.getItem("usertype");
        if (usertype) {
            MessageBox({
                title: "提示",
                message: "试玩账号不支持此功能！"
            });
        } else {
            document.querySelector("html").classList.add("f5");
            next();
        }
    },
    beforeRouteLeave(to, from, next) {
        document.querySelector("html").classList.remove("f5");
        MessageBox.close(false);
        next();
    },
    watch: {
        remittance_methods(val,oldval){
            // 判断银行卡的弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
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

.color {
    background-color: #ccb07e !important;
    color: #fff;
}
.red {
    background-color: red;
    color: #fff;
}
.green {
    border: 1px solid #1ad106;/*no*/
    color: #1ad106;
}
.green::after {
    display: block;
    position: absolute;
    top: -4px;
    left: auto;
    opacity: 1;
    width: 0;
    height: 0;
    border-width: 40px 0 0 40px;
    border-style: solid;
    border-color: #1ad106 transparent transparent; /*灰 透明 透明 */
    background-color: transparent;
}
.green::before {
    content: "✔";
    position: absolute;
    right: 3px;
    top: 0px;
    color: #fff !important;
    font-size: 12px;
    z-index: 2;
    transform: rotate(-15deg);
}
.content {
    margin-top: 100px;
    text-align: center;
    border: 1px solid transparent;
}
.topUp {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 30px auto;
    padding: 0 10px;
    box-sizing: border-box;
}
.topUp button {
    margin: 20px 0;
    width: 22%;
    height: 80px;
    background-color: #fff;
}
div >>> .mint-button {
    font-size: 26px;
}
.payBox {
    display: none;
    background-color: #fff;
}
.payBox > div {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #ddd;
}
.payBox > div > p {
    float: left;
    margin: 0 !important;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    overflow: hidden;
}
.payBox img {
    width: 100%;
    height: 100%;
}
.payBox > div > div {
    float: left;
    margin-left: 10px;
}
.payBox div > div i {
    float: left;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 24px;
    line-height: 1;
}
.payBox > div p {
    margin-top: 10px;
    text-align: left;
}
.payBox > div > i {
    flex: 1;
    text-align: right;
    line-height: 80px;
}
div .danger {
    width: 90%;
    height: 70px;
    border-radius: 10px;
}
.picker,
.bankcard_content .mint-popup div{
    float: none !important;
    margin: 0 !important;
    width: 100%;
    font-size: 28px;
}
.picker-toolbar-title{
    display: flex;
    position: relative;
    z-index: 10;
    text-align: center;
    background-color: #fff;
}
.picker-toolbar-title div{
    padding: 10px 0;
}
/* 银行卡支付 start */
.payBox div > .bankcard_nav,
.payBox div > .page-tab-container,
.payBox div > .mint-tab-container,
.payBox div > .bankcard_title{
    margin: 0;
    width: 100%;
}
.bankcard_nav{
    width: 100%;
}
.bankcard_title{
    float: none !important;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;/*no*/
    text-align: left;
    font-size: 30px;
}
.payBox div .bankcard_title + div{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
}
.payBox div .bankcard_title + div button{
    margin: 0 10px;
    height: 60px;
    border: 1px solid transparent;/*no*/
}
.payBox div .bankcard_title + div .bank_title_red{
    color: red;
    border: 1px solid red;/*no*/
}

/* 表单 start */
.payBox div > .bankcard_content{
    margin: 0;
    width: 100%;
}
.bankcard_content div{
    width: 100%;
    text-align: left;
}
.bankcard_content  div{
    border-bottom: 1px solid #ddd;/*no*/
}
.bankcard_content  div span{
    display: inline-block;
    padding: 20px 0;
    width: 23%;
    font-size: 28px;
}
.bankcard_content  div{
    font-size: 0;
}
.bankcard_content  div input,
.bankcard_content  div i{
    display: inline-block;
    float: none !important;
    width: 63%;
    padding: 20px 0 !important;
    background-color: #fff;
    text-indent: 10px;
    outline: none;
    border: none;
}
.bankcard_content  div em{
    display: inline-block;
    padding: 20px 0;
    width: 14%;
    text-align: center;
    color: rgb(50, 112, 232);
    font-style: normal;
}
.bankcard_content  div strong{
    display: block;
    margin-bottom: 10px;
    color: red;
    font-weight: normal;
}
.bankcard_content button{
    display: block;
    width: 100%;
    height: 80px;
    /* background: -webkit-linear-gradient(left, #2e6be5, #4399ef, #66e5ff); */
    background: #ccb07e;
    background-size: 100% 44px;
    border: none;
    line-height: 44px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    font-size: 16px;
    border-radius: 3px;
    margin-top: 15px;
}

.picker-toolbar-title{
    float: none !important;
    margin: 0 !important;
    font-size: 28px !important;
}
.picker >>> .picker-slot.picker-slot-center{
    width: 100%;
}
.picker-toolbar-title div{
    text-align: center;
}
.usi-btn-sure{
    color: rgb(50, 112, 232);
}
/* 表单 end */
/* 银行卡支付 end */



/* 支付框 */

.pop {
    float: none;
    margin: 0;
}
.pop li {
    text-align: left;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
}
.mint-popup {
    width: 100%;
}
.pop .tips {
    padding: 20px;
    margin: 0;
}
.pop .tips > p {
    float: left;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
}
.pop .tips > p img {
    width: 100%;
    height: 100%;
}
.pop .tips > div {
    float: left;
    margin-left: 20px;
    width: 70%;
    line-height: 1.5;
    font-size: 32px;
}
.pop .tips > div i {
    float: right;
    margin-top: 20px;
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 10px;
}
.pop .tips > i {
    float: right;
    padding: 20px;
    font-size: 40px;
}

.pop li span {
    display: block;
    text-align: left;
    padding: 10px 0;
    font-size: 30px;
}
.pop li .btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
}
.pop li .btn button {
    width: 22%;
    margin: 10px 0;
    height: 60px;
}
.pop li input {
    margin-right: 10px;
    height: 60px;
    line-height: 60px;
    border-radius: 20px;
    border: 1px solid #ddd;/*no*/
    outline: none;
    text-indent: 20px;
}

.pop li em {
    display: block;
    padding: 20px 0;
    font-style: normal;
    text-align: left;
    color: #aaa;
}

.pop .go {
    text-align: center;
}
.pop .go button {
    margin: 40px 0;
    width: 80%;
    height: 60px;
    background-color: red;
    color: #fff;
    border-radius: 10px;
}
#img {
    text-align: center;
}

/* 帮助教程 */
.help {
    margin: 20px;
    background-color: #fff;
}
.help p {
    padding: 10px 60px;
    font-size: 30px;
    text-align: left;
}
.help div {
    display: flex;
    padding: 10px 0 30px 0;
    justify-content: space-between;
    align-items: center;
}
.help div a {
    flex: 1;
    color: #ccb07e;
}

/* 内容 结束 */

/* 底部 tips */
.tips {
    padding: 0 30px;
    margin-bottom: 120px;
    text-align: left;
}
.tips ol {
    margin-top: 10px;
}
.tips ol li {
    line-height: 1.6;
}
.tips ol li i {
    color: red;
}
</style>

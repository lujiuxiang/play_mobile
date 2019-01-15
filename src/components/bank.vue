<template>
    <div class="register">
        <!-- 头部 开始 -->
        <div class="title">
            <router-link class="iconfont icon-left-arrow" to="" @click.native="goBack"></router-link>
            <span>绑定银行卡</span>
        </div>
        <!-- 头部 结束 -->
        <div class="titleimg">
            <img src="../../static/images/bank/titleimg.jpg" width="100%" height="100%" alt="">
        </div>

        <!-- 内容 开始 -->
        <div class="content">
            <p>
                <span>选择银行</span>
                <select id="bank" ref="select">
                    <option value="">中国工商银行</option>
                    <option value="">中国建设银行</option>
                    <option value="">中国银行</option>
                    <option value="">交通银行</option>
                    <option value="">中国农业银行</option>
                    <option value="">邮政储蓄银行</option>
                    <option value="">北京银行</option>
                    <option value="">吉林银行</option>
                    <option value="">浦发银行</option>
                    <option value="">广大银行</option>
                    <option value="">华夏银行</option>
                    <option value="">兴业银行</option>
                    <option value="">中信银行</option>
                </select>
            </p>
            <mt-field label="真实姓名:" type='text' :value="realname" disabled></mt-field>
            <mt-field label="银行卡号:" ref="input1" type='text' placeholder="请输入银行卡号" :state="state1"></mt-field>
            <!-- 三级联动 -->
            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
                <mt-picker ref="picker"
                        :slots="myAddressSlots"
                        @change="onMyAddressChange"
                        showToolbar>
                        <mt-button type="primary" @click="handleConfirmSure" class="sure">确认</mt-button>
                </mt-picker>
            </mt-popup>
            <p @click="openPicker">开户省市：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>
            
            <div class="btnWrap">
                <mt-button class="btn" type="default" @click="gosubmit">确认</mt-button>
            </div>
        </div>
        <!-- 内容 结束 -->

    </div>
</template>

<script>
import { MessageBox,Picker ,Indicator,DatetimePicker,Button,Toast   } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
import  myaddress from "../../static/address.json"
export default {
    name: "bank",
    data() {
        return {
            // 真实姓名
            realname: "",
            // 正则判断返回的数据
            // 银行卡
            bank1: false,
            state1: "error",
            // 三级联动
            popupVisible: false,
            myAddressSlots: [
                {
                　　flex: 1,
                　　defaultIndex: 1,
                　　values: Object.keys(myaddress), //省份数组
                　　className: 'slot1',
                　　textAlign: 'center'
                }, {
                　　divider: true,
                　　content: '-',
                　　className: 'slot2'
                }, {
                　　flex: 1,
                　　values: [],
                　　className: 'slot3',
                　　textAlign: 'center'
                },{
                　　divider: true,
                　　content: '-',
                　　className: 'slot4'
                },{
                　　flex: 1,
                　　values: [],
                　　className: 'slot5',
                　　textAlign: 'center'
                }
            ],
            // 省市区
            myAddressProvince:'',
            myAddressCity:'',
            myAddresscounty:'',
        };
    },
    components: {
        commonfooter,
        'mt-picker': Picker
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 绑定的正则判断
        reg() {
            let that = this;
            let regInput = document.getElementsByClassName("mint-field-core");
            // 银行卡号正则
            regInput[1].onblur = function() {
                let reg1 = /^([1-9]{1})(\d{14}|\d{18})$/;
                if (this.value.trim() == "") {
                    that.bank1 = false;
                    that.state1 = "error";
                } else if (!reg1.test(this.value)) {
                    that.bank1 = false;
                    that.state1 = "error";
                } else {
                    that.bank1 = true;
                    that.state1 = "success";
                }
            };
            
        },
        // 三级联动 打开
        openPicker() {
            this.popupVisible = !this.popupVisible;
        },
        // 三级联动 确认按钮关闭
        handleConfirmSure(){
            this.popupVisible = false;
        },
        // 改变value值
        onMyAddressChange(picker, values) {
            if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.myAddressProvince = values[0];
                this.myAddressCity = values[1];
                this.myAddresscounty = values[2];
            }
        },
        // 提交绑定
        gosubmit() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let select = this.$refs.select;
            let index = select.selectedIndex; //option的下标
            let val = select.options[index].text; //option的具体值 (xx银行)
            let realname = this.realname;
            let input1 = this.$refs.input1.$el.children[1].children[1]
                .children[0];
            let myAddressProvince = this.myAddressProvince; //省
            let myAddressCity = this.myAddressCity + " " + this.myAddresscounty; //市+区

            if (this.state1 !== "error") {
                that.$post("index/user/updateUser",{
                    bank: val,
                    user: user,
                    realname: realname,
                    bankcard: input1.value,
                    province: myAddressProvince,
                    city: myAddressCity
                }).then(res=>{
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        that.common.isOnline(that, res);
                        return;
                    }
                    if (res == 0) {
                        MessageBox("提示", "绑定失败，请重新检查！");
                    } else if (res == 1) {
                        Toast("绑定成功！");
                        input1.value = "";
                        // 注册成功后返回上级页面
                        that.$router.go(-1);
                    } else if (res == 2) {
                        alert("此银行卡已被绑定！");
                        return;
                    } else if (res == 3) {
                        alert("银行卡最多绑定3张，如需解绑请联系客服！");
                        return;
                    }
                }).catch(err=>{
                    Indicator.close();
                    console.log(err);
                })
            } else {
                MessageBox("提示", "输入有误，请检查后重新输入！");
            }
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        this.reg();
        let that = this;
        let user = window.sessionStorage.getItem("login_user"); //用户名
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
            Indicator.close();
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })
        // 三级联动
        this.$nextTick(() => {
            this.myAddressSlots[0].defaultIndex = 0
            // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
　　　　});
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-popup{
    width: 100%;
    margin: 0 !important;
    font-size: 24px !important;
}
.mint-popup >>> .picker-toolbar{
    padding: 0 30px 30px;
    text-align: right;
}
.mint-popup >>> .picker-toolbar button{
    padding: 10px 20px;
    height: auto;
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
.title a {
    float: left;
    margin-left: 20px;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
    z-index: 99;
}
.title span {
    text-align: center;
    font-size: 36px;
    color: #fff;
    line-height: 100px;
    margin-left: -45px;
}
.titleimg {
    margin-top: 100px;
}
/* 顶部回退框 */
/* 内容 开始 */
.content {
    padding: 10px 20px;
    color: #000;
}
.content i {
    float: left;
    height: 80px;
    line-height: 80px;
    color: red;
}
.content .mint-cell {
    margin: 20px 0;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
}
.content p {
    margin: 20px 0;
    padding-left: 10px;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
}
.content p select {
    margin-left: 20px;
    height: 80%;
    background-color: #fff;
    border: none;
    outline: none;
}
.content div {
    padding-left: 10px;
    margin: 30px 0;
}
.content div input {
    vertical-align: middle;
}
.content div label {
    vertical-align: middle;
}
.content div label em {
    font-style: normal;
    color: red;
    font-weight: bold;
}
.content .btnWrap {
    text-align: center;
}
.content .btn {
    width: 100%;
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

div >>> .mint-cell-wrapper {
    font-size: 26px;
}

div >>> .mint-field-core {
    text-indent: 15px;
    background-color: #fff;
}
/* 内容 结束 */
</style>

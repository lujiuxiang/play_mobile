<template>
    <div class="activities">
        <!-- 头部搜索框 开始 -->
        <div class="title">
            <span>我的推广</span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
        </div>
        <!-- 头部搜索框 结束 -->

        <!-- 游戏 开始 -->
        <div class="games">
            <div class="nav" v-if="titleNav.length > 0">
                <!-- @click事件的index+1是为了和下面的列表的id对应  id千万不要修改 -->
                <mt-button class='navBar' v-for="(item,index) in titleNav" :class="{show: active.substr(active.length-1,1) == index + 1}" ref="navBar" @click.native.prevent="active = 'tab-container' +( index+1) + ''" :key="index">
                    <!-- <i :class=item.class></i> -->
                    <span v-text="item.title"></span>
                </mt-button>
            </div>

            <!-- 对应的navbar列表 -->
            <div class="page-tab-container">
                <mt-tab-container class="page-tabbar-tab-container" v-model="active">
                    <!-- 下级管理 -->
                    <mt-tab-container-item class="contentWrap" id="tab-container1">
                        <table v-if="agent" class="w2000">
                            <thead>
                                <th>账户</th>
                                <th>真实姓名</th>
                                <th>余额</th>
                                <th>最后登录时间</th>
                                <th>登录设备信息</th>
                                <th>注册时间</th>
                                <th>已提现金额</th>
                                <th>日盈利</th>
                                <th>总盈利</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in subUser" :key="index">
                                    <td>{{item.user}}</td>
                                    <td v-html="item.realname ? item.realname : '未填写姓名'"></td>
                                    <td>{{item.money}}元</td>
                                    <td v-html="item.logintime ? item.logintime : '从未登录'"></td>
                                    <td v-html="item.logininfo && item.logininfo != -1 ? item.logininfo : '从未登录'"></td>
                                    <td>{{item.ctime}}</td>
                                    <td>{{item.liushui}}</td>
                                    <td>{{item.dayprofit}}</td>
                                    <td>{{item.totalprofit}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-else>
                            <thead>
                                <th>账户</th>
                                <th>真实姓名</th>
                                <th>余额</th>
                                <!-- <th>下线返点(%)</th> -->
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in subUser" :key="index">
                                    <td>{{item.user}}</td>
                                    <td>{{item.realname}}</td>
                                    <td>{{item.money}}元</td>
                                    <!-- <td>
                                        <p v-for="(newitem,newindex) in item.rebates" :key="newindex">
                                            <span>{{newitem.platform}}</span>
                                            <span>
                                                <b @click="reduce(index,newindex)">-</b>
                                                <input ref="botValue" @change="changeValue(index,newindex)" value="0" v-model="newitem.scale" type="tel">
                                                <b @click="add(index,newindex)">+</b>
                                            </span>
                                        </p>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                        <!-- <mt-button type="default">确认修改</mt-button> -->
                    </mt-tab-container-item>
                    <!-- 抽水设置 -->
                    <!-- <mt-tab-container-item class="contentWrap2" id="tab-container2">
                        <table>
                            <thead>
                                <th>平台</th>
                                <th>下线返点(%)</th>
                            </thead>
                            <tbody v-for="(item,index) in subUser" :key="index">
                                <tr v-for="(newitem,newindex) in item.rebates" :key="newindex">
                                    <td>
                                        {{newitem.platform}}
                                    </td>
                                    <td>
                                        <span>
                                            <b @click="reduce(index,newindex)">-</b>
                                            <input ref="botValue" @change="changeValue(index,newindex)" value="0" v-model="newitem.scale" type="tel">
                                            <b @click="add(index,newindex)">+</b>
                                        </span>
                                    </td>
                                    <td>{{item.user}}</td>
                                    <td>
                                        <p v-for="(newitem,newindex) in item.rebates" :key="newindex">
                                            <span>{{newitem.platform}}</span>
                                            <span>
                                                <b @click="reduce(index,newindex)">-</b>
                                                <input ref="botValue" @change="changeValue(index,newindex)" value="0" v-model="newitem.scale" type="tel">
                                                <b @click="add(index,newindex)">+</b>
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <mt-button type="default">确认修改</mt-button>
                    </mt-tab-container-item> -->
                    <!-- 推广地址 -->
                    <mt-tab-container-item class="contentWrap3" id="tab-container2">
                        <div>
                            <p>
                                <span>您的推荐码：</span>
                                <i id="code" class="code">{{tgdz}}</i>
                                <textarea ref="noShow"></textarea>
                                <mt-button type="default" ref="copy_btn" class="yellow" @click="copyMSG" data-clipboard-action="copy" data-clipboard-target="#code">复制</mt-button>
                            </p>
                            <p>如果想赚取推广佣金,请复制推广链接发给好友注册</p>

                        </div>
                    </mt-tab-container-item>
                    <!-- 添加下级 -->
                    <mt-tab-container-item class="contentWrap4" id="tab-container3">
                        <!-- 添加下级 -->
                        <mt-field class="reg" v-model="user" @blur.native.capture="regUser" placeholder="字母开头的6-12位字母或数字组合" :state="state1">
                            <i class="iconfont icon-xiaotuziCduan-"></i>登录账号：
                        </mt-field>
                        <mt-field class="reg" v-model="realname" @blur.native.capture="regRealName" placeholder="请输入真实姓名" type="text" :state="state2">
                            <i class="iconfont icon-wode"></i>真实姓名：
                        </mt-field>
                        <mt-field class="reg" v-model="pass" @blur.native.capture="regPass" placeholder="6-12位英文字母或数字组合" type="password" :state="state3">
                            <i class="iconfont icon-mima"></i>登录密码：
                            <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
                        </mt-field>
                        <mt-field class="reg" v-model="realpass" @blur.native.capture="regRealPass" placeholder="与登录密码一致" type="password" :state="state4">
                            <i class="iconfont icon-mima"></i>确认密码：
                            <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
                        </mt-field>
                        <mt-field class="reg" v-model="qkpass" @blur.native.capture="regPass2" placeholder="请输入四位数字的取款密码" type="tel" :state="state5">
                            <i class="iconfont icon-mima"></i>取款密码：
                            <i class="iconfont icon-mimaxianshi" @click="passShow($event)"></i>
                        </mt-field>

                        <mt-button type="default" class="submit" @click="goSubmit">提交</mt-button>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>

            <!-- 推广说明 -->
            <div class="explain">
                <h6>推广功能说明</h6>
                <ol>
                    <li v-for="(item,index) in list1" :key="index">
                        {{item.content}}
                    </li>
                </ol>
                <h6>佣金计算方式</h6>
                <ol>
                    <li v-for="(item,index) in list2" :key="index">
                        {{item.content}}
                    </li>
                </ol>
                <div>
                    <table>
                        <thead>
                            <th>设置下线抽水</th>
                            <th>您获取反水佣金</th>
                            <th>下线反水金额</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in getMoney" :key="index">
                                <td>当您设置：{{item.scale}}</td>
                                <td>您反水{{item.money}}元</td>
                                <td>下线反水{{item.otherMoney}}元</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>注:每日反水，下线反水佣金直接添加到您的账户余额，无需打码，随时提现。</p>
            </div>

        </div>
        <!-- 游戏 结束 -->

        <!-- 底部 开始 -->
        <keep-alive>
            <commonfooter></commonfooter>
        </keep-alive>
        <!-- 底部 结束 -->

    </div>
</template>

<script>
import { Toast ,Indicator ,MessageBox} from "mint-ui";
import axios from "axios";
import Clipboard from "clipboard";
import commonfooter from "./../commonViews/commonfooter.vue";
import "../iconfont/iconfont.css";
export default {
    name: "promotion",
    data() {
        return {
            // 判断是否是代理用户登录
            agent: window.sessionStorage.getItem("agent"),
            user: "",
            realname: "",
            pass: "",
            realpass: "",
            qkpass: "",
            // 游戏部分数据
            active: "tab-container1",
            onoff: false,
            tgdz: "", 
            titleNav: [
                {
                    title: "下级管理",
                    id: "tab-container1"
                },
                // {
                //     title: "抽水设置",
                //     id: "tab-container2"
                // },
                {
                    title: "推广地址",
                    id: "tab-container2"
                },
                {
                    title: "添加下级",
                    id: "tab-container3"
                }
            ],

            // 下级管理
            subUser: [
                // {
                //     user: "yuzssmc",
                //     realname: "测试",
                //     balance: "1000",
                //     rebates: [
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         }
                //     ]
                // },
                // {
                //     user: "yuzssmc",
                //     realname: "测试",
                //     balance: "1000",
                //     rebates: [
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         },
                //         {
                //             platform: "真人：",
                //             scale: "0.50"
                //         }
                //     ]
                // }
            ],
            //   推广说明
            list1: [
                {
                    content:
                        "只要您是公司的有效会员就可以在《会员中心--我的推广》直接发展属于您的客户，从中赚取返水。"
                },
                {
                    content:
                        "推广方式：只要在会员推广里面的右上角点击'添加下线或复制推广链接'，即可发展您的下线，设置好下线反水即可从中盈利。"
                },
                {
                    content:
                        "代理模式会员必须是公司直属会员视为有效。公司保留对活动的最终解释"
                }
            ],
            //   推广说明
            list2: [
                {
                    content: "反水佣金=下线打码量*您设置抽下线的反水值"
                },
                {
                    content:
                        "返水计算方式：如会员当天视讯洗码10万，您设置抽取下线会员视讯1%的反水，则（100000 X 1.0% =1000）当天产生盈利当天返到您的账户余额。您可以根据您下线会员的情况个性化的设置抽水值："
                }
            ],
            //   反水表格数据
            getMoney: [
                {
                    scale: "1.0",
                    money: "1000",
                    otherMoney: "0"
                },
                {
                    scale: "0.5",
                    money: "500",
                    otherMoney: "500"
                },
                {
                    scale: "0.0",
                    money: "0",
                    otherMoney: "1000"
                }
            ],
            // 我的推广 添加下级的验证变量
            Isval1: false,
            Isval2: false,
            Isval3: false,
            Isval4: false,
            Isval5: false,
            // 我的推广 离开当前输入框是否通过验证
            state1: "",
            state2: "",
            state3: "",
            state4: "",
            state5: ""
        };
    },
    components: {
        commonfooter
    },
    computed: {
        navBar() {
            return this.$store.state.activityData.navBar;
        }
    },
    methods: {
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 下级管理 减少比例
        reduce(idx, newidx) {
            if (this.subUser[idx].rebates[newidx].scale < 0.01) {
                Toast("不能再减了呦~");
                this.subUser[idx].rebates[newidx].scale = (0).toFixed(2);
            } else {
                this.subUser[idx].rebates[newidx].scale = (
                    (this.subUser[idx].rebates[newidx].scale * 100 - 1) /
                    100
                ).toFixed(2);
            }
        },
        // 下级管理 增加比例
        add(idx, newidx) {
            if (this.subUser[idx].rebates[newidx].scale >= 1.0) {
                Toast("不能再加了呦~");
                this.subUser[idx].rebates[newidx].scale = (1).toFixed(2);
            } else {
                this.subUser[idx].rebates[newidx].scale = (
                    (this.subUser[idx].rebates[newidx].scale * 100 + 1) /
                    100
                ).toFixed(2);
            }
        },
        // 手动输入比例时判断
        changeValue(idx, newidx) {
            // 输入法的值大于1时
            if (this.subUser[idx].rebates[newidx].scale >= 1.0) {
                Toast("不能再加了呦~");
                this.subUser[idx].rebates[newidx].scale = (1).toFixed(2);
            } else if (this.subUser[idx].rebates[newidx].scale < 0.01) {
                // 输入的值小于0时
                Toast("不能再减了呦~");
                this.subUser[idx].rebates[newidx].scale = (0).toFixed(2);
            } else {
                this.subUser[idx].rebates[newidx].scale = (
                    this.subUser[idx].rebates[newidx].scale *
                    100 /
                    100
                ).toFixed(2);
            }
        },
        // 推广地址 复制邀请码
        copyMSG() {
            let clipboard = new Clipboard(".yellow");
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

        // 添加下级 用户名验证
        regUser(){
            let that = this;
            let val0 = this.user;
            let reg = /^[A-Za-z]{1}[A-Za-z0-9]{5,12}/;
            that.$post("index/user/isuser",{
                user: val0
            }).then(res=>{
                if (
                    !reg.test(val0) ||
                    val0.length < 6 ||
                    val0.length > 12
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
        },
        // 真实姓名
        regRealName(){
            let val1 = this.realname;
            if (val1 == "") {
                this.state2 = "error";
                this.Isval2 = false;
                return false;
            } else {
                this.state2 = "success";
                this.Isval2 = true;
                return true;
            }
        },
        // 登陆密码
        regPass(){
            let val2 = this.pass;
            let reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            if (val2.length < 6) {
                this.state3 = "error";
                this.Isval3 = false;
                return false;
            } else if (!reg2.test(val2) || val2.length > 12) {
                this.state3 = "error";
                this.Isval3 = false;
                return false;
            } else {
                this.state3 = "success";
                this.Isval3 = true;
                return true;
            }
        },
        // 确认密码
        regRealPass(){
            let val2 = this.pass;
            let val3 = this.realpass;
            if (val3 !== val2) {
                this.state4 = "error";
                this.Isval4 = false;
                return false;
            } else {
                this.state4 = "success";
                this.Isval4 = true;
                return true;
            }
        },
        // 取款密码
        regPass2(){
            let val4 = this.qkpass;
            let reg4 = /^\d{4}$/;
            if (!reg4.test(val4)) {
                this.state5 = "error";
                this.Isval5 = false;
                return false;
            } else {
                this.state5 = "success";
                this.Isval5 = true;
                return true;
            }
        },
       
        // 添加下级提交事件
        goSubmit() {
            let that = this;
            let parentname = window.sessionStorage.getItem("username");
            // 如果表单的正则都判断成功 则可以提交
            if (
                this.Isval1 &&
                this.Isval2 &&
                this.Isval3 &&
                this.Isval4 &&
                this.Isval5
            ) {
                that.$post("index/user/memberAdd",{
                    parentname: parentname,
                    user: this.user,
                    pass: this.pass,
                    realname: this.realname,
                    qkpass: this.qkpass
                }).then(res=>{
                    if (res == 1) {
                        alert("添加成功！");
                        // 清空表单
                        that.user = ""
                        that.realname = ""
                        that.pass = ""
                        that.realpass = ""
                        that.qkpass = ""
                        // 更新下级管理列表
                        that.searchData()
                    }else if(res == -1){
                        alert("注册上限")
                    } else {
                        alert("添加失败！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                alert("请检查是否有错误的选项！");
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
        // 请求下级管理列表
        searchData(){
            let that = this
            let user = window.sessionStorage.getItem("login_user");
            that.$post("person/index/tuiGuang",{
                user: user
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                // 推广链接
                that.tgdz = window.location.href.split("#")[0] + "#/register?id="+window.sessionStorage.getItem("username");
                // 下级代理
                that.subUser = res.son;
            }).catch(err=>{
                console.log(err);
            })
        }
        /* toggle() {
      this.onoff = !this.onoff;
      let activeList = this.$refs.activeList;
      let activityList = this.$refs.activityList;

      activeList.forEach((item, index) => {
        item.onclick = function() {
          if (this.children[1].className.indexOf("active") > -1) {
            this.children[1].classList.remove("active");
            // console.log('有active');
          } else {
            //点击时 所有的都没有active类名 都是none
            for (let i = 0; i < activeList.length; i++) {
              activeList[i].children[1].classList.remove("active");
            }
            //当前点击加上active
            this.children[1].classList.add("active");
            // console.log('没有active');
          }
        };
      });
    } */
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    activated() {
        this.searchData()        
    },
    updated() {
        // if(this.navBar){
        //   this.toggle();
        // }
        Indicator.close();
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
/* 所有表格 */
table {
    margin: 20px 0;
    width: 100%;
    text-align: center;
    font-size: 24px;
    border-collapse: collapse;
}
table th {
    padding: 15px 0;
    background-color: #ccb07e;
    color: #f5f5f5;
    border: 1px solid #919191;/*no*/
}
table td {
    padding: 10px;
    border: 1px solid #919191;/*no*/
}
/* 头部 开始 */
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
/* 头部 结束 */

/* 我的推广 开始 */
.games {
    margin-bottom: 120px;
    padding: 0 40px;
    margin-top: 100px;
}
.games .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
}
.games .nav button {
    flex: 1;
    margin: 0 10px;
    height: 60px;
    line-height: 60px;
}
.games .show {
    background-color: #ccb07e;
    color: #fff;
}
/* 下级管理 */
.contentWrap,
.contentWrap2 {
    text-align: center;
    overflow-x: scroll;
}
.contentWrap table p,
.contentWrap2 table p {
    margin: 10px 0;
}
.contentWrap table b,
.contentWrap2 table b {
    padding: 5px 10px;
    border: 1px solid #ddd;/*no*/
}
.contentWrap table input,
.contentWrap2 table input {
    width: 60px;
}
.contentWrap button,
.contentWrap2 button {
    width: 90%;
    height: 60px;
    color: #fff;
    background-color: #ccb07e;
    border-radius: 10px;
}
.w2000{
    width: 2000px;
}
/* 抽水设置 */

/* 推广地址 */
.contentWrap3 > div > p {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.contentWrap3 > div > p span {
    width: 30%;
}
.contentWrap3 > div > p button {
    width: 15%;
}
.contentWrap3 > div > p i {
    width: 55%;
    height: auto;
    word-wrap: break-word;
}
.contentWrap3 textarea {
    position: absolute;
    top: -9999px;
    opacity: 0;
}
.contentWrap3 .code {
    padding: 5px 10px;
    border: 1px solid #000;/*no*/
}
.contentWrap3 p {
    margin: 20px 0;
    text-align: center;
}

/* 添加下级 */
.contentWrap4 .reg {
    border: 1px solid #000;/*no*/
    padding: 10px;
    margin: 10px 0;
}

.contentWrap4 .mint-cell {
    margin: 10px 0;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
}
.contentWrap4 .mint-cell >>> .mint-cell-wrapper {
    font-size: 26px;
    background: none;
}
.contentWrap4 .mint-cell >>> .mint-cell-value {
    padding-left: 30%;
}
.contentWrap4 .mint-cell >>> .mint-field-other {
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    width: 30%;
    height: 100%;
}
.contentWrap4 .mint-cell >>> .mint-field-other i {
    font-size: 28px;
}
.contentWrap4 .mint-cell >>> .mint-field-other .icon-mimaxianshi {
    position: absolute;
    right: -195%;
    top: 16px;
    font-size: 40px;
}
.contentWrap4 .submit {
    width: 100%;
    height: 70px;
    color: #fff;
    background-color: #ccb07e;
}

div >>> .mint-field-clear {
    position: absolute;
    right: 99999px;
}

/* 推广说明 开始 */
.explain {
    margin-bottom: 100px;
    padding: 20px 0;
}
.explain h6 {
    margin: 6px 0;
    color: red;
    font-size: 28px;
}
.explain ol {
    margin-left: 30px;
    list-style: decimal;
}
.explain li {
    line-height: 1.5;
}

.explain p {
    color: red;
    font-size: 24px;
}
/* 我的推广 结束 */
</style>

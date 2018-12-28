<template>
    <div class="moneyTransition">
        <div v-if="loginActive">
            <!-- 头部 开始 -->
            <div class="title">
                <span>余额转换</span>
                <i @click="goBack" class="iconfont icon-left-arrow"></i>
            </div>
            <!-- 头部 结束 -->
            <!-- content 开始 -->
            <div class="content">
                <ul>
                    <li v-for="(item,index) in transitionList" :key="index">
                        <span>{{item.name}}</span>
                        <strong>余额:{{item.money}}RMB</strong>
                        <i @click="shuaxinMoney(index,$event)" class="iconfont icon-shuaxin"></i>
                    </li>
                </ul>
            </div>
            <!-- content 结束 -->

            <!-- 底部 开始 -->
            <div class="footer">
                <ul>
                    <li>
                        <select ref="platform">
                            <option v-for="(newitem,newindex) in botList" :value="newitem.name" :key="newindex">{{newitem.name}}</option>
                        </select>
                    </li>
                    <li>
                        <input type="text" ref="money" placeholder="请输入金额">
                    </li>
                </ul>
                <p>
                    <mt-button type="default" @click="transitionMoney('in')">转出到余额</mt-button>
                    <mt-button type="default" @click="transitionMoney('out')">转入到平台</mt-button>
                </p>
            </div>
            <!-- 底部 结束 -->
        </div>

    </div>
</template>

<script>
import { Indicator ,MessageBox} from "mint-ui";
import "../iconfont/iconfont.css";
export default {
    name: "moneyTransition",
    data() {
        return {
            loginActive: true,
            // body 列表
            transitionList: [],
            // select列表
            botList: []
        };
    },
    methods: {
        //返回上一层
        goBack() {
            Indicator.close(); //关闭加载中提示
            this.$router.go(-1); //返回上一层
        },
        shuaxinMoney(index, event) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user"); //用户名
            let e = event.currentTarget; //刷新按钮
            let money = e.parentNode.children[1]; //当前按钮的余额
            money.innerHTML = "加载中..";

            that.$post("person/index/userInfo",{
                user: user
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                let moneyArr = [];
                for (const i in res) {
                    moneyArr.push(res[i]);
                }
                money.innerHTML = "余额:" + moneyArr[index].money + "RMB";
            }).catch(err=>{
                console.log(err);
            })
        },
        transitionMoney(num) {
            let user = window.sessionStorage.getItem("login_user");
            let money = this.$refs.money.value;
            let platform = this.$refs.platform.value;
            let reg = /^\d+$/;
            let typed;
            if (platform && money && reg.test(money)) {
                if (num == "out") {
                    typed = "INMONEY";
                } else if (num == "in") {
                    typed = "OUTMONEY";
                }

                this.$post("game/game/moneyUpdate",{
                    user: user,
                    money: money,
                    platform: platform,
                    typed: typed
                }).then(res=>{
                    if (res == 1) {
                        //成功
                        alert("转换成功！");
                        window.location.reload();
                    } else if (res == 0) {
                        //转账失败
                        alert("转换失败！");
                    } else if (res == 2) {
                        //账户余额不足
                        alert("转换失败！账户余额不足！");
                    } else if (res == 3) {
                        //平台余额不足
                        alert("转换失败！平台余额不足！");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                alert("您输入的金额有误，请重新输入！");
            }
        }
    },
    mounted() {
    },
    created() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        if (!user) return;
        Indicator.open("加载中...");
        // axios 请求
        that.$post("person/index/userinfo",{
            user: user
        }).then(res=>{
            // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            for (const key in res) {
                that.transitionList.push(res[key]);
            }
            // 把得到的数据再次反序列化-》序列化 这样得到的新数组不影响原数组
            that.botList = JSON.parse(JSON.stringify(that.transitionList));
            that.botList.splice(that.botList.length - 1, 1);
            Indicator.close(); //关闭加载中提示
        }).catch(err=>{
            console.log(err);
            Indicator.close(); //关闭加载中提示
        })
        // 是否跳转网页升级页面
        this.common.noData(that);
        if (window.sessionStorage.getItem("login_user")) {
            let user = window.sessionStorage.getItem("login_user");
            this.loginActive = true;
        } else {
            MessageBox.confirm("请登录之后进行此操作！")
                .then(action => {
                    if (action == "confirm") {
                        //确认的回调
                        this.$router.push({ path: "/my" }); //点击确定跳转到登录的路由
                    }
                })
                .catch(err => {
                    console.log(err);
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
/* content 开始 */
.content ul {
    margin-top: 100px;
    margin-bottom: 390px;
}
.content ul li {
    padding: 0 40px;
    height: 70px;
    line-height: 70px;
    font-size: 28px;
    border-bottom: 1px solid #ddd;
}
.content strong {
    float: right;
    font-weight: normal;
    margin-right: 30px;
    font-size: 24px;
}
.content ul li i {
    position: absolute;
    right: 30px;
    color: #919191;
    font-size: 30px;
}

/* content 结束 */
/* 底部 开始 */
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 390px;
    transform: translateZ(0);
    border-top: 1px solid #ddd;
    background-color: #f1f5f8;
}
.footer ul {
    margin-top: 20px;
    padding: 10px 40px;
    background-color: #fff;
}
.footer ul li {
    padding: 20px 0;
    width: 100%;
}
.footer ul li select,
.footer ul li input {
    width: 100%;
    height: 70px;
    text-indent: 1em;
    border: 1px solid #ddd;/*no*/
    border-radius: 20px;
    outline: none;
}
.footer ul li select option {
    text-indent: 2em;
}
select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: 0;
}

.footer p {
    text-align: center;
}
.footer p button {
    margin: 25px 20px;
    width: 320px;
    height: 80px;
    color: #fff;
    border-radius: 10px;
    background-color: #ccb07e;
}
/* 底部 结束 */
</style>

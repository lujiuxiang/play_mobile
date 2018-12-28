<template>
    <div class="gamerecode">
        <!-- 头部 开始 -->
        <div class="title">
            <span>
                <span ref="gamesAll">资金记录</span>
                <!-- <i class="iconfont icon-arrfill_u-copy" ref="changeRotate"></i> -->
            </span>
            <i @touchstart.stop.prevent="goBack" class="iconfont icon-left-arrow"></i>
            <i @touchstart.stop.prevent="popupShow" class="iconfont icon-shuoming"></i>
        </div>
        <!-- 右上角 说明 开始 -->
        <mt-popup v-model="popupActive" position="right" ref="explain" lockScroll="true">
            <div class="explainWrap">
                <h6>投注记录说明</h6>
                <div>
                    <ol>
                        <li>有效玩家指的是玩家当天的有效投注额需达到1000元或以上，才算为有效玩家。</li>
                        <li>所有优惠以人民币(CNY)为结算金额，以北京时间为计时区间，计时周期 为1天。</li>
                        <li>每位玩家﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/微信/支付宝等) 及同一IP地址只能当做一个推荐好友；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利。 </li>
                        <li>澳门威尼斯人的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利。</li>
                        <li>若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，澳门威尼斯人有权要求会员向我们提供充足有效的文件，用以确认是否享有该优惠的资格。 </li>
                        <li>当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保从该存款红利或其他推广活动提供的优惠获利，澳门威尼斯人保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利。此外，公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。 </li>
                        <li>澳门威尼斯人保留对活动的最终解释权；以及在无通知玩家的情况下修改、终止活动的权利；适用于所有优惠。</li>
                    </ol>
                </div>
                <div class="btn">
                    <mt-button type="default" @click="popupShow">我知道了</mt-button>
                </div>
            </div>
        </mt-popup>
        <!-- 右上角 说明 结束 -->
        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <!-- content 顶部额度 -->
            <div class="limit clearfix">
                <span>查询日期:</span>
                <div>
                    <input type="date" @change="changeDate" :min="minTime" :max="startTime" ref="start">
                    <em>—</em>
                    <input type="date" @change="changeDate" :min="minTime" :max="endTime" ref="end">
                </div>
                <span>
                    <mt-button type="default" @click="chooseActive">快选</mt-button>
                </span>
            </div>
            <!-- 快选弹窗 -->
            <mt-popup class="chooseShow" lockScroll="true" v-model="chooseShow" position="top" popup-transition="popup-fade">
                <ul>
                    <li @click="serachRecode($event)" id="day1">今天</li>
                    <li @click="serachRecode($event)" id="day2">昨天</li>
                    <li @click="serachRecode($event)" id="day3">本周</li>
                    <li @click="serachRecode($event)" id="day4">最近7天</li>
                </ul>
            </mt-popup>

            <!-- 搜索记录 -->
            <div class="search clearfix">
                <p class="sea_left" @click="searchActive">
                    <span ref="searchType" title='all'>所有</span>
                    <i class="iconfont icon-icon"></i>
                </p>
                <p>
                    <mt-button type="default" @click="inquire">搜索</mt-button>
                </p>
            </div>
            <!-- 充值、取款处理中 -->
            <div class="dispose">
                <p>
                    <span>充值处理中：</span>
                    <i class="yellow">￥{{dispose.save}}</i>
                </p>
                <p>
                    <span>提现处理中：</span>
                    <i class="yellow">￥{{dispose.send}}</i>
                </p>
            </div>

            <!-- 内容数据 -->
            <div class="recode">
                <div class="recodeList">
                    <table v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th width="20%">时间</th>
                            <th width="20%">金额</th>
                            <th width="20%">类型</th>
                            <th width="20%">状态</th>
                            <th width="20%">平台</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in correspondence" :key="index">
                                <td width="20%">{{item.ctime}}</td>
                                <td width="20%">{{item.money}}</td>
                                <td width="20%">{{item.typed}}</td>
                                <td width="20%">{{item.style}}</td>
                                <td width="20%">{{item.platform}}</td>
                            </tr>
                            <tr v-if="correspondence.length <= 0" class="recode no">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 切换页 -->
                <div class="listButton">
                    <mt-button type="default" @click="pageSwitch(1,correspondencePage.endpage,correspondencePage.name,correspondencePage.starttime,correspondencePage.endtime)">首页</mt-button>
                    <mt-button type="default" @click="pageSwitch(correspondencePage.page - 1 ,correspondencePage.endpage,correspondencePage.name,correspondencePage.starttime,correspondencePage.endtime)">上一页</mt-button>
                    <span>当前页:
                        <i>{{correspondencePage.page}}</i>
                    </span>
                    <mt-button type="default" @click="pageSwitch(parseInt(correspondencePage.page) + 1,correspondencePage.endpage,correspondencePage.name,correspondencePage.starttime,correspondencePage.endtime)">下一页</mt-button>
                    <mt-button type="default" @click="pageSwitch(correspondencePage.endpage,correspondencePage.endpage,correspondencePage.name,correspondencePage.starttime,correspondencePage.endtime)">尾页</mt-button>
                    <span>共
                        <i>{{correspondencePage.endpage}}</i>页</span>
                    <span>共
                        <i>{{correspondencePage.count}}</i>条</span>
                </div>
                <!-- 合计 -->
                <div class="bottom">
                    <p class="botLeft">
                        <span>
                            合计:
                        </span>
                    </p>
                    <p class="botRight">
                        <i>充值总额：￥{{allData.inmoney}}</i>
                        <i>提现总额：￥{{allData.outmoney}}</i>
                        <i>优惠总额：￥{{allData.discount}}</i>
                        <i>返水总额：￥{{allData.rebate}}</i>
                    </p>
                </div>
            </div>

            <!-- 搜索类型弹窗 -->
            <mt-popup class="searchPop" lockScroll="true" v-model="searchShow" position="top" popup-transition="popup-fade">
                <ul>
                    <li v-for="(item,index) in information" :name="item.name" :key="index" @click="typeChange($event,item.name)">{{item.text}}</li>

                </ul>
            </mt-popup>

        </div>
        <!-- content 结束 -->

        <!-- 头部 全部 下拉列表 开始 -->
        <!-- <div class="titleAll">
        <mt-popup
            v-model="titleAllList"
            position="top">
            <ul class="">
                <li v-for="(item,index) in information" ref="information" :key="index" @click="changeTitle">
                    <span>{{item.text}}</span>
                </li>
            </ul>
            
        </mt-popup>
    </div> -->
        <!-- 头部 全部 下拉列表 结束 -->

        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import { Indicator, MessageBox } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css"; //icon
import "../css/explain.css"; //说明的 css
import "../js/touch.js"; //上滑 下滑js
export default {
    name: "andRecode",
    data() {
        return {
            // 快选弹窗
            chooseShow: false,
            // 记录类型弹窗
            searchShow: false,
            // 右上角 说明
            popupActive: false,
            // 全部点击时 下拉列表数据
            information: [
                {
                    text: "所有",
                    name: "all"
                },
                {
                    text: "存款",
                    name: "inmoney"
                },
                {
                    text: "取款",
                    name: "outmoney"
                },
                {
                    text: "转账",
                    name: "remark"
                },
                {
                    text: "返水",
                    name: "rebate"
                }

                // {
                //     text: "优惠",
                //     name: ""
                // },
            ],
            // 资金记录 处理中
            dispose: {
                save: "0.00",
                send: "0.00"
            },
            // 资金记录
            correspondence: [],
            // 资金记录的切换页
            correspondencePage: [],

            // 查询时间的 开始、结束时间 和 最小查询时间
            startTime: "",
            endTime: "",
            minTime: "",
            // 没有数据时显示无数据
            isShow: true,

            // 合计总数
            allData: {}
        };
    },
    components: {
        commonfooter
    },
    methods: {
        // 快选弹窗 显示
        chooseActive() {
            this.chooseShow = !this.chooseShow;
        },
        // 快选弹窗的li点击搜索
        serachRecode(event) {
            let id = event.currentTarget.id,
                start = this.$refs.start,
                end = this.$refs.end,
                date = new Date();
            let nowYear = date.getFullYear().toString();
            let nowMonth = (date.getMonth() + 1).toString();
            let nowDay = date.getDate().toString();
            // 小于10时，补0
            function timeAdd0(str) {
                if (str < 10) {
                    str = "0" + str;
                }
                return str;
            }
            // 判断点击的是哪一个 （今天，昨天，本周，最近七天）
            switch (id) {
                case "day1":
                    // 开始时间 和 结束时间 都是今天
                    start.value = end.value =
                        timeAdd0(nowYear) +
                        "-" +
                        timeAdd0(nowMonth) +
                        "-" +
                        timeAdd0(nowDay);
                    break;
                case "day2":
                    // 开始时间 和 结束时间 都是昨天
                    start.value = end.value =
                        timeAdd0(nowYear) +
                        "-" +
                        timeAdd0(nowMonth) +
                        "-" +
                        timeAdd0(nowDay - 1);
                    break;
                case "day3":
                    let week = date.getDay(); //获取时间的星期数
                    let minus = week ? week - 1 : 6;
                    date.setDate(date.getDate() - minus); //获取minus天前的日期
                    let y = date.getFullYear();
                    let m =
                        date.getMonth() + 1 < 10
                            ? "0" + (date.getMonth() + 1)
                            : date.getMonth() + 1; //获取月份
                    let d =
                        date.getDate() < 10
                            ? "0" + date.getDate()
                            : date.getDate();
                    // 开始时间
                    start.value = y + "-" + m + "-" + d;
                    // 结束时间
                    end.value =
                        timeAdd0(nowYear) +
                        "-" +
                        timeAdd0(nowMonth) +
                        "-" +
                        timeAdd0(nowDay);
                    break;
                case "day4":
                    var targetday_milliseconds =
                        date.getTime() + 1000 * 60 * 60 * 24 * -6;
                    date.setTime(targetday_milliseconds); //注意，这行是关键代码
                    y = date.getFullYear();
                    m =
                        date.getMonth() + 1 < 10
                            ? "0" + (date.getMonth() + 1)
                            : date.getMonth() + 1; //获取月份
                    d =
                        date.getDate() < 10
                            ? "0" + date.getDate()
                            : date.getDate();
                    // 开始时间
                    start.value = y + "-" + m + "-" + d;
                    // 结束时间
                    end.value =
                        timeAdd0(nowYear) +
                        "-" +
                        timeAdd0(nowMonth) +
                        "-" +
                        timeAdd0(nowDay);
                    break;

                default:
                    break;
            }
            this.inquire();
            this.chooseShow = false;
        },
        // 搜索类型弹窗显示/隐藏
        searchActive() {
            this.searchShow = !this.searchShow;
        },
        // 点击改变搜索的类型
        typeChange(event, name) {
            let inner = event.currentTarget.innerText;
            let searchType = this.$refs.searchType;
            // 改变span的内容
            searchType.innerHTML = inner;
            // 改变span的title 搜索时根据title 时间进行搜索
            searchType.title = name;
            this.searchShow = false;
        },
        // 右上角 说明的显示与隐藏
        popupShow() {
            this.popupActive = !this.popupActive;
        },
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
        // 头部 全部 导航显示/隐藏
        titleAll() {
            // 控制全部导航的显示与隐藏
            this.titleAllList = !this.titleAllList;
            // 获取全部右侧的三角
            let changeRotate = this.$refs.changeRotate;
            // 如果导航为显示状态 就让三角旋转180度 隐藏状态时 还原为不旋转状态
            if (this.titleAllList) {
                changeRotate.style.transform = "rotate(180deg)";
            } else {
                changeRotate.style.transform = "rotate(0deg)";
            }
        },
        // 日期改变查询函数
        changeDate() {
            let starttime = this.$refs.start;
            let endtime = this.$refs.end;
            if (
                starttime.value < this.minTime ||
                starttime.value > this.endTime
            ) {
                alert("只能查看一周内的记录！");
                starttime.value = this.minTime;
                return;
            }
            if (endtime.value < this.minTime || endtime.value > this.endTime) {
                alert("只能查看一周内的记录！");
                endtime.value = this.endTime;
                return;
            }
        },
        // 按时间、类型进行查询 函数
        inquire() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let startTime = this.$refs.start.value; //开始时间
            let endTime = this.$refs.end.value; //结束时间
            let name = this.$refs.searchType.title; //查询类型
            if (startTime > endTime || startTime == "" || endTime == "") {
                alert("您输入的查询日期不正确，请确认后查询！");
                return;
            }

            if (startTime < this.minTime || startTime > this.endTime || endTime < this.minTime || endTime > this.endTime) {
                alert("只能查看七天前到今天的记录！");
                startTime = this.minTime;
                endTime = this.endTime;
                return;
            }
            // axios 请求 查询
            this.searchDataAxios(user,name,startTime,endTime)
        },

        // 切换页
        pageSwitch(page, endpage, name, starttime, endtime) {
            let user = window.sessionStorage.getItem("login_user");
            let that = this;
            if (page > endpage) return;
            if (page <= 0) return;

            // axios请求 -- 切换页
            this.searchDataAxios(user,name,starttime,endtime,page)
        },
        // 上滑 下滑切换页
        vuetouch: function(s, e) {
            let page = this.correspondencePage.page,
                endpage = this.correspondencePage.endpage,
                pagename = this.correspondencePage.name;
            if (s.name == "上滑") {
                page = parseInt(page) + 1;
                this.pageSwitch(page, endpage, pagename);
            } else if (s.name == "下滑") {
                page = page - 1;
                this.pageSwitch(page, endpage, pagename);
            }
        },
        // axios 查询请求
        searchDataAxios(user,name,startTime,endTime,page){
            let that = this
            that.$post("person/index/pageOtherSelect",{
                page: page,
                user: user,
                name: name,
                starttime: startTime,
                endtime: endTime
            }).then(res=>{
                Indicator.close()
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                that.correspondence = res.info;
                that.correspondencePage = res.page;
                that.allData = res.sum; //合计
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted() {
        Indicator.open("加载中...");
        let user = window.sessionStorage.getItem("login_user");
        let that = this;
        // axios 请求
        this.searchDataAxios(user,"all")
        
        // 时间查询
        let starttime = this.$refs.start;
        let endtime = this.$refs.end;
        //得到当前时间
        let date_now = new Date();
        //得到当前年份
        let year = date_now.getFullYear();
        //得到当前月份
        //注：
        //  1：js中获取Date中的month时，会比当前月份少一个月，所以这里需要先加一
        //  2: 判断当前月份是否小于10，如果小于，那么就在月份的前面加一个 '0' ， 如果大于，就显示当前月份
        let month =
            date_now.getMonth() + 1 < 10
                ? "0" + (date_now.getMonth() + 1)
                : date_now.getMonth() + 1;
        //得到当前日子（多少号）
        let date =
            date_now.getDate() < 10
                ? "0" + date_now.getDate()
                : date_now.getDate();
        //设置input标签的默认时间为当前时间
        this.startTime = year + "-" + month + "-" + date;
        this.endTime = year + "-" + month + "-" + date;
        starttime.value = this.startTime;
        endtime.value = this.endTime;
        // 最小查询时间为7天前
        let dateAll1 = date_now.getTime() - 6 * 24 * 3600 * 1000; //获取当前日期到七天前的毫秒数
        let dateAll2 = new Date(dateAll1);
        let date1 = dateAll2.getFullYear();
        let date2 =
            dateAll2.getMonth() + 1 < 10
                ? "0" + (dateAll2.getMonth() + 1)
                : dateAll2.getMonth() + 1;
        let date3 =
            dateAll2.getDate() < 10
                ? "0" + dateAll2.getDate()
                : dateAll2.getDate();
        this.minTime = date1 + "-" + date2 + "-" + date3;
    },
    activated() {
        let that = this;
        this.common.noData(that);
        // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
        if(this.popupActive == true || this.chooseShow == true || this.searchShow == true){
            this.common.afterOpen();
        }else{
            this.common.beforeClose();
        }
    },
    watch:{
        popupActive(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        },
        chooseShow(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        },
        searchShow(val,oldval){
            // 判断当前页面弹窗是否是弹出状态 如果是 阻止父级页面滚动 不是则开启浏览器默认滑动
            if(val == true){
                this.common.afterOpen();
            }else{
                this.common.beforeClose();
            }
        },
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
        next();
    }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yellow {
    color: #ffc26a;
}

/* content 开始 */
.content {
    position: relative;
    margin-top: 100px;
    margin-bottom: 260px;
    border: 1px solid transparent;
    font-size: 28px;
}
.limit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    margin: 20px 10px 20px 10px;
    text-align: center;
    background-color: #fff;
}
.limit > span {
    width: 30%;
}

.limit > div {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.limit em {
    width: 10%;
    overflow: hidden;
}
.limit input {
    width: 45%;
    font-size: 24px;
}
.limit button {
    width: 80%;
    height: 50px;
    line-height: 50px;
    text-align: center;
}

/* 取款处理 */
.dispose {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0;
}
.dispose p {
    flex: 1;
    text-align: center;
}

/* 内容数据  */
.content {
    background-color: #fff;
}
.content .recode {
    min-height: 370px;
    background-color: #fff;
    text-align: center;
}
.content .recode > span {
    line-height: 375px;
}
.recodeList {
    padding: 10px 20px;
    text-align: left;
}
.recodeList table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}
.recodeList table th {
    padding: 10px 20px;
    background-color: #eee;
    border: 1px solid #ddd;/*no*/
}
.recodeList table td {
    padding: 10px;
    border: 1px solid #ddd;/*no*/
}

/* content 结束 */

/* 没有数据 */
.no p {
    text-align: center;
}
.no img {
    padding-top: 40px;
    width: 35%;
}

/* 底部切换页 */
.listButton {
    font-size: 24px;
    padding: 40px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
.listButton button,
.listButton span {
    margin: 0 4px;
}

/* 底部合计 */
.bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 100px;
    height: 140px;
    background-color: #e4ecf7;
}
.bottom .botLeft {
    flex: 1;
}
.bottom .botRight {
    flex: 6;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
}
.bottom .botRight i {
    width: 50%;
    padding: 5px 0 5px 20px;
    box-sizing: border-box;
}
</style>

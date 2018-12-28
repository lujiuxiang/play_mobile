<template>
    <div class="gamerecode">
        <!-- 头部 开始 -->
        <div class="title">
            <span>
                <span ref="gamesAll" style="color:#fff;">推荐记录</span>
            </span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
            <i @click="popupShow" class="iconfont icon-shuoming"></i>
        </div>
        <!-- 右上角 说明 开始 -->
        <mt-popup v-model="popupActive" position="right" ref="explain" lockScroll="true">
            <div class="explainWrap">
                <h6>推荐收益说明</h6>
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
            <!-- 时间查询 -->
            <div class="limit time clearfix">
                <span>查询日期：</span>
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

            <!-- 推荐获益 -->
            <div class="get">
                <div class="topRecode">
                    <p>
                        <span>昨日获得推荐红利：</span>
                        <i class="orange">0.00</i>
                    </p>
                    <p>
                        <span>您已推荐好友</span><br>
                        <i class="blue">{{count}}人</i>
                    </p>
                    <p>
                        <span>您已获得</span>
                        <i class="green">0.00</i>
                        <span>推荐单次奖励</span>
                    </p>
                    <p>
                        <span>您已获得</span>
                        <i class="orange">0.00</i>
                        <span>推荐红利</span>
                    </p>

                </div>
            </div>

            <!-- 内容数据 -->
            <div>
                <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                    <thead>
                        <th width="25%">好友账号</th>
                        <th width="25%">注册时间</th>
                        <th width="25%">状态</th>
                        <th width="25%">推荐单次奖励</th>
                    </thead>
                    <tbody>

                        <tr v-if="friendRecode.length <= 0" class="recode no">
                            <td colspan="4" style="height:80px;">
                                <p>
                                    <img src="../../static/images/recodeNo.png" alt="">
                                </p>
                                暂时没有数据
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- 切换页 -->
                <div class="listButton">
                    <mt-button type="default" @click="PageBet(1,page.endpage,page.name)">首页</mt-button>
                    <mt-button type="default" @click="PageBet(page.page - 1 ,page.endpage,page.name)">上一页</mt-button>
                    <span>当前页:
                        <i>{{page.page}}</i>
                    </span>
                    <mt-button type="default" @click="PageBet(parseInt(page.page) + 1,page.endpage,page.name)">下一页</mt-button>
                    <mt-button type="default" @click="PageBet(page.endpage,page.endpage,page.name)">尾页</mt-button>
                    <span>共
                        <i>{{page.endpage}}</i>页</span>
                    <span>共
                        <i>{{page.count}}</i>条</span>
                </div>
            </div>
        </div>
        <!-- content 结束 -->
        <!-- 底部 -->
        <commonfooter></commonfooter>

    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
import commonfooter from "./../commonViews/commonfooter";
import "../iconfont/iconfont.css"; //icon
import "../css/explain.css"; //说明的 css
import "../js/touch.js"; //上滑 下滑js
export default {
    name: "friendRecode",
    data() {
        return {
            // 快选弹窗
            chooseShow: false,
            // 右上角 说明
            popupActive: false,
            // 查询时间的 开始、结束时间 和 最小查询时间
            startTime: "",
            endTime: "",
            minTime: "",
            // 推荐人数
            count: "",

            friendRecode: [],

            page: {}
        };
    },
    components: {
        commonfooter
    },
    methods: {
        // 右上角 说明的显示与隐藏
        popupShow() {
            this.popupActive = !this.popupActive;
        },
        //返回上一层
        goBack() {
            this.$router.go(-1); //返回上一层
        },
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
            this.inquire(this.page.name);
            this.chooseShow = false;
        },

        // 日期改变查询函数
        changeDate() {
            let starttime = this.$refs.start;
            let endtime = this.$refs.end;
            if (
                starttime.value < this.minTime ||
                starttime.value > this.endTime ||
                endtime.value < this.minTime || 
                endtime.value > this.endTime
            ) {
                alert("只能查看一周内的记录！");
                starttime.value = this.minTime;
                endtime.value = this.endTime;
                return;
            }
        },
        // axios 查询请求
        searchDataAxios(user,name,startTime,endTime,page){
            let that = this
            that.$post("person/index/pageRemarkSelect",{
                user: user,
                name: name,
                starttime: startTime,
                endtime: endTime,
                page: page
            }).then(res=>{
                // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                if (res == -1 || res == -2) {
                    that.common.isOnline(that, res);
                    return;
                }
                switch (name) {
                    case "Ag":
                        that.allInfo[0] = res.info;
                        that.page = res.page;
                        break;
                    case "Mg":
                        that.allInfo[1] = res.info;
                        that.page = res.page;
                        break;
                    case "Gd":
                        that.allInfo[2] = res.info;
                        that.page = res.page;
                        break;
                    case "Cq9":
                        that.allInfo[3] = res.info;
                        that.page = res.page;
                        break;
                    case "2":
                        that.allInfo[4] = res.info;
                        that.page = res.page;
                        break;
                    case "101":
                        that.allInfo[5] = res.info;
                        that.page = res.page;
                        break;
                    case "102":
                        that.allInfo[6] = res.info;
                        that.page = res.page;
                        break;
                    case "201":
                        that.allInfo[7] = res.info;
                        that.page = res.page;
                        break;

                    default:
                        break;
                }
                Indicator.close();
            }).catch(err=>{
                console.log(err);
                Indicator.close();                
            })
        },
        // 按时间查询 函数
        inquire(name) {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let startTime = this.$refs.start.value;
            let endTime = this.$refs.end.value;

            // 判断起始日期是否大于结束日期
            if (startTime > endTime || startTime == "" || endTime == "") {
                alert("您输入的查询日期不正确，请确认后查询！");
                return;
            }
            Indicator.open("加载中...");
            // axios 请求
            that.searchDataAxios(user,name,startTime,endTime)
        },

        //切换页
        PageBet(page, endpage, name, starttime, endtime) {
            let user = window.sessionStorage.getItem("login_user");
            let that = this;
            if (page <= 0) return;
            if (page > endpage) return;
            Indicator.open("加载中...");
            // axios 请求
            that.searchDataAxios(user,name,startTime,endTime,page)
        },

        // 上滑 下滑切换页
        vuetouch: function(s, e) {
            let page = this.page.page,
                endpage = this.page.endpage,
                pagename = this.page.name;
            if (s.name == "上滑") {
                page = parseInt(page) + 1;
                this.PageBet(page, endpage, pagename);
            } else if (s.name == "下滑") {
                page = page - 1;
                this.PageBet(page, endpage, pagename);
            }
        }
    },
    mounted() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        if (!user) return;
        Indicator.open("加载中...");
        // axios 请求
        that.$post("person",{
            user: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            that.count = res.tj.count; //推荐人数
            Indicator.close();
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })

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
        if(this.popupActive == true || this.chooseShow == true){
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
.orange {
    color: orange;
}
.blue {
    color: blue;
}
.green {
    color: green;
}

/* content 开始 */
.content {
    margin-top: 100px;
    margin-bottom: 120px;
    border: 1px solid transparent;
}

/* 查询 */
.limit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    text-align: center;
    background-color: #fff;
}
.time {
    margin-top: 10px;
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
}
.limit button {
    width: 80%;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
/* 内容数据  */
.get {
    padding: 0 10px;
}
.topRecode {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border: 1px solid #b7cef2;/*no*/
    border-radius: 10px;
    background-color: #f1f5f7;
}
.topRecode p {
    width: 23%;
    text-align: center;
    font-size: 24px;
}

.content > div:nth-of-type(3) {
    padding: 0 20px;
}
table {
    padding: 0 20px;
    margin-top: 20px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-collapse: collapse;
    border-spacing: 0;
}
table thead {
    width: 100%;
    background-color: #ddd;
}
th {
    padding: 10px;
    width: 20%;
    border: 1px solid #aaa;/*no*/
}
td {
    width: 20%;
    padding: 10px;
    border: 1px solid #aaa;/*no*/
}
td i {
    color: red;
}

/* content 结束 */

/* 头部 今日 下拉列表 */
.titleList > div {
    width: 100%;
    margin-top: 100px;
}
.titleList ul {
    width: 100%;
    height: 135px;
    background-color: #fff;
    box-shadow: 0 10px 10px #aaa;
}
.titleList ul li {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: space-around;
    align-items: center;
}
.titleList ul li button {
    width: 15%;
    color: black;
    border: 1px solid #000;/*no*/
    border-radius: 10px;
    background-color: #fff;
}
.titleList >>> .v-modal {
    background: none;
}

/* 头部 全部 下拉列表 */
.titleAll > div {
    flex-wrap: wrap;
    width: 100%;
    height: 320px;
    margin-top: 100px;
}
.titleAll >>> .v-modal {
    background-color: rgba(0, 0, 0, 0.3);
}
.titleAll ul {
    float: left;
    padding: 0 30px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.titleAll ul li {
    height: 80px;
    line-height: 80px;
    border-bottom: 2px solid #ddd;
}
.titleAll .l-t-left {
    padding: 0;
    width: 100%;
    text-align: center;
    background-color: #fff;
}
.titleAll .l-t-right {
    display: none;
    text-align: center;
}

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

/* 没有数据 */
.recode {
    text-align: center;
    padding: 100px 0;
    background-color: #fff;
}
.recode td {
    padding: 30px;
}
.recode img {
    width: 35%;
}
</style>

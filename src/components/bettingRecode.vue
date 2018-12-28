<template>
    <div class="gamerecode">
        <!-- 头部 开始 -->
        <div class="title">
            <span @click="titleAllShow">
                <span ref="gamesAll" style="color:#fff;">{{page.name}}</span>
                <i class="iconfont icon-arrfill_u-copy" ref="changeRotate"></i>
            </span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
            <i @click="popupShow" class="iconfont icon-shuoming"></i>
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

        <!-- 头部 全部 下拉列表 开始 -->
        <mt-popup v-model="titleAllList" class="titleAll" position="top" lockScroll="true">
            <ul class="l-t-left">
                <li ref="titleLeftIndex" v-for="(item,value,index) in tradingList" @click="changeTitleIndex(index)" :key="index">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="l-t-right">
                <ul v-show="titleIndex == index" v-for="(item,value,index) in tradingList" :key="index">
                    <li ref="navBar" @click="changeTitle($event)">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>

        </mt-popup>
        <!-- 头部 全部 下拉列表 结束 -->

        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <!-- 时间查询 -->
            <div class="limit time clearfix">
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

            <!-- 内容数据 -->
            <div>
                <div class="limit" v-if="allInfo.length > 0">
                    <!-- <ul>
                        <li>交易额度：
                            <i>{{allrecode.allmoney}}</i>元
                            <span>总笔数：
                                <i>{{allrecode.allnum}}</i>笔</span>
                        </li>
                        <li>投注金额：￥{{allrecode.betmoney}}</li>
                        <li>中奖金额：￥
                            <i>{{allrecode.winmoney}}</i>元</li>
                        <li>投注信息：{{allrecode.mess}}</li>
                    </ul> -->
                    <!-- AG -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>平台类型</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>派彩时间</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[0]" :key="index">
                                <td>{{item.platformType}}</td>
                                <td>{{item.betTime}}</td>
                                <td>{{item.betAmount}}</td>
                                <td>{{item.recalcuTime}}</td>
                                <td>{{item.flag}}</td>
                            </tr>
                            <tr v-if="allInfo[0].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- MG -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>用户名</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>派彩金额</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[1]" :key="index">
                                <td>{{item.PlayerName}}</td>
                                <td>{{item.GameEndTime}}</td>
                                <td>
                                    <i>{{item.TotalWager}}</i>
                                </td>
                                <td>{{item.TotalPayout}}</td>
                                <td>{{item.CurrencyCode}}</td>
                            </tr>
                            <tr v-if="allInfo[1].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- GD -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>游戏账号</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>派彩事件</th>
                            <th>总亏赢</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[2]" :key="index">
                                <td>{{item.GameID}}</td>
                                <td>{{item.BetTime}}</td>
                                <td>
                                    <i>{{item.BetAmount}}</i>
                                </td>
                                <td>{{item.BalanceTime}}</td>
                                <td>{{item.WinLoss}}</td>
                            </tr>
                            <tr v-if="allInfo[2].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- CQ9 -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">

                        <thead>
                            <th>游戏平台</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>抽水金额</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[3]" :key="index">
                                <td>{{item.gameplat}}</td>
                                <td>{{item.bettime}}</td>
                                <td>
                                    <i>{{item.bet}}</i>
                                </td>
                                <td>{{item.rake}}</td>
                                <td>{{item.win}}</td>
                            </tr>
                            <tr v-if="allInfo[3].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM2 -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>游戏平台</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>输赢</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[4]" :key="index">
                                <td>{{item.Platform}}</td>
                                <td>{{item.DateCreated}}</td>
                                <td>{{item.BetAmount}}</td>
                                <td>{{item.WinLoss}}</td>
                                <td>{{item.Status}}</td>
                            </tr>
                            <tr v-if="allInfo[4].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM101 -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>游戏名称</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>派彩</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[5]" :key="index">
                                <td>{{item.GameName}}</td>
                                <td>{{item.DateCreated}}</td>
                                <td>{{item.BetAmount}}</td>
                                <td>{{item.ProgressiveWin}}</td>
                                <td>{{item.Status}}</td>
                            </tr>
                            <tr v-if="allInfo[5].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM102 -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>游戏名称</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>派彩</th>
                            <th>结余</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[6]" :key="index">
                                <td>{{item.GameName}}</td>
                                <td>{{item.GameDate}}</td>
                                <td>{{item.currentBet}}</td>
                                <td>{{item.ProgressiveWin}}</td>
                                <td>{{item.balance}}</td>
                            </tr>
                            <tr v-if="allInfo[6].length <= 0" class="recode">
                                <td colspan="5" style="height:80px;">
                                    <p>
                                        <img src="../../static/images/recodeNo.png" alt="">
                                    </p>
                                    暂时没有数据
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <!-- IM201 -->
                    <table class="tableList" v-swipeup="{fn:vuetouch,name:'上滑'}" v-swipedown="{fn:vuetouch,name:'下滑'}">
                        <thead>
                            <th>游戏名称</th>
                            <th>投注时间</th>
                            <th>投注额</th>
                            <th>输赢</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[7]" :key="index">
                                <td>{{item.GameName}}</td>
                                <td>{{item.DateCreated}}</td>
                                <td>{{item.BetAmount}}</td>
                                <td>{{item.WinLoss}}</td>
                                <td>{{item.Status}}</td>
                            </tr>
                            <tr v-if="allInfo[7].length <= 0" class="recode">
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

                <!-- 合计 -->
                <div class="bottom">
                    <p class="botLeft">
                        <span>
                            合计:
                        </span>
                    </p>
                    <p class="botRight">
                        <i>投注总额：￥{{Data.allmoney}}</i>
                        <i>派彩：￥{{Data.win}}</i>
                        <i>有效投注额：￥{{Data.valid}}</i>
                        <i>投注笔数：{{Data.num}}笔</i>
                    </p>

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
    name: "bettingRecode",
    data() {
        return {
            // 快选弹窗
            chooseShow: false,
            // 右上角 说明
            popupActive: false,
            // 头部 全部 导航显示/隐藏
            titleAllList: false,
            // 默认顶部全部的导航显示第一个
            titleIndex: 0,
            // 游戏列表与页数
            allInfo: [],
            AllPage: [],
            page: [],

            // 查询时间的 开始、结束时间 和 最小查询时间
            startTime: "",
            endTime: "",
            minTime: "",

            // 投注记录头部 所有的游戏列表
            tradingNav: [],
            // 投注记录 详细列表
            tradingList: {},

            // 合计总数
            Data: {
                allmoney: "0.00",
                win: "0.00",
                valid: "0.00",
                num: "0"
            }
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
        changeTitleIndex(index) {
            // 获取左侧导航
            let titleLeftIndex = this.$refs.titleLeftIndex;
            // 点击时先让所有的左侧导航背景色清空
            for (let i = 0; i < titleLeftIndex.length; i++) {
                titleLeftIndex[i].style.background = "#eee";
            }
            // 当前背景色改变
            titleLeftIndex[index].style.background = "#fff";
            this.titleIndex = index;
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
        // 头部 全部 导航显示/隐藏
        titleAllShow() {
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
        // 点击游戏列表 顶部title文字改变
        changeTitle(e) {
            // 获取当前点击的那一个元素
            e = e.currentTarget;
            // 获取顶部title标签
            let gamesAll = this.$refs.gamesAll;
            // 获取顶部title标签右侧的三角
            let changeRotate = this.$refs.changeRotate;
            // 顶部标签的内容变成当前点击的内容
            gamesAll.innerHTML = e.children[0].innerHTML;
            // 点击之后让下拉框隐藏
            this.titleAllList = false;
            // 点击之后让下拉框隐藏 三角旋转为最初状态
            changeRotate.style.transform = "rotate(0deg)";
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

        //投注记录的切换页
        PageBet(page, endpage, name, starttime, endtime) {
            let user = window.sessionStorage.getItem("login_user");
            let that = this;
            if (page <= 0) return;
            if (page > endpage) return;
            // axios 请求
            that.searchDataAxios(user,name,starttime,endtime,page)
        },
        // 投注记录 点击顶部导航显示对应记录列表
        tableShow() {
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let titleNav = this.$refs.navBar; //顶部导航
            let tableList = document.getElementsByClassName("tableList"); //顶部导航的对应列表
            // 默认第一组显示 （AG）
            titleNav[0].children[0].style.color = "red";
            tableList[0].style.display = "table";
            // 之后点击哪个显示哪个
            titleNav.forEach((item, index) => {
                item.onclick = function() {
                    for (let i = 0; i < tableList.length; i++) {
                        titleNav[i].children[0].style.color = "#000";
                        tableList[i].style.display = "none";
                    }
                    tableList[index].style.display = "table";
                    titleNav[index].children[0].style.color = "red";
                    // 当前平台的总计金额
                    let platform = titleNav[index].children[0].innerHTML
                        .split("IM")
                        .join("");
                    // axios 请求
                    that.$post("person/index/numTotal",{
                        user: user,
                        platform: platform,
                        typed: "Bet"
                    }).then(res=>{
                        // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                        if (res == -1 || res == -2) {
                            that.common.isOnline(that, res);
                            return;
                        }
                        that.Data = res;
                        Indicator.close();
                    }).catch(err=>{
                        Indicator.close();
                        console.log(err);
                    })
                    switch (titleNav[index].children[0].innerHTML) {
                        case "Ag":
                            that.page = that.AllPage[0];
                            break;
                        case "Mg":
                            that.page = that.AllPage[1];
                            break;
                        case "Gd":
                            that.page = that.AllPage[2];
                            break;
                        case "Cq9":
                            that.page = that.AllPage[3];
                            break;
                        case "IM2":
                            that.page = that.AllPage[4];
                            break;
                        case "IM101":
                            that.page = that.AllPage[5];
                            break;
                        case "IM102":
                            that.page = that.AllPage[6];
                            break;
                        case "IM201":
                            that.page = that.AllPage[7];
                            break;
                        default:
                            break;
                    }
                };
            });
        },

        // 上滑 下滑切换页
        vuetouch: function(s, e) {
            let page = this.page.page,
                endpage = this.page.endpage,
                name = this.page.name;
            if (s.name == "上滑") {
                page = parseInt(page) + 1;
                this.PageBet(page, endpage, name);
            } else if (s.name == "下滑") {
                page = page - 1;
                this.PageBet(page, endpage, name);
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
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        Indicator.open("加载中...");

        that.$post("person",{
            user: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            that.tradingList = res.game; //交易记录的 投注记录

            // 获取IM所有的子数组
            let IM2 = that.tradingList.Im.sub[2].info;
            let IM101 = that.tradingList.Im.sub[101].info;
            let IM102 = that.tradingList.Im.sub[102].info;
            let IM201 = that.tradingList.Im.sub[201].info;
            // 获取IM所有的子数组 切换页
            let IM2Page = that.tradingList.Im.sub[2].page;
            let IM101Page = that.tradingList.Im.sub[101].page;
            let IM102Page = that.tradingList.Im.sub[102].page;
            let IM201Page = that.tradingList.Im.sub[201].page;
            // 把子数组合并成对象 然后添加进tradingNav
            that.tradingList.IM2 = {
                name: "IM2",
                sub: { info: IM2, page: IM2Page }
            };
            that.tradingList.IM101 = {
                name: "IM101",
                sub: { info: IM101, page: IM101Page }
            };
            that.tradingList.IM102 = {
                name: "IM102",
                sub: { info: IM102, page: IM102Page }
            };
            that.tradingList.IM201 = {
                name: "IM201",
                sub: { info: IM201, page: IM201Page }
            };
            // 删除IM对象
            delete that.tradingList.Im;
            for (const key in that.tradingList) {
                that.allInfo.push(that.tradingList[key].sub.info);
                that.AllPage.push(that.tradingList[key].sub.page);
            }
            // 默认第一页显示页数
            that.page = that.AllPage[0];
            Indicator.close();

            that.$nextTick(() => {
                that.tableShow();
            });
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
/* content 开始 */
.content {
    margin-top: 100px;
    margin-bottom: 260px;
    border: 1px solid transparent;
}

/* 查询 */

.limit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
}
.time {
    margin-top: 20px;
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
table {
    display: none;
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
    border: 1px solid #aaa;
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

/* 头部 全部 下拉列表 */
.titleAll {
    display: flex;
    width: 100%;
    height: 600px;
    margin-top: 100px;
}
.titleAll >>> .v-modal {
    background-color: rgba(0, 0, 0, 0.3);
}
.titleAll .l-t-left {
    width: 35%;
    height: 100%;
    text-indent: 40px;
    overflow-y: auto;
}
.titleAll ul li:nth-of-type(1) {
    background-color: #fff;
}
.titleAll ul li {
    height: 80px;
    line-height: 80px;
}
.titleAll .l-t-left li {
    background-color: #eee;
}
.titleAll .l-t-right {
    padding: 0 40px;
    width: 65%;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    overflow-y: auto;
}
.titleAll .l-t-right li {
    border-bottom: 2px solid #ddd;
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
    width: 40%;
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
    text-align: center;
}
.bottom .botRight {
    flex: 6;
    display: flex;
    flex-wrap: wrap;
}
.bottom .botRight i {
    width: 50%;
    padding: 5px 0 5px 20px;
    box-sizing: border-box;
}
</style>

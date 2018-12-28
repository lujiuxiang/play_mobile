<template>
    <div class="gamerecode">
        <!-- 头部 开始 -->
        <div class="title">
            <span @click="titleAllShow">
                <span ref="gamesAll" style="color:#fff;">{{page.name}}</span>
                <i class="iconfont icon-arrfill_u-copy" ref="changeRotate"></i>
            </span>
            <i @click="goBack" class="iconfont icon-left-arrow"></i>
            <em @click="listShow">今日</em>
        </div>
        <!-- 头部 全部 下拉列表 开始 -->
        <div class="titleAll">
            <mt-popup v-model="titleAllList" position="top" lockScroll="true">
                <ul class="l-t-left">
                    <li ref="navBar" v-for="(item,index) in tradingList" @click="changeTitle($event)" :key="index">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </mt-popup>
        </div>
        <!-- 头部 全部 下拉列表 结束 -->
        <!-- 头部今日下拉列表 开始 -->
        <div class="titleList">
            <mt-popup v-model="popupVisible" position="top" lockScroll="true">
                <ul>
                    <li>
                        <mt-button type="default">今天</mt-button>
                        <mt-button type="default">昨天</mt-button>
                    </li>
                    <li>
                        <mt-button type="default">近三天</mt-button>
                        <mt-button type="default">近七天</mt-button>
                    </li>
                </ul>
            </mt-popup>
        </div>
        <!-- 头部今日下拉列表 结束 -->

        <!-- 头部 结束 -->
        <!-- content 开始 -->
        <div class="content">
            <!-- 时间查询 -->
            <div class="limit time clearfix">
                <input type="date" ref="start"> — <input type="date" ref="end">
                <mt-button type="default" @click="inquire($event,page.name)">查询</mt-button>
            </div>

            <!-- 内容数据 -->
            <div>
                <div class="limit" v-if="allInfo.length > 0">
                    <!-- <ul>
                    <li>交易额度：<i>{{allrecode.allmoney}}</i>元<span>总笔数：<i>{{allrecode.allnum}}</i>笔</span></li>
                    <li>投注金额：￥{{allrecode.betmoney}}</li>
                    <li>中奖金额：￥<i>{{allrecode.winmoney}}</i>元</li>
                    <li>投注信息：{{allrecode.mess}}</li>
                </ul> -->
                    <!-- AG -->
                    <table class="tableList">
                        <thead>
                            <th>下注时间</th>
                            <th>游戏局号</th>
                            <th>下注金额</th>
                            <th>玩家输赢额度</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[0]" :key="index">
                                <td>{{item.betTime}}</td>
                                <td>{{item.gameCode}}</td>
                                <td>
                                    <i>{{item.betAmount}}</i>
                                </td>
                                <td>{{item.netAmount}}</td>
                            </tr>
                            <tr v-if="allInfo[0].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- MG -->
                    <table class="tableList">
                        <thead>
                            <th>ISO日期</th>
                            <th>玩家账号</th>
                            <th>下注金额</th>
                            <th>派彩金额</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[1]" :key="index">
                                <td>{{item.GameEndTime}}</td>
                                <td>{{item.PlayerName}}</td>
                                <td>
                                    <i>{{item.TotalWager}}</i>
                                </td>
                                <td>{{item.TotalPayout}}</td>
                            </tr>
                            <tr v-if="allInfo[1].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- GD -->
                    <table class="tableList">
                        <thead>
                            <th>下注时间</th>
                            <th>游戏账号</th>
                            <th>下注金额</th>
                            <th>游戏结果</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[2]" :key="index">
                                <td>{{item.BetTime}}</td>
                                <td>{{item.GameID}}</td>
                                <td>
                                    <i>{{item.BetAmount}}</i>
                                </td>
                                <td>{{item.GameResult}}</td>
                            </tr>
                            <tr v-if="allInfo[2].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- CQ9 -->
                    <table class="tableList">
                        <thead>
                            <th>下注时间</th>
                            <th>玩家账号</th>
                            <th>下注金额</th>
                            <th>游戏输赢</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[3]" :key="index">
                                <td>{{item.bettime}}</td>
                                <td>{{item.account}}</td>
                                <td>
                                    <i>{{item.bet}}</i>
                                </td>
                                <td>{{item.win}}</td>
                            </tr>
                            <tr v-if="allInfo[3].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM2 -->
                    <table class="tableList">
                        <thead>
                            <th>下注金额</th>
                            <th>玩家账号</th>
                            <th>下注时间</th>
                            <th>游戏输赢</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[4]" :key="index">
                                <td>{{item.BetAmount}}</td>
                                <td>{{item.PlayerId}}</td>
                                <td>
                                    <i>{{item.Platform}}</i>
                                </td>
                                <td>{{item.WinLoss}}</td>
                            </tr>
                            <tr v-if="allInfo[4].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM101 -->
                    <table class="tableList">
                        <thead>
                            <th>玩家账号</th>
                            <th>下注金额</th>
                            <th>下注时间</th>
                            <th>游戏输赢</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[5]" :key="index">
                                <td>{{item.PlayerId}}</td>
                                <td>{{item.BetAmount}}</td>
                                <td>
                                    <i>{{item.GameDate}}</i>
                                </td>
                                <td>{{item.WinLoss}}</td>
                            </tr>
                            <tr v-if="allInfo[5].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- IM102 -->
                    <table class="tableList">
                        <thead>
                            <th>下注时间</th>
                            <th>玩家账号</th>
                            <th>游戏名称</th>
                            <th>赢得奖金</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[6]" :key="index">
                                <td>{{item.GameDate}}</td>
                                <td>{{item.PlayerName}}</td>
                                <td>
                                    <i>{{item.GameName}}</i>
                                </td>
                                <td>{{item.Win}}</td>
                            </tr>
                            <tr v-if="allInfo[6].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
                            </tr>
                        </tbody>

                    </table>
                    <!-- IM201 -->
                    <table class="tableList">
                        <thead>
                            <th>玩家账号</th>
                            <th>下注金额</th>
                            <th>下注时间</th>
                            <th>游戏输赢</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allInfo[7]" :key="index">
                                <td>{{item.PlayerId}}</td>
                                <td>{{item.BetAmount}}</td>
                                <td>
                                    <i>{{item.LastUpdatedDate}}</i>
                                </td>
                                <td>{{item.WinLoss}}</td>
                            </tr>
                            <tr v-if="allInfo[7].length <= 0" class="recode">
                                <td colspan="4" style="height:80px;">暂时没有数据</td>
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
import "../iconfont/iconfont.css";
export default {
    name: "gameRecode",
    data() {
        return {
            // 头部 今日 导航显示/隐藏
            popupVisible: false,
            // 头部 全部 导航显示/隐藏
            titleAllList: false,
            // allrecode:{
            //     allmoney:'3000',
            //     allnum:'2',
            //     betmoney:'3000',
            //     winmoney:'80400',
            //     mess:'二串一 1注 1500倍',
            // },
            /* recodeList:[
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
            {
                date:'2018-08-18 14:00',
                game:'斗地主',
                winmoney:'+500',
                result:'让球负'
            },
        ], */
            // 交易额度和总笔数
            /* limit:{
            sum:'10',
            amount:'20'
        }, */
            // 全部点击时 所有的游戏列表
            /* allGames:[
            {
                leftText:'FG棋牌',
                sub:[
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌1'
                    },
                    {
                        rightText:'FG棋牌2'
                    },
                    {
                        rightText:'FG棋牌3'
                    },
                    {
                        rightText:'FG棋牌4'
                    },
                    {
                        rightText:'FG棋牌5'
                    },
                    {
                        rightText:'FG棋牌6'
                    },
                    {
                        rightText:'FG棋牌7'
                    },
                    {
                        rightText:'FG棋牌8'
                    },
                ]
            },
            {
                leftText:'FG电子',
                sub:[
                    {
                        rightText:'FG电子1'
                    },
                    {
                        rightText:'FG电子2'
                    },
                    {
                        rightText:'FG电子3'
                    },
                    {
                        rightText:'FG电子4'
                    },
                    {
                        rightText:'FG电子5'
                    },
                    {
                        rightText:'FG电子6'
                    },
                    {
                        rightText:'FG电子7'
                    },
                    {
                        rightText:'FG电子8'
                    },
                ]
            },
            {
                leftText:'BG平台',
                sub:[
                    {
                        rightText:'BG平台1'
                    },
                    {
                        rightText:'BG平台2'
                    },
                    {
                        rightText:'BG平台3'
                    },
                    {
                        rightText:'BG平台4'
                    },
                    {
                        rightText:'BG平台5'
                    },
                    {
                        rightText:'BG平台6'
                    },
                    {
                        rightText:'BG平台7'
                    },
                    {
                        rightText:'BG平台8'
                    },
                ]
            },
            {
                leftText:'PT电子',
                sub:[
                    {
                        rightText:'PT电子1'
                    },
                    {
                        rightText:'PT电子2'
                    },
                    {
                        rightText:'PT电子3'
                    },
                    {
                        rightText:'PT电子4'
                    },
                    {
                        rightText:'PT电子5'
                    },
                    {
                        rightText:'PT电子6'
                    },
                    {
                        rightText:'PT电子7'
                    },
                    {
                        rightText:'PT电子8'
                    },
                ]
            },
            {
                leftText:'HC电竞',
                sub:[
                    {
                        rightText:'HC电竞1'
                    },
                    {
                        rightText:'HC电竞2'
                    },
                    {
                        rightText:'HC电竞3'
                    },
                    {
                        rightText:'HC电竞4'
                    },
                    {
                        rightText:'HC电竞5'
                    },
                    {
                        rightText:'HC电竞6'
                    },
                    {
                        rightText:'HC电竞7'
                    },
                    {
                        rightText:'HC电竞8'
                    },
                ]
            },
            {
                leftText:'彩票',
                sub:[
                    {
                        rightText:'彩票1'
                    },
                    {
                        rightText:'彩票2'
                    },
                    {
                        rightText:'彩票3'
                    },
                    {
                        rightText:'彩票4'
                    },
                    {
                        rightText:'彩票5'
                    },
                    {
                        rightText:'彩票6'
                    },
                    {
                        rightText:'彩票7'
                    },
                    {
                        rightText:'彩票8'
                    },
                ]
            },
            {
                leftText:'DG视讯',
                sub:[
                    {
                        rightText:'DG视讯1'
                    },
                    {
                        rightText:'DG视讯2'
                    },
                    {
                        rightText:'DG视讯3'
                    },
                    {
                        rightText:'DG视讯4'
                    },
                    {
                        rightText:'DG视讯5'
                    },
                    {
                        rightText:'DG视讯6'
                    },
                    {
                        rightText:'DG视讯7'
                    },
                    {
                        rightText:'DG视讯8'
                    },
                ]
            },
            {
                leftText:'MG电子',
                sub:[
                    {
                        rightText:'MG电子1'
                    },
                    {
                        rightText:'MG电子2'
                    },
                    {
                        rightText:'MG电子3'
                    },
                    {
                        rightText:'MG电子4'
                    },
                    {
                        rightText:'MG电子5'
                    },
                    {
                        rightText:'MG电子6'
                    },
                    {
                        rightText:'MG电子7'
                    },
                    {
                        rightText:'MG电子8'
                    },
                ]
            },
            {
                leftText:'KY棋牌',
                sub:[
                    {
                        rightText:'KY棋牌1'
                    },
                    {
                        rightText:'KY棋牌2'
                    },
                    {
                        rightText:'KY棋牌3'
                    },
                    {
                        rightText:'KY棋牌4'
                    },
                    {
                        rightText:'KY棋牌5'
                    },
                    {
                        rightText:'KY棋牌6'
                    },
                    {
                        rightText:'KY棋牌7'
                    },
                    {
                        rightText:'KY棋牌8'
                    },
                ]
            },
            {
                leftText:'FG电子',
                sub:[
                    {
                        rightText:'FG电子1'
                    },
                    {
                        rightText:'FG电子2'
                    },
                    {
                        rightText:'FG电子3'
                    },
                    {
                        rightText:'FG电子4'
                    },
                    {
                        rightText:'FG电子5'
                    },
                    {
                        rightText:'FG电子6'
                    },
                    {
                        rightText:'FG电子7'
                    },
                    {
                        rightText:'FG电子8'
                    },
                ]
            },
            {
                leftText:'BG平台',
                sub:[
                    {
                        rightText:'BG平台1'
                    },
                    {
                        rightText:'BG平台2'
                    },
                    {
                        rightText:'BG平台3'
                    },
                    {
                        rightText:'BG平台4'
                    },
                    {
                        rightText:'BG平台5'
                    },
                    {
                        rightText:'BG平台6'
                    },
                    {
                        rightText:'BG平台7'
                    },
                    {
                        rightText:'BG平台8'
                    },
                ]
            },
            {
                leftText:'PT电子',
                sub:[
                    {
                        rightText:'PT电子1'
                    },
                    {
                        rightText:'PT电子2'
                    },
                    {
                        rightText:'PT电子3'
                    },
                    {
                        rightText:'PT电子4'
                    },
                    {
                        rightText:'PT电子5'
                    },
                    {
                        rightText:'PT电子6'
                    },
                    {
                        rightText:'PT电子7'
                    },
                    {
                        rightText:'PT电子8'
                    },
                ]
            },
            {
                leftText:'彩票',
                sub:[
                    {
                        rightText:'彩票1'
                    },
                    {
                        rightText:'彩票2'
                    },
                    {
                        rightText:'彩票3'
                    },
                    {
                        rightText:'彩票4'
                    },
                    {
                        rightText:'彩票5'
                    },
                    {
                        rightText:'彩票6'
                    },
                    {
                        rightText:'彩票7'
                    },
                    {
                        rightText:'彩票8'
                    },
                ]
            },
        ], */

            allInfo: [],
            AllPage: [],
            page: [],

            // 投注记录头部 所有的游戏列表
            tradingNav: [],
            // 投注记录 详细列表
            tradingList: {}
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
        // 头部 今日 导航显示/隐藏
        listShow() {
            this.popupVisible = !this.popupVisible;
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
        // 点击右侧游戏 顶部title文字改变
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
        // axios 查询请求
        searchDataAxios(user,name,startTime,endTime,page){
            that.$post("person/index/pageRemarkSelect",{
                user: user,
                name: name,
                starttime: startTime,
                endtime: endTime,
                page: page ? page : ""
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
        inquire(event, name) {
            Indicator.open("加载中...");
            let that = this;
            let user = window.sessionStorage.getItem("login_user");
            let e = event.currentTarget;
            let startTime = e.parentNode.children[0].value;
            let endTime = e.parentNode.children[1].value;
            if (startTime > endTime || startTime == "" || endTime == "") {
                alert("您输入的查询日期不正确，请确认后查询！");
                return;
            }
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
            that.searchDataAxios(user,name,startTime,endTime,page)
        },
        // 投注记录 点击顶部导航显示对应记录列表
        tableShow() {
            let that = this;
            let titleNav = this.$refs.navBar; //顶部导航
            let tableList = document.getElementsByClassName("tableList"); //顶部导航的对应列表
            titleNav[0].children[0].style.color = "red";
            tableList[0].style.display = "table";
            titleNav.forEach((item, index) => {
                item.onclick = function() {
                    for (let i = 0; i < tableList.length; i++) {
                        titleNav[i].children[0].style.color = "#000";
                        tableList[i].style.display = "none";
                    }
                    tableList[index].style.display = "table";
                    titleNav[index].children[0].style.color = "red";
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
        }
    },
    created(){
        let that = this;
        this.common.noData(that);
    },
    mounted() {
        let that = this;
        let user = window.sessionStorage.getItem("login_user");
        if (!user) return;
        // 头部的全部列表
        Indicator.open("加载中...");

        that.$post("person/index/userinfo",{
            user: user
        }).then(res=>{
            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
            if (res == -1 || res == -2) {
                that.common.isOnline(that, res);
                return;
            }
            for (const key in res) {
                that.tradingNav.push(res[key]);
            }
            that.tradingNav.splice(that.tradingNav.length - 1, 1);
            that.$nextTick(function() {
                that.tableShow(); //头部下拉菜单
                Indicator.close();
            });
        }).catch(err=>{
            console.log(err);
            Indicator.close();
        })


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
        }).catch(err=>{
            console.log(err);
        })
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
/* 顶部回退框 */
.title {
    position: fixed;
    top: 0;
    z-index: 99999;
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
.title span i {
    display: inline-block;
    position: relative;
    top: 2px;
    left: 0;
}
.title em {
    position: absolute;
    right: 30px;
    font-style: normal;
    height: 100%;
    font-size: 34px;
    color: #fff;
    line-height: 100px;
}
/* 顶部回退框 */
/* content 开始 */
.content {
    margin-top: 100px;
    margin-bottom: 120px;
    border: 1px solid transparent;
}

/* 查询 */
.time {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
}
.limit {
    padding: 0 20px;
}
.limit ul {
    border-top: 2px solid #ddd;
}
.limit ul li {
    padding: 20px;
    border-bottom: 2px solid #ddd;
}
.limit ul li span {
    float: right;
}
.limit ul li i {
    padding-right: 5px;
    color: red;
}
/* 内容数据  */
table {
    display: none;
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
    width: 25%;
    border: 1px solid #aaa;
}
td {
    width: 25%;
    padding: 10px;
    border: 1px solid #aaa;/*no*/
}
td i {
    color: red;
}

/* 分页 */
.page {
    padding-top: 30px;
    text-align: center;
    background-color: #eee;
}
.page p {
    text-align: center;
}
.page i {
    font-style: normal;
}
.page p > span {
    display: inline-block;
    margin: 20px 0;
    width: 40px;
    height: 45px;
    line-height: 45px;
    border: 1px solid #303030;/*no*/
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px 0;
    padding: 0 30px;
}

/* 没有数据 */
.recode {
    text-align: center;
    padding: 100px 0;
    background-color: #fff;
}
</style>

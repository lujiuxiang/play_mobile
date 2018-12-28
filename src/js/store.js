import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: null,
        header_title: "", //网站头部名称
        login: "", // !!用于判断是否登录
        titleLogo: "",
        popList: "",
        banner: [], // 首页轮播
        news: "", //最新消息
        winner_list: [], //获奖名单
        slideBar: "", //首页侧边导航
        noRead: "", //未读消息
        // 首页加载时游戏列表（判断是不是试玩账号）
        gList: "", //首页游戏列表
        // 优惠活动
        activityData: {
            navBar: ""
        },
        // 会员中心
        MemberCenter: {
            // that.tradingNav = data
            myAccount: "", //我的账户 平台游戏及余额
            bankBalance: [{
                left: '账户余额',
                money: '',
            }, ], //自动余额总余额
            allbalance: "", //手动余额总余额
            // 银行交易 额度转换 手动转换 左侧列表、
            // 把对象重新变成字符串 在变成对象 达到不影响原对象的目的
            limitLeft: "",
        },
        // 会员中心 头部信息
        MemberCenterTitle: {
            nowVip: "",
            nextVip: "",
            recharge: "",
            consume: "",
            percent: ""
        }

    },
    actions: {
        // 所有公共数据及首页数据
        handle_getData({ state, commit }) {
            return new Promise(() => {
                Vue.prototype.$get('index/index/info').then((res) => {
                    commit("newData", res)
                })
            })
        },
        // 获取未读消息
        handle_getNoread({ commit }, info) {
            return new Promise(() => {
                info.that.$get("index/index/info", { user: info.user }).then((res) => {
                    // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        info.that.common.isOnline(info.that, res);
                        return;
                    }
                    commit("newNoread", res)
                })

            })
        },
        // 优惠活动
        handle_getActivity({ commit }, info) {
            return new Promise(() => {
                info.that.$get(info.url).then((res) => {
                    commit("newActivity", res)
                })
            })
        },
        // 会员中心
        handle_getMemberCenter({ commit }, info) {
            return new Promise(() => {
                info.that.$post("person/index/userInfo", { user: info.user })
                    .then((res) => {
                        // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                        if (res == -1 || res == -2) {
                            info.that.common.isOnline(info.that, res);
                            return;
                        }
                        commit("newMemberCenter", res)
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
        },
        // // 会员中心 会员头部信息
        handle_getMemberCenterTitle({ commit }, info) {
            return new Promise(() => {
                info.that.$post("person/index/memberClass", { user: info.user }).then((res) => {
                    // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        info.that.common.isOnline(info.that, res);
                        return;
                    }
                    commit("newMemberCenterTitle", res)
                })
            })
        },
        // 首页加载时游戏列表（判断是不是试玩账号）
        handle_indexGames({ commit }, info) {
            return new Promise(() => {
                info.that.$post(info.url, info.params).then((res) => {
                    // 如果data为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        info.that.common.isOnline(info.that, res);
                        return;
                    }
                    commit("newIndexGames", res)
                })

            })
        },
        // 登录时判断是否是代理登录（首页导航和下级管理改变）
        handle_getAgent({ commit }, info) {
            info.that.$post("person/index/isagent", { user: info.user })
                .then((res) => {
                    commit("newAgentInfo", res)
                })
                .catch(err => {
                    console.log(err);
                })
        }

    },
    mutations: {
        // 所有公共数据及首页数据
        newData(state, data) {
            state.header_title = data.headerTitle //网站头部名称
            state.winner_list = data.price //获奖名单
                // 首页logo图片
            state.titleLogo = data.logoInfo[1].logo1
                // 首页弹窗
            state.popList = data.activeAlert
            state.banner = data.banner; //首页轮播
            state.news = data.mobileNews; //最新消息
            state.slideBar = data.mobilemenu //首页侧边栏导航
        },
        // 获取未读消息
        newNoread(state, data) {
            state.noRead = data.newChatInfo.num
        },

        // 优惠活动
        newActivity(state, data) {
            state.activityData.navBar = data
        },
        // 会员中心
        newMemberCenter(state, data) {
            // 默认 银行交易的 总余额为传过来的值
            state.MemberCenter.bankBalance[0].money = data.summoney.money //自动余额总余额
            state.MemberCenter.allbalance = data.summoney.money //手动余额总余额
                // 银行交易 额度转换 手动转换 左侧列表、
                // 把对象重新变成字符串 在变成对象 达到不影响原对象的目的
            state.MemberCenter.limitLeft = JSON.parse(JSON.stringify(data))
                // 删除对象赋予的总余额
            delete(state.MemberCenter.limitLeft.summoney)
        },
        // 会员中心 会员头部信息
        newMemberCenterTitle(state, data) {
            state.MemberCenterTitle.nowVip = data.vip //我的账户 现在vip等级
            state.MemberCenterTitle.nextVip = data.nexttitle //我的账户 下个vip等级
            state.MemberCenterTitle.recharge = data.nowmoney //我的账户 目前消费金额
            state.MemberCenterTitle.consume = data.upmoney //我的账户 游戏消费金额
            state.MemberCenterTitle.percent = (data.nowmoney / data.upmoney) * 100 //我的账户 百分比
        },
        // 首页加载时游戏列表（判断是不是试玩账号）
        newIndexGames(state, data) {
            state.gList = data
        },

        // 是否是代理登录
        newAgentInfo(state, data) {
            if (data == 1) {
                window.sessionStorage.setItem("agent", "true")
            } else {
                window.sessionStorage.getItem("agent") ? window.sessionStorage.removeItem("agent") : "";
            }
        }
    },

})
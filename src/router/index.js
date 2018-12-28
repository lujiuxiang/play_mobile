import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        // 首页
        {
            path: '/',
            name: 'index',
            component: resolve => require(['../components/index'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 搜索
        {
            path: '/search',
            name: 'search',
            component: resolve => require(['../components/search'], resolve),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        // 活动
        {
            path: '/activities',
            name: 'activities',
            component: resolve => require(['../components/activities'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 注册
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['../commonViews/register'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 客服
        {
            path: '/service',
            name: 'service',
            component: resolve => require(['../components/service'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 我的
        {
            path: '/my',
            name: 'my',
            component: resolve => require(['../components/my'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 安全中心
        {
            path: '/safe',
            name: 'safe',
            component: resolve => require(['../components/safe'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 余额转换
        {
            path: '/moneyTransition',
            name: 'moneyTransition',
            component: resolve => require(['../components/moneyTransition'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 修改登录密码
        {
            path: '/changePassword',
            name: 'changePassword',
            component: resolve => require(['../components/changePassword'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 修改取款密码
        {
            path: '/changeqkpass',
            name: 'changeqkpass',
            component: resolve => require(['../components/changeqkpass'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 修改LEBO密码
        {
            path: '/changeLEBO',
            name: 'changeLEBO',
            component: resolve => require(['../components/changeLEBO'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 会员
        {
            path: '/member',
            name: 'member',
            component: resolve => require(['../components/member'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }

        },
        // 会员消息
        {
            path: '/memberMsg',
            name: 'memberMsg',
            component: resolve => require(['../components/memberMsg'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 会员消息 详情页
        {
            path: '/memberMsgInformation',
            name: "memberMsgInformation",
            component: resolve => require(['../components/memberMsgInformation'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 推荐好友
        {
            path: '/promotion',
            name: 'promotion',
            component: resolve => require(['../components/promotion'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 余额转换记录
        {
            path: '/transitionRecode',
            name: 'transitionRecode',
            component: resolve => require(['../components/transitionRecode'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 推荐记录
        {
            path: '/friendRecode',
            name: 'friendRecode',
            component: resolve => require(['../components/friendRecode'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 游戏记录
        {
            path: '/gameRecode',
            name: 'gameRecode',
            component: resolve => require(['../components/gameRecode'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 投注记录
        {
            path: '/bettingRecode',
            name: 'bettingRecode',
            component: resolve => require(['../components/bettingRecode'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 来往记录
        {
            path: '/andRecode',
            name: 'andRecode',
            component: resolve => require(['../components/andRecode'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 充值
        {
            path: '/topUp',
            name: 'topUp',
            component: resolve => require(['../components/topUp'], resolve),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        // 提现
        {
            path: '/withdrawMoney',
            name: 'withdrawMoney',
            component: resolve => require(['../components/withdrawMoney'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../commonViews/login'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 忘记密码
        {
            path: '/forgetPassword',
            name: 'forgetPassword',
            component: resolve => require(['../components/forgetPassword'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 绑定银行卡
        {
            path: '/bank',
            name: 'bank',
            component: resolve => require(['../components/bank'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 微信转账到银行卡教程
        {
            path: '/helpWeixin',
            name: 'helpWeixin',
            component: resolve => require(['../components/helpWeixin'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        // 支付宝转账到银行卡教程
        {
            path: '/helpZfb',
            name: 'helpZfb',
            component: resolve => require(['../components/helpZfb'], resolve),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },

        // 我的收藏
        {
            path: '/collect',
            name: 'collect',
            component: resolve => require(['../components/collect'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 侧边栏游戏页面
        {
            path: '/listBarGames',
            name: 'listBarGames',
            component: resolve => require(['../components/listBarGames'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 最近浏览
        {
            path: '/browse',
            name: 'browse',
            component: resolve => require(['../components/browse'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        // 维护中
        {
            path: '/noData',
            name: 'noData',
            component: resolve => require(['../commonViews/noData'], resolve),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
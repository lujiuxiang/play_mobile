import Vue from "vue"
import { MessageBox, Indicator, InfiniteScroll, Toast } from "mint-ui";
export default {
    // 进入网页升级页面
    noData(that) {
        that.$post("index/index/isonline")
            .then(res => {
                if (res == 1) {
                    that.$router.push({
                        name: 'noData'
                    });
                    return
                }
            }).catch(err => {
                console.log(err);
            })
    },
    // 异地登录之后重新登录 或者登陆超时重新登录
    isOnline(that, num) {
        window.sessionStorage.clear()
        if (num == -1) {
            alert("您的账号在另一处登录！请重新登录！")
        } else if (num == -2) {
            alert("登陆超时，请重新登录！")
        }
        Indicator.close();
        that.$router.push({
            path: '/my'
        });
        // 第一次弹窗之后把当前函数清空 然后刷新页面
        this.isOnline = function() {}
        setTimeout(() => {
            window.location.reload()
        }, 300)
    },
    // 跳转游戏
    goin(id, a, b, c, event, that) {
        // 日期时间
        let dateleft = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日";
        let dateright = new Date().toLocaleTimeString();
        let shoucangList = [];
        //如果gamename不存在 则此次点击为客服中心 需要跳转
        if (a == null) {
            window.open(b, "_blank")
        } else {
            // 如果gamename不为null 则是正常游戏 继续执行
            if (window.sessionStorage.getItem("login_user")) {
                Indicator.open("加载中...");
                let win = window.open() // 跳转游戏链接 新窗口
                let user = window.sessionStorage.getItem("login_user");

                that.$post("game/game/index", {
                    user: user,
                    game: a,
                    gamecode: b,
                    moneycode: c
                }).then(res => {
                    // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                    if (res == -1 || res == -2) {
                        win.close()
                        setTimeout(() => {
                            that.common.isOnline(that, res);
                        }, 300)
                        return;
                    }
                    if (res.Code && res.Code != 0) {
                        // 跳转游戏链接 新窗口关闭
                        win.close()
                        Indicator.close();
                        // 关闭窗口后 提示不支持信息
                        MessageBox({
                            title: "提示",
                            message: res.Message,
                            showCancelButton: true
                        });
                        return
                    }
                    // 最近浏览
                    that.$post("index/method/recentlyadd", {
                            userid: user,
                            gameid: id
                        }).then(res => {
                            // 如果res为-1 则表示账号在别处登录 -2则表示登陆超时
                            if (res == -1 || res == -2) {
                                that.common.isOnline(that, res);
                                return;
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                        // 跳转游戏链接 新窗口
                    win.location = res
                    Indicator.close();
                }).catch(err => {
                    // 跳转游戏链接 新窗口关闭
                    win.close();
                    console.log(err);
                })
            } else if (window.sessionStorage.getItem("username")) {
                Indicator.open("加载中...");
                let win = window.open() // 跳转游戏链接 新窗口
                let user = window.sessionStorage.getItem("username");
                that.$post("game/game/index", {
                    user: user,
                    game: a,
                    gamecode: b,
                    moneycode: c
                }).then(res => {
                    if (res.Code && res.Code != 0) {
                        // 跳转游戏链接 新窗口关闭
                        win.close()
                        Indicator.close();
                        // 关闭窗口后 提示不支持信息
                        MessageBox({
                            title: "提示",
                            message: res.Message,
                            showCancelButton: true
                        });
                        return
                    }
                    // 跳转游戏链接 新窗口
                    win.location = res
                    Indicator.close();
                }).catch(err => {
                    // 跳转游戏链接 新窗口关闭
                    win.close();
                    console.log(err);
                })
            } else {
                Indicator.close();
                MessageBox({
                        title: "提示",
                        message: "请登录进入游戏！",
                        showCancelButton: true,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    })
                    .then(action => {
                        if (action == "confirm") {
                            //确认的回调
                            this.$router.push({
                                path: "/my"
                            }); //点击确定跳转到登录的路由
                        }
                    })
                    .catch(err => {
                        //取消的回调
                    });
            }
        }
    },
    afterOpen() {
        document.body.classList.add('dialog-open');
    },
    beforeClose() {
        document.body.classList.remove('dialog-open');
    }
}
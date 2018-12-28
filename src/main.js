// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();
require('es6-promise/auto');
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// 引入全部组件\
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './js/store'
import common from './js/common.js'
import bank from './js/bank.js'
import {get, post } from './js/http' //axios封装

Vue.use(MintUI)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: "",
    loading: "",
    attempt: 3
});
FastClick.attach(document.body)
    // 引入公共js
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.common = common
Vue.prototype.bank = bank

// 跳转后返回顶部
router.beforeEach((to, from, next) => {
    next()
    setTimeout(() => {
        window.pageYOffset ? window.pageYOffset = 0 : "";
        document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : ""
        document.body.scrollTop ? document.body.scrollTop = 0 : ""
    }, 1000);
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',

})
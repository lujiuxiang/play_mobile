import axios from 'axios'
import Vue from 'vue'
import { Toast } from "mint-ui"
import Qs from 'qs'
import store from './store'

//判断生产测试上线环境设置不同url
axios.defaults.baseURL = 'http://148.72.206.211:803/';
// if (process.env.NODE_EVN == 'development') {
//     axios.defaults.baseURL = 'http://148.72.206.211:803/';
// } else if (process.env.NODE_EVN == 'debug') {
//     axios.defaults.baseURL = 'http://148.72.206.211:803/';
// } else if (process.env.NODE_EVN == 'production') {
//     axios.defaults.baseURL = 'http://148.72.206.211:803/';
// }

axios.defaults.timeout = 20000; //超时请求20秒
// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器（注意登陆注册不需要拦截,当然拦截情况下，后台可以选择拒绝接收）
axios.interceptors.request.use(
        config => {
            // 在发送请求之前 做签名认证
            var newParams = config.params;
            if (newParams == undefined) {
                newParams = config.params = new Object();
            }
            // 每次发送请求前在请求头设置时间戳
            newParams.time_code = new Date().getTime();
            // console.log(config);
            return config;
        },
        // 对请求错误做些什么
        error => {
            Promise.reject(error)
        }
    )
    //     //响应拦截器
axios.interceptors.response.use(
        response => {
            // 对响应数据做点什么
            // 如果返回200，说明请求成功
            // if (response.status === 200) {
            return Promise.resolve(response);
            // } else {
            // return Promise.reject(response);
            // }
        },
        error => {
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 404:
                        Toast("网络请求不存在,状态码:" + error.response.request.status);
                        break;

                    default:
                        Toast("请求错误,状态码:" + error.response.request.status);
                }
                return Promise.reject(error);
            }

            //请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
            if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
                var config = error.config;
                config.__retryCount = config.__retryCount || 0;
                if (config.__retryCount >= config.retry) {
                    // Reject with the error
                    //window.location.reload();
                    return Promise.reject(error);
                }
                // Increase the retry count
                config.__retryCount += 1;
                // Create new promise to handle exponential backoff
                var backoff = new Promise(function(resolve) {
                    setTimeout(function() {
                        // console.log('resolve');
                        resolve();
                    }, config.retryDelay || 1);
                });
                return backoff.then(function() {
                    return axios(config);
                });
            } else {
                return Promise.reject(error);
            }

        }
    )
    //get封装
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
    });
}
//post封装
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios({
                method: 'post',
                data: Qs.stringify(params),
                url: url,
            })
            .then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err)
            });
    });
}
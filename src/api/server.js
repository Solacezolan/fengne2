import URL from "../envconfig/envconfig.js"
import axios from 'axios';

var instance = axios.create({
timeout: 1000,
});
//  取消请求相关

let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); 
            pending.splice(p, 1); 
        }
    }
}


axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = JSON.stringify(config.data);
    }
    removePending(config); //在一个ajax发送前执行一下取消操作
     config.cancelToken = new cancelToken((c)=>{
        pending.push({ u: config.url + '&' + config.method, f: c });  
    });

    return config;
},(error) =>{
    return Promise.reject(error);
});

axios.interceptors.response.use((res) =>{
    removePending(res.config);
    console.log(res)
    if(!res){
        return Promise.reject(res);
    }
    if(res.data.code !== '0000'){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return { data: {} };
});

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        instance.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Created by zhangbin on 2017/7/6.
 */
import axios from 'axios';
import common from './../common/common';
import interfaces from './interfaces';

export default {
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },
  range: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  request:(option) => {
    let method=option.method?option.method:'get';

    let putData={
      url:interfaces.interfaces[option.interface],
      method:method,
      headers:{
        token:option.token?option.token:''
      }
    }
    if(method=='get'){
      putData.params = option.data;
    }else if(method=='post'){
      putData.data=option.data;
    }
    /**
     * 请求拦截：在请求之前执行 比如loading处理
     * */
    return new Promise((resolve,reject)=>{
      axios.interceptors.request.use(function (config) {
        common.loading();
        return config;
      })
      /**
       * 请求完成后执行
       * */
      axios.interceptors.response.use(function (response) {

        let status = response.data.success;
        console.log("进入状态"+status);
        if(status == 203){ //无认证状态
          console.log("进入203状态")
            window.location.href = "/login.html";
            return;
          }
          common.removeLoading();
          return response;
        }
      )

      axios(putData).then(res=>{
        resolve({
          status:0,
          result:res.data
        })
      }).catch((error)=>{
        console.log(error);
        reject('error');
      });
    });

  },
  upFile:  (e)=> {
    return new Promise((resolve,reject)=>{
      axios.interceptors.request.use(function (config) {
        common.loading();
        return config;
      })
      /**
       * 请求完成后执行
       * */
      axios.interceptors.response.use(function (response) {
        common.removeLoading();
        return response;
      })
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('file',file,file.name);//通过append向form对象添加数据
      //param.append('chunk','0');//添加form表单中其他数据
      //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      axios.post(interfaces.interfaces.uploadArticleAreaImage,param,config)
        .then(response=>{
          common.removeLoading();
          resolve({
            status:0,
            result:response.data
          });
        }).catch(()=>{
          common.removeLoading();
          reject('error');
      });
    });

  }
};

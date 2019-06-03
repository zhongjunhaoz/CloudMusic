const API = require('../../API/api');
const app = getApp();

Page({
 
  data: {
    pay:[],//付费精品列表
  },


  onLoad: function (options) {
    this.getPay();
  },

  getPay: function () {
    API.getPay({}).then(res => {
      if (res.code === 200) {
        this.setData({
          pay: res.data.list
        })
      }
    })
  }
  
})
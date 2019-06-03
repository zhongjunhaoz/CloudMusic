const API = require('../../API/api');
const app = getApp();


Page({
  
  data: {
    toplists:[]//所有榜单
  },

 
  onLoad: function (options) {
    this.getTopList();
  },

  getTopList: function () {
    API.getTopList({}).then(res => {
      if (res.code === 200) {
        this.setData({
          toplists: res.list
        })
      }
    })
  },
})
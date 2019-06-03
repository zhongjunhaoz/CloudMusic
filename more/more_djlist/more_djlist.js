const API = require('../../API/api');
const app = getApp();

Page({

  data: {
    djlists:[],//电台分类列表
  },


  onLoad: function (options) {
    this.getDjList();
  },

  getDjList: function () {
    API.getDjList({}).then(res => {
      this.setData({
        djlists: res.categories
      })
    })
  }
})
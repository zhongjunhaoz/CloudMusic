const API = require('../../API/api');
const app = getApp();

Page({

  data: {
    djlists:[],//电台分类列表
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.getDjList();
  },

  getDjList: function () {
    API.getDjList({}).then(res => {
      this.setData({
        djlists: res.categories
      })
    })
  },
  handlePlayDj:function(){
    wx.showModal({
      content: '不支持电台播放',
      cancelColor:'#DE655C',
      confirmColor: '#DE655C',
      showCancel:false,
      confirmText:'返回',
      complete(){
        wx.switchTab({
          url: '/more/more_dj/more_dj'
        })
      }
    })
  }
})
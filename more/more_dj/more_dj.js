const API = require('../../API/api');
const app = getApp();

Page({

 
  data: {
    dj: [] //全部电台
  },

 
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getDjRadios();
  },

  getDjRadios: function () {
    API.getDjRadios({}).then(res => {
      wx.hideLoading()
      this.setData({
        dj: res.djRadios
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
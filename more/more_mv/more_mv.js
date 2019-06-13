const API = require('../../API/api');
const app = getApp();


Page({

  data: {
    mv:[]//MV
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getNewMv()
  },

  getNewMv: function () {
    API.getNewMv({}).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          mv: res.data
        })
      }
    })
  },
  handlePlayMv:function(event){
    const mvId = event.currentTarget.dataset.id;
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play_mv?id=${mvId}`
    })
  },
})
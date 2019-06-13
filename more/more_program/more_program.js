const API = require('../../API/api');
const app = getApp();


Page({


  data: {
    programrecommend: [], //推荐节目
  },

 
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getProgramRecommend();
  },
  getProgramRecommend: function () {
    API.getProgramRecommend({}).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          programrecommend: res.programs
        })
      }
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
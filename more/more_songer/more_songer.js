// 歌手榜的js
const API = require('../../API/api');
const app = getApp();
Page({

  data: {
    songers: [], //歌手榜
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getSonger();
  },

  getSonger: function () {
    API.getSonger({}).then(res => {
      wx.hideLoading()
      this.setData({
        songers: res.list.artists.slice(0, 100)
      })
    })
  },
  handleSheet: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `./moremore_songer?id=${sheetId}`
    })
  },
})
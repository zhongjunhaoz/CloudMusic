const API = require('../../API/api');
const app = getApp();

Page({

  data: {
    songsheet: [], //歌单全部
  },


  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    this.getsongsheet();
  },
  getsongsheet: function () {
    
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        // console.log(res.playlists)
        this.setData({
          songsheet: res.playlists
        })
      }
    })
  },

  handleSheet: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `./moremore_sheet?id=${sheetId}`
    })
  },
})
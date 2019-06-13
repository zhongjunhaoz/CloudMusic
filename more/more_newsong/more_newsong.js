const API = require('../../API/api');
const app = getApp();

Page({


  data: {
    newsong: [], //最新音乐全部
  },

 
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getNewSong();
  },

  getNewSong: function () {
    API.getNewSong({}).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          newsong: res.result
        })
      }
    })
  },

  // 获取到歌曲ID
  handlePlayAudio: function (event) {
    const audioId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../play/play?id=${audioId}`
    })
    console.log(audioId);
    console.log(event)
  }


})
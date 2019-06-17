const API = require('../../API/api');
const app = getApp();
Page({

  data: {
    toplists: []
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getTopList();
  },


  getTopList: function () {
    API.getTopList({
      idx: 3,
    }).then(res => {
      const waitForPlay = new Array;
      for (let i = 0; i <= res.playlist.trackIds.length - 1; i++) { //循环打印出其id
        waitForPlay.push(res.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
        app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
        // console.log(app.globalData.waitForPlaying)
      }
      wx.hideLoading()
      console.log(res.playlist)
      this.setData({
        toplists: res.playlist.tracks
      })
    })
  },
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  }
})
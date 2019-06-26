// 歌手下级路由歌曲列表
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  data: {
    songList: []
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const sheetId = options.id;

    wx.request({
      url: API_BASE_URL + '/artists',
      data: {
        id: sheetId
      },
      success: res => {
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.hotSongs.length - 1; i++) { //循环打印出其id
          waitForPlay.push(res.data.hotSongs[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
          // console.log(app.globalData.waitForPlaying)
        }
        wx.hideLoading()
        console.log(res.data.hotSongs)
        this.setData({
          songList: res.data.hotSongs
        })
      }
    })
  },
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  }
})
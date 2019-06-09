const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  data: {
    songList:[]
  },

  onLoad: function (options) {
    const sheetId = options.id;
    // console.log(sheetId)
    wx.request({
      url: API_BASE_URL + '/playlist/detail',
      data: {
        id: sheetId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        // console.log(res.data.playlist.tracks)
        this.setData({
          songList: res.data.playlist.tracks
        })  
      }
    })
  },
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  },
})
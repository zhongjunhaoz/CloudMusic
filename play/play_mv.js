// play_mv.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();
Page({
  data: {
    mv: [],
    autoplay: true,
    loop: true,
    showfullscreenbtn: true,
    showcenterplaybtn: true,
    enableprogressgesture: true,
    showmutebtn: true,
    objectfit: 'contain',
  },
  onLoad: function (options) {
    // console.log(mv_url);
    const mvid = options.id; // onLoad()后获取到歌曲视频之类的id

    // 请求MV的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/mv/detail',
      data: {
        mvid: mvid    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        console.log(res.data.data.brs['480'])
        console.log('歌曲音频url:', res)
        if (res.data.data.brs === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.setData({
            mv: res.data.data
          })
        }
      }
    })
  },
})
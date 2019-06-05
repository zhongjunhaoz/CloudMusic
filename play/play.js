const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  data: {
    isPlay: false,
    song:[]
  },

 
  // onLond,第一次进入则获取到index.js传来的歌曲id --> id传给wx.request的URL，获取到歌曲详情 -->
  //  --> 
  onLoad: function (options) {

    const audioId = options.id; // onLoad()后获取到歌曲视频之类的id
    // console.log(audioId,'1')


    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: audioId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        console.log('歌曲url:',res)
        if (res.statusCode === 200) {
          this.createBgAudio(res.data.data[0]);  //把res.data.data[0]里的数据给createBgAudio
        }
      }
    })

    // 获取歌曲详情
    wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: audioId    //必选参数ids
      },
      success: res => {
        console.log('歌曲详情', res);
        if (res.statusCode === 200) {
          this.setData({
            song: res.data.songs[0]  //获取到歌曲的详细内容，传给song
          })
        }
      }
    })
  },

// 设置后台音乐
  createBgAudio(res) {
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.title = 'title';                        //把title 音频标题 给实例
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 照片路径
    bgAudioManage.onPlay(res => {
      this.setData({
        isPlay: true
      })
    })
  },

// 播放和暂停
  handleToggleBGAudio() {
    const bgAudioManage = app.globalData.bgAudioManage;
    const { isPlay } = this.data;
    if (isPlay) {
      bgAudioManage.pause();
    } else {
      bgAudioManage.play();
    }
    this.setData({
      isPlay: !isPlay
    })
  },
  
})
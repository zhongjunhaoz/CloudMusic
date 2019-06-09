const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  data: {
    isPlay: false,
    song:[],
  },

 
  // onLond,第一次进入则获取到index.js传来的歌曲id --> id传给wx.request的URL，获取到歌曲详情 -->
  //  --> 
  onLoad: function (options) {

    const audioId = options.id; // onLoad()后获取到歌曲视频之类的id
    // console.log(audioId,'1')


    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: audioId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        // console.log('歌曲音频url:',res)
        if (res.data.data[0].url === null ) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          // console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor:'#DE655C',
            confirmColor: '#DE655C',
            showCancel:false,
            confirmText:'返回',
            complete(){
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.createBgAudio(res.data.data[0]);  //否则就播放歌曲
          } //把res.data.data[0]里的数据给createBgAudio
      }
    })


    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: audioId    //必选参数ids
      },
      success: res => {
        // console.log('歌曲详情', res);
        if(res.data.songs.length === 0){
          // console.log('无法获取到资源')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor:'#DE655C',
            confirmColor: '#DE655C',
            showCancel:false,
            confirmText:'返回',
            complete(){
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else{
          this.setData({
            song: res.data.songs[0]  //获取到歌曲的详细内容，传给song
          })
        }

      },
    })
  },

// 设置后台音乐
  createBgAudio(res) {
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.title = 'title';                        //把title 音频标题 给实例
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
    bgAudioManage.onPlay(res => {                         // 监听背景音频播放事件
      this.setData({
        isPlay: true
      })
    })
  },

// 播放和暂停
  handleToggleBGAudio() {
    const bgAudioManage = app.globalData.bgAudioManage;
    const {isPlay} = this.data;
    if (isPlay) {
      bgAudioManage.pause();
    } else {
      bgAudioManage.play();
    }
    this.setData({
      isPlay: !isPlay
    })
    console.log(this.data.isPlay)
  },
  
})
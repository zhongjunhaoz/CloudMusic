const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  data: {
    isPlay: '',
    song:[],
    innerAudioContext: {},
    show:true,
    showLyric:true,
    songid:[]
  },

 
  // onLond,第一次进入则获取到index.js传来的歌曲id --> id传给wx.request的URL，获取到歌曲详情 -->
   
  onLoad: function (options) {
    console.log(options);
    const audioid = options.id; // onLoad()后获取到歌曲视频之类的id
    this.play(audioid); //把从wxml获取到的值传给play()
  },

  play: function (audioid){
    const audioId = audioid;
    // console.log(that.data.songid)
    app.globalData.songId = audioId;  //让每一个要播放的歌曲ID给全局变量的songId
    console.log('把', app.globalData.songId, '传入全局变量中')

    const innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContext,
      isPlay: true
      // app.globalData.songId:audioId
    })

    // wx.navigateBack({
    //   delta: 1
    // })
    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: audioId
      },
      success: res => {
        // console.log('歌曲音频url:',res)
        if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          // console.log('播放出错')
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
          this.createBgAudio(res.data.data[0]);
          // this.frontAudio(res.data.data[0])
        }
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
        if (res.data.songs.length === 0) {
          // console.log('无法获取到资源')
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
            song: res.data.songs[0],  //获取到歌曲的详细内容，传给song
          })
        }

      },
    })
  },

  createBgAudio(res) {
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.title = 'title';                        //把title 音频标题 给实例
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
    // bgAudioManage.duration = 
    bgAudioManage.onPlay(res => {                         // 监听背景音频播放事件
      this.setData({
        isPlay: true,
      })
      // wx.setStorageSync('songid', this.data.songid)
    });
    bgAudioManage.onEnded(() => {                  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
      this.go_lastSong();

    })
  },

// 播放和暂停
  handleToggleBGAudio() {
    // const innerAudioContext = app.globalData.innerAudioContext;
    const bgAudioManage = app.globalData.bgAudioManage;
    const {isPlay} = this.data;
    if (isPlay) {
      bgAudioManage.pause();
      // innerAudioContext.pause();handleToggleBGAudio
    } else {
      bgAudioManage.play();
      // innerAudioContext.play();
    }
    this.setData({
      isPlay: !isPlay
    })
    console.log(this.data.isPlay)
  },

  // 点击切换歌词和封面
  showLyric(){
    const {showLyric} = this.data;
    this.setData({
      showLyric: !showLyric
    })
  },

  go_index:function(){
    // console.log(1)
    // wx.reLaunch({
    //   url:'../pages/index/index'
    // })
    wx.navigateBack({
      delta: 1
    })
  },

  go_lastSong:function(){ //目前只做了歌单的上一首
    let that = this;
    const lastSongId = app.globalData.waitForPlaying;
    // console.log(lastSongId)
    const songId = lastSongId[Math.floor(Math.random() * lastSongId.length)]; //随机选取lastSongId数组的一个元素
    // console.log(songId)
    
    that.data.songid = songId;
    this.play(songId)//传进play()方法中
    app.globalData.songId=songId;
    // console.log(that.data.songid);

    // wx.getStorageSync({
    //   key: 'songid',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  }
  
})
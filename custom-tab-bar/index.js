Component({
  data: {
    isShow_index:true,
    isShow_playing:false,
    isShow_me:false,
    selected: 0, //首页
    color: "#8D8D8D",
    selectedColor: "#C62F2F",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/music.png",
      selectedIconPath: "/images/selected-music.png",
      text: "乐库"
    }, {
      pagePath: "/pages/love/love",
        iconPath: "/images/selected-playing.png",
      selectedIconPath: "/images/playing.png",
      text: ""
    },
      {
        pagePath: "/pages/me/me",
        iconPath: "/images/me.png",
        selectedIconPath: "/images/selected-me.png",
        text: "我的"
      }]
  },

  methods: {

    // switchTab(e) {
    //   console.log(e)
    //   const data = e.currentTarget.dataset
    //   const url = data.path
    //   wx.switchTab({ url })
    //   this.setData({
    //     selected: data.index
    //   })
    // },

    switchTab_index:function(){
      wx.switchTab({
        url:'/pages/index/index'
      })
      this.setData({
        isShow_index: true,
        isShow_me: false,
        isShow_playing: false
      })
      console.log('乐库变红')
    },

    switchTab_playing: function () {
      wx.switchTab({
        url: '/pages/love/love'
      })
      this.setData({
        isShow_playing: true,
        isShow_index: false,
        isShow_me: false
      })
      console.log('播放变红')
    },

    switchTab_me: function () {
      wx.switchTab({
        url: '/pages/me/me'
      })
      this.setData({
        isShow_me:true,
        isShow_playing: false,
        isShow_index: false
      })
      console.log('我的变红')
    }
  }
})
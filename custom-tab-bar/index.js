Component({
  data: {
    selected: 0,
    color: "#8D8D8D",
    selectedColor: "#C62F2F",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/music.png",
      selectedIconPath: "/images/selected-music.png",
      text: "乐库"
    }, {
      pagePath: "/pages/love/love",
      iconPath: "/images/love.png",
      selectedIconPath: "/images/selected-love.png",
      text: "收藏"
    },
      {
        pagePath: "/pages/me/me",
        iconPath: "/images/me.png",
        selectedIconPath: "/images/selected-me.png",
        text: "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
const API = require('../../API/api');
const app = getApp();


Page({

  data: {
    songers: [], //歌手榜
  },

  onLoad: function (options) {
    this.getSonger();
  },

  getSonger: function () {
    API.getSonger({}).then(res => {
      this.setData({
        songers: res.list.artists.slice(0, 100)
      })
    })
  }
})
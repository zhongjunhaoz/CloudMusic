const API = require('../../API/api');
const app = getApp();

Page({

  data: {
    songsheet: [], //歌单全部
  },


  onLoad: function () {

    this.getsongsheet();
  },
  getsongsheet: function () {
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          songsheet: res.playlists
        })
      }
    })
  },
})
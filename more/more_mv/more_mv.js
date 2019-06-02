const API = require('../../API/api');
const app = getApp();


Page({

  data: {
    mv:[]//MV
  },


  onLoad: function (options) {
    this.getNewMv()
  },

  getNewMv: function () {
    API.getNewMv({}).then(res => {
      if (res.code === 200) {
        this.setData({
          mv: res.data
        })
      }
    })
  }
})
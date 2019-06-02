const API = require('../../API/api');
const app = getApp();

Page({

 
  data: {
    dj: [] //全部电台
  },

 
  onLoad: function (options) {
    this.getDjRadios();
  },

  getDjRadios: function () {
    API.getDjRadios({}).then(res => {
      this.setData({
        dj: res.djRadios
      })
    })
  }
})
const API = require('../../API/api');
const app = getApp();


Page({


  data: {
    programrecommend: [], //推荐节目
  },

 
  onLoad: function (options) {
    this.getProgramRecommend();
  },
  getProgramRecommend: function () {
    API.getProgramRecommend({}).then(res => {
      if (res.code === 200) {
        this.setData({
          programrecommend: res.programs
        })
      }
    })
  }
  
})
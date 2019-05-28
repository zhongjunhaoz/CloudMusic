//index.js
const API = require('../../API/api');
const app = getApp()

Page({

  data: {
    banner:[],//轮播
    indicatorDots:true,
    indicatorcolor:'#ffffff',
    indicatoractivecolor: '#DC4238', 
    autoplay:true,
    interval:4500,
    duration:1700,
    circular:true,
    Changeline: true,
    songsheet_index:[],//首页歌单列表前6
    songsheet:[],//歌单全部
    newsong_index:[],//首页最新音乐前6
    newsong:[],//最新音乐全部
  },

  onLoad: function () {
    this.getBanner();
    this.getsongsheet();
    this.getNewSong();
},
  // 点击跳转到搜索页面
  go_search: function () {
    wx.navigateTo({
      url: '../search/search',
    });
  },

  getBanner:function(){
    API.getBanner({ type: 2 }).then(res => {
      console.log(res)
      // 大厂API接口的维定 code 0 没有问题
      if (res.code === 200) {  //严谨
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  getsongsheet:function(){
    API.getsongsheet({order:'hot'}).then(res=>{
      if(res.code === 200){
        this.setData({
          songsheet:res.playlists,
          songsheet_index: res.playlists.slice(0, 6)
        })
        console.log(res.playlists)
        console.log(res.playlists.slice(0, 6))
      }
    })
  },
  getNewSong:function(){
    API.getNewSong({}).then(res=>{
      if (res.code === 200) {
        this.setData({
          newsong: res.result,
          newsong_index: res.result.slice(0, 6)
        })
        console.log(res.result)
        console.log(res.result.slice(0, 6))
      }
    })
  },
  changeline:function(e){
    let that = this;
    if (e.detail.current ){
      that.setData({
        Changeline: false
      })
    }else{
      that.setData({
        Changeline: true
      })
    }
  }
  

})

//index.js
const API = require('../../API/api');
const app = getApp()

Page({

  data: {
    banner: [], //轮播
    indicatorDots: true,
    indicatorcolor: '#ffffff',
    indicatoractivecolor: '#DC4238',
    autoplay: true,
    interval: 4500,
    duration: 1700,
    circular: true,
    Changeline: true,
    songsheet_index: [], //首页歌单列表前6
    songsheet: [], //歌单全部
    newsong_index: [], //首页最新音乐前6
    newsong: [], //最新音乐全部
    dj_index: [], //首页电台推荐
    dj: [], //全部电台
    // topcomments:[],//热门评论
    programrecommend: [], //推荐节目
    recommend_create: [], //电台：创作|翻唱
    more_commend_create:[],
    recommend_3D: [], //电台：3D|电子
    recommend_feeling: [], //情感调频
    recommend_musicstory: [], //音乐故事
    recommend_2D: [], //二次元
    recommend_audiobook: [], //有声书
    recommend_radioplay: [], //广播剧
    recommend_reading: [], //美文读物
    recommend_crosstalk: [], //相声曲艺
    recommend_history: [], //人文历史
    recommend_talkshow: [], //脱口秀
    recommend_movies: [], //娱乐影视
    recommend_foreignlanguage: [], //外语世界
    recommend_skills: [], //知识技能
    recommend_baby: [], //亲子宝贝
    recommend_education: [], //校园教育
    recommend_finance: [], //商业财经
    recommend_science: [], //科技科学
    recommend_tourism: [], //路途|城市
    recommend_MV: [], //推荐MV
    newest: [], //最新专辑
  },

  onLoad: function() {
    this.getBanner();
    this.getsongsheet();
    this.getNewSong();
    this.getDjRadios();
    // this.getTopComments();
    this.getProgramRecommend();
    this.getRecommendType();
    this.getRecommendMV();
    this.getNewEst();
  },

  getBanner: function() {
    API.getBanner({
      type: 2
    }).then(res => {
      // 大厂API接口的维定 code 0 没有问题
      if (res.code === 200) { //严谨
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  getsongsheet: function() {
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          songsheet: res.playlists,
          songsheet_index: res.playlists.slice(0, 6)
        })
      }
    })
  },
  getNewSong: function() {
    API.getNewSong({}).then(res => {
      if (res.code === 200) {
        this.setData({
          newsong: res.result,
          newsong_index: res.result.slice(0, 6)
        })
      }
    })
  },

  getDjRadios: function() {
    API.getDjRadios({}).then(res => {
      this.setData({
        dj: res.djRadios,
        dj_index: res.djRadios.slice(0, 6)
      })
    })
  },

  // getTopComments: function () {
  //   API.getTopComments({ id: 186016,type:0}).then(res => {
  //     if (res.code === 200) {
  //       this.setData({
  //         topcomments: res.hotComments,
  //       })
  //     }
  //   })
  // },

  getProgramRecommend: function() {
    API.getProgramRecommend({}).then(res => {
      if (res.code === 200) {
        this.setData({
          programrecommend: res.programs.slice(0, 3)
        })
      }
    })
  },


  getRecommendType: function() {
    API.getRecommendType({
      type: 2001
    }).then(res => {
      this.setData({
        recommend_create: res.djRadios.slice(0,3),
        more_commend_create:res.djRadios
      })
    })
    API.getRecommendType({
      type: 10002
    }).then(res => {
      this.setData({
        recommend_3D: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 3
    }).then(res => {
      this.setData({
        recommend_feeling: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 2
    }).then(res => {
      this.setData({
        recommend_musicstory: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 3001
    }).then(res => {
      this.setData({
        recommend_2D: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 10001
    }).then(res => {
      this.setData({
        recommend_audiobook: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 7
    }).then(res => {
      this.setData({
        recommend_radioplay: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 6
    }).then(res => {
      this.setData({
        recommend_reading: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 8
    }).then(res => {
      this.setData({
        recommend_crosstalk: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 11
    }).then(res => {
      this.setData({
        recommend_history: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 5
    }).then(res => {
      this.setData({
        recommend_talkshow: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 4
    }).then(res => {
      this.setData({
        recommend_movies: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 13
    }).then(res => {
      this.setData({
        recommend_foreignlanguage: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 453050
    }).then(res => {
      this.setData({
        recommend_skills: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 14
    }).then(res => {
      this.setData({
        recommend_baby: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 4001
    }).then(res => {
      this.setData({
        recommend_education: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 453051
    }).then(res => {
      this.setData({
        recommend_finance: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 453052
    }).then(res => {
      this.setData({
        recommend_science: res.djRadios.slice(0, 3)
      })
    })
    API.getRecommendType({
      type: 12
    }).then(res => {
      this.setData({
        recommend_tourism: res.djRadios.slice(0, 3)
      })
    })
  },

  getRecommendMV: function() {
    API.getRecommendMV({}).then(res => {
      if (res.code === 200) {
        this.setData({
          recommend_MV: res.result.slice(0, 4)
        })
      }
    })
  },

  getNewEst:function(){
    API.getNewEst({}).then(res =>{
      if(res.code === 200){
        this.setData({
          newest: res.albums.slice(4, 10)
        })
      }
    })
  },
  // 点击跳转到搜索页面
  go_search: function() {
    wx.navigateTo({
      url: '../search/search',
    });
  },
  go_songsheet:function(){
    wx.navigateTo({
      url:'../../more/more_sheet/more_sheet'
    })
  },
  go_newsong:function(){
    wx.navigateTo({
      url: '../../more/more_newsong/more_newsong',
    })
  },
  go_dj:function(){
    wx.navigateTo({
      url: '../../more/more_dj/more_dj',
    })
  },
  go_mv:function(){
    wx.navigateTo({
      url: '../../more/more_mv/more_mv',
    })
  },
  go_newest:function(){
    wx.navigateTo({
      url: '../../more/more_newest/more_newest',
    })
  },
  go_program:function(){
    wx.navigateTo({
      url: '../../more/more_program/more_program',
    })
    console.log(1)
  },
  change:function(){
    let maxNum = this.data.more_recommend_create.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      commend_create: []
    })
    //重新取四组数据
    this.data.commend_create.push(this.data.more_recommend_create[r1])
    this.data.commend_create.push(this.data.more_recommend_create[r2])
    this.data.commend_create.push(this.data.more_recommend_create[r3])
    //重新赋值
    this.setData({
      commend_create: this.data.commend_create
    })
  },
  // 换swiper
  changeline: function(e) {
    let that = this;
    if (e.detail.current) {
      that.setData({
        Changeline: false
      })
    } else {
      that.setData({
        Changeline: true
      })
    }
  }


})
//index.js
const API = require('../../API/api');
const app = getApp();
const change = require('../../utils/util');
let  half;
let quarter;
Page({

  data: {
    slideOffset: 0,
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
    more_recommend_create:[],
    recommend_3D: [], //电台：3D|电子
    more_recommend_3D:[],
    recommend_feeling: [], //情感调频
    more_recommend_feeling:[],
    recommend_musicstory: [], //音乐故事
    more_recommend_musicstory:[],
    recommend_2D: [], //二次元
    more_recommend_2D:[],
    recommend_audiobook: [], //有声书
    more_recommend_audiobook:[],
    recommend_radioplay: [], //广播剧
    more_recommend_radioplay:[],
    recommend_reading: [], //美文读物
    more_recommend_reading:[],
    recommend_crosstalk: [], //相声曲艺
    more_recommend_crosstalk:[],
    recommend_history: [], //人文历史
    more_recommend_history:[],
    recommend_talkshow: [], //脱口秀
    more_recommend_talkshow:[],
    recommend_movies: [], //娱乐影视
    more_recommend_movies:[],
    recommend_foreignlanguage: [], //外语世界
    more_recommend_foreignlanguage:[],
    recommend_skills: [], //知识技能
    more_recommend_skills:[],
    recommend_baby: [], //亲子宝贝
    more_recommend_baby:[],
    recommend_education: [], //校园教育
    more_recommend_education:[],
    recommend_finance: [], //商业财经
    more_recommend_finance:[],
    recommend_science: [], //科技科学
    more_recommend_science:[],
    recommend_tourism: [], //路途|城市
    more_recommend_tourism:[],
    recommend_MV: [], //推荐MV
    newest: [], //最新专辑
  },

  onLoad: function() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    this.getBanner();
    this.getsongsheet();
    this.getNewSong();
    this.getDjRadios();
    this.getProgramRecommend();
    this.getRecommendType();
    this.getRecommendMV();
    this.getNewEst();
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
        // console.log(res.windowWidth / 2 / 2)
        half = res.windowWidth / 2 ;
        quarter = res.windowWidth / 2 / 2;
        that.setData({
          slideOffset: quarter - 14 //onLoad的时候让 quarter - 14 给slideOffset，即一开始就让他在个性推荐的下面，否则onLoad的时候一开始在0的位置
        })
      }
    });
  },

  getBanner: function() {
    API.getBanner({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
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
      wx.hideLoading()
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
        more_recommend_create:res.djRadios
      })
    })
    API.getRecommendType({
      type: 10002
    }).then(res => {
      this.setData({
        recommend_3D: res.djRadios.slice(0, 3),
        more_recommend_3D: res.djRadios
      })
    })
    API.getRecommendType({
      type: 3
    }).then(res => {
      this.setData({
        recommend_feeling: res.djRadios.slice(0, 3),
        more_recommend_feeling: res.djRadios
      })
    })
    API.getRecommendType({
      type: 2
    }).then(res => {
      this.setData({
        recommend_musicstory: res.djRadios.slice(0, 3),
        more_recommend_musicstory: res.djRadios
      })
    })
    API.getRecommendType({
      type: 3001
    }).then(res => {
      this.setData({
        recommend_2D: res.djRadios.slice(0, 3),
        more_recommend_2D: res.djRadios
      })
    })
    API.getRecommendType({
      type: 10001
    }).then(res => {
      this.setData({
        recommend_audiobook: res.djRadios.slice(0, 3),
        more_recommend_audiobook: res.djRadios
      })
    })
    API.getRecommendType({
      type: 7
    }).then(res => {
      this.setData({
        recommend_radioplay: res.djRadios.slice(0, 3),
        more_recommend_radioplay: res.djRadios
      })
    })
    API.getRecommendType({
      type: 6
    }).then(res => {
      this.setData({
        recommend_reading: res.djRadios.slice(0, 3),
        more_recommend_reading: res.djRadios
      })
    })
    API.getRecommendType({
      type: 8
    }).then(res => {
      this.setData({
        recommend_crosstalk: res.djRadios.slice(0, 3),
        more_recommend_crosstalk: res.djRadios
      })
    })
    API.getRecommendType({
      type: 11
    }).then(res => {
      this.setData({
        recommend_history: res.djRadios.slice(0, 3),
        more_recommend_history: res.djRadios
      })
    })
    API.getRecommendType({
      type: 5
    }).then(res => {
      this.setData({
        recommend_talkshow: res.djRadios.slice(0, 3),
        more_recommend_talkshow: res.djRadios
      })
    })
    API.getRecommendType({
      type: 4
    }).then(res => {
      this.setData({
        recommend_movies: res.djRadios.slice(0, 3),
        more_recommend_movies: res.djRadios
      })
    })
    API.getRecommendType({
      type: 13
    }).then(res => {
      this.setData({
        recommend_foreignlanguage: res.djRadios.slice(0, 3),
        more_recommend_foreignlanguage: res.djRadios
      })
    })
    API.getRecommendType({
      type: 453050
    }).then(res => {
      this.setData({
        recommend_skills: res.djRadios.slice(0, 3),
        more_recommend_skills: res.djRadios
      })
    })
    API.getRecommendType({
      type: 14
    }).then(res => {
      this.setData({
        recommend_baby: res.djRadios.slice(0, 3),
        more_recommend_baby: res.djRadios
      })
    })
    API.getRecommendType({
      type: 4001
    }).then(res => {
      this.setData({
        recommend_education: res.djRadios.slice(0, 3),
        more_recommend_education: res.djRadios
      })
    })
    API.getRecommendType({
      type: 453051
    }).then(res => {
      this.setData({
        recommend_finance: res.djRadios.slice(0, 3),
        more_recommend_finance: res.djRadios
      })
    })
    API.getRecommendType({
      type: 453052
    }).then(res => {
      this.setData({
        recommend_science: res.djRadios.slice(0, 3),
        more_recommend_science: res.djRadios
      })
    })
    API.getRecommendType({
      type: 12
    }).then(res => {
      this.setData({
        recommend_tourism: res.djRadios.slice(0, 3),
        more_recommend_tourism: res.djRadios
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

  go_toplist:function(){
    wx.navigateTo({
      url: '../../more/more_toplist/more_toplist',
    })
  },
  go_djlist:function(){
    wx.navigateTo({
      url: '../../more/more_djlist/more_djlist',
    })
  },
  go_pay:function(){
    wx.navigateTo({
      url: '../../more/more_pay/more_pay',
    })
  },
  go_songer:function(){
    wx.navigateTo({
      url: '../../more/more_songer/more_songer',
    })
  },
  go_MV:function(){
    wx.navigateTo({
      url: '../../more/more_mv/more_mv',
    })
  },

  // swiper的滑动
// 第二种方法是直接把slideOffset赋死值，但不兼容
// 第三种是选择器 class="{{Changeline?'swiper_header_line_before':'swiper_header_line_after'}}" if current为1则什么什么，if 为2 ，则什么什么。
  changeline:function(e){
    // console.log(e)
    // console.log(e.detail.current)
    let current = e.detail.current; //获取swiper的current值
    if(e.detail.current === 0){
      this.setData({
        slideOffset: quarter - 14
      })
    }
    if(e.detail.current === 1){
      this.setData({
        slideOffset: (quarter - 14) + half
      })
    }
    if(e.detail.current === null){
      this.setData({
        slideOffset: quarter - 14
      })
    }
  },
  // 换一换
  change_1:function(){
    let maxNum = this.data.more_recommend_create.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_create: []
    })
    //重新取3组数据
    this.data.recommend_create.push(this.data.more_recommend_create[r1])
    this.data.recommend_create.push(this.data.more_recommend_create[r2])
    this.data.recommend_create.push(this.data.more_recommend_create[r3])
    //重新赋值
    this.setData({
      recommend_create: this.data.recommend_create
    })
  },
  change_2:function(){
    let maxNum = this.data.more_recommend_3D.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_3D: []
    })
    //重新取3组数据
    this.data.recommend_3D.push(this.data.more_recommend_3D[r1])
    this.data.recommend_3D.push(this.data.more_recommend_3D[r2])
    this.data.recommend_3D.push(this.data.more_recommend_3D[r3])
    //重新赋值
    this.setData({
      recommend_3D: this.data.recommend_3D
    })
  },
  change_3:function(){
    let maxNum = this.data.more_recommend_feeling.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_feeling: []
    })
    //重新取3组数据
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r1])
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r2])
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r3])
    //重新赋值
    this.setData({
      recommend_feeling: this.data.recommend_feeling
    })
  },
  change_4:function(){
    let maxNum = this.data.more_recommend_musicstory.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_musicstory: []
    })
    //重新取3组数据
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r1])
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r2])
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r3])
    //重新赋值
    this.setData({
      recommend_musicstory: this.data.recommend_musicstory
    })
  },
  change_5:function(){
    let maxNum = this.data.more_recommend_2D.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_2D: []
    })
    //重新取3组数据
    this.data.recommend_2D.push(this.data.more_recommend_2D[r1])
    this.data.recommend_2D.push(this.data.more_recommend_2D[r2])
    this.data.recommend_2D.push(this.data.more_recommend_2D[r3])
    //重新赋值
    this.setData({
      recommend_2D: this.data.recommend_2D
    })
  },
  change_6:function(){
    let maxNum = this.data.more_recommend_audiobook.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_audiobook: []
    })
    //重新取3组数据
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r1])
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r2])
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r3])
    //重新赋值
    this.setData({
      recommend_audiobook: this.data.recommend_audiobook
    })
  },
  change_7:function(){
    let maxNum = this.data.more_recommend_radioplay.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_radioplay: []
    })
    //重新取3组数据
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r1])
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r2])
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r3])
    //重新赋值
    this.setData({
      recommend_radioplay: this.data.recommend_radioplay
    })
  },
  change_8:function(){
    let maxNum = this.data.more_recommend_reading.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_reading: []
    })
    //重新取3组数据
    this.data.recommend_reading.push(this.data.more_recommend_reading[r1])
    this.data.recommend_reading.push(this.data.more_recommend_reading[r2])
    this.data.recommend_reading.push(this.data.more_recommend_reading[r3])
    //重新赋值
    this.setData({
      recommend_reading: this.data.recommend_reading
    })
  },
  change_9:function(){
    let maxNum = this.data.more_recommend_crosstalk.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_crosstalk: []
    })
    //重新取3组数据
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r1])
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r2])
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r3])
    //重新赋值
    this.setData({
      recommend_crosstalk: this.data.recommend_crosstalk
    })
  },
  change_10:function(){
    let maxNum = this.data.more_recommend_history.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_history: []
    })
    //重新取3组数据
    this.data.recommend_history.push(this.data.more_recommend_history[r1])
    this.data.recommend_history.push(this.data.more_recommend_history[r2])
    this.data.recommend_history.push(this.data.more_recommend_history[r3])
    //重新赋值
    this.setData({
      recommend_history: this.data.recommend_history
    })
  },
  change_11:function(){
    let maxNum = this.data.more_recommend_talkshow.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_talkshow: []
    })
    //重新取3组数据
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r1])
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r2])
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r3])
    //重新赋值
    this.setData({
      recommend_talkshow: this.data.recommend_talkshow
    })
  },
  change_12:function(){
    let maxNum = this.data.more_recommend_movies.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_movies: []
    })
    //重新取3组数据
    this.data.recommend_movies.push(this.data.more_recommend_movies[r1])
    this.data.recommend_movies.push(this.data.more_recommend_movies[r2])
    this.data.recommend_movies.push(this.data.more_recommend_movies[r3])
    //重新赋值
    this.setData({
      recommend_movies: this.data.recommend_movies
    })
  },
  change_13:function(){
    let maxNum = this.data.more_recommend_foreignlanguage.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_foreignlanguage: []
    })
    //重新取3组数据
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r1])
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r2])
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r3])
    //重新赋值
    this.setData({
      recommend_foreignlanguage: this.data.recommend_foreignlanguage
    })
  },
  change_14:function(){
    let maxNum = this.data.more_recommend_skills.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_skills: []
    })
    //重新取3组数据
    this.data.recommend_skills.push(this.data.more_recommend_skills[r1])
    this.data.recommend_skills.push(this.data.more_recommend_skills[r2])
    this.data.recommend_skills.push(this.data.more_recommend_skills[r3])
    //重新赋值
    this.setData({
      recommend_skills: this.data.recommend_skills
    })
  },
  change_15:function(){
    let maxNum = this.data.more_recommend_baby.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_baby: []
    })
    //重新取3组数据
    this.data.recommend_baby.push(this.data.more_recommend_baby[r1])
    this.data.recommend_baby.push(this.data.more_recommend_baby[r2])
    this.data.recommend_baby.push(this.data.more_recommend_baby[r3])
    //重新赋值
    this.setData({
      recommend_baby: this.data.recommend_baby
    })
  },
  change_16:function(){
    let maxNum = this.data.more_recommend_education.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_education: []
    })
    //重新取3组数据
    this.data.recommend_education.push(this.data.more_recommend_education[r1])
    this.data.recommend_education.push(this.data.more_recommend_education[r2])
    this.data.recommend_education.push(this.data.more_recommend_education[r3])
    //重新赋值
    this.setData({
      recommend_education: this.data.recommend_education
    })
  },
  change_17:function(){
    let maxNum = this.data.more_recommend_finance.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_finance: []
    })
    //重新取3组数据
    this.data.recommend_finance.push(this.data.more_recommend_finance[r1])
    this.data.recommend_finance.push(this.data.more_recommend_finance[r2])
    this.data.recommend_finance.push(this.data.more_recommend_finance[r3])
    //重新赋值
    this.setData({
      recommend_finance: this.data.recommend_finance
    })
  },
  change_18:function(){
    let maxNum = this.data.more_recommend_science.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_science: []
    })
    //重新取3组数据
    this.data.recommend_science.push(this.data.more_recommend_science[r1])
    this.data.recommend_science.push(this.data.more_recommend_science[r2])
    this.data.recommend_science.push(this.data.more_recommend_science[r3])
    //重新赋值
    this.setData({
      recommend_science: this.data.recommend_science
    })
  },
  change_19:function(){
    let maxNum = this.data.more_recommend_tourism.length  //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_tourism: []
    })
    //重新取3组数据
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r1])
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r2])
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r3])
    //重新赋值
    this.setData({
      recommend_tourism: this.data.recommend_tourism
    })
  },



// 获取到swiperID
handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
    console.log(event);
    console.log(audioId);
  },
  handlePlayMv:function(event){
    const mvId = event.currentTarget.dataset.id;
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play_mv?id=${mvId}`
    })
  },
  handleSheet: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../more/more_sheet/moremore_sheet?id=${sheetId}`
    })
    console.log(sheetId);
  },
  handlePlayDj:function(){
    wx.showModal({
      content: '不支持电台播放',
      cancelColor:'#DE655C',
      confirmColor: '#DE655C',
      showCancel:false,
      confirmText:'返回',
      complete(){
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }
  
})
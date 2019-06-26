const API = require('../../API/api');

Page({

  data: {
    hotsongs: [],//获取热门搜索
    inputValue: null,//输入框输入的值
    history:[], //搜索历史存放数组
    searchsuggest:[], //搜索建议
    showView: true,//组件的显示与隐藏
    showsongresult:true,
    searchresult:[],//搜索结果
    searchKey:[]
  }, 

  onLoad() {
    wx.showLoading({
      title: '加载中',
    });
    this.gethotsongs();//加载页面完成调用gethotsongs方法
    
  },

  // 从接口到获取到数据导入到hotsongs
  gethotsongs() {
    API.gethotsongs({ type: 'new' }).then(res => {
      wx.hideLoading()
      // 大厂API接口的维定 code 0 没有问题
      if (res.code === 200) {  //严谨
        this.setData({
          hotsongs: res.result.hots
        })
      }
    })
  },

// 搜索建议
  searchSuggest(){
    API.searchSuggest({ keywords: this.data.searchKey ,type:'mobile'}).then(res=>{
      if(res.code === 200){
        this.setData({
          searchsuggest:res.result.allMatch
        })
      }
    })
  },

  // 实现点击输入框的×把输入的内容清空
  clearInput:function(res){
    this.setData({
      inputValue: ''
    })
  },
  
  //实现取消功能，停止搜索，返回首页
  cancel: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

 //获取input文本并且实时搜索,动态隐藏组件
  getsearchKey:function(e){
    console.log(e.detail.value) //打印出输入框的值
    let that = this;
    if(e.detail.cursor != that.data.cursor){ //实时获取输入框的值
      that.setData({
        searchKey: e.detail.value
      })
    }
    if(e.value!=""){ //组件的显示与隐藏
      that.setData({
        showView: false
      })
    } else{
      that.setData({
        showView: ""
      })
    }
    if(e.detail.value!=""){ //解决 如果输入框的值为空时，传值给搜索建议，会报错的bug
      that.searchSuggest();
    }  
  },

  // 清空page对象data的history数组 重置缓存为[]
  clearHistory: function() {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor:'#DE655C',
      confirmColor: '#DE655C',
      success(res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync("history", []) //把空数组给history,即清空历史记录
        } else if (res.cancel) {
        }
      }
    })
  },

  // input失去焦点函数
  routeSearchResPage: function(e) {
    console.log(e.detail.value)
    let history = wx.getStorageSync("history") || [];
    history.push(this.data.searchKey)
    wx.setStorageSync("history", history);
  },

//每次显示变动就去获取缓存，给history，并for出来。
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  },
  
  // 搜索结果
  searchResult(){
    console.log(this.data.searchKey)
    API.searchResult({ keywords: this.data.searchKey, type: 1, limit: 100, offset:2 }).then(res => {
      if (res.code === 200) {
        this.setData({
          searchresult: res.result.songs
        })
      }
    })
  },

// 搜索完成点击确认
  searchover:function(){
    let that = this;
    that.setData({
      showsongresult: false
    })
    that.searchResult();
  },

  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  },

// 点击热门搜索值或搜索历史，填入搜索框
  fill_value:function(e){
    let that = this;
    console.log(history)
    // console.log(e.currentTarget.dataset.value)
    that.setData({
      searchKey: e.currentTarget.dataset.value,//点击吧=把值给searchKey,让他去搜索
      inputValue: e.currentTarget.dataset.value,//在输入框显示内容
      showView:false,//给false值，隐藏 热搜和历史 界面
      showsongresult: false, //给false值，隐藏搜索建议页面
    })
    that.searchResult(); //执行搜索功能
  }


})
const API = require('../../API/api');

Page({

  data: {
    hotsongs: [],//获取热门搜索
    inputValue: null,//输入框输入的值
    history:[], //搜索历史存放数组
    searchsuggest:[], //搜索建议
    showView: true,//组件的显示与隐藏
    showsongresult:true,
    searchresult:[]//搜索结果
  }, 

  onLoad() {
    this.gethotsongs();//加载页面完成调用gethotsongs方法
    
  },

  // 从接口到获取到数据导入到hotsongs
  gethotsongs() {
    API.gethotsongs({ type: 'new' }).then(res => {
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
      'inputValue': ''
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
    let that = this;
    if(e.detail.cursor != that.data.cursor){
      that.setData({
        searchKey: e.detail.value
      })
    }
    if(e.value!=""){
      that.setData({
        showView: false
      })
    } else{
      that.setData({
        showView: ""
      })
    }
    that.searchSuggest();
    
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
          wx.setStorageSync("history", [])
        } else if (res.cancel) {
        }
      }
    })
  },

  // input失去焦点函数
  routeSearchResPage: function(e) {
    //对历史记录的点击事件 已忽略
    let _this = this;
    let _searchKey = this.data.searchKey;
    if (!this.data.searchKey) {
      return
    }
    let history = wx.getStorageSync("history") || [];
    history.push(this.data.searchKey)
    wx.setStorageSync("history", history);
  },

//每次显示钩子函数都去读一次本地storage
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  },
  
  // 搜索结果
  searchResult(){
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
  }


})
停止更新维护!因为要准备秋招！

# 项目部分截图(Gif)

![](https://user-gold-cdn.xitu.io/2019/6/24/16b89bbee707dd70?w=405&h=692&f=gif&s=3289476)
![](https://user-gold-cdn.xitu.io/2019/6/24/16b89f9bc0492380?w=405&h=692&f=gif&s=3465695)
![](https://user-gold-cdn.xitu.io/2019/6/24/16b89c4f8e1eccb5?w=405&h=692&f=gif&s=4980551)
***
# 前言
前一阵子学习了微信小程序，为了巩固所学的知识和提高实战经验，决定自己手撸一款小程序。因为听歌一直在用网易云音乐，所以突发奇想就做一款仿网易云音乐的小程序吧！开发中遇到了很多在学习中没有遇到过的坑，也很感谢在我改不出BUG时给予帮助的老师同学！本着学习和分享的目的，写下以下的文字,希望能给**初学小程序的你**带来一点帮助,大佬轻点喷。
***
# 开发前准备
* VScode代码编辑器。
* 微信开发者工具
* ios网易云音乐(V5.9.1版本)
* 酷狗音乐小程序(提供了一些思路)
* [网易云音乐API]([http://musicapi.leanapp.cn/)
* ([阿里巴巴矢量图标库](https://www.iconfont.cn))提供一些图标icon
***
# tabBar部分

## **自定义tabBar**

一般在开发中，微信小程序给我们的tabBar就能满足需求。但是，有些特别的需求必须使用自定义tabBar才能满足。
比如tabBar实现半透明。那么，如何才能自定义tabBar呢？    
    1.首先,在 app.json里的"tabBar"里声明
    `"tabBar": {
    "custom": true
    }`  
    2.接着在项目的根目录下新建一个`custom-tab-bar`文件夹。里面包含`index.wxml index.js index.json index.wxss`四个文件。更多细节参考[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8a44df06fca6e?w=511&h=229&f=png&s=66834)
```
<!-- index.html -->

<!-- 自定义tabbar页面 -->
<cover-view class="tab-bar">
   <cover-view class="tab-bar-border"></cover-view><!--tabBal边框样式  -->
<!-- 乐库tabbar -->
  <cover-view class='tab-bar-item' >
    <cover-image src='../images/music.png' hidden='{{isShow_index}}' bindtap='switchTab_index'></cover-image>
    <cover-image src='../images/selected-music.png' hidden='{{!isShow_index}}' bindtap='switchTab_index'></cover-image>
    <cover-view style="color:{{isShow_index ? selectedColor : color}}">乐库</cover-view>
  </cover-view>

<!-- 播放tabbar -->
    <cover-view class='tab-bar-item' bindtap='switchTab_playing'>
    <cover-image src='../images/selected-playing.png' hidden='{{isShow_playing}}'></cover-image>
    <cover-image src='../images/playing.png' hidden='{{!isShow_playing}}'></cover-image>
    <cover-view></cover-view>
  </cover-view>

<!-- 我的tabbar -->
    <cover-view class='tab-bar-item' bindtap='switchTab_me'>
    <cover-image src='../images/me.png' hidden='{{isShow_me}}'></cover-image>
    <cover-image src='../images/selected-me.png' hidden='{{!isShow_me}}'></cover-image>
    <cover-view style="color:{{isShow_me ? selectedColor : color}}">我的</cover-view>
  </cover-view>
</cover-view>
```
```
// index.js
Component({
  data: {
    isShow_index:true,
    isShow_playing:false,
    isShow_me:false,
    selected: 0, //首页
    color: "#8D8D8D",
    selectedColor: "#C62F2F",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/music.png",
      selectedIconPath: "/images/selected-music.png",
      text: "乐库"
    }, {
      pagePath: "/pages/love/love",
        iconPath: "/images/selected-playing.png",
      selectedIconPath: "/images/playing.png",
      text: ""
    },
      {
        pagePath: "/pages/me/me",
        iconPath: "/images/me.png",
        selectedIconPath: "/images/selected-me.png",
        text: "我的"
      }]
  },

  methods: {
    switchTab_index:function(){
      wx.switchTab({
        url:'/pages/index/index'
      })
      this.setData({
        isShow_index: true,
        isShow_me: false,
        isShow_playing: false
      })
    },
    switchTab_playing: function () {
      wx.switchTab({
        url: '/pages/love/love'
      })
      this.setData({
        isShow_playing: true,
        isShow_index: false,
        isShow_me: false
      })
    },
    switchTab_me: function () {
      wx.switchTab({
        url: '/pages/me/me'
      })
      this.setData({
        isShow_me:true,
        isShow_playing: false,
        isShow_index: false
      })
    }
  }
})
```
## **tabBar半透明**

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8a6ee63e9f2da?w=405&h=94&f=gif&s=538191)
```
/* custom-tab-bar/index.wxss */
.tab-bar {
  height:7%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background:#FAFBFD;
  opacity: 0.93;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}
```

# API封装
一般我们https请求都是通过`wx.request`来请求,但是这种方法只能请求一次数据,如果首页用`wx.request`来请求的话,代码看起来会很冗长和杂乱。不仅自己容易搞糊涂,其他人看代码时也会很累。因此为了代码的整洁干净,我在这里新建了一个文件专门存放API。一般在根目录下的`utils`文件夹下新建一个`api.js`,但我在根目录下新建了文件夹`API`,里面包含`api.js`。
```
// api.js
const API_BASE_URL = 'http://musicapi.leanapp.cn';
const request = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
        
      },
      fail(error) {
        reject(error)
      }
    })
  });
}


module.exports ={
  gethotsongs:(data) =>{
    return request('/search/hot',data)//热搜接口
  },
  searchSuggest:(data)=>{
    return request('/search/suggest',data)//搜索建议接口
  },
  searchResult:(data)=>{
    return request('/search',data)//搜索结果接口
  },
  getBanner:(data)=>{
    return request('/banner',data)//个性推荐轮播
  },
  getsongsheet:(data)=>{
    return request('/top/playlist',data)//热门歌单接口
  },
  getNewSong:(data)=>{
    return request('/personalized/newsong',data)//最新音乐接口
  },
  getDjRadios:(data)=>{
    return request('/dj/recommend',data)//电台推荐接口
  },
  getProgramRecommend:(data)=>{
    return request('/program/recommend',data)//推荐节目接口
  },
  getRecommendType:(data)=>{
    return request('/dj/recommend/type',data)//所有电台分类推荐
  },
  getRecommendMV:(data)=>{
    return request('/personalized/mv',data)//推荐MV
  },
  getNewMv:(data)=>{
    return request('/mv/first',data)//最新MV
  },
  getNewEst:(data)=>{
    return request('/album/newest',data)//最新专辑
  },
  getTopList:(data)=>{
    return request('/top/list',data)//排行榜
  },
  getDjList:(data)=>{
    return request('/dj/catelist',data) //电台分类
  },
  getPay:(data)=>{
    return request('/dj/paygift',data)//付费精品
  },
  getSonger:(data)=>{
    return request('/toplist/artist',data)//歌手排行
  }
}
```
`api.js`只能通过`module.exports`来暴露,那个页面要数据就从这拿。如果在哪个页面要用到它,还需要在头部引入一下:

`const API = require('../../API/api')`

以个性推荐轮播图为例，
```
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
  }
  ```
  这样就把请求到的数据存储到`banner`中了。
  ***
  # 搜索部分
  
 ## **输入框样式**
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8da289aa52854?w=436&h=97&f=png&s=7182)
我这里是引入了`WEUI`的样式，
1.下载`weui.wxss`,链接我找不到了，所以我放上了我的[github](https://github.com/zhongjunhaoz/CloudMusic/blob/master/weui.wxss)上的`weui.wxss`。
2.把下载好的`weui.wxss`放到根目录下。
3.在`app.wxss`中`@import "weui.wxss";`引入一下就可以使用微信提供给我们的样式了。
4.[`WeUI`样式库](https://weui.io/)

## **热门搜索**   

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8daeda7452a8f?w=415&h=404&f=png&s=31051)
上面已经提到我从`api.js`中拿数据。
```
 // 从接口到获取到数据导入到hotsongs
  gethotsongs() {
    API.gethotsongs({ type: 'new' }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {  //严谨
        this.setData({
          hotsongs: res.result.hots
        })
      }
    })
  }
  ```
  ## **搜索历史**
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8dba723508edc?w=419&h=741&f=png&s=42298)
思路：当在输入框输入完成后-->失去焦点--> 利用`wx.setStorageSync`存进缓存中-->`wx.getStorageSync`获取到并把它打印出来。
```
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
  ```
  
  ## **清空搜索历史**
  
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8dbe42c2c2c33?w=405&h=487&f=gif&s=119001)
思路：×图标绑定事件->呼出对话框`wx.showModal`->确定则把`history`赋值为空
  ```
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
  ```
  
 ## **实时搜索建议**
 
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8dc5e9059003f?w=399&h=707&f=gif&s=62309)
思路：实时获取输入框的值->把值传给搜索建议API，发起网络请求->请求之后拿到搜索建议->打印结果并隐藏其他组件只保留搜索建议的组件(类似于Vue里的v-show)

```
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
  }
  ```
  ```
  // 搜索建议
  searchSuggest(){
    API.searchSuggest({ keywords: this.data.searchKey ,type:'mobile'}).then(res=>{
      if(res.code === 200){
        this.setData({
          searchsuggest:res.result.allMatch
        })
      }
    })
  }
  ```
  ## 点击热搜或历史，执行搜索
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8eefd6bdf126f?w=403&h=703&f=gif&s=257246)
思路：关键是`event`,点击通过`e.currentTarget.dataset.value`拿到所点击的值，再交给其他方法执行搜索行为。
```
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
```

  ## **搜索结果**    
  
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8dd6660f63f9a?w=399&h=707&f=gif&s=63353)
思路：输入结束->确认键->调用`searchResult`请求到结果
```
// 搜索完成点击确认
  searchover:function(){
    let that = this;
    that.setData({
      showsongresult: false
    })
    that.searchResult();
  }
  ```
  ```
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
  }
  ```
  ***
  # 乐库部分
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8deb716cb19fc?w=1049&h=734&f=png&s=483647)
乐库部分其实没什么逻辑很难的部分，以结构和样式为主，在这里就不赘述了。可以到我的[github](https://github.com/zhongjunhaoz/CloudMusic)上查看。在这里分享一些小功能的实现和踩到的坑。

## **个性推荐，主播电台切换**
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8e03ef5ad0dbc?w=403&h=669&f=gif&s=1612390)
1.个性推荐和主播电台是两个`swiper-item`所以他们才可以左右滑动，就像轮播图一样，不过轮播图放的是图片，而这里放的是整个页面。
2.我要实现的效果是左右滑动的同时，`个性推荐`和`主播电台`下面的白色方块也要跟着滑动。    
**1. 第一种方法**   
给包裹两个`swiper-item`的`swiper`添加一个`bindchange="changeline"`事件，把事件对象`event`打印出来发现，`console.log(e.detail.current)`,当我们左右滑动的时候`cuurrent`的值会在`0`和`1`之间切换。所以我给白色方块添加
```
class="{{changeline?'swiper_header_line_before':'swiper_header_line_after'}}"
```
```
    if(e.detail.current === 0){
    this.setData({
       changeline:true
      })
    }else{
    this.setData({
       changeline:false
      })
    }
``` 
当`current`为0，即页面在个性推荐时，让`changeline`为`true`;当`current`为1，即页面在主播电台时，让`changeline`为`false`;为`true`时，给白色方块加持`swiper_header_line_before`的样式，为`false`时，加持`swiper_header_line_after`的样式。这样就可以跟随`swiper-item`的滑动而切换了。**但是，这种切换方式太僵硬了**，没有那种流畅的切换效果，而且不适合多`swiper-item`页面。   
**2. 第二种方法**

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8e8d9a71ab12a?w=436&h=295&f=png&s=23978)
让一半宽度，四分之一宽度设置为变量是为了兼容不同的手机型号。因为写死数据肯定会有BUG，所以才要计算宽度。
```
<view class="weui-navbar-slider" style="transform:translateX({{slideOffset}}px);"></view>
```
```
.weui-navbar-slider{
  width:28px;
  height: 5px;
  background: #ffffff;
  border-radius:10rpx;
  transition: transform .6s;
 }
 ```
`slideOffset`为变量，动态接受从`data`传来的数据。
```
onLoad:function(){
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
    })
}

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
  }
  ```
  ## MV播放
  
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8ea3d1f4e6c01?w=403&h=669&f=gif&s=2204017)
主要是结构和样式，我直接上代码了。
```
<!-- play_mv.wxml -->
<view class="mv_box">
    <video src="{{mv.brs['480']}}" class="mv" autoplay="{{autoplay}}" loop="{{loop}}" direction="{{0}}" show-fullscreen-btn="{{showfullscreenbtn}}"
    show-center-play-btn="{{showcenterplaybtn}}" enable-progress-gesture="{{enableprogressgesture}}" show-mute-btn="{{showmutebtn}}" title="{{mv.name}}"
    play-btn-position="{{center}}" object-fit="{{objectfit}}"></video>
</view>

<view class="mv_name">{{mv.name}}</view>
<view class="mv_time"> 发行:  {{mv.publishTime}}</view>
<view class="mv_time mv_times">播放次数:  {{mv.playCount}}</view>
<view class="mv_time mv_desc">{{mv.desc}}</view>
<view class="mv_time mv_desc mv_other">点赞: {{mv.likeCount}}</view>
<view class="mv_time mv_desc mv_other">收藏: {{mv.subCount}}</view>
<view class="mv_time mv_desc mv_other">评论: {{mv.commentCount}}</view>
<view class="mv_time mv_desc mv_other">分享: {{mv.shareCount}}</view>
```
```
/* play/play_mv.wxss */
.mv_box{
    width: 100%;
    height: 480rpx;
    margin-top:-2rpx;
}
.mv{
    width: 100%;
    height: 100%;
    border-radius:15rpx;
}
.mv_name{
    margin-top:20rpx;
    margin-left:20rpx;
}
.mv_time{
    font-size: 12px;
    margin-left:20rpx;
    color:#979798;
    display:initial;
}
.mv_times{
    margin-left: 100rpx;
}
.mv_desc{
    display: block;
    color:#6A6B6C;
}
.mv_other{
    display: block;
}
```
```
// play_mv.js
const API_BASE_URL = 'http://musicapi.leanapp.cn';
const app = getApp();
Page({
  data: {
    mv: [],
    autoplay: true,
    loop: true,
    showfullscreenbtn: true,
    showcenterplaybtn: true,
    enableprogressgesture: true,
    showmutebtn: true,
    objectfit: 'contain',
  },
  onLoad: function (options) {
    // console.log(mv_url);
    const mvid = options.id; // onLoad()后获取到歌曲视频之类的id

    // 请求MV的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/mv/detail',
      data: {
        mvid: mvid    
      },
      success: res => {
        console.log(res.data.data.brs['480'])
        console.log('歌曲音频url:', res)
        if (res.data.data.brs === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.setData({
            mv: res.data.data
          })
        }
      }
    })
  },
})
```
## 歌手榜

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8eaed5f5e5b3b?w=795&h=695&f=png&s=242469)
```
// 歌手榜的js
const API = require('../../API/api');
const app = getApp();
Page({

  data: {
    songers: [], //歌手榜
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getSonger();
  },

  getSonger: function () {
    API.getSonger({}).then(res => {
      wx.hideLoading()
      this.setData({
        songers: res.list.artists.slice(0, 100)
      })
    })
  },
  handleSheet: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `./moremore_songer?id=${sheetId}`
    })
  },
})
```
```
<!-- 歌手榜结构 -->
<view wx:for="{{songers}}" wx:key="" class='songer_box' data-id="{{item.id}}" bindtap='handleSheet'>
  <view class='songer_index_box'>
    <text class='songer_index'>{{index + 1}}</text>
  </view>
  <view class='songer_img_box'>
  <image src="{{item.picUrl}}" class='songer_img'></image>
  </view>
  <view class='songer_name_box'>
  <text class='songer_name'>{{item.name}}</text>
  <text class='songer_score'>{{item.score}}热度</text>
  </view>
</view>
```
```
// 歌手下级路由歌曲列表
const API_BASE_URL = 'http://musicapi.leanapp.cn';
const app = getApp();
Page({
  data: {
    songList: []
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const sheetId = options.id;
    wx.request({
      url: API_BASE_URL + '/artists',
      data: {
        id: sheetId    
      },
      success: res => {
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.hotSongs.length - 1; i++) { //循环打印出其id
          waitForPlay.push(res.data.hotSongs[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
          // console.log(app.globalData.waitForPlaying)
        }
        wx.hideLoading()
        console.log(res.data.hotSongs)
        this.setData({
          songList: res.data.hotSongs
        })
      }
    })
  },
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  }
})
```
```
<!-- more/more_songer/moremore_songer.wxml歌手下面的歌曲 -->
<view class='search_result_songs'>
  <view wx:for="{{songList}}" wx:key="" class='search_result_song_item songer_box' data-id="{{item.id}}" bindtap='handlePlayAudio'>
    <view class='songer_index_box'>
      <text class='songer_index'>{{index + 1}}</text>
    </view>
    <view class='songer_img_box'>
      <view class='search_result_song_song_name'>{{item.name}}</view>
      <view class='search_result_song_song_art-album'>{{item.ar[0].name}} - {{item.al.name}}</view>
    </view>
  </view>
</view>
```

## 推荐歌单

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8eb96b06ef0b4?w=800&h=642&f=png&s=373779)
因为样式与排行榜类似，所以只放出图片，源码可以到我的[github](https://github.com/zhongjunhaoz/CloudMusic/tree/master/more/more_sheet)上查看。

## 榜单排行
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8ebf82357b4e6?w=735&h=623&f=png&s=222179)
[请查看源码](https://github.com/zhongjunhaoz/CloudMusic/tree/master/more)

## 换一换功能

![](https://user-gold-cdn.xitu.io/2019/6/25/16b8ec5afa3172e5?w=403&h=386&f=gif&s=301154)
思路：绑定点击事件->选取随机的三个数->给空值->push三个随机数进数组中->重新赋值。
```
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
  }
  ```
  # 播放界面
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8f088b494cb9c?w=403&h=703&f=gif&s=3753267)
图片太大，因此加快了播放。

## 播放功能
**思路：利用`data-id="{{item.id}}"`获取到歌曲ID放在`event`中-> 通过`event`对象事件获取ID并跳转到播放页面 ->`wx.request`获取到歌曲的音频地址及detail->背景音频管理器 `wx.getBackgroundAudioManager()`->播放**   
以歌手榜下级路由歌曲列表为例，  
```
<view wx:for="{{songList}}" wx:key="" class='search_result_song_item songer_box' data-id="{{item.id}}" bindtap='handlePlayAudio'>
```
    
```
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  }
  ```
  
  ```
  // play.js
const API_BASE_URL = 'http://musicapi.leanapp.cn';
const app = getApp();
Page({
  data: {
    isPlay: '',
    song:[],
    innerAudioContext: {},
    show:true,
    showLyric:true,
    songid:[],
    history_songId:[]
  },
  onLoad: function (options) {
    const audioid = options.id; // onLoad()后获取到歌曲视频之类的id
    this.play(audioid); //把从wxml获取到的值传给play()
  },
  play: function (audioid){
    const audioId = audioid;
    app.globalData.songId = audioId;  //让每一个要播放的歌曲ID给全局变量的songId
    const innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContext,
      isPlay: true
    })
    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: audioId
      },
      success: res => {
        if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.createBgAudio(res.data.data[0]);
        }
      }
    })
    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: audioId    //必选参数ids
      },
      success: res => {
        if (res.data.songs.length === 0) {
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.setData({
            song: res.data.songs[0],  //获取到歌曲的详细内容，传给song
          })
          app.globalData.songName = res.data.songs[0].name;
        }
      },
    })
  },
  createBgAudio(res) {
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.title = 'title';                        //把title 音频标题 给实例
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
    const history_songId = this.data.history_songId
    const historySong = {
      id: app.globalData.songId,
      songName:app.globalData.songName
    }
    history_songId.push(historySong)
    bgAudioManage.onPlay(res => {                         // 监听背景音频播放事件
      this.setData({
        isPlay: true,
        history_songId
      })
    });
    bgAudioManage.onEnded(() => {                  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
      this.go_lastSong();
    })
    wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
  },
})
```
  ## 暂停/播放
  ```
    <!-- 暂停播放图标 -->
  <view class="play_suspend">
    <view class="icon_playing"><image bindtap="handleToggleBGAudio" src="../images/suspend.png" hidden="{{!isPlay}}" class="{{'img_play_suspend'}}" />  <!-- 暂停图标-->
    <image bindtap="handleToggleBGAudio" src="../images/play.png" hidden="{{isPlay}}" class="{{'img_play_suspend'}}" /></view> <!--播放图标-->
  </view>
  ```
  ```
  // 播放和暂停
  handleToggleBGAudio() {
    // const innerAudioContext = app.globalData.innerAudioContext;
    const bgAudioManage = app.globalData.bgAudioManage;
    const {isPlay} = this.data;
    if (isPlay) {
      bgAudioManage.pause();
      // innerAudioContext.pause();handleToggleBGAudio
    } else {
      bgAudioManage.play();
      // innerAudioContext.play();
    }
    this.setData({
      isPlay: !isPlay
    })
    console.log(this.data.isPlay)
  }
  ```
  ## 上一首/下一首(随机播放)
  **思路：点击歌单或歌手页，获取到对应的歌单/歌手id->`wx.request`请求数据获取到所有的歌单内/歌手热门歌曲音频地址->给全局变量globalData->点击上一首/下一首随机获取到全局变量的一则数据->给play()方法->播放**
  ```
  <!--歌单-->
    onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const sheetId = options.id;
    wx.request({
      url: API_BASE_URL + '/playlist/detail',
      data: {
        id: sheetId    
      },
      success: res => {
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.playlist.trackIds.length - 1;i++){ //循环打印出其id
          waitForPlay.push(res.data.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
        }
        wx.hideLoading()
        this.setData({
          songList: res.data.playlist.tracks
        })  
      }
    })
  }
  ```
  ```
  <view class="icon_playing "><image src="../images/lastSong.png" class=" icon_play" bindtap="go_lastSong" /></view>
  <view class="icon_playing "><image src="../images/nextSong.png" class=" icon_play" bindtap="go_lastSong" /></view>
  ```
  ```
    go_lastSong:function(){ 
    let that = this;
    const lastSongId = app.globalData.waitForPlaying;
    const songId = lastSongId[Math.floor(Math.random() * lastSongId.length)]; //随机选取lastSongId数组的一个元素
    that.data.songid = songId;
    this.play(songId)//传进play()方法中
    app.globalData.songId=songId;
  }
  ```
  ## 歌词/封面切换
  
![](https://user-gold-cdn.xitu.io/2019/6/26/16b8f5e9d2a1e22b?w=403&h=703&f=gif&s=1127200)
  因为网易云API的歌词接口崩溃，请求不到歌词，所以我只能把歌词写死为`纯音乐，请欣赏`。类似于``v-show``。
  
  ```
   <!-- 封面 -->
  <!-- 一开始onload时,showLyric=true, 显示为转动的图标，点击图标，切换为歌词-->
  <view class="sing-show" bindtap="showLyric" >
    <view class="moveCircle {{isPlay ? 'play' : ''}}" hidden="{{!showLyric}}">
      <image src="{{song.al.picUrl}}" class="coverImg {{isPlay ? 'play' : ''}}" hidden="{{!showLyric}}"/>
    </view>
    <text  hidden="{{showLyric}}" class="songLyric">纯音乐，请欣赏</text>
  </view>
  ```
  ```
    // 点击切换歌词和封面
  showLyric(){
    const {showLyric} = this.data;
    this.setData({
      showLyric: !showLyric
    })
  }
  ```
  ## 破产版的孤独星球动效
  
![](https://user-gold-cdn.xitu.io/2019/6/25/16b8f4e771e9a04d?w=403&h=703&f=gif&s=1629412)
封面旋转：
```
@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
```
扩散的圆形线条：
其实就是外面套一个盒子，盒子宽高变大以及透明度逐渐变低。
```
@keyframes moveCircle {
  0%{
    width: 400rpx;
    height: 400rpx;
    border: 1px solid rgba(255, 255, 255, 1)
  }
  30%{
    width: 510rpx;
    height: 510rpx;
    border: 1px solid rgba(255, 255, 255, 0.8)
  }
  50%{
    width: 610rpx;
    height: 610rpx;
    border: 1px solid rgba(255, 255, 255, 0.6)
  }
  80%{
    width: 700rpx;
    height: 700rpx;
    border: 1px solid rgba(255, 255, 255, 0.4)
  }
  99%{
    width: 375px;
    height: 375px;
    border: 1px solid rgba(255, 255, 255, 0.1)
  }
  100%{
    width: 0px;
    height: 0px;
    border: 1px solid rgba(255, 255, 255, 0)
  }
}
```
## 背景毛玻璃
```
<!-- play.wxml -->
<image src="{{song.al.picUrl}}" class="background_img" ></image>
```
```
/* 播放界面毛玻璃效果 */
.background_img{ 
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  z-index: -1;
  transform: scale(1.5); /*和网易云音乐对比了一下，发现也是放大1.5倍*/
}
```
***
# 播放tabBar

![](https://user-gold-cdn.xitu.io/2019/6/26/16b8f674f2bdc7a5?w=403&h=731&f=gif&s=1441605)
思路是参考酷狗音乐小程序。这个tabBar的js，wxml与播放功能界面的js，wxml相同。因为音乐播放是用`wx.getBackgroundAudioManager()`背景音频播放器管理的，所以才能同步。
***
# 我的tabBar


![](https://user-gold-cdn.xitu.io/2019/6/26/16b8f828b086f094?w=418&h=735&f=png&s=154747)
## 播放历史
思路：play.js中一旦播放成功就把歌名及歌曲ID传入全局变量->push到play.js里的数组中->`wx.setStorageSync`把数据存入缓存->在需要的页面`wx.getStorageSync`获取到缓存。
```
<!--play.js-->
const history_songId = this.data.history_songId
const historySong = {
      // id: res.id
      id: app.globalData.songId,
      songName:app.globalData.songName
    }
    history_songId.push(historySong)
    wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
```
```
<!--me.js-->
 onShow:function(){
    var history = wx.getStorageSync('historyId');
    // console.log(history)
     this.setData({
      hidden:true,
      //  historyId: app.globalData.songName
       historyId: history
    })
    console.log(this.data.historyId)
  }
  ```
  ***
  # 结语
  做项目的过程总的来说痛并快乐，因为改不出BUG的样子真的很狼狈，但实现了某一个功能的那一刻真的很欣慰。再次感谢给予帮助的老师同学。如果你喜欢这篇文章或者可以帮到你，不妨点个赞吧！同时也非常希望看到这篇文章的你在下方给出建议！最后奉上[**源码**](https://github.com/zhongjunhaoz/CloudMusic)，有需要的可以自取。最后，说点题外话，因为我是2020届毕业生，现在面临实习压力，有没有大佬捞一下。
  




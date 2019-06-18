// 前后台切换时触发的函数，初始化时，启动时，发生错误时，比如脚本错误，api调用失败时触发什么函数
// 也可以设置全局变量，然后在其他页面对应的js文件中通过下面的方式来获取到里面定义的全局变量。
// 比如var app = getApp();  var globalData = app.globalData
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
  },
  globalData: {
    userInfo: null,
    songId:[],
    songImg:[],
    waitForPlaying:[],
    songName:[]
  }
})
const app = getApp();
Page({

  data: {
    img:[],
    nickName:[],
    hidden:true,
    historyId:[]
  },


  onShow:function(){
    var history = wx.getStorageSync('historyId');
    // console.log(history)
     this.setData({
      hidden:true,
      //  historyId: app.globalData.songName
       historyId: history
    })
    console.log(this.data.historyId)
  },
  onGotUserInfo: function (e) {
    this.setData({
      hidden:false
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    // this.setData({
    //   hidden:true
    // })
      let that = this;
        // 获取用户信息
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo.avatarUrl);
                console.log(res.userInfo.nickName);
                that.setData({
                  img:res.userInfo.avatarUrl,
                  nickName:res.userInfo.nickName
                })
              }
            });
          }
        });
  }

})
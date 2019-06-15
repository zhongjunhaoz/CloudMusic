// pages/me/me.js
Page({

  data: {
    img:[],
    nickName:[],
    hidden:true,
  },


  onLaunch:function(){
     this.setData({
      hidden:true
    })
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
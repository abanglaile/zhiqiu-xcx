//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.server_url + '/get_xcx_auth',
          data: {
            code: res.code
          },
          // method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.status == 200) {
              wx.setStorage({
                key: "token",
                data: res.data.openid,
              });
            }
            console.log("get_xcx_auth_data:",JSON.stringify(res));
            //
            if(res.data.userid){
              that.globalData.userid = res.data.userid;
              // 获取绑定学生信息
              wx.request({
                url: that.globalData.server_url + '/getBondStudent',
                data: {
                  parent_id: that.globalData.userid,
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
                  // console.log(res)
                  if (res.statusCode == 200) {
                    that.globalData.students = res.data
                  } else {
                    that.globalData.students = []
                  }
                  that.globalData.is_login = true
                  if (that.globalData.students.length == 1) {
                    // 自动选择，并跳转到首页
                    that.globalData.student_id = that.globalData.students[0].userid
                    wx.switchTab({
                      url: '../lesson/lesson'
                    })
                  } else {
                    // 弹出选择页由用户选择
                    wx.navigateTo({
                      url: '/pages/account/account'
                    })
                  }
                }
              })
            }
            if(res.data.unionid){
              that.globalData.unionid = res.data.unionid;
            }
            that.globalData.openid = res.data.openid;
            console.log("globalData step2:",JSON.stringify(that.globalData))
          }
        }) 
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log("globalData step1:",JSON.stringify(this.globalData))
              
              // 可以将 res 发送给后台解码出 unionId
              // wx.request({
              //   url: this.globalData.server_url + '/get_xcx_unionid',
              //   data: {
              //     encryptedData: res.encryptedData,
              //     iv: res.iv,
              //     openid: this.globalData.openid,
              //   },
              //   // method: 'POST',
              //   header: {
              //     'content-type': 'application/json'
              //   },
              //   success: function (res) {
              //     console.log("get_xcx_unionid_res:",JSON.stringify(res));
              //     if(res.data){
              //       that.globalData.unionid = res.data.unionid;
              //       if(res.data.userid){
              //         that.globalData.userid = res.data.userid;
              //       }
              //     }
              //     console.log("globalData step2:",JSON.stringify(that.globalData))
              //   }
              // }) 
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

        } else{
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
  globalData: {
    openid: null,
    unionid: null,
    userid: null,
    userInfo: null,
    is_login: false,
    students: [], // 已绑定的所有学生信息
    student_id: '', // 当前选择的学生id
    server_url: "https://www.zhiqiu.pro/api"
    // server_url: "http://127.0.0.1:7001/api"
  }
})
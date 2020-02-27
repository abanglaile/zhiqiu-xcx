//获取应用实例
const app = getApp()

Page({
  data: {
    loading: false
  },
  getSetting: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 更新全局状态
          app.globalData.is_auth = true
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              console.log("globalData step1:", JSON.stringify(app.globalData))
              // 可以将 res 发送给后台解码出 unionId
              // wx.request({
              //   url: app.globalData.server_url + '/get_xcx_unionid',
              //   data: {
              //     encryptedData: res.encryptedData,
              //     iv: res.iv,
              //     openid: app.globalData.openid,
              //   },
              //   // method: 'POST',
              //   header: {
              //     'content-type': 'application/json'
              //   },
              //   success: function (res) {
              //     console.log("get_xcx_unionid_res:",JSON.stringify(res));
              //     if(res.data){
              //       app.globalData.unionid = res.data.unionid;
              //       if(res.data.userid){
              //         app.globalData.userid = res.data.userid;
              //       }
              //     }
              //     console.log("globalData step2:",JSON.stringify(app.globalData))
              //   }
              // }) 
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
  login: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.server_url + '/get_xcx_auth',
          data: {
            code: res.code
          },
          // method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.status == 200) {
              wx.setStorage({
                key: "token",
                data: res.data.openid,
              });
            }
            console.log("get_xcx_auth_data:", JSON.stringify(res));
            //
            if (res.data.userid) {
              app.globalData.userid = res.data.userid;
              // 获取绑定学生信息
              this.getBond()
            }
            if (res.data.unionid) {
              app.globalData.unionid = res.data.unionid
            }
            app.globalData.openid = res.data.openid
            console.log("globalData step2:", JSON.stringify(app.globalData))
            // 更新全局状态
            app.globalData.is_login = true
          }
        })
      }
    })
  },
  getBond: function () {
    // 获取绑定学生信息
    wx.request({
      url: app.globalData.server_url + '/getBondStudent',
      data: {
        parent_id: app.globalData.userid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // console.log(res)
        if (res.statusCode == 200) {
          app.globalData.students = res.data
        } else {
          app.globalData.students = []
        }
        // 更新全局状态
        app.globalData.is_bond = true
        // 跳转逻辑
        if (app.globalData.students.length == 1) {
          // 自动选择，并跳转到首页
          app.globalData.student_id = app.globalData.students[0].userid
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
  },
  // 事件处理函数
  onLoad: function () {
  },
  onShow: function () {
    // 监听globalData中的is_bond属性（已失效，注释）
    // app.watch('status', function (value) { console.log('ahahahah: ' + value) })

    let is_auth = app.globalData.is_auth
    let is_login = app.globalData.is_login
    let is_bond = app.globalData.is_bond
    let students = app.globalData.students
    let student_id = app.globalData.student_id

    // 开局快速跳转
    if (is_auth) {
      if (is_bond) {
        if (students.length == 1 || student_id) {
          // 只有一个学生或者已选择当前学生，自动选择，并跳转到首页
          app.globalData.student_id = students[0].userid
          wx.switchTab({
            url: '../lesson/lesson'
          })
        } else {
          // 弹出选择页由用户选择
          wx.navigateTo({
            url: '/pages/account/account'
          })
        }
      } else {
        this.login()
      }
    } else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 更新全局状态
            app.globalData.is_auth = true
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                console.log("globalData step1:", JSON.stringify(app.globalData))
                // 可以将 res 发送给后台解码出 unionId
                // wx.request({
                //   url: app.globalData.server_url + '/get_xcx_unionid',
                //   data: {
                //     encryptedData: res.encryptedData,
                //     iv: res.iv,
                //     openid: app.globalData.openid,
                //   },
                //   // method: 'POST',
                //   header: {
                //     'content-type': 'application/json'
                //   },
                //   success: function (res) {
                //     console.log("get_xcx_unionid_res:",JSON.stringify(res));
                //     if(res.data){
                //       app.globalData.unionid = res.data.unionid;
                //       if(res.data.userid){
                //         app.globalData.userid = res.data.userid;
                //       }
                //     }
                //     console.log("globalData step2:",JSON.stringify(app.globalData))
                //   }
                // }) 
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                this.login()
              }
            })
          } else {
            wx.reLaunch({
              url: '/pages/authorize/authorize',
            })
          }
        }
      })
    }
    

    
  }
})

// pages/bond.js
const { $Toast } = require('../../iviewModule/base/index')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: {
      'modal': false,
      'alert': false,
      'preview': false
    },
    loading: false,
    code: '',
    students: [],
    userFromCode: null
  },

  onTapStudent: function (data) {},
  onAddStudent: function () {
    this.setData({
      code: '',
      userFromCode: null,
      'visible.preview': false,
      'visible.alert': false,
      'visible.modal': true
    })
  },
  onApiParentBond: function () {
    if (this.data.userFromCode) {
      this.setData({
        loading: true
      })
      wx.request({
        url: app.globalData.server_url + '/parentBond',
        data: {
          parent_id: app.globalData.userid,
          student_id: this.data.userFromCode.userid,
          wx_info: {
            openid: app.globalData.openid,
            unionid: app.globalData.unionid,
            nickname: app.globalData.userInfo.nickName,
            imgurl: app.globalData.userInfo.avatarUrl
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          $Toast({
            content: res.data.msg,
            image: this.data.userFromCode.avatar
          })
          app.globalData.userid = res.data.userid
          this.setData({
            loading: false,
            'visible.modal': false
          })
          // 成功后刷新绑定信息
          this.onLoad()
        },
        fail: (res) => {
          $Toast({
            content: '绑定失败',
            type: 'error'
          });
        }
      })
    }
  },
  onCancleParentBond: function () {
    this.setData({
      userFromCode: null,
      'visible.preview': false,
      'visible.alert': false,
      'visible.modal': false
    })
  },
  onApiCheckCode: function (event) {
    // let dataset = event.currentTarget.dataset
    // const code = dataset.code
    this.setData({
      code: event.detail.detail.value,
      loading: true
    })
    wx.request({
      url: app.globalData.server_url + '/getUserByCode',
      data: {
        code: this.data.code
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // console.log(res)
        if (res.data) {
           this.setData({
             userFromCode: res.data,
             'visible.preview': true,
             'visible.alert': false,
             loading: false
           })
        } else {
          this.setData({
            userFromCode: res.data,
            'visible.preview': false,
            'visible.alert': true,
            loading: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.setData({
      students: app.globalData.students
    })
    // this.setData({
    //   loading: true
    // })
    // wx.request({
    //   url: app.globalData.server_url + '/getBondStudent',
    //   data: {
    //     parent_id: app.globalData.userid,
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (res) => {
    //     // console.log(res)
    //     if (res.statusCode == 200) {
    //       this.setData({
    //         loading: false,
    //         students: res.data
    //       })
    //     } else {
    //       this.setData({
    //         loading: false,
    //         students: []
    //       })
    //     }  
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
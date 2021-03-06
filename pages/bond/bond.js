// pages/bond.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: {
      alert: false,
      card: false
    },
    loading: false,
    code: '',
    user: null
  },

  onTapStudent: function (data) {},
  onApiParentBond: function (event) {
    this.setData({
      loading: true
    })
    wx.request({
      url: app.globalData.server_url + '/parent',
      data: {
        parent_id: app.globalData.userid,
        student_id: event.mark.id,
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
        app.globalData.userid = res.data.userid
        this.setData({
          loading: false,
        })
        // 成功后刷新绑定信息
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        })
        setTimeout(
          () => { this.onApiGetStudents() },
          1000
        )
      },
      fail: (res) => {
        wx.showToast({
          title: '绑定失败',
          duration: 1500
        })
      }
    })
  },
  onApiCheckCode: function (event) {
    // let dataset = event.currentTarget.dataset
    // const code = dataset.code
    let pattern = /^\w*$/i
    let code = event.detail.detail.value
    if (pattern.test(code)) {
      this.setData({
        code: code,
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
              user: res.data,
              'visible.alert': false,
              'visible.card': true,
              loading: false
            })
          } else {
            this.setData({
              user: res.data,
              'visible.alert': true,
              'visible.card': false,
              loading: false
            })
          }
        }
      })
    } else {
      this.setData({
        'visible.alert': true,
        loading: false
      })
    }
  },
  onApiGetStudents: function () {
    this.setData({
      loading: true
    })
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
          this.setData({
            loading: false
          })
          app.globalData.students = res.data
        } else {
          this.setData({
            loading: false
          })
        }
        wx.navigateBack()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
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
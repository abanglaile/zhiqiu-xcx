//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loading: false,
    current: 0
  },
  // steps
  handleClick() {
    const addCurrent = this.data.current + 1;
    const current = addCurrent > 2 ? 0 : addCurrent;
    this.setData({
      'current': current
    })
  },
  // step-1
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
  // step-2
  // step-3
  //事件处理函数
  onLoad: function () {
  }
})

//app.js
App({
  watch: function (key, method) {
    // 全局监听方法
    // key 监听的globalData属性名称
    // method 监听触发的回调函数
    let obj = this.globalData
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        // 劫持globalData.key的修改，改为使用globalData._key存储
        this['_' + key] = value
        method(value)
      },
      get: function () {
        return this['_' + key]
      }
    })
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var that = this;
  },
  globalData: {
    openid: null,
    unionid: null,
    userid: null,
    userInfo: null,
    is_auth: false,
    is_login: false,
    is_bond: false,
    students: [], // 已绑定的所有学生信息
    student_id: '', // 当前选择的学生id
    server_url: "https://www.zhiqiu.pro/api"
    // server_url: "http://127.0.0.1:7001/api"
  }
})
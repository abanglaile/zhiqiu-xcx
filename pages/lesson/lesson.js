// pages/stuStatus/stuStatus.js

// const moment = require('../../miniprogram_npm/moment/index')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible: {
      sign: false,
      lesson: false,
      time: false
    },
    loading: false,
    sign_list: [{ name: '所有状态', value: 2, color: '#FA5151' }, { name: '已上课', value: 1 }, { name: '未上课', value: 0 }],
    time_list: [{ name: '全部时间', value: 0 }, { name: '本周', value: 1, color: '#FA5151' }, { name: '本月', value: 2 }],
    label_list: [
      { text: '函授', label_id: 'class', selected: true }, 
      { text: '导学', label_id: 'guide', selected: true }
    ],
    course_list: [
      // { course_label_name: '数学', course_label: 1, selected: true },
      // { course_label_name: '音乐', course_label: 2, selected: true },
      // { course_label_name: '英语', course_label: 3, selected: true },
      // { course_label_name: '物理', course_label: 4, selected: true },
      // { course_label_name: '化学', course_label: 5, selected: true },
      // { course_label_name: '地理', course_label: 6, selected: true },
      // { course_label_name: '语文', course_label: 7, selected: true },
      // { course_label_name: '政治', course_label: 8, selected: true },
      // { course_label_name: '历史', course_label: 9, selected: true }
    ],
    select_time: '本周',
    select_sign: '所有状态',

    
    student_lesson: [
      // {
      //   "lesson_time": "2020年02月13日 16:00-18:00",
      //   "teacher_name": "叶思翰",
      //   "room_name": "room1",
      //   "group_name": "陈盈羽-初中数学",
      //   "course_label": "1",
      //   "label_name": "函授",
      //   "course_label_name": "数学"
      // },
      // {
      //   "lesson_time": "2020年02月12日 14:00-15:00",
      //   "teacher_name": "邓梓君",
      //   "room_name": "room1",
      //   "group_name": "陈盈羽-初中英语",
      //   "course_label": "3",
      //   "label_name": "导学",
      //   "course_label_name": "英语"
      // },
      // {
      //   "lesson_time": "2020年02月11日 14:00-16:00",
      //   "teacher_name": "邓梓君",
      //   "room_name": "room1",
      //   "group_name": "陈盈羽-初中英语",
      //   "course_label": "3",
      //   "label_name": "函授",
      //   "course_label_name": "英语"
      // },
    ],
  },

   // 跳转到课程详细情况页
   onCheckLesson: function (event) {
    // console.log("event.mark.id:",event.mark.id)
    let is_sign = event.mark.id.split("+")[0]
    let lesson_id = event.mark.id.split("+")[1]
    // console.log("is_sign:",is_sign)
    // console.log("lesson_id:",lesson_id)
    if(is_sign == 1){
      app.globalData.lesson_id = lesson_id
      wx.navigateTo({
        url: '/pages/lessonView/lessonView'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.request({
      url: app.globalData.server_url + '/getStuCourse', //仅为示例，并非真实的接口地址
      data: {
        // student_id: "26aae4804fcb11e9881259fe263fe740",
        student_id: app.globalData.student_id,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          course_list: res.data ? res.data.map((item) => {
            item.selected = true
            return item
          }) : []
        })
        this.getStudentLesson();
      },
      fail: (res) => {
        wx.showToast({
          title: '获取课程数据失败',
          duration: 1000
        })
        console.logs(res.data)
      }
    })  
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
    this.getStudentLesson()
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

  },
  selectCourse: function(e){
    let index = e.target.dataset['index']
    this.data.testCourseJson[index].selectd = !this.data.testCourseJson[index].selectd
    this.setData({
      testCourseJson: this.data.testCourseJson
    })
  },
  changeLabelBox: function (e) {
    this.setData({
      select_label_draw: !this.data.select_label_draw
    })
  },
  selectLabel: function (e) {
    this.setData({
      lebel_selectd: e.target.dataset['index']
    })
  },

  /**********/
  selectTab: function (e) {
    this.setData({visible: { [e.mark.type]: true }})
  },

  getStartEndTime(text){    
    var start_time = new Date();
    var end_time = new Date();
    switch(text){
      case '本周':
        var weekday = start_time.getDay() || 7; //获取星期几
        start_time.setDate(start_time.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
        return {
          start_time: start_time,
          end_time: null
        }
      case '本月':
        return {
          start_time: start_time.setDate(1),
          end_time: null
        }
      default:
        return {
          start_time: null,
          end_time: null
        }
    }
  },

  getStudentLesson: function () {
    const start_end_time = this.getStartEndTime(this.data.select_time);
    let filter_option = {
      start_time: start_end_time.start_time,
      end_time: start_end_time.end_time,
      course_label_list: this.data.course_list.filter(c => c.selected),
      label_id_list: this.data.label_list.filter(l => l.selected),
      is_sign: this.data.select_sign == '所有状态' ? -1 : this.data.select_sign == '已上课' ? 1 : 0
    }
    // console.log(JSON.stringify(filter_option));
    // console.log(app.globalData.students)
    if (app.globalData.student_id) {
      this.setData({
        loading: true
      })
      wx.request({
        url: app.globalData.server_url + '/getStudentLesson', //仅为示例，并非真实的接口地址
        data: {
          student_id: app.globalData.student_id,
          // student_id: 'd77412a04cc811eab8d775ec7f1ac387',
          filter_option: filter_option
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          // console.log(this.data.loading)
          this.setData({
            loading: false,
            student_lesson: res.data
          })
          wx.stopPullDownRefresh()
          // console.log(this.data.loading); 
        },
        fail: (res) => {
          this.setData({
            loading: false,
          })
          wx.showToast({
            title: '获取课程数据失败',
            duration: 1000
          })
          wx.stopPullDownRefresh()
          console.logs(res.data)
        }
      })
    }
  },

  // formatLessonTime(start_time, end_time) {
  //   start_time = new Date();
  //   end_time = new Date();
  //   return moment(start_time).format("YYYY-MM-DD HH:mm") + "  -  " + moment(end_time).format("HH:mm");
  // },

  selectTime(e) {
    let time_list = [{ name: '全部时间', value: 0 }, { name: '本周', value: 1 }, { name: '本月', value: 2 }];
    const index = e.detail.index
    time_list[index].color = '#FA5151';
    this.setData({
      select_time: time_list[index].name,
      time_list: time_list,
      'visible.time': false
    })
    this.getStudentLesson()
  },

  selectSign(e) {
    let sign_list = [{ name: '所有状态', value: 0 }, { name: '已上课', value: 1 }, { name: '未上课', value: 2 }]
    const index = e.detail.index
    sign_list[index].color = '#FA5151'
    // console.log(sign_list)
    this.setData({
      select_sign: sign_list[index].name,
      sign_list: sign_list,
      'visible.sign': false
    })
    this.getStudentLesson()
  },

  selectLabel(e) {
    let label_list = this.data.label_list
    const index = e.target.dataset.index
    console.log(index, label_list)
    label_list[index].selected = !label_list[index].selected
    this.setData({
      label_list: label_list
    })
    // this.getStudentLesson()
  },

  selectCourse(e) {
    let course_list = this.data.course_list
    const index = e.target.dataset.index
    console.log(index, course_list)
    course_list[index].selected = !course_list[index].selected
    this.setData({
      course_list: course_list
    })
    // this.getStudentLesson()
  },

  onClose(e){
    let data = {
      visible: { [e.mark.type]: false }
    }
    this.setData(data)
  },

  onOk(e) {
    this.setData({
      'visible.lesson': false
    })
    this.getStudentLesson();  
  },
  onReset(e){
    this.setData({
      label_list: [
        { text: '函授', label_id: 'class', selected: false },
        { text: '导学', label_id: 'guide', selected: false }
      ],
      course_list: this.data.course_list.map(item => {
        item.selected = false
        return item
      })
    })
  },
})
// pages/stuStatus/stuStatus.js

const moment = require('../../miniprogram_npm/moment/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter_visible: false,
    select_tab_num: 0,
    sign_list: [{ text: '不限', value: 2, type: 'warn' }, { text: '已上课', value: 1 }, { text: '未上课', value: 0 }],
    time_list: [{ text: '全部时间', value: 0, type: 'warn' }, { text: '本周', value: 1 }, { text: '上一周', value: 3 }, { text: '近一月', value: 4 }],
    label_list: [
      { text: '函授', label_id: 'class', selected: true }, 
      { text: '导学', label_id: 'guide', selected: true }
    ],
    course_list: [
      { text: '数学', course_label: 1, selected: true },
      { text: '音乐', course_label: 2, selected: true },
      { text: '英语', course_label: 3, selected: true },
      { text: '物理', course_label: 4, selected: true },
      { text: '化学', course_label: 5, selected: true },
      { text: '地理', course_label: 6, selected: true },
      { text: '语文', course_label: 7, selected: true },
      { text: '政治', course_label: 8, selected: true },
      { text: '历史', course_label: 9, selected: true }
    ],
    select_time: '本周',
    select_sign: '不限',

    
    student_lesson: [
      {
        "lesson_time": "2020年02月13日 16:00-18:00",
        "teacher_name": "叶思翰",
        "room_name": "room1",
        "group_name": "陈盈羽-初中数学",
        "course_label": "1",
        "label_name": "函授",
        "course_label_name": "数学"
      },
      {
        "lesson_time": "2020年02月12日 14:00-15:00",
        "teacher_name": "邓梓君",
        "room_name": "room1",
        "group_name": "陈盈羽-初中英语",
        "course_label": "3",
        "label_name": "导学",
        "course_label_name": "英语"
      },
      {
        "lesson_time": "2020年02月11日 14:00-16:00",
        "teacher_name": "邓梓君",
        "room_name": "room1",
        "group_name": "陈盈羽-初中英语",
        "course_label": "3",
        "label_name": "函授",
        "course_label_name": "英语"
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getStudentLesson();
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
    console.log(e)
    this.setData({
      filter_visible: !this.data.filter_visible,
      select_tab_num: e.target.dataset.num
    })
  },

  getStartEndTime(text){
    switch(text){
      case '本周':
        return {
          start_time: moment().startOf('week'),
          end_time: moment().endOf('week')
        }
      case '本月':
        return {
          start_time: moment().startOf('month'),
          end_time: moment().endOf('month').endOf('month')
        }
      default:
        return {
          start_time: null,
          end_time: null
        }
    }
  },

  getStudentLesson(){
    this.setData({
      loading: true
    })
    const start_end_time = this.getStartEndTime(this.data.select_time);
    let filter_option = {
      start_time: start_end_time.start_time,
      end_time: start_end_time.end_time,
      course_label_list: this.data.course_list.filter(c => c.selected),
      label_id_list: this.data.label_list.filter(l => l.selected),
      is_sign: this.data.select_sign == '不限' ? -1 : this.data.select_sign == '已上课' ? 1 : 0
    }
    console.log(JSON.stringify(filter_option));
    // wx.request({
    //   url: 'test.php', //仅为示例，并非真实的接口地址
    //   data: {
    //     student_id: this.app.global.student_id,
    //     filter_option: filter_option
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     this.setData({
    //       loading: false,
    //       student_lesson: res.data
    //     })
    //     console.log(res.data)
    //   }
    // })
  },

  formatLessonTime(start_time, end_time) {
    start_time = new Date();
    end_time = new Date();
    return moment(start_time).format("YYYY-MM-DD HH:mm") + "  -  " + moment(end_time).format("HH:mm");
  },

  selectTime(e) {
    let time_list = [{ text: '全部时间', value: 0 }, { text: '本周', value: 1 }, { text: '本月', value: 2 }];
    const index = e.detail.index
    time_list[index].type = 'warn';
    this.setData({
      select_time: time_list[index].text,
      time_list: time_list,
      filter_visible: false
    })
  },

  selectSign(e) {
    let sign_list = [{ text: '不限', value: 0 }, { text: '已上课', value: 1 }, { text: '未上课', value: 2 }]
    const index = e.detail.index
    sign_list[index].type = 'warn'
    console.log(sign_list)
    this.setData({
      select_sign: sign_list[index].text,
      sign_list: sign_list,
      filter_visible: false
    })
    getStudentLesson();
  },

  selectLabel(e) {
    let label_list = this.data.label_list
    const index = e.target.dataset.index
    console.log(index, label_list)
    label_list[index].selected = !label_list[index].selected
    this.setData({
      label_list: label_list
    })
    this.getStudentLesson()
  },

  selectCourse(e) {
    let course_list = this.data.course_list
    const index = e.target.dataset.index
    console.log(index, course_list)
    course_list[index].selected = !course_list[index].selected
    this.setData({
      course_list: course_list
    })
    this.getStudentLesson()
  },

  onClose(e){
    this.setData({
      filter_visible: false
    })
  },

  onOk(e) {
    this.setData({
      filter_visible: false
    })
    getStudentLesson();
  },

  onReset(e) {
    this.setData({
      sign_list: [{ text: '不限', value: 2, type: 'warn' }, { text: '已上课', value: 1 }, { text: '未上课', value: 0 }],
      time_list: [{ text: '全部时间', value: 0 }, { text: '本周', value: 1, type: 'warn' }, { text: '上一周', value: 3 }, { text: '近一月', value: 4 }],
      label_list: [
        { text: '函授', label_id: 'class', selected: true },
        { text: '导学', label_id: 'guide', selected: true }
      ],
      course_list: [
        { text: '数学', course_label: 1, selected: true },
        { text: '音乐', course_label: 2, selected: true },
        { text: '英语', course_label: 3, selected: true },
        { text: '物理', course_label: 4, selected: true },
        { text: '化学', course_label: 5, selected: true },
        { text: '地理', course_label: 6, selected: true },
        { text: '语文', course_label: 7, selected: true },
        { text: '政治', course_label: 8, selected: true },
        { text: '历史', course_label: 9, selected: true }
      ],
      select_time: '本周',
      select_sign: '不限',
    })
  }
})
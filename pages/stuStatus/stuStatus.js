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
      { text: '函授', label_id: 'class', selected: false }, 
      { text: '导学', label_id: 'guide', selected: false }
    ],
    course_list: [
      { text: '语文', course_label: 0, selected: false },
      { text: '数学', course_label: 1, selected: false },
      { text: '英语', course_label: 2, selected: false }
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
    all_list: [
      { txt: '已签到', num: 1 },
      { txt: '未签到', num: 0 },
    ],
    all_states: false,
    selectd: 0,
    testCourseJson:[
      { txt:'语文', id:0,selectd:false},
      { txt: '数学', id: 1, selectd: false},
      { txt: '英语', id: 2, selectd: false},
      { txt: '声乐', id: 3, selectd: false }
    ],
    lebel_list:[
      { txt: '函授', num: 0 },
      {txt:'导学',num:1}
    ],
    select_label_draw: false,
    lebel_selectd:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(filter_option);
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
  toggleDrawerShow: function () {
    this.setData({
      showDrawer: !this.data.showDrawer
    })
  },

  startTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  startDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  endTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  endDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  teacherNameChange: function (e) {
    this.setData({
      teacherNameIndex: e.detail.value
    })
  },
  groupNameChange: function (e) {
    this.setData({
      groupNameIndex: e.detail.value
    })
  },
  courseNameChange: function (e) {
    this.setData({
      courseNameIndex: e.detail.value
    })
  },
  tabChange: function (e) {
    this.setData({
      currentTab: e.detail.key
    })
  },
  changeBox: function (e) {
    this.setData({
      all_states: !this.data.all_states,
      
    })
  },
  select: function(e) {
    this.setData({
      selectd: e.target.dataset['index']
    }) 
  },
  changeTimeBox: function(e){
    this.setData({
      select_time_draw: !this.data.select_time_draw
    })
  },
  changeCourseBox: function(e){
    this.setData({
      select_course_draw: !this.data.select_course_draw
    })
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
    console.log(this.data.filter_visible)
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
  },

  selectLabel(e) {
    let label_list = this.data.label_list
    const index = e.target.dataset.index
    label_list[index].selected = !label_list[index].selected
    this.setData({
      label_list: label_list
    })
  },

  selectCourse(e) {
    let course_list = this.data.course_list
    const index = e.target.dataset.index
    course_list[index].selected = !course_list[index].selected
    this.setData({
      course_list: course_list
    })
  },

  onActionClose(e) {
    console.log("sssss");
    this.setData({
      filter_visible: false
    })
  },

  onOk(e) {
    this.setData({
      filter_visible: false
    })
  },

  onReset(e) {
    this.setData({
      sign_list: [{ text: '不限', value: 0, type: 'warn' }, { text: '已上课', value: 1 }, { text: '未上课', value: 2 }],
      time_list: [{ text: '全部时间', value: 0, type: 'warn' }, { text: '本周', value: 1 }, { text: '本月', value: 2 }],
    })
  }
})
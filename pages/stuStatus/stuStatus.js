// pages/stuStatus/stuStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter_visible: false,
    select_tab_num: 0,
    sign_list: [{ text: '不限', value: 0, type: 'warn' }, { text: '已签到', value: 1 }, { text: '未签到', value: 2 }],
    label_list: [{ text: '全部类型', value: 0, type: 'warn' }, { text: '函授', value: 1 }, { text: '导学', value: 2 }],
    time_list: [{ text: '全部时间', value: 0, type: 'warn' }, { text: '本周', value: 1 }, { text: '上一周', value: 3 }, { text: '上一月', value: 4 }],
    course_list: [
      { name: '语文', id: 0, selectd: false },
      { name: '数学', id: 1, selectd: false },
      { name: '英语', id: 2, selectd: false },
    ],

    visible: false,
    select_time_drawr: false,
    select_course_draw:false,
    startDate: '2019-10-10',
    endDate: '2019-10-10',
    teacherName: ['全部', '1'],
    teacherNameIndex: 0,
    groupName: ['全部', '2'],
    groupNameIndex: 0,
    courseName: ['全部', '3'],
    courseNameIndex: 0,
    currentTab: 'key1',
    testJson: [
      { id: '0', message: '函授', stuName: '李承耀-初中数学', teacherName: '陈冠桥', time: '2019-10-12 10:00-12:00', className: '喜悦昌岗分校-Room1' },
      { id: '1', message: '函授', stuName: '李承耀-初中数学', teacherName: '陈冠桥', time: '2019-10-12 12:00-12:30', className: '喜悦昌岗分校-Room1' },
      { id: '2', message: '导学', stuName: '李承耀-初中数学', teacherName: '陈冠桥', time: '2019年10月12日 12:00-12:30', className: '喜悦昌岗分校-Room1' }
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
    wx.setNavigationBarTitle({
      title: "学生课程表"
    })
    wx.get
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

  selectTime(e) {
    let time_list = [{ text: '全部时间', value: 0 }, { text: '本周', value: 1 }, { text: '上一周', value: 3 }, { text: '上一月', value: 4 }];
    const index = e.detail.index
    time_list[index].type = 'warn';
    this.setData({
      select_time_index: index,
      time_list: time_list,
      filter_visible: false
    })
  },

  selectLabel(e) {
    let time_list = [{ text: '全部时间', value: 0 }, { text: '本周', value: 1 }, { text: '上一周', value: 3 }, { text: '上一月', value: 4 }];
    const index = e.detail.index
    time_list[index].type = 'warn';
    this.setData({
      select_time_index: index,
      time_list: time_list,
      filter_visible: false
    })
  },

  selectSign(e) {
    let sign_list = [{ text: '不限', value: 0 }, { text: '已签到', value: 1 }, { text: '未签到', value: 2 }]
    const index = e.detail.index
    sign_list[index].type = 'warn'
    console.log(sign_list)
    this.setData({
      select_sign_index: index,
      sign_list: sign_list,
      filter_visible: false
    })
  }
})
const app = getApp()

Component({
    properties: {
    },
    data: {
        datas: [],
        current: ''
    },
    methods: {
        handleChange ({ detail }) {
            console.log(detail)
            this.setData({
                current: detail.key
            })
            app.globalData.current = detail.key
            wx.navigateTo({
                url: `../${detail.key}/${detail.key}`
            })
        },
    },
    attached: function (options) {
        this.setData({
            datas: app.globalData.tabbars,
            current: app.globalData.current
        })
    }
})

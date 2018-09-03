
Page({
  data: {
    imgUrls: [
      'http://www.haust.edu.cn/images/kaiyuanbeidamen.jpg',
      'http://www.haust.edu.cn/images/tushuguan.jpg',
      'http://www.haust.edu.cn/images/boyuan.jpg',
      'http://www.haust.edu.cn/kyqj.jpg',
      'http://www.haust.edu.cn/images/zhutiyuchang.jpg',
    ],
    item: ''
  },
  onLoad: function (options) {
    /*
    var a = new Date()
    var month = a.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    var day = a.getDate()
    if (day < 10) {
      day = "0" + day
    }
    var minute = a.getMinutes()
    if (minute < 10) {
      minute = "0" + minute
    }
    var hour = a.getHours()
    var time = a.getFullYear() + "-" + month + "-" + day + "  " + hour + ":" + minute
    console.log(time)
    this.setData({
      time: time
    })
    */
  },
  onShareAppMessage: function () {
    return {
      title: "河南科技大学-地图导览服务",
      path: '/pages/index/index'
    }
  }
})

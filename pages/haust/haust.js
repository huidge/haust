//const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    imgUrls: [
      /*
      'http://www.haust.edu.cn/images/kaiyuanbeidamen.jpg',
      'http://www.haust.edu.cn/images/tushuguan.jpg',
      'http://www.haust.edu.cn/kyqj.jpg',
      'http://www.haust.edu.cn/20181201.jpg',
      'http://www.haust.edu.cn/20181205150616.jpg',
      'http://www.haust.edu.cn/20181203.jpg',
      //'http://www.haust.edu.cn/images/zhutiyuchang.jpg',
      //'http://www.haust.edu.cn/images/boyuan.jpg',
      */
      'https://www.haust.edu.cn/images/bdm.jpg',
      'https://www.haust.edu.cn/images/by.jpg',
      'https://www.haust.edu.cn/images/tsg.jpg',
      'https://www.haust.edu.cn/images/gkzt.jpg',
      'https://www.haust.edu.cn/images/nyzt1.jpg',
      'https://www.haust.edu.cn/images/nyzt2.jpg',
      'https://www.haust.edu.cn/images/ztyc.jpg'
    ],
    item: ''
  },
  /*close:function(){
    innerAudioContext.stop()
  },*/
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

    /*
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://183.192.163.151/amobile.music.tc.qq.com/C400003QNK2C3h2GH1.m4a?guid=2013234119&vkey=EA67BA572779D71E0D3F017AE36EA7542A89028392B88A865F932F69C6DD8F424127CBE29B3DDC47BA345655A645D21BB84ACB504CAE6288&uin=0&fromtag=66'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    */
  },
  onShareAppMessage: function () {
    return {
      title: "河南科技大学-地图导览服务",
      path: '/pages/haust/haust'
    }
  }
})

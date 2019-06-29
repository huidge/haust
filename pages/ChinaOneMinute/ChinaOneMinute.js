// pages/ChinaOneMinute/ChinaOneMinute.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://gslb.miaopai.com/stream/hEf~t9g~~qKUEaYPzCUjJd194afU33aHlkvo7g__.mp4?yx=&refer=weibo_app&vend=weibo&label=mp4_hd&mpflag=8&KID=unistore,video&Expires=1539315707&ssig=XI0jBZGXmy&KID=unistore,video',
    urls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://api.huidge.top/getVideos.php',
      data: {},
      success: function (res) {
        console.log(res.data);
        that.setData({
          urls: res.data
        });
      }
    })
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
    return {
      title: '中国一分钟系列',
      path: 'pages/ChinaOneMinute/ChinaOneMinute'
    }
  }
})
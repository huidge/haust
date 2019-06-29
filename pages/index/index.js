// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    extraData: { id: '38166' },
    color:'#02379c'
  },
  toIntroduce:function(){
    wx.navigateTo({
      url: '../haust/haust',
    })
  },
  toNavigator:function(){
    wx.navigateTo({
      url: '../navigation/navigation',
    })
  },
  toAnswer:function(){
    wx.navigateTo({
      url: '../textbook/textbook',
    })
  },
  pushFormSubmit:function(e){
    console.log(e.detail.formId)
    console.log(this.data.openid)
    wx.request({
      url: 'https://www.huidge.top/api/saveParams.php',
      data: {
        openid: this.data.openid,
        formid: e.detail.formId
      }
    })
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        //console.log(res.data)
        that.setData({
          openid: res.data
        })
      }
    })
    setInterval(function(){
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var color = 'rgb(' + r + ',' + g + ',' + b + ')';

      that.setData({
        color: color
      })
      //console.log(that.data.color)
    },
    100)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res;
              wx.login({
                success: function (res) {
                  var jsCode = res.code;
                  app.aldpush.pushuserinfo(userInfo, jsCode);
                }
              })
            }
          })
        }
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
      title: '在吗？分享给你河科大的小程序',
      path: '/pages/index/index',
      imageUrl:'https://www.huidge.top/images/haust.jpg'
    }
  }
})
const util = require('../../utils/util.js');
const date = new Date();
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    date: '',
    title:'一觉醒来，世界发生了什么(每天早上八点更新)',
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    shareStatus: !1,
    shareModalShow: !1,
  },
  showShareModal: function () {
    this.setData({
      shareModalShow: !0
    });
  },
  cancelShare: function () {
    this.setData({
      shareModalShow: !1,
      shareStatus: !1
    });
    var a = wx.getStorageSync("cancelShareTimes") || 0;
    wx.setStorageSync("cancelShareTimes", parseInt(a) + 1);
  },
  navigate:function()
  {
    wx.navigateTo({
      url: '../networkHotspots/networkHotspots',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = util.formatTodayDate(new Date());
    this.setData({
      date: date,
      year:year,
      month:month,
      day:day
    })
    var that = this
    wx.request({
      url: 'https://www.huidge.top/api/getBingImage.php',
      data: {
      },
      success: function (res) {
        //console.log(res.data.images[0].url)
        //console.log(res.data.images[0].copyright)
        that.setData({
          imgUrls: ['https://cn.bing.com' + res.data.images[0].url,
            'https://cn.bing.com' + res.data.images[1].url,
            'https://cn.bing.com' + res.data.images[2].url,
            'https://cn.bing.com' + res.data.images[3].url,
            'https://cn.bing.com' + res.data.images[4].url,
            ]
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://www.huidge.top/api/dailyNews/getNews.php',
      data: {
        date: that.data.date
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          date: res.data.datetime,
          list: res.data.list,
        });
      }
    })
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
    var a = this;
    return {
      //title: '一觉醒来，世界发生了什么？',
      title: '[现金红包]恭喜发财，国庆快乐!',
      imageUrl: "../../images/xiaoshipin_share.png",
      path: '/pages/dailyNews/dailyNews',
      success: function () {
        a.data.shareModalShow && app.giveHongbao(),
          a.data.shareModalShow && a.setData({
            shareModalShow: !1,
            shareStatus: !0
          });
      }
    }
  }
  /*
  onShareAppMessage: function () {
    var a = this;
    return {
      title: '[现金红包]恭喜发财，国庆快乐!',
      path: '/pages/dailyNews/dailyNews',
      imageUrl: "../../images/xiaoshipin_share.png",
      success: function () {
        a.data.shareModalShow && app.giveHongbao(),
          a.data.shareModalShow && a.setData({
            shareModalShow: !1,
            shareStatus: !0
          });
      }
    };
  }*/
})
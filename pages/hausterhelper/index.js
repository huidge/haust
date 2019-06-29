
const app = getApp()

Page({
  data: {
    bannerAds: [],
    topAds: [],
    ads:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    opened: false,
    buttons: [{
      label: '客服',
      icon: "../../images/contact.png",
      opentype:"contact"
    },
    {
      label: '反馈',
      icon: "../../images/feedback.png",
      opentype: "feedback"
    },
    {
      label: '分享',
      icon: "../../images/share.png",
      opentype: "share"
    },
    {
      label: '赞赏',
      icon: "../../images/admire.png",
      }
    ],
    position: 'bottomRight',
    visible: false,
    extraData: { id: '35336' },
    showtips:1
  },
  wifi:function(){
    //startWifi —> getWifiList —> onGetWifiList —> connectWifi —> onWifiConnected
    wx.startWifi({
      success(res) {
        //console.log(res)
        wx.getWifiList({
      success:function(res){
        //console.log(res)
        wx.onGetWifiList(function (res) {
          console.log(res)
          console.log(res.wifiList[0].SSID)
          console.log(res.wifiList[0].BSSID)
          wx.connectWifi({
            SSID: res.wifiList[0].SSID,
            BSSID: res.wifiList[0].BSSID,
            password: '18437952970',
            success: function (res) {
              console.log(res.errMsg)
            }
          })
        })
      }
      
    })
      }
    })
    
    /*
    wx.startWifi({
      success(res) {
        console.log(res.errMsg)
        wx.getConnectedWifi({
          success(res){
            console.log(res)
          }
        })
      }
    })
    
    wx.startWifi({
      success(res) {
        console.log(res.errMsg)
        wx.connectWifi({
          //SSID: 'WX_HelloWorld',
          SSID: 'People Squared',
          BSSID: '38:91:d5:9e:aa:30',
          password:'homeforstartups',
        success(res) {
          console.log(res.errMsg)
      }
    })
      }
    })*/
  },
  close:function(){
    this.setData({
      showtips:0
    })
  },
  exchangeCoupleClicked: function (e) {
    //console.log(e)
    //console.log(e.currentTarget.dataset.adId)
    ltadx.sendAdClickEvent(e.currentTarget.dataset.adId);
  },
  more: function () {
    wx.showModal({
      title: '正在开发',
      content: '敬请期待...',
      showCancel: false
    })
    setTimeout(
      function () {
        wx.navigateTo({
          url: '../ad/ad',
        })
      }, 1000)

  },
  NavToNews: function () {
    wx.navigateTo({
      url: '../dailyNews/dailyNews',
    })
  },
  NavToHotspots: function () {
    wx.navigateTo({
      url: '../networkHotspots/networkHotspots',
    })
  },
  NavToChinaOneMinute: function () {
    wx.navigateTo({
      url: '../ChinaOneMinute/ChinaOneMinute',
    })
  },
  
  buttonClicked(e) {
    const { index } = e.detail

    index === 3 && wx.navigateTo({
      url: '/pages/ad/ad'
    })
    
  },
  bindchange(e) {
    this.setData({
      opened: e.detail.value,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var that = this
    wx.request({
      url: 'https://www.huidge.top/api/hausterHelper.json',
      data: {
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          ads: res.data.data
        });
      }
    })
    
    wx.request({
      url: 'https://www.huidge.top/api/getBingImage.php',
      data: {
      },
      success: function (res) {
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow:function(){
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var a = this;
    return {
      title: '校园生活好帮手',
      path: '/pages/index/index',
      success: function () {
        wx.showToast({
          title: '分享成功，谢谢',
        })
      }
    }
  }
})

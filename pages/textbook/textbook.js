var t = getApp();

Page({
  data: {
    category: {},
    hot: [],
    token:null,
    key:null
  },
  onLoad: function () {
    var e = this;
    t.globalData.token ? e.getData() : wx.login({
      success: function (a) {
        wx.request({
          url: t.api.login,
          data: {
            code: a.code
          },
          success: function (a) {
            console.log(a)
            t.globalData.token = a.data.data.token, t.globalData.key = a.data.data.key, e.getData();
          }
          
        });
      }
    });


  },
  getData: function () {
    var a = this;
    wx.request({
      url: t.api.textbookIndex,
      data: {
        token: t.globalData.token,
        key: t.globalData.key
      },
      success: function (t) {
        a.setData({
          category: t.data.data.category,
          hot: t.data.data.hot
        });
      },
      complete: function () {
        wx.stopPullDownRefresh(), wx.hideLoading();
      }
    });
  },
  toCategory: function (t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/textbook-category-list/textbook-category-list?id=" + a
    });
  },
  toSearch: function () {
    wx.navigateTo({
      url: "/pages/textbook-search/textbook-search"
    });
  },
  toInfo: function (t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/textbook-info/textbook-info?id=" + a
    });
  },
  onPullDownRefresh: function () {
    this.getData();
  },
  onShareAppMessage: function () {
  }
});
var t = require("../../wxParse/wxParse.js"), a = getApp();

Page({
    data: {
        id: 0,
        chapter: {}
    },
    onLoad: function(t) {
        var a = t.id;
        this.setData({
            id: a
        }), wx.showLoading({
            title: "加载中"
        }), this.getData();
    },
    getData: function() {
        var e = this;
        wx.request({
            url: a.api.textbookChapterDetail,
            data: {
                key: a.globalData.key,
                token: a.globalData.token,
                id: e.data.id
            },
            success: function(a) {
                e.setData({
                    chapter: a.data.data
                }), t.wxParse("chapterContent", "html", a.data.data.content, e, 5);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
  onShareAppMessage: function () {

  }
});
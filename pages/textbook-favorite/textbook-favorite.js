var t = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        }), this.getData();
    },
    getData: function() {
        var a = this;
        wx.request({
            url: t.api.textbookFavoriteList,
            data: {
                key: t.globalData.key,
                token: t.globalData.token
            },
            success: function(t) {
                a.setData({
                    list: t.data.data
                });
            },
            complete: function(t) {
                wx.hideLoading();
            }
        });
    }
});
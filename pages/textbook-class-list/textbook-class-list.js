var t = getApp();

Page({
    data: {
        id: 0,
        name: "",
        list: []
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
        var a = this;
        wx.request({
            url: t.api.textbookClassList,
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                a.setData({
                    name: t.data.data.name,
                    list: t.data.data.list
                }), wx.setNavigationBarTitle({
                    title: t.data.data.name
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    toInfo: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/textbook-info/textbook-info?id=" + a
        });
    },
  onShareAppMessage: function () {

  }
});
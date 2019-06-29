var t = getApp();

Page({
    data: {
        id: 0,
        name: "",
        clazz: [],
        hot: []
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
            url: t.api.textbookCategoryList,
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                a.setData({
                    name: t.data.data.name,
                    clazz: t.data.data.clazz,
                    hot: t.data.data.hot
                }), wx.setNavigationBarTitle({
                    title: t.data.data.name
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    toClazz: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/textbook-class-list/textbook-class-list?id=" + a
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
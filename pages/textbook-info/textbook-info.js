var t = getApp();

Page({
    data: {
        id: 0,
        textbook: {},
        is_add: !1,
        is_share: !1
    },
    onLoad: function(a) {
        var e = a.id;
        this.setData({
            id: e
        }), wx.showLoading({
            title: "加载中"
        });
        var o = this;
        t.globalData.token ? o.getData() : wx.login({
            success: function(a) {
                wx.request({
                    url: t.api.login,
                    data: {
                        code: a.code
                    },
                    success: function(a) {
                        t.globalData.token = a.data.data.token, t.globalData.key = a.data.data.key, o.getData();
                    }
                });
            }
        });
    },
    getData: function() {
        var a = this;
        wx.request({
            url: t.api.textbookDetail,
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                a.setData({
                    textbook: t.data.data
                }), t.data.data.share && a.setData({
                    is_share: !0
                }), t.data.data.favorite && a.setData({
                    is_add: !0
                }), wx.setNavigationBarTitle({
                    title: t.data.data.name
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    addTextbook: function() {
        var a = this;
        wx.request({
            url: t.api.textbookFavoriteAdd,
            method: "post",
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                "0" == t.data.code && (a.setData({
                    is_add: !0,
                    add_text: "已收藏"
                }), wx.showToast({
                    title: "收藏成功"
                }));
            }
        });
    },
    deleteTextbook: function() {
        var a = this;
        wx.request({
            url: t.api.textbookFavoriteDelete,
            method: "post",
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                "0" == t.data.code && (a.setData({
                    is_add: !1
                }), wx.showToast({
                    title: "取消成功"
                }));
            }
        });
    },
    viewCover: function(t) {
        var a = t.currentTarget.dataset;
        wx.previewImage({
            current: a.src,
            urls: [ a.src ]
        });
    },
    toChapter: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/pages/textbook-chapter/textbook-chapter?id=" + a
        });
    },
    onShareAppMessage: function() {
        var a = this;
        return wx.request({
            url: t.api.textbookShareSave,
            method: "post",
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                id: a.data.id
            },
            success: function(t) {
                a.setData({
                    is_share: !0
                }), wx.showToast({
                    title: "分享成功"
                });
            }
        }), {
            title: a.data.textbook.name + " 课后答案",
            imageUrl: a.data.textbook.cover,
            path:'pages/textbook/textbook'
        };
    }
});
var t = getApp();

Page({
    data: {
        textbookList: [],
        is_search: !1,
        key: null,
        more: !1,
        page: 1,
        total: 0,
        hot_tag: {}
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: t.api.textbookHotTagList,
            data: {
                key: t.globalData.key,
                token: t.globalData.token
            },
            success: function(t) {
                e.setData({
                    hot_tag: t.data.data
                });
            }
        });
    },
    getData: function() {
        var a = this;
        wx.request({
            url: t.api.textbookSearch,
            data: {
                key: t.globalData.key,
                token: t.globalData.token,
                keyword: a.data.key,
                page: a.data.page
            },
            success: function(t) {
                if (a.setData({
                    total: t.data.data.total
                }), 1 == t.data.data.current_page) a.setData({
                    textbookList: t.data.data.list,
                    is_search: !0
                }); else {
                    for (var e = a.data.textbookList, o = 0; o < t.data.data.list.length; o++) e.push(t.data.data.list[o]);
                    a.setData({
                        textbookList: e
                    });
                }
                t.data.data.last_page == a.data.page ? a.setData({
                    more: !1
                }) : t.data.data.last_page > a.data.page && a.setData({
                    more: !0
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    search: function(t) {
        var a = t.detail.value;
        if ("" == a) return !1;
        this.setData({
            key: a,
            page: 1,
            more: !1
        }), wx.showLoading({
            title: "搜索中"
        }), this.getData();
    },
    tagSearch: function(t) {
        var a = t.currentTarget.dataset.name;
        this.setData({
            key: a
        }), wx.showLoading({
            title: "搜索中"
        }), this.getData();
    },
    cancel: function() {
        this.setData({
            textbookList: [],
            is_search: !1,
            key: null,
            more: !1,
            page: 1
        });
    },
    toInfo: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/textbook-info/textbook-info?id=" + a
        });
    },
    toRequest: function(t) {
        wx.redirectTo({
            url: "/pages/textbook-request/textbook-request"
        });
    },
    onReachBottom: function() {
        this.data.more && (this.setData({
            page: this.data.page + 1
        }), this.getData());
    }
});
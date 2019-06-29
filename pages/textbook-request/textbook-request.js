var a = getApp();

Page({
    data: {
        name: "",
        author: ""
    },
    onLoad: function(a) {},
    bindName: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    bindAuthor: function(a) {
        this.setData({
            author: a.detail.value
        });
    },
    save: function() {
        if ("" == this.data.name) return wx.showModal({
            title: "提示",
            content: "请输入书名",
            icon: "error",
            showCancel: !1
        }), !1;
        var t = this;
        wx.request({
            url: a.api.textbookRequestSave,
            data: {
                key: a.globalData.key,
                token: a.globalData.token,
                name: t.data.name,
                author: t.data.author
            },
            method: "POST",
            success: function(a) {
                wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2e3
                }), t.setData({
                    name: "",
                    author: ""
                });
            }
        });
    }
});
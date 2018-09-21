var a = getApp(), e = require("../../config.js"), t = new (require("../../lib/amap-wx.js").AMapWX)({
    key: e.amap_key
});

Page({
    data: {
        keyword: null,
        showData: null,
        poisData: null,
        poisMarkers: null,
        cursor: 0,
        imgCDN: a.imgCDN,
        placeHolderImg: "https://gitee.com/ShonaQueen/USCImage/raw/master/导航模块/地点占位.png"
    },
    onLoad: function(a) {},
    bindSearchInput: function(e) {
        var r = this;
        r.setData({
            keyword: e.detail.value
        });
        var i = new Array(), o = a.globalData.navigationData;
        if (e.detail.cursor >= this.data.cursor) {
            var s = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
            if (s) {
                var n = 0;
                for (var l in o) for (var u in o[l].data) if (-1 != o[l].data[u].name.indexOf(s) || o[l].data[u].floor && -1 != o[l].data[u].floor.indexOf(s)) {
                    var d = o[l].data[u];
                    d.tid = l, d.bid = u, n += 1, d.index = n, i.push(d);
                }
                for (u = 0; u < i.length; u++) for (var c = 0; c < i.length - u - 1; c++) if (i[c].index > i[c + 1].index) {
                    var f = i[c];
                    i[c] = i[c + 1], i[c + 1] = f;
                }
                this.setData({
                    showData: i
                });
            }
        } else this.setData({
            showData: null
        });
        this.data.cursor = e.detail.cursor, t.getPoiAround({
            querykeywords: r.data.keyword,
            success: function(a) {
                r.setData({
                    poisData: a.poisData,
                    poisMarkers: a.markers
                });
            },
            fail: function(a) {
                console.log(data);
            }
        });
    },
    reset: function() {
        this.setData({
            keyword: null,
            showData: null,
            poisData: null,
            poisMarkers: null
        });
    },
    onShareAppMessage: function(a) {}
});
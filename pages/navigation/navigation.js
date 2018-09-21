var t = getApp();

Page({
    data: {
        current_campus: "正在加载",
        hide: !1,
        unReloadMap: !0,
        isDraw: !1,
        hiddenOnHinde: !0,
        mapWidth: null,
        mapHeight: null,
        controls: [],
        isSelectedLocationDirectory: 0,
        isSelectedLocation: 0,
        //latitude: 26.898305,
        //longitude: 112.587848,
        latitude: 34.603506, 
        longitude: 112.423310,
        scale: 17,
        markers: null,
        todirview: null,
        toitemview: null,
        upmost: null
    },
    onLoad: function(a) {
        var e = this;
        this.setData({
            markers: t.globalData.navigationData,
            current_campus: t.globalData.current_campus
        }), this.getMapWH(), "开元校区" == t.globalData.current_campus ? e.setData({
            latitude: 34.603506,
            longitude: 112.423310,
        }) : e.setData({
            latitude: 34.660472,
            longitude: 112.373410
             
        });
    },
    changeCampus: function() {
        var a;
        a = "开元校区" == this.data.current_campus ? "西苑校区" : "开元校区", this.setData({
            current_campus: a
        }), wx.setStorageSync("current_campus", a), t.globalData.current_campus = a, t.loadNavigation(), 
        wx.reLaunch({
            url: "/pages/navigation/navigation"
        });
    },
    getMapWH: function() {
        var t = this;
        wx.createSelectorQuery().select("#map").boundingClientRect(function(a) {
            t.setControls(a.width, a.height);
        }).exec();
    },
    setControls: function(t, a) {
        this.setData({
            controls: [ {
                id: 1,
                iconPath: "/resources/icon/map-search.png",
                position: {
                    left: t - 60,
                    top: a - 115,
                    width: 45,
                    height: 45
                },
                clickable: !0
            }, {
                id: 2,
                iconPath: "/resources/icon/map-locate.png",
                position: {
                    left: t - 60,
                    top: a - 70,
                    width: 45,
                    height: 45
                },
                clickable: !0
            } ]
        });
    },
    bindcontroltap: function(t) {
        1 == t.controlId && wx.navigateTo({
            url: "search"
        }), 2 == t.controlId && this.currentLocation();
    },
    currentLocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                t.setData({
                    longitude: a.longitude,
                    latitude: a.latitude,
                    scale: 18
                });
            }
        });
    },
    changeDirectory: function(t) {
        this.setData({
            isSelectedLocationDirectory: t.currentTarget.id,
            toitemview: null,
            upmost: 0
        });
    },
    touchDraw: function(t) {
        var a = !this.data.isDraw;
        this.setData({
            isDraw: a
        });
    },
    drawChangeDirectory: function(t) {
        t.currentTarget.id === this.data.isSelectedLocationDirectory ? this.setData({
            isDraw: !1,
            tap: null
        }) : (this.setData({
            isSelectedLocationDirectory: t.currentTarget.id,
            unReloadMap: !1
        }), this.setData({
            unReloadMap: !0,
            isDraw: !1,
            todirview: "to" + t.currentTarget.id,
            toitemview: null,
            upmost: 0
        }));
    },
    hideList: function(t) {
        this.setData({
            isDraw: !1
        }), 1 == this.data.hide ? this.setData({
            hide: !1
        }) : this.setData({
            hide: !0
        }), this.getMapWH();
    },
    markerschange: function(t) {
        this.setData({
            toitemview: "to" + t.markerId
        });
    },
    countDown: function() {
        var t = this, a = t.data.countDownNum;
        t.setData({
            timer: setInterval(function() {
                a--, console.log("ggg"), t.setData({
                    countDownNum: a
                }), 0 == a && clearInterval(t.data.timer);
            }, 1e3)
        });
    },
    onHide: function() {
        this.setData({
            hiddenOnHinde: !1
        });
    },
    onShow: function() {
        this.setData({
            hiddenOnHinde: !0
        });
    },
    onShareAppMessage: function(t) {
      return {
        title: "河南科技大学-地图导览服务",
        path: '/pages/index/index'
      }
    }
});
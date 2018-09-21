var t = require("../../config.js"), a = new (require("../../lib/amap-wx.js").AMapWX)({
    key: t.amap_key
});

Page({
    data: {
        name: "",
        latitude: "",
        longitude: "",
        dst_name: "",
        dst_latitude: "",
        dst_longitude: "",
        route: [],
        distance: "加载中",
        cost: "",
        polyline: [],
        markers: [],
        walking: !0,
        driving: !1,
        riding: !1,
        interval: "",
        started: !1,
        start: !1
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            dst_name: t.name,
            dst_latitude: t.latitude,
            dst_longitude: t.longitude
        }), wx.showLoading({
            title: "加载中",
            mask: !0
        }), this.init(this), this.getInitLocation(t.latitude, t.longitude, t.name), wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    },
    getInitLocation: function(t, a, e) {
        var i = this;
        wx.getLocation({
            type: "gcj02",
            success: function(n) {
                var s = n.latitude, o = n.longitude;
                i.setData({
                    latitude: s,
                    longitude: o,
                    markers: [ {
                        id: 0,
                        name: "当前位置",
                        latitude: s,
                        longitude: o,
                        width: 23,
                        height: 33,
                        iconPath: "/resources/icon/nav_start.png"
                    }, {
                        id: 1,
                        name: e,
                        latitude: t,
                        longitude: a,
                        width: 23,
                        height: 33,
                        iconPath: "/resources/icon/nav_end.png"
                    } ]
                });
                var c = Math.abs(s - t) + Math.abs(o - a);
                c > 1.22 ? (wx.hideLoading(), wx.showModal({
                    title: "",
                    content: "距离太长无法规划路线！",
                    cancelText: "确定",
                    confirmText: "随便看看",
                    success: function(t) {
                        t.confirm ? i.setData({
                            distance: "加载失败"
                        }) : wx.navigateBack({
                            delta: 1
                        });
                    }
                })) : c > .2 ? (i.getRoute(), i.drivingRoute()) : (i.getRoute(), i.walkingRoute());
            },
            fail: function() {
                wx.showModal({
                    title: "暂时无法使用",
                    content: "请检查网络是否通畅或是否授权小程序定位权限",
                    cancelText: "确定",
                    confirmText: "立即授权",
                    success: function(t) {
                        t.confirm ? wx.openSetting({
                            success: function(t) {
                                console.log(t), t.authSetting["scope.userLocation"], wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }) : wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    getRoute: function() {
        var t = this.data.markers[0].longitude + "," + this.data.markers[0].latitude, a = this.data.markers[1].longitude + "," + this.data.markers[1].latitude, e = this;
        this.setData({
            route: {
                origin: t,
                destination: a,
                success: function(t) {
                    var a = [];
                    if (t.paths && t.paths[0] && t.paths[0].steps) for (var i = t.paths[0].steps, n = 0; n < i.length; n++) for (var s = i[n].polyline.split(";"), o = 0; o < s.length; o++) a.push({
                        longitude: parseFloat(s[o].split(",")[0]),
                        latitude: parseFloat(s[o].split(",")[1])
                    });
                    e.setData({
                        polyline: [ {
                            points: a,
                            color: "#2196F3",
                            width: 4,
                            arrowLine: !0
                        } ]
                    }), t.paths[0] && t.paths[0].distance && e.setData({
                        distance: "约" + t.paths[0].distance + "米",
                        distanceNum: t.paths[0].distance
                    }), t.taxi_cost && e.setData({
                        cost: "打车约" + parseInt(t.taxi_cost) + "元"
                    }), wx.hideLoading();
                },
                fail: function(t) {
                    console.log("fail");
                }
            }
        });
    },
    drivingRoute: function() {
        a.getDrivingRoute(this.data.route), this.setData({
            walking: !1,
            driving: !0,
            riding: !1
        });
    },
    walkingRoute: function() {
        a.getWalkingRoute(this.data.route), this.setData({
            walking: !0,
            driving: !1,
            riding: !1
        });
        var t = this;
        if (this.data.distanceNum > 25e3) {
            var e = (this.data.distanceNum / 5e3).toFixed(2);
            wx.showModal({
                title: "",
                content: "按照常人步行5公里/小时的速度，您到达目的地大约需要" + e + "小时，确定要步行吗？",
                cancelText: "坐车去",
                confirmText: "偏要步行",
                success: function(a) {
                    a.cancel && t.drivingRoute();
                }
            });
        }
    },
    ridingRoute: function() {
        a.getRidingRoute(this.data.route), this.setData({
            walking: !1,
            driving: !1,
            riding: !0
        });
        var t = this;
        if (this.data.distanceNum > 4e4) {
            var e = (this.data.distanceNum / 15e3).toFixed(2);
            wx.showModal({
                title: "",
                content: "按照常人骑行15公里/小时的速度，您到达目的地大约需要" + e + "小时，确定要骑行吗？",
                cancelText: "坐车去",
                confirmText: "偏要骑行",
                success: function(a) {
                    a.cancel && t.drivingRoute();
                }
            });
        }
    },
    startNavigation: function() {
        var t = !this.data.start;
        this.setData({
            start: t,
            started: !0
        });
        var a = this;
        a.init(a);
        var e = setInterval(function() {
            a.updateLocation();
        }, 1e3);
        this.setData({
            interval: e
        });
    },
    openlocation: function() {
        console.log(this.data.dst_latitude), console.log(this.data.dst_longitude), wx.openLocation({
            name: this.data.dst_name,
            latitude: Number(this.data.dst_latitude),
            longitude: Number(this.data.dst_longitude),
            address: "点击右侧图标选择地图APP",
            scale: 18,
            success: function(t) {
                console.log(t);
            }
        });
    },
    updateLocation: function() {
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
    regionchange: function(t) {
        "end" == t.type && this.getLngLat();
    },
    getLngLat: function() {
        this.mapCtx = wx.createMapContext("map4select"), this.mapCtx.getCenterLocation({
            success: function(t) {
                console.log("位置");
            }
        });
    },
    init: function(t) {
        clearInterval(t.data.interval), t.setData({
            interval: ""
        });
    },
    stopNavigation: function() {
        this.setData({
            start: !1
        }), clearInterval(this.data.interval);
    },
    onHide: function() {
        this.setData({
            start: !1
        }), clearInterval(this.data.interval);
    },
    onUnload: function() {
        clearInterval(this.data.interval), wx.setKeepScreenOn({
            keepScreenOn: !1
        });
    },
    onShareAppMessage: function(t) {}
});
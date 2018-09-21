var a = getApp();

Page({
    data: {
        selectedLocationDirectory: null,
        selectedLocation: null,
        locationData: null
    },
    onLoad: function(t) {
        var e = t.sld, o = t.sl, n = a.globalData.navigationData[e].data[o];
        this.setData({
            selectedLocationDirectory: e,
            selectedLocation: o,
            locationData: n
        });
    },
    onShareAppMessage: function(a) {}
});
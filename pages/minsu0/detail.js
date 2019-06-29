var a = getApp();

Page({
    data: {
        selectedLocationDirectory: null,
        selectedLocation: null,
        locationData: null
    },
    call:function(){
      wx.makePhoneCall({
        phoneNumber: '18437952970',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    onLoad: function(t) {
        //var e = t.sld, o = t.sl, n = a.globalData.navigationData[e].data[o];
        var e = 0, o = 0, n = a.globalData.navigationData[e].data[o];
        this.setData({
            selectedLocationDirectory: e,
            selectedLocation: o,
            locationData: n
        });
    },
    onShareAppMessage: function(a) {}
});
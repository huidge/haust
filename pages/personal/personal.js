var n = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        combineAlertShowHide: "none"
    },
    getUserInfo: function(e) {
        n.globalData.userInfo = e.detail.userInfo, this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: !0
        });
    },
    copyAppID: function() {
        wx.setClipboardData({
            data: "wxaa876e25947cb0d1",
            success: function(n) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success"
                });
            }
        });
    },
    showConnectionAlert: function() {
        this.setData({
            combineAlertShowHide: "flex"
        });
    },
    hideAlert: function() {
        this.setData({
            combineAlertShowHide: "none"
        });
    },
    onLoad: function(e) {
        var o = this;
        n.globalData.userInfo.wechatInfo ? this.setData({
            userInfo: n.globalData.userInfo.wechatInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? n.userInfoReadyCallback = function(n) {
            o.setData({
                userInfo: n.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(e) {
                n.globalData.userInfo.wechatInfo = e.userInfo, o.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '在吗？分享给你河科大的小程序',
      path: '/pages/index/index',
      imageUrl: 'https://www.huidge.top/images/haust.jpg'
    }
  }
});
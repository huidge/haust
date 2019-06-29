var t = require("../../data/word-list.js");
const InnerAudioContext = wx.createInnerAudioContext()
InnerAudioContext.autoplay = true
Page({
    data: {
      button_miss: "button-miss",
      src:''
    },
    onLoad: function(o) {
      var a = this;
      var n = Math.floor(499 * Math.random()) + 1, i = t.wordList[n];
      a.setData({
        content: i.content,
        pron: i.pron,
        definition: i.definition
      });
      wx.request({
        url: "https://api.shanbay.com/bdc/search/?word=" + i.content,
        data: {},
        method: "GET",
        success: function (n) {
          a.setData({
            content: n.data.data.content,
            pron: n.data.data.pron,
            definition: n.data.data.definition
          });
          InnerAudioContext.src = n.data.data.audio_addresses.us[0];
        },
        fail: function () { },
        complete: function () { }
      });

    },
    onReady:function(){
      
    },
    show: function() {
        this.setData({
            showNot: !0,
            button_miss: "button-miss-hide"
        });
    },
    next: function() {
        this.setData({
            showNot: !1,
            button_miss: "button-miss"
        });
        var a = this;
        var o = Math.floor(499 * Math.random()) + 1, n = t.wordList[o];
      wx.request({
        url: "https://api.shanbay.com/bdc/search/?word=" + n.content,
        data: {},
        method: "GET",
        success: function (n) {
          a.setData({
            content: n.data.data.content,
            pron: n.data.data.pron,
            definition: n.data.data.definition
          });
          InnerAudioContext.src = n.data.data.audio_addresses.us[0];
        },
        fail: function () { },
        complete: function () { }
      });
    },
  audioPlay() {
    InnerAudioContext.play()
  }
});
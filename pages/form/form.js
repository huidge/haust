Page({
  data:{
    access_token:'',
    openid:''
  },
  formSubmit: function (e) {
    //console.log(e.detail.formId)
    wx.request({
      url: 'https://www.huidge.top/api/saveParams.php',
      data:{
        openid: this.data.openid,
        formid: e.detail.formId
      }
    })
    /*
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.access_token,
          data: {
            "touser": this.data.openid,
            "template_id": "dfPQL84uOw5cJO5BTojBfiP8Z_wN-Y5plu72e3ZiWyo",
            "page": "pages/index/index",
            "form_id": e.detail.formId,
            "data": {
              "keyword1": {
                "value": "早报来啦！"
              },
              "keyword2": {
                "value": "每天"
              },
              "keyword3": {
                "value": "一觉醒来世界发生了什么？"
              },
              "keyword4": {
                "value": "快速一览昨夜今晨要闻"
              }
            },
            "emphasis_keyword": "keyword1.DATA"
          },
          method: 'POST'
        })
    */
  },
  onLoad:function(){
    var that = this

    wx.request({
      url: 'https://www.huidge.top/api/haust/getAccessToken.php',
      success: function (res) {
        console.log(res.data.access_token);
        that.setData({
          access_token: res.data.access_token
        })
      }
    }),
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res.data)
        that.setData({
          openid:res.data
        })
      }
    })
  }
})
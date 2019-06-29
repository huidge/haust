var pushApp = require('./utils/pushsdk.js').pushSdk()
const ald = require('./utils/ald-stat.js')

var a = require("config.js")
var t = "https://kaoshibb.com/api/wx1/";

App({
    onLaunch: function() {
        /*this.loadNotification(), this.loadSchool(),*/ this.loadCampus(), this.loadNavigation(),
       /*this.load_life(),*/this.loadLocalUserInfo()/*,this.loadLogInfo()*/;
      
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //console.log(res.errMsg)
          //console.log(res.code)
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://www.huidge.top/api/haust/getSessionKey.php',
              data: {
                code: res.code
              },
              success: function (res) {
                //console.log(res.data)
                wx.setStorage({
                  key: "openid",
                  data: res.data.openid
                })
                
              }
            })
          }

        }
      })
      

    },
  api: {
    login: "https://api.huidge.top/api/getToken&Key.php",
    textbookIndex: t + "textbookIndex",
    textbookCategoryList: t + "textbookCategoryList",
    textbookClassList: t + "textbookClassList",
    textbookDetail: t + "textbookDetail",
    textbookChapterDetail: t + "textbookChapterDetail",
    textbookHotTagList: t + "textbookHotTagList",
    textbookSearch: t + "textbookSearch",
    textbookShareSave: t + "textbookShareSave",
    textbookRequestSave: t + "textbookRequestSave",
    textbookFavoriteList: t + "textbookFavoriteList",
    textbookFavoriteAdd: t + "textbookFavoriteAdd",
    textbookFavoriteDelete: t + "textbookFavoriteDelete"
  },
    globalData: {
        school_introduce: null,
        current_campus: "开元校区",
        navigationData: null,
        life_summary: null,
        freshman_guide: null,
        questions: null,
        thing_process: null,
        usc_news: null,
        competition_information: null,
        welfare: null,
      userInfo: {
        openid: "",
        code: "",
        userid: "",
        token: "",
        wechatInfo: null
      },
        userId: "1fa88b79f85a42208983ba76405742fc",
        openid: null,
        logs: null,
        token: null,
        key: null,
    },
    
    loadNotification: function() {
        wx.request({
            url: a.api.get_notification,
            success: function(a) {
                var t = a.data.data;
                "success" == a.data.message && t.isNotify && wx.showModal({
                    showCancel: !1,
                    title: t.title,
                    content: t.time + "\r\n\r\n" + t.content
                });
            }
        });
    },
    
    loadSchool: function() {
        var a = require("/resources/school_introduce.js");
        this.globalData.school_introduce = a.school_introduce;
    },
    loadCampus: function() {
        var a = this, t = wx.getStorageSync("current_campus");
        a.globalData.current_campus = t || "开元校区";
    },
    loadNavigation: function() {
        var a = this.globalData.current_campus, t = null;
        "开元校区" == a ? t = require("/resources/kaiyuan.js") : "西苑校区" == a && (t = require("/resources/xiyuan.js"));
        var o = t.navigation;
        try {
            wx.setStorageSync("current_campus", a);
        } catch (a) {}
        this.globalData.navigationData = o;
    },
    
    load_life: function() {
        this.globalData.live_summary = this.load_sql("https://ayase.top/api.php/Life/getAll"), 
        this.globalData.freshman_guide = this.load_sql("https://ayase.top/api.php/FreshmanGuide/getAll"), 
        this.globalData.questions = this.load_sql("https://ayase.top/api.php/Questions/getAll"), 
        this.globalData.thing_process = this.load_sql("https://ayase.top/api.php/Process/getAll"), 
        this.globalData.usc_news = this.load_sql("https://ayase.top/api.php/UscNews/getAll"), 
        this.globalData.competition_information = this.load_sql("https://ayase.top/api.php/Competition/getAll"), 
        this.globalData.welfare = this.load_sql("https://ayase.top/api.php/Welfare/getAll");
    },
    load_sql: function(a) {
        var t = new Array();
        return wx.request({
            url: a,
            success: function(a) {
                for (var o = 0; o < a.data.length; o++) t.push(a.data[o]);
            }
        }), t;
    },
    loadLocalUserInfo: function() {
        var a = this;
        wx.getStorage({
            key: "userInfo",
            success: function(t) {
                a.globalData.userInfo = t.data;
            }
        }), wx.getStorage({
            key: "openid",
            success: function(t) {
                a.globalData.openid = t.data;
            }
        });
    },
    
    loadLogInfo: function() {
        var a = this;
        wx.request({
            url: "https://ayase.top/api.php/updatelog/getall",
            success: function(t) {
                a.globalData.logs = t.data;
            }
        });
    }
    
});
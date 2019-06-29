var Version = "3.1.0";
var url = "plog";
var path = "default";
var conf = require("./push-stat-conf.js");
var aldpush_event_data = {};
var aldpush_event_type = "";
var is_yyy = false;
var num = 0;
var onlineTier = false;
var onlineData = {};
var weaOnlineThis = null;
var onlineURL = "https://openapi.xiaoshentui.com";
var filterEventList = [];
var filteEtypeList = ["developer_function"];
var eventData = {
  num: 0,
  max: 10,
  name: null
};
var InitData = {
  uu: "",
  ak: "",
  pm: "",
  wvv: "",
  wsdk: "",
  sv: "",
  wv: "",
  nt: "",
  ww: "",
  wh: "",
  pr: "",
  pp: "",
  lat: "",
  lng: "",
  ev: "",
  st: "",
  et: "",
  ppx: "",
  ppy: "",
  v: "",
  data: "",
  fid: "",
  lang: "",
  wsr: "",
  ifo: "",
  jscode: "",
  etype: ""
};

function inspectversion() {
  wx.request({
    url: "https://" + url + ".xiaoshentui.com/config/app.json",
    header: {
      AldStat: "MiniApp-Stat"
    },
    method: "GET",
    success: function(t) {
      if (t.statusCode === 200) {
        if (t.data["push_v"] != Version) {
          console.warn("小神推sdk已更新,为不影响正常使用,请去官网(http://www.xiaoshentui.com/)下载最新版本")
        }
        if (t.data["filter_event"]) {
          filterEventList = t.data["filter_event"]
        }
        if (t.data["filter_etype"]) {
          filteEtypeList = t.data["filter_etype"]
        }
      }
    }
  })
}

function HookIt1(t, e, n) {
  if (t[e]) {
    var a = t[e];
    t[e] = function(t) {
      n.call(this, t, e);
      return a.call.apply(a, [this].concat(Array.prototype.slice.call(arguments)))
    }
  } else {
    t[e] = function(t) {
      n.call(this, t, e)
    }
  }
}

function get_uuid() {
  var t = wx.getStorageSync("t_uuid");
  if (!t) {
    t = "" + Date.now() + Math.floor(Math.random() * 1e7);
    wx.setStorageSync("t_uuid", t);
    wx.setStorageSync("ifo", 1);
    InitData.ifo = true
  } else {
    InitData.ifo = false
  }
  return t
}
var login_func = function(t, e) {
  if (!conf["is_getUserinfo"]) {
    return false
  }
  wx.login({
    success: function(t) {
      if (t.code) {
        InitData.jscode = t.code;
        wx.getUserInfo({
          success: function(t) {
            e(t)
          },
          fail: function(t) {}
        })
      } else {
        InitData.jscode = 0
      }
    }
  })
};
var wx_request = function(t, e, n) {
  if (typeof arguments[1] === "undefined") e = "GET";
  if (typeof arguments[2] === "undefined") n = "d.html";
  if (JSON.stringify(t).length >= 4e3) {
    return
  }
  var a = 0;
  var i = function() {
    wx.request({
      url: "https://" + url + ".xiaoshentui.com/" + n,
      data: t,
      header: {},
      method: e,
      success: function() {},
      fail: function() {
        if (a < 2) {
          a++;
          t["retryTimes"] = a;
          i()
        }
      }
    })
  };
  i()
};

function push_log(t, e, n) {
  if (e == "user_info_close") {
    return
  }
  var a = get_uuid();
  var i = 0;
  if (e == "app" && n == "hide") {
    var o = Date.now();
    i = wx.getStorageSync("ifo");
    wx.setStorageSync("ifo", 0)
  }
  var s = "";
  if (e == "user_info") {
    s = t.aldpush_login_data
  } else if (e == "user_info_close") {} else if (e == "event") {
    s = aldpush_event_data
  } else if (e == "yyy") {
    s = aldpush_event_data
  } else {
    s = 0
  }
  var r = e == "fpage" || e == "fhpage" ? InitData.fid : 0;
  if (e == "user_info") {

    var p = InitData.jscode
  } else if (e == "app" && n == "show") {
   
    if (InitData.jscode) {
      var p = InitData.jscode
     
    } else {  
      wx.login({
        success(res) {
          var p = res.code
        }
      })
    }
  } else {
    var p = "0"
  }
  var u = {
    v: Version,
    uu: a,
    ev: e,
    life: n,
    ak: conf["app_key"].replace(/(^\s*)|(\s*$)/g, ""),
    pm: InitData.pm ? InitData.pm : 0,
    wvv: InitData.wvv ? InitData.wvv : 0,
    wsdk: InitData.wsdk ? InitData.wsdk : 0,
    sv: InitData.sv ? InitData.sv : 0,
    wv: InitData.wv ? InitData.wv : 0,
    nt: InitData.nt ? InitData.nt : 0,
    ww: InitData.ww ? InitData.ww : 0,
    wh: InitData.wh ? InitData.wh : 0,
    pr: InitData.pr ? InitData.pr : 0,
    pp: InitData.pp ? InitData.pp : 0,
    lat: InitData.lat ? InitData.lat : 0,
    lng: InitData.lng ? InitData.lng : 0,
    st: InitData.st || 0,
    et: o ? o : 0,
    ppx: InitData.ppx ? InitData.ppx : 0,
    ppy: InitData.ppy ? InitData.ppy : 0,
    data: s ? s : 0,
    fid: r,
    lang: InitData.lang ? InitData.lang : 0,
    wsr: e == "app" ? t.aldpush_showOptions : {},
    ifo: i,
    jscode: p,
    ust: Date.now()
  };
  if (e === "setopenid") {
    if (t.aldpush_openid) {
      u["openid"] = t.aldpush_openid;
      u["user_info"] = t.aldpush_login_data
    }
  }
  if (aldpush_event_type !== "" && (e === "event" || e === "yyy")) {
    u["etype"] = aldpush_event_type
  }
  if (e === "yyy" && n === "postevent") {
    wx.request({
      url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/mobile_info",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: u,
      success: function(t) {}
    })
  } else if (e === "yyy" && is_yyy) {
    wx.request({
      url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/event_report",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: u,
      success: function(t) {}
    })
  } else {
    wx_request(u, "GET", "d.html")
  }
}

function pushFormSubmit(t) {
  var e = this;
  InitData.ppx = t.detail.target.offsetLeft;
  InitData.ppy = t.detail.target.offsetTop;
  InitData.fid = t.detail.formId;

  function n() {
    wx.setStorageSync("isShowClick", "false");
    e.setData({
      is_showHideBtn: true,
      isShowClick: "false"
    })
  }
  push_log(e, "fpage", "clickform")
}

function hidepushFormSubmit(t) {
  var e = this;
  InitData.ppx = t.detail.target.offsetLeft;
  InitData.ppy = t.detail.target.offsetTop;
  InitData.fid = t.detail.formId;
  e.setData({
    is_showHideBtn: true
  });
  push_log(e, "fhpage", "hideclickform")
}

function handlerInterceptor(t) {
  if (filterEventList.indexOf(t) >= 0) {
    return false
  }
  if (eventData.name == t) {
    eventData.num++;
    if (eventData.num >= eventData.max) {
      return false
    }
    return true
  } else {
    if (eventData.num != 0) {
      eventData.num = 0;
      eventData.name = null
    }
    return true
  }
}

function otherPageFunction(t, e) {
  if (!conf["is_sendEventFunc"]) {
    return
  }
  var n = handlerInterceptor(e);
  eventData.name = e;
  var a = "";
  var i = arguments;
  var o = this;
  if (!t) {
    t = i
  }
  if (t) {
    var s = ["onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll"];
    if (typeof t["type"] === "undefined") {
      if (typeof t["from"] === "undefined") {
        if (s.indexOf(e) >= 0) {
          aldpush_event_type = "wechat_function"
        } else {
          aldpush_event_type = "developer_function"
        }
      } else {
        aldpush_event_type = t.from
      }
    } else {
      aldpush_event_type = t.type
    }
    a = typeof i[0] !== "undefined" ? i[0] : {};
    aldpush_event_data = a;
    if (filteEtypeList.indexOf(aldpush_event_type) >= 0) {} else {
      return
    }
    var r = conf["filterFunc"];
    if (r.indexOf(e) >= 0) {} else {
      if (n) {
        push_log(o, "event", e)
      }
    }
    if (is_yyy) {
      push_log(o, "yyy", e)
    }
  }
}

function startEventFunc(t) {
  wx.onAccelerometerChange(function(e) {
    if (!t.isShow) {
      return
    }
    if (e.x > 1 && e.y > 1) {
      num += 1;
      if (num >= 3) {
        is_yyy = true;
        push_log(t, "yyy", "postevent")
      }
    }
  })
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(t) {
    if (this == null) {
      throw new TypeError
    }
    var e = Object(this);
    var n = e.length >>> 0;
    if (n === 0) {
      return -1
    }
    var a = 0;
    if (arguments.length > 1) {
      a = Number(arguments[1]);
      if (a != a) {
        a = 0
      } else if (a != 0 && a != Infinity && a != -Infinity) {
        a = (a > 0 || -1) * Math.floor(Math.abs(a))
      }
    }
    if (a >= n) {
      return -1
    }
    var i = a >= 0 ? a : Math.max(n - Math.abs(a), 0);
    for (; i < n; i++) {
      if (i in e && e[i] === t) {
        return i
      }
    }
    return -1
  }
}

function pushGetApp(t) {
  this.app = t
}
pushGetApp.prototype["pushuserinfo"] = function(t, e) {
  if (typeof t === "object") {
    var n = ["encryptedData", "errMsg", "iv", "rawData", "signature", "userInfo"];
    for (var a in t) {
      if (n.indexOf(a) < 0) {
        return
      }
    }
    this.app.aldpush_login_data = t;
    if (typeof e === "string") {
      InitData.jscode = e
    }
    push_log(this.app, "user_info", "userinfo")
  }
};
pushGetApp.prototype["setopenid"] = function(t, e) {
  if (typeof t === "string") {
    this.app.aldpush_openid = t;
    if (typeof e === "object") {
      var n = ["avatarUrl", "country", "city", "gender", "language", "nickName", "province", "unionId"];
      for (var a in e) {
        if (n.indexOf(a) == -1) {
          return
        }
      }
      this.app.aldpush_login_data = e;
      push_log(this.app, "setopenid", "setopenid")
    }
  }
};

function weaOnlinePushLayer() {
  var t = wx.getSystemInfoSync();
  var e = {
    app_key: conf["app_key"],
    uuid: wx.getStorageSync("t_uuid"),
    os: t.platform,
    device: t.model
  };
  wx.request({
    url: onlineURL + "/inapp_push",
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    data: e,
    success: function(t) {
      if (t.data.code == 200) {
        onlineTier = true;
        onlineData = t.data.data;
        onlineData["isShow"] = true
      }
    }
  })
}

function atDetails(t) {
  var e = this;
  var n = t.currentTarget.dataset;
  var a = onlineData;
  var i = wx.getSystemInfoSync();
  var o = {
    app_key: conf["app_key"],
    uuid: wx.getStorageSync("t_uuid"),
    os: i.platform,
    device: i.model,
    msg_key: n["msgkey"] ? n["msgkey"] : ""
  };
  if (n["msgkey"]) {
    wx.request({
      url: onlineURL + "/inapp_click_count",
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: o,
      success: function(t) {}
    })
  }
  if (n.type == 1) {
    wx.navigateTo({
      url: "/" + n["acdetail"],
      success: function() {
        a["isShow"] = false;
        e.setData({
          onlineData: a
        })
      },
      fail: function(t) {
        wx.switchTab({
          url: "/" + n["acdetail"],
          success: function() {
            a["isShow"] = false;
            e.setData({
              onlineData: a
            })
          }
        })
      }
    })
  } else if (n.type == 3) {
    wx.navigateToMiniProgram({
      appId: n["apd"],
      path: "/" + n["acdetail"],
      success: function(t) {
        a["isShow"] = false;
        e.setData({
          onlineData: a
        })
      }
    })
  } else if (n.type == 4) {
    a["isShow"] = false;
    e.setData({
      onlineData: a
    })
  }
}

function colseOneBox() {
  var t = onlineData;
  t["isShow"] = false;
  this.setData({
    onlineData: t
  })
}
try {
  var res = wx.getSystemInfoSync();
  InitData.pm = res.model;
  InitData.pr = res.pixelRatio;
  InitData.ww = res.screenWidth;
  InitData.wh = res.screenHeight;
  InitData.lang = res.language;
  InitData.wv = res.version;
  InitData.wvv = res.platform;
  InitData.wsdk = typeof res["SDKVersion"] === "undefined" ? "1.0.0" : res["SDKVersion"];
  InitData.sv = res.system
} catch (t) {}
wx.getNetworkType({
  success: function(t) {
    InitData.nt = t.networkType
  }
});
var getsetting = function(t, e) {
  wx.getSetting({
    success: function(n) {
      if (n.authSetting["scope.userLocation"]) {
        if (t == "location") {
          wx.getLocation({
            type: "wgs84",
            success: function(t) {
              InitData.lat = t.latitude;
              InitData.lng = t.longitude;
              push_log(InitData, "location", "location")
            }
          })
        }
      }
      if (n.authSetting["scope.userInfo"]) {
        if (e == "userInfo") {
          login_func(InitData, function(t) {
            InitData.aldpush_login_data = t;
            push_log(InitData, "user_info", "userinfo")
          })
        }
      }
    }
  })
};
inspectversion();
var pushSdk = function(t, e) {
  try {
    var n, a;
    e === "App" ? n = t : a = t
  } catch (t) {}

  function i(t) {
    var e = this;
    var n = get_uuid();
    this["aldpush"] = new pushGetApp(this);
    if (typeof t != "undefined") {
      e.aldpush_showOptions = t;
      path = t["path"];
      InitData.pp = t["path"]
    } else {
      e.aldpush_showOptions = {}
    }
    if (conf.app_key) {
      if (!wx.getStorageSync("t_appkey")) {
        wx.setStorageSync("t_appkey", conf.app_key)
      }
    }
  }

  function o(t) {
    var e = this;
    e.isShow = true;
    if (conf["is_sendEvent"]) {
      startEventFunc(e)
    }
    if (typeof t != "undefined") {
      e.aldpush_showOptions = t
    } else {
      e.aldpush_showOptions = {}
    }
    if (conf["is_encePush"]) {
      weaOnlinePushLayer()
    }
   
    wx.login({
      success(res) {
      
        if (res.code) {
          InitData.jscode = res.code
          num = 0;
          getsetting("location");

          push_log(e, "app", "show")
        } else {
          console.log('登录失败！' + res.errMsg)
        }
       
      }
      
    
    })
   
  }

  //上报用户信息
  function sendUserinfo(a){
    
    wx.getSetting({
      success: function (res) {
        // debugger
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res;
              wx.login({
                success: function (res) {
                  
                  var jsCode = res.code;
                  a.aldpush.pushuserinfo(userInfo, jsCode);
                }
              })
            }
          })
        }
      }
    })
  }

  function s() {
    // var t = this
    // wx.login({
    //   success(res) {
    //     var t = this;
    //     t.isShow = false;
    //    InitData.jscode= res.code
      
    //     num = 0;
    //     getsetting("location");
    //     push_log(t, "app", "hide")
    //   }
    // })
    var t = this;
    t.isShow = false;
    num = 0;
    getsetting("location");
    push_log(t, "app", "hide")
    sendUserinfo(t)


  }

  function r(t) {
    var e = weaOnlineThis = this;
    InitData.st = Date.now();
    InitData.pp = this["__route__"];
    if (path != "default" && path != e["__route__"]) {
      login_func(e, function(t) {
        e.aldpush_login_data = t
      })
    }
    setTimeout(function() {
      if (conf["is_encePush"]) {
        if (onlineData["isShow"] && onlineTier) {
          e.setData({
            onlineTier: onlineTier,
            onlineData: onlineData
          });
          if (!e.colseOneBox) {
            HookIt1(e, "atDetails", atDetails);
            HookIt1(e, "colseOneBox", colseOneBox)
          }
        }
      }
    }, 2e3)
  }

  function p(t) {
    var e = this;
    if (typeof t != "undefined") {
      e.options = t
    }
    InitData.pp = path = e["__route__"];
    getsetting("locationfalse", "userInfo");
    push_log(getApp(), "page", "hide");
    if (conf["is_encePush"]) {
      if (onlineData["isShow"] && onlineTier) {
        onlineTier = false;
        onlineData = {};
        this.setData({
          onlineTier: onlineTier,
          onlineData: onlineData
        })
      }
    }
  }

  function u(t) {
    var e = InitData.ww;
    var n = InitData.wh;
    var a = this;
    var i = {
      length: [],
      is_showHideBtn: false
    };
    for (var o = 0; o <= 50; o++) {
      var s = Math.ceil(Math.random() * e);
      var r = Math.ceil(Math.random() * n);
      var p = '-webkit-transform: scale(0.5);transform:scale(1);content:"";height:88px;width:88px;border:1px solid transparent;background-color:transparent;position:fixed;z-index: 999;left:' + s + "px;top:" + r + "px;";
      i.length.push(p)
    }
    var u = wx.getStorageSync("isShowClick");
    a.setData({
      hideBtnData: i,
      isShowClick: Boolean(u)
    })
  }

  function f(t) {
    (function() {
      var t = App;
      var e = Page;
      App = function(e) {
        HookIt1(e, "onLaunch", i);
        HookIt1(e, "onShow", o);
        HookIt1(e, "onHide", s);
        t(e)
      };
      Page = function(t) {
        for (var n in t) {
          if (typeof t[n] === "function") {
            if (n == "onLoad") {
              HookIt1(t, "onLoad", u);
              continue
            }
            HookIt1(t, n, otherPageFunction)
          }
        }
        HookIt1(t, "onShow", r);
        HookIt1(t, "onHide", p);
        HookIt1(t, "hidepushFormSubmit", hidepushFormSubmit);
        HookIt1(t, "pushFormSubmit", pushFormSubmit);
        e(t)
      }
    })()
  }
  var l = function(t) {
    HookIt1(t, "onLaunch", i);
    HookIt1(t, "onShow", o);
    HookIt1(t, "onHide", s);
    n ? n(t) : App(t)
  };
  var c = function(t) {
    for (var e in t) {
      if (typeof t[e] === "function") {
        if (e == "onLoad") {
          HookIt1(t, "onLoad", u);
          continue
        }
        HookIt1(t, e, otherPageFunction)
      }
    }
    HookIt1(t, "onShow", r);
    HookIt1(t, "onHide", p);
    HookIt1(t, "hidepushFormSubmit", hidepushFormSubmit);
    HookIt1(t, "pushFormSubmit", pushFormSubmit);
    a ? a(t) : Page(t)
  };
  if (conf.is_plugins) {
    return {
      App: l,
      Page: c
    }
  } else {
    return f()
  }
};
exports.pushSdk = pushSdk;
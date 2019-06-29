exports.app_key = "32b044eaa335d475d2909c979f3a4ec5"; //请在此行填写从小神推后台获取的appkey
exports.is_sendEvent = false; //是否开启无痕埋点
exports.is_sendEventFunc = false; // 默认不上报事件
exports.is_getUserinfo = false; // 此配置前置条件小程序内有用户授权可用，SDK无法主动弹出用户授权。若值等于false，默认由开发者自行发起用户信息授权，使用pushUserInfo等接口上报用户信息，详情查看官网文档中心...
exports.filterFunc = []; //要过滤的函数名
exports.pageHomeBack = '/pages/index/index'; // 小程序跳转后台切前台默认返回的首页
exports.is_encePush = false; // 默认不开启在线推送
exports.is_plugins = false; // 是否启用小程序插件，详情查看官网文档中心...

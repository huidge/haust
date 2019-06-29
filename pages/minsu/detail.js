var a = getApp();

Page({
    data: {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      imgUrls: ['https://img.meituan.net/phoenix/56270144f9381bd3568d4581ae6cd0e1572931.jpg@1440w_962h_1e_1c_1l',
                'https://img.meituan.net/phoenix/d93c5c3c2fd335c975a5ddf08de361b5590262.jpg@1440w_962h_1e_1c_1l',
                'https://img.meituan.net/phoenix/440ed518696270255f47ee828603ad62416400.jpg@1440w_962h_1e_1c_1l',
                'https://p0.meituan.net/750.0.0/hotelbiz/285e48a4204e584a2883617e92a0e90a143869.jpg',
                'https://p1.meituan.net/750.0.0/hotelbiz/17541626aef67a90fd8900bfc58cb9e395089.jpg',
                'https://p1.meituan.net/750.0.0/hotelbiz/1b6051f4cfee0f2048ebb5105eefb3d769488.jpg',
                'https://p0.meituan.net/750.0.0/hotelbiz/1f342ef133a7868f46ea92a014bf560277686.jpg',

'https://p1.meituan.net/750.0.0/hotelbiz/7ac9e880613b2ec8d3fa317aa77b742172905.jpg',
                'https://p1.meituan.net/750.0.0/hotelbiz/ac72c9f3480cdec4695b78d5fb329a34104920.jpg',
                'https://p0.meituan.net/750.0.0/hotelbiz/8dd6627ccacde8246e15580b30bc5d9192053.jpg',
                'https://p0.meituan.net/750.0.0/hotelbiz/d483898c2175cdbe2575910d831e793983810.jpg',
                'https://p1.meituan.net/750.0.0/tdchotel/c868fb49dc43fb06d7752b80d3f9de0e46895.jpg',
                'https://p1.meituan.net/750.0.0/hotelbiz/ed540808274534f5dbee259493277c9f132502.jpg',
                'https://p0.meituan.net/750.0.0/hotelbiz/5b6cba9077ebdd338b5b2b2472d9f04e94709.jpg',
                'https://p0.meituan.net/750.0.0/hotelbiz/d143cb8517f8b1faa979807f835e9f91245161.jpg',
                'https://p1.meituan.net/750.0.0/hotelbiz/13e99ca99f85d20a7ce8012e07f4fc60136450.jpg'],
        name:'大学城青年公寓',
      description:'<p>HelloWorld国际青年旅舍(18437952970)<br/> 　地址：龙翔街北段文庭雅苑小区3单元1801</p>'
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
        
    },
    onShareAppMessage: function(a) {}
});
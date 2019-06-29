var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["姓名", "学号"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
      sno: '',
      name: '',
      value: '',
      list: '',
      isShowBtn: false,
      hidden:false
    },
  onClearTxt: function () {
    this.setData({
      value: "",
      isShowBtn: false,
      hidden:false,
      list: '',
      items: '',
      sno:''
    })
  },
  detail: function (e) {
    console.log(e.target.dataset.sno)
  },
  checksno: function (e) {
    console.log(e)
    var sno = e.detail.value;
    var that = this;
    if (sno.length != 0) {
      that.setData({
        sno: sno,
        isShowBtn: true
      })
    }
  },
  search: function (e) {
    wx.showLoading({
      title: '正在查询...',
    })
    var that = this
    that.setData({
      items: ''
    })
    wx.request({
      url: 'https://test.huidge.top/xqcx/xqcx/datacollection/getData.do?dcUuid=52ab80044ee1e6d8014ee235acd90017',
      //url: 'http://jskb.huidge.top:9900/xqcx/xqcx/datacollection/getData.do?dcUuid=52ab80044ee1e6d8014ee235acd90017',
      method: 'GET',
      data: {
        queryCondition: [{ qcLogicSign: 'like', qcUuid: '52ab80044ee1e6d8014ee235acd90017', qcRelationSign: 'and', fName: 'xh', qcValue: e.target.dataset.sno }]
      },
      success(res) {
        console.log(res.data.length)
        wx.hideLoading()
        if (res.data.length == 1) {
          that.setData({
            list: res.data[0],
            hidden: true
          })
        }
        else {
          wx.showModal({
            title: '查询失败',
            content: '请输入检查学号是否正确',
            showCancel: false
          })
          that.setData({
            list: ''
          })
        }

      }
    })
  },
  check: function (e) {
    console.log(e)
    var value = e.detail.value;
    var that = this;
    if (value.length != 0) {
      that.setData({
        value: value,
        isShowBtn: true
      })
    }
    wx.showLoading({
      title: '正在查询...',
    })
    var that = this
    wx.request({
      url: 'https://test.huidge.top/xqcx/xqcx/datacollection/getData.do?dcUuid=52ab80044ed3eaf9014ed7ab2d560006',
      //url: 'http://jskb.huidge.top:9900/xqcx/xqcx/datacollection/getData.do?dcUuid=52ab80044ed3eaf9014ed7ab2d560006',
      method: 'GET',
      data: {
        queryCondition: [{ qcLogicSign: 'like', qcUuid: '52ab80044ed3eaf9014ed7ab2d560006', qcRelationSign: 'and', fName: 'xm', qcValue: that.data.value }]
      },
      success(res) {
        //console.log(res.data.length)
        //console.log(res.data[0].XH)
        wx.hideLoading()

        if (res.data.length < 100) {
          that.setData({
            items: res.data,
            list: '',
            hidden:false
          })
        }
        wx.showModal({
          title: '查询结果',
          content: '在河南科技大学，名字中含有\"' + that.data.value + '\"字的一共有' + res.data.length + '人',
          showCancel: false
        })

        /*
        wx.request({
          url: 'https://test.huidge.top/xqcx/xqcx/datacollection/getData.do?dcUuid=52ab80044ee1e6d8014ee235acd90017',
          method: 'GET',
          data: {
            queryCondition: [{ qcLogicSign: 'like', qcUuid: '52ab80044ee1e6d8014ee235acd90017', qcRelationSign: 'and', fName: 'xh', qcValue: res.data[0].XH }]
          },
          success(res) {
            console.log(res.data.length)
            wx.hideLoading()
            if (res.data.length == 1) {
              that.setData({
                list: res.data[0]
              })
            }
            else {
              wx.showModal({
                title: '查询失败',
                content: '请输入检查学号是否正确',
                showCancel: false
              })
              that.setData({
                list: ''
              })
            }

          }
        })*/

      }
    })
  },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});
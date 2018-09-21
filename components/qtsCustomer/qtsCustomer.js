Component({
  properties: {
    //属性值可以在组件使用时指定
    isShow: {
      type: Boolean,
      value: true
    }
  },
  data: {
    pos: {},
    SYSTEMINFO: ''
  },
  ready() {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          SYSTEMINFO: res
        })
      }
    })
  },
  methods: {
    menuMainMove(e) {
      // 如果已经弹出来了，需要先收回去，否则会受 top、left 会影响
      let windowWidth = this.data.SYSTEMINFO.windowWidth
      let windowHeight = this.data.SYSTEMINFO.windowHeight
      let touches = e.touches[0]
      let clientX = touches.clientX
      let clientY = touches.clientY
      // 边界判断
      if (clientX > windowWidth - 90) {
        clientX = windowWidth - 90
      }
      if (clientX <= 10) {
        clientX = 10
      }
      if (clientY > windowHeight - 150) {
        clientY = windowHeight - 150
      }
      if (clientY <= 16) {
        clientY = 16
      }
      let pos = {
        left: clientX,
        top: clientY,
      }
      this.setData({
        pos,
      })
    }
  }
})

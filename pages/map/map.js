Page({
  data: {
    latitude: 34.603190,
    longitude: 112.419730,
    markers: [{ iconPath: '/image/library.png', id: 1, title: '图书馆', latitude: 34.607603, longitude: 112.420735, width: 20, height: 20 },

      { iconPath: '/image/gate.png', id: 2, title: '大北门', latitude: 34.608981, longitude: 112.421878, width: 30, height: 30 },

      { iconPath: '/image/meetingroom.png', id: 3, title: '会议中心', latitude: 34.607158, longitude: 112.419212, width: 20, height: 20 },

      { iconPath: '/image/boyuan.png', id: 4, title: '博园', latitude: 34.601771, longitude: 112.424437, width: 30, height: 30 },

      { iconPath: '/image/gate.png', id: 5, title: '西门', latitude: 34.606804, longitude: 112.417216, width: 20, height: 20 },

      { iconPath: '/image/wenke1.png', id: 6, title: '文科1号楼', latitude: 34.605625, longitude: 112.419646, width: 20, height: 20 },

      { iconPath: '/image/wenke2.png', id: 7, title: '文科2号楼', latitude: 34.605983, longitude: 112.420891, width: 15, height: 15 },

      { iconPath: '/image/building.png', id: 8, title: '农医教学楼', latitude: 34.597638, longitude: 112.416964, width: 20, height: 20 },

      { iconPath: '/image/building.png', id: 9, title: '公共教学楼', latitude: 34.601669, longitude: 112.421358, width: 20, height: 30 },

      { iconPath: '/image/gongke.png', id: 10, title: '工科楼群', latitude: 34.603555, longitude: 112.428331, width: 30, height: 30 },

      { iconPath: '/image/football.png', id: 11, title: '足球场', latitude: 34.603450, longitude: 112.414200, width: 20, height: 20 },

      { iconPath: '/image/gym.png', id: 12, title: '露天体育场', latitude: 34.598251, longitude: 112.423782, width: 30, height: 20 },

      { iconPath: '/image/dormitory.png', id: 13, title: '嘉园宿舍楼', latitude: 34.604592, longitude: 112.416615, width: 20, height: 20 },

      { iconPath: '/image/dormitory.png', id: 14, title: '菁园宿舍楼', latitude: 34.596671, longitude: 112.419609, width: 20, height: 20 },

      { iconPath: '/image/dormitory.png', id: 15, title: '乾园宿舍楼', latitude: 34.601572, longitude: 112.428364, width: 20, height: 20 },

      { iconPath: '/image/deyuan.png', id: 16, title: '德园', latitude: 34.609793, longitude: 112.426958, width: 30, height: 30 },

      { iconPath: '/image/basketball.png', id: 17, title: '篮球场', latitude: 34.601010, longitude: 112.415480, width: 20, height: 20 },

      { iconPath: '/image/tennis.png', id: 18, title: '网球场', latitude: 34.597638, longitude: 112.416964, width: 20, height: 20 },

      { iconPath: '/image/hospital.png', id: 19, title: '校医院', latitude: 34.599929, longitude: 112.414727,width:20,height:20},

      { iconPath: '/image/location.png', id: 20, title: '风雨操场', latitude: 34.600896, longitude: 112.413837 },

      { iconPath: '/image/location.png', id: 21, title: '工程训练中心', latitude: 34.598808, longitude: 112.416438 },

      { iconPath: '/image/restaurant.png', id: 22, title: '嘉园餐厅', latitude: 34.603802, longitude: 112.416406, width: 20, height: 20},

      { iconPath: '/image/restaurant.png', id: 23, title: '菁园餐厅', latitude: 34.601157, longitude: 112.416455, width: 20, height: 20},

      { iconPath: '/image/restaurant.png', id: 24, title: '乾园餐厅', latitude: 34.602226, longitude: 112.428927, width: 20, height: 20},
      { iconPath: '/image/square.png', id: 25, title: '国旗广场', latitude: 34.603983, longitude: 112.423042, width: 20, height: 20 },

      { iconPath: '/image/location.png', id: 26, title: '致远楼', latitude: 34.600860, longitude: 112.418140 },

      { iconPath: '/image/location.png', id: 27, title: '农林动科楼', latitude: 34.598640, longitude: 112.420660 }
    ],
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  }
})

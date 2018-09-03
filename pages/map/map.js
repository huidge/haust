Page({
  data: {
    latitude: 34.603190,
    longitude: 112.419730,
    markers: [{
      iconPath: '/image/location.png',
      id: 1,
      latitude: 34.606725,
      longitude: 112.416884,
      name: '小北门'
    }, 
    {
      iconPath: '/image/location.png',
      id: 2,
      latitude: 34.601010, 
      longitude: 112.415480,
        title: '篮球场'
      },
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

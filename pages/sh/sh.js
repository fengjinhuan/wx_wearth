Page({
  data: {
    basic:{},
    daily:[]
  },
  onLoad: function (option) {
    console.log(option)
    var city=option.id;
    var that=this;
         if(city!=""){
           console.log(1)
           that.wear(city)
         }else{
           console.log(2)
              wx.getStorage({
                  key: 'gdcity', 
                  success: function(res) {
                  var city=res.data;
                  that.wear(city)
                  } 
              }) 
             }
              wx.setStorage({
                key:"cc",
                data:""
              })
    // wx.request({
    // url:"https://free-api.heweather.com/v5/suggestion/?city=beijing&&key=785ec570ad1544cb8df4a22209577eda", 
    // data: {
    //    x: '' ,
    //    y: ''
    // },
    // header: {
    //     'content-type': 'application/json'
    // },
    // success: function(res) {
    //   var b=res.data.HeWeather5[0];
    //   that.setData({
    //   basic:b.basic,
    //   daily:b["suggestion"]})

        //  }
      // }) 
    },
    wear:function(city){
  var that=this;
    //更新数据
     wx.request({
    url:"https://free-api.heweather.com/v5/suggestion/?key=785ec570ad1544cb8df4a22209577eda&&city="+city, 
    data: {
       x: '' ,
       y: ''
    },
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      var b=res.data.HeWeather5[0];
      that.setData({
      basic:b.basic,
      daily:b["suggestion"]})

         }
      }) ;
  },
  //获取城市
 lot:function(){
    var that = this;
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          wx.request({
            url:"http://api.map.baidu.com/geocoder/v2/?location="+latitude+","+longitude+"&output=json&pois=1&ak=QD81vqVIVskXW5avkRuw3Gb4miiYa8sK",
            success:function(res){
              console.log(res)
              var city=res.data.result.addressComponent.city;
              var cc=city.slice(0,-1);
              wx.setStorage({
                key:"gdcity",
                data:cc
                })
            }
          })
        }
    })
  }
})

//index.js
var app = getApp()
Page({
  data: {
    basic:{},
    daily:[],
    city:"",
    n:"",
    y:"",
    z:"",
    h:"",
    xq:["星期日","星期二","星期三","星期四","星期五","星期六","星期一",]

  },
  onLoad: function () {
      var day=new Date();
      var h=day.getDate();
      var z=day.getDay();
      var y=day.getMonth();
      var n=day.getFullYear();
      console.log(z)
      var zj=this.data.xq[z]
      console.log(zj)
      this.setData({
        n:n,
        y:y,
        z:zj,
        h:h
      })
     this.lot(); 
      var that=this;
      wx.getStorage({
      key: 'cc', 
      success: function(res) {
        that.data.city="";
         var city=res.data;
         console.log(city)
         if(city!=""){
           that.setData({
             city:city
           })
           console.log(1)
           that.wear(city);
           console.log(that.data.city)
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
              });
          } 
      }) 
    },
    
tz:function(){
  wx.redirectTo({
  url:"../sx/sx"
})
},

wear:function(city){
  var that=this;
    //更新数据
    wx.request({
      url: "https://free-api.heweather.com/v5/now?key=45dfbc6ca50e4f9a8d4b168f4c4f632c&city="+city,
      success: function (res) {
        console.log(res)
        var dd = res.data.HeWeather5[0];
        console.log(res);
        that.setData({
          basic: dd.basic,
          daily: dd["now"]
        })
      }
    })  
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

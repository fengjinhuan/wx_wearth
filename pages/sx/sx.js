var app = getApp()
Page({
  data: {
    basic:{},
    daily:[],
    arr:["太原","北京","广州","深圳"],
    obj:"1"
  },
  onLoad: function () {
   
  },
change:function(e){
  console.log(this.data.obj)
      this.data.obj=e.target.id;
      wx.setStorage({
      key:"cc",
      data:this.data.obj
});
 wx.redirectTo({
  url:"../index/index"
})
},
  change1:function(e){
    console.log(e)
      var aa=e.detail.value;
      var arr1=this.data.arr.concat(aa);
      this.setData({
        arr:arr1
    })
  }
})

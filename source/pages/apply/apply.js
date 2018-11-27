// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { date } from "../../apis/order.api.js";
import { CertificateApi } from "../../apis/certificate.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.setMyData({

    })

    this.setData({
      array: ['所有', '离我最近', '费用最高'],
      objectArray: [
        {
          id: 0,
          name: '所有'
        },
        {
          id: 1,
          name: '离我最近'
        },
        {
          id: 2,
          name: '费用最高'
        }

      ],
      index: 0,
      tab: 0,


    })

    super.onLoad(options);

  }


  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '报名详情',

    });
  }


  onMyShow() {
    var that=this;
    var api = new CertificateApi();
    var UserInfo=this.Base.getMyData().UserInfo;
    api.riverlist({ openid: UserInfo.openid }, (list) => {
      that.Base.setMyData({
        list
      });
    })
    var orderapi = new OrderApi();
    orderapi.applylist({}, (list1) => {
      var year2 = new Array();
      var month2 = new Array();
      var day2 = new Array();
      var hh2 = new Array();
      var mm2 = new Array();
      var year1 = new Array();
      var month1 = new Array();
      var day1 = new Array();
      var hh1 = new Array();
      var mm1 = new Array();
      var myDate1 = new Date(Date.parse(list1[this.Base.options.id].order_start_time.replace(/-/g, "/")));
      var myDate2 = new Date(Date.parse(list1[this.Base.options.id].order_end_time.replace(/-/g, "/")));
      year1 = myDate1.getFullYear();
      month1 = myDate1.getMonth() + 1;
      day1 = myDate1.getDate();
      hh1 = myDate1.getHours();
      mm1 = myDate1.getMinutes();
      if (month1 < 10) {
        month1 = '0' + month1;
      }
      if (day1 < 10) {
        day1 = '0' + day1;
      }
      if (hh1 < 10) {
        hh1 = '0' + hh1;
      }
      if (mm1 < 10) {
        mm1 = '0' + mm1;
      }

      year2 = myDate2.getFullYear();
      month2 = myDate2.getMonth() + 1;
      day2 = myDate2.getDate();
      hh2 = myDate2.getHours();
      mm2 = myDate2.getMinutes();
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      if (day2 < 10) {
        day2 = '0' + day2;
      }
      if (hh2 < 10) {
        hh2 = '0' + hh2;
      }
      if (mm2< 10) {
        mm2 = '0' + mm2;
      }
      this.Base.setMyData({
        list1: list1[this.Base.options.id],
        year1: year1,
        year2: year2,
        month1: month1,
        month2: month2,
        day1: day1,
        day2: day2,
        hh1: hh1,
        hh2: hh2,
        mm2: mm2,
        mm1: mm1




      });

  

    })

    
    
  }
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({ tab: e.currentTarget.id });
  }
  Deleteorder(e) {
    console.log(e);
    var that = this;
    var list = this.Base.getMyData().list;
    var status = this.Base.getMyData().list[0].status;
    console.log(status);
    console.log(222222222222222);
    if (status != "A" || list == "") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certificate/certificate',
            })
          }
        }
      });
    }
    else {
      wx.showModal({
        title: '',
        content: '您是否需要取消本次报名？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: 'EE2222',
        confirmText: '确定',
        confirmColor: '2699EC',
        success: function (res) {
          if (res.confirm) {
            var orderapi = new OrderApi();
            orderapi.deleteapply({ idlist: that.Base.options.idlist }, (updataorder) => {
              that.Base.setMyData({
                updataorder
              });
              wx.reLaunch({
                url: '/pages/driver/driver',
              })
            });
          }
        }
        
      })
    }
    
  }
}
var tab = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
body.Deleteorder = content.Deleteorder;
Page(body)
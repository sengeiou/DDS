// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CertificateApi } from "../../apis/certificate.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的',
 
    });
  }
  onMyShow() {
    var that = this;
    var api = new CertificateApi();
    console.log(8888888);
    var UserInfo=this.Base.getMyData().UserInfo;
    api.riverlist({ openid: UserInfo.openid}, (list) => {
     
      this.Base.setMyData({ list });

     
    });
  }
  Cutstatus(e) {
    wx.showModal({
      title: '身份切换',
      content: '您是否需要切换身份',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/usercategory/usercategory',
          })
        }
      }
    });
  }
  mycar(e){
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
      wx.navigateTo({
        url: '/pages/vehicle/vehicle'
      })
    }
  }
  mytask(e){
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
      wx.navigateTo({
        url: '/pages/completed/completed'
      })
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.Cutstatus = content.Cutstatus; 
body.mycar = content.mycar;
body.mytask = content.mytask;
Page(body)